import "server-only";

import { NextResponse } from "next/server";
import { diffDays, isDateKey } from "@/lib/booking";

export const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export const fail = (status: number, error: string) => json({ error }, status);

const MAX_RANGE_DAYS = 62;

/** Reads and validates `?from=YYYY-MM-DD&to=YYYY-MM-DD`. */
export function parseRange(
  url: URL,
): { from: string; to: string } | { error: string } {
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (!isDateKey(from) || !isDateKey(to)) return { error: "from/to must be YYYY-MM-DD." };
  const span = diffDays(from, to);
  if (span < 0 || span > MAX_RANGE_DAYS)
    return { error: `Range must be 0–${MAX_RANGE_DAYS} days.` };
  return { from, to };
}

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json();
    return body && typeof body === "object" ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export function serverError(err: unknown) {
  console.error("[bookings]", err);
  return fail(500, "Something went wrong on our side. Please try again.");
}
