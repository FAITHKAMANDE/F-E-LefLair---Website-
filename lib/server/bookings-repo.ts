import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Booking, BookingKind } from "@/lib/booking";

/**
 * Booking storage. Uses Supabase when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 * are set; otherwise (local development only) a JSON file in `.data/`.
 */

export type NewBooking = {
  kind: BookingKind;
  date: string;
  time: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  note?: string | null;
};

export type CreateResult = { ok: true; booking: Booking } | { ok: false; reason: "conflict" };

export interface BookingsRepo {
  /** Confirmed rows (bookings + blocks) with from <= date <= to. */
  listConfirmed(from: string, to: string): Promise<Booking[]>;
  create(input: NewBooking): Promise<CreateResult>;
  /** Returns false if no confirmed row had that id. */
  cancel(id: string): Promise<boolean>;
}

/* --------------------------------------------------------------- Supabase */

type Row = {
  id: string;
  kind: BookingKind;
  status: Booking["status"];
  slot_date: string;
  slot_time: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  note: string | null;
  created_at: string;
};

const fromRow = (r: Row): Booking => ({
  id: r.id,
  kind: r.kind,
  status: r.status,
  date: r.slot_date,
  time: r.slot_time,
  name: r.name,
  email: r.email,
  phone: r.phone,
  note: r.note,
  createdAt: r.created_at,
});

class SupabaseRepo implements BookingsRepo {
  constructor(private db: SupabaseClient) {}

  async listConfirmed(from: string, to: string) {
    const { data, error } = await this.db
      .from("bookings")
      .select("*")
      .eq("status", "confirmed")
      .gte("slot_date", from)
      .lte("slot_date", to)
      .order("slot_date")
      .order("slot_time");
    if (error) throw new Error(`Supabase list failed: ${error.message}`);
    return (data as Row[]).map(fromRow);
  }

  async create(input: NewBooking): Promise<CreateResult> {
    const { data, error } = await this.db
      .from("bookings")
      .insert({
        kind: input.kind,
        slot_date: input.date,
        slot_time: input.time,
        name: input.name ?? null,
        email: input.email ?? null,
        phone: input.phone ?? null,
        note: input.note ?? null,
      })
      .select("*")
      .single();
    // 23505 = unique_violation → the partial unique index caught a double booking.
    if (error?.code === "23505") return { ok: false, reason: "conflict" };
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
    return { ok: true, booking: fromRow(data as Row) };
  }

  async cancel(id: string) {
    const { data, error } = await this.db
      .from("bookings")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("id", id)
      .eq("status", "confirmed")
      .select("id");
    if (error) throw new Error(`Supabase cancel failed: ${error.message}`);
    return (data?.length ?? 0) > 0;
  }
}

/* ------------------------------------------------- local file (dev only) */

const FILE = path.join(process.cwd(), ".data", "bookings.json");

class FileRepo implements BookingsRepo {
  // Serialise writes so concurrent requests can't double-book a slot.
  private queue: Promise<unknown> = Promise.resolve();

  private async readAll(): Promise<Booking[]> {
    try {
      return JSON.parse(await fs.readFile(FILE, "utf8"));
    } catch {
      return [];
    }
  }

  private async writeAll(rows: Booking[]) {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(rows, null, 2));
  }

  private exclusive<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.queue.then(fn, fn);
    this.queue = run.catch(() => undefined);
    return run;
  }

  async listConfirmed(from: string, to: string) {
    return (await this.readAll())
      .filter((b) => b.status === "confirmed" && b.date >= from && b.date <= to)
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }

  create(input: NewBooking): Promise<CreateResult> {
    return this.exclusive(async () => {
      const rows = await this.readAll();
      const clash = rows.some(
        (b) => b.status === "confirmed" && b.date === input.date && b.time === input.time,
      );
      if (clash) return { ok: false as const, reason: "conflict" as const };
      const booking: Booking = {
        id: randomUUID(),
        kind: input.kind,
        status: "confirmed",
        date: input.date,
        time: input.time,
        name: input.name ?? null,
        email: input.email ?? null,
        phone: input.phone ?? null,
        note: input.note ?? null,
        createdAt: new Date().toISOString(),
      };
      await this.writeAll([...rows, booking]);
      return { ok: true as const, booking };
    });
  }

  cancel(id: string) {
    return this.exclusive(async () => {
      const rows = await this.readAll();
      const row = rows.find((b) => b.id === id && b.status === "confirmed");
      if (!row) return false;
      row.status = "cancelled";
      await this.writeAll(rows);
      return true;
    });
  }
}

/* ------------------------------------------------------------- selection */

let repo: BookingsRepo | null = null;

export function getBookingsRepo(): BookingsRepo {
  if (repo) return repo;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    repo = new SupabaseRepo(
      createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }),
    );
  } else if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[bookings] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not set — using local file store at .data/bookings.json (dev only).",
    );
    repo = new FileRepo();
  } else {
    throw new Error(
      "Bookings are not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  return repo;
}
