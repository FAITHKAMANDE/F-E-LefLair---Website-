"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ban,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Trash2,
  Unlock,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CLOSED_WEEKDAYS,
  TIME_SLOTS,
  addDaysKey,
  formatLongDate,
  formatShortDate,
  isPastSlot,
  slotEnd,
  startOfWeekKey,
  weekdayOf,
  type Booking,
  type SlotStatus,
} from "@/lib/booking";
import { sendJson, useJson, useZonedNow } from "../hooks";

type Selected = { date: string; time: string };

const CELL_LABEL: Record<SlotStatus, string> = {
  available: "Open",
  booked: "Booked",
  blocked: "Blocked",
  past: "—",
  closed: "—",
};

/**
 * Admin week view: every slot for the week with its state (open, booked,
 * blocked, past). Click a slot to see the booking, cancel it, or block/unblock.
 */
export function AdminSchedule() {
  const router = useRouter();
  const now = useZonedNow();
  const [weekStart, setWeekStart] = useState(() => startOfWeekKey(now.dateKey));
  const [selected, setSelected] = useState<Selected | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => addDaysKey(weekStart, i)).filter(
        (d) => !CLOSED_WEEKDAYS.includes(weekdayOf(d)),
      ),
    [weekStart],
  );
  const weekEnd = addDaysKey(weekStart, 6);

  const { data, error, loading, reload } = useJson<{ bookings: Booking[] }>(
    `/api/admin/bookings?from=${weekStart}&to=${weekEnd}`,
  );
  const bookings = useMemo(() => data?.bookings ?? [], [data]);
  const bySlot = useMemo(() => {
    const m = new Map<string, Booking>();
    for (const b of bookings) m.set(`${b.date} ${b.time}`, b);
    return m;
  }, [bookings]);

  // Unlike the public view, admins can manage slots beyond the booking window.
  const statusOf = (date: string, time: string): SlotStatus => {
    const b = bySlot.get(`${date} ${time}`);
    if (b) return b.kind === "block" ? "blocked" : "booked";
    return isPastSlot(date, time, now) ? "past" : "available";
  };

  const counts = useMemo(() => {
    const c = { available: 0, booked: 0, blocked: 0 };
    for (const d of days)
      for (const t of TIME_SLOTS) {
        const s = statusOf(d, t);
        if (s === "available" || s === "booked" || s === "blocked") c[s]++;
      }
    return c;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, bySlot, now]);

  const upcoming = bookings.filter(
    (b) => b.kind === "booking" && !isPastSlot(b.date, b.time, now),
  );

  const act = async (fn: () => ReturnType<typeof sendJson>) => {
    setBusy(true);
    setNotice(null);
    const res = await fn();
    setBusy(false);
    if (!res.ok) {
      if (res.status === 401) router.refresh();
      setNotice(res.error);
    }
    reload();
  };

  const sel = selected ? bySlot.get(`${selected.date} ${selected.time}`) : undefined;
  const selStatus = selected ? statusOf(selected.date, selected.time) : null;

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <IconBtn label="Previous week" onClick={() => setWeekStart(addDaysKey(weekStart, -7))}>
            <ChevronLeft className="h-5 w-5" />
          </IconBtn>
          <IconBtn label="Next week" onClick={() => setWeekStart(addDaysKey(weekStart, 7))}>
            <ChevronRight className="h-5 w-5" />
          </IconBtn>
          <button
            type="button"
            onClick={() => setWeekStart(startOfWeekKey(now.dateKey))}
            className="rounded-lg border border-ink/[0.12] px-3 py-1.5 text-sm font-semibold text-ink-soft hover:border-burgundy hover:text-burgundy"
          >
            This week
          </button>
          <h2 className="ml-2 font-display text-lg font-semibold text-ink">
            {formatShortDate(weekStart)} – {formatShortDate(weekEnd)}
          </h2>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-ink-muted" aria-label="Loading" />}
        </div>
        <div className="flex items-center gap-2">
          <IconBtn label="Refresh" onClick={reload}>
            <RefreshCw className="h-4 w-4" />
          </IconBtn>
          <button
            type="button"
            onClick={async () => {
              await sendJson("/api/admin/logout", "POST");
              router.refresh();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-ink-soft hover:bg-burgundy-50 hover:text-burgundy"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </button>
        </div>
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-3 gap-3">
        <Stat label="Open slots" value={counts.available} className="bg-pastel-100" />
        <Stat label="Booked" value={counts.booked} className="bg-burgundy-50" />
        <Stat label="Blocked" value={counts.blocked} className="bg-ink/[0.04]" />
      </dl>

      {(error || notice) && (
        <p role="alert" className="rounded-xl bg-blush-100 px-4 py-3 text-sm font-medium text-burgundy-800">
          {notice || error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Week grid */}
        <div className="overflow-x-auto rounded-3xl border border-ink/[0.07] bg-white p-4 shadow-card sm:p-5">
          <table className="w-full min-w-[640px] border-separate border-spacing-1.5 text-sm">
            <thead>
              <tr>
                <th className="w-16" />
                {days.map((d) => (
                  <th
                    key={d}
                    scope="col"
                    className={cn(
                      "pb-1 text-center text-xs font-semibold uppercase tracking-wide",
                      d === now.dateKey ? "text-burgundy" : "text-ink-muted",
                    )}
                  >
                    {formatShortDate(d)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((t) => (
                <tr key={t}>
                  <th scope="row" className="pr-1 text-right text-xs font-semibold text-ink-muted">
                    {t}
                  </th>
                  {days.map((d) => {
                    const s = statusOf(d, t);
                    const b = bySlot.get(`${d} ${t}`);
                    const isSel = selected?.date === d && selected.time === t;
                    return (
                      <td key={d} className="p-0">
                        <button
                          type="button"
                          onClick={() => setSelected({ date: d, time: t })}
                          aria-label={`${formatLongDate(d)} ${t}: ${s}${b?.name ? `, ${b.name}` : ""}`}
                          className={cn(
                            "flex h-14 w-full flex-col items-start justify-center overflow-hidden rounded-lg px-2 text-left text-xs transition-all",
                            s === "available" && "bg-pastel-100 text-pastel-700 hover:bg-pastel-200",
                            s === "booked" && "bg-burgundy text-white hover:bg-burgundy-700",
                            s === "blocked" &&
                              "bg-[repeating-linear-gradient(45deg,rgba(30,23,25,0.05)_0_6px,transparent_6px_12px)] text-ink-muted hover:bg-ink/[0.06]",
                            s === "past" && "bg-ink/[0.03] text-ink-muted/50",
                            isSel && "ring-2 ring-burgundy ring-offset-2",
                          )}
                        >
                          <span className="font-semibold">
                            {CELL_LABEL[s]}
                          </span>
                          {b?.name && <span className="w-full truncate opacity-80">{b.name}</span>}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="mt-3 flex flex-wrap gap-4 px-1 text-xs text-ink-muted">
            <Legend className="bg-pastel-100">Open</Legend>
            <Legend className="bg-burgundy">Booked</Legend>
            <Legend className="border border-ink/10 bg-ink/[0.05]">Blocked</Legend>
            <Legend className="bg-ink/[0.03]">Past</Legend>
          </ul>
        </div>

        {/* Side panel */}
        <aside className="space-y-6">
          <div className="rounded-3xl border border-ink/[0.07] bg-white p-5 shadow-card">
            {!selected ? (
              <p className="flex items-center gap-2 text-sm text-ink-muted">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Select a slot to manage it.
              </p>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">{formatLongDate(selected.date)}</p>
                    <p className="text-sm text-burgundy">
                      {selected.time} – {slotEnd(selected.time)}
                    </p>
                  </div>
                  <IconBtn label="Close" onClick={() => setSelected(null)}>
                    <X className="h-4 w-4" />
                  </IconBtn>
                </div>

                {sel?.kind === "booking" && (
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="font-display text-lg font-semibold text-ink">{sel.name}</p>
                    {sel.email && (
                      <a href={`mailto:${sel.email}`} className="flex items-center gap-2 text-ink-soft hover:text-burgundy">
                        <Mail className="h-4 w-4" aria-hidden /> {sel.email}
                      </a>
                    )}
                    {sel.phone && (
                      <a href={`tel:${sel.phone}`} className="flex items-center gap-2 text-ink-soft hover:text-burgundy">
                        <Phone className="h-4 w-4" aria-hidden /> {sel.phone}
                      </a>
                    )}
                    {sel.note && (
                      <p className="whitespace-pre-wrap rounded-xl bg-cream p-3 text-ink-soft">{sel.note}</p>
                    )}
                    <p className="text-xs text-ink-muted">
                      Booked {new Date(sel.createdAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {selStatus === "available" && (
                  <p className="mt-4 text-sm text-ink-muted">This slot is open for booking.</p>
                )}
                {sel?.kind === "block" && (
                  <p className="mt-4 text-sm text-ink-muted">You blocked this slot; nobody can book it.</p>
                )}
                {selStatus === "past" && !sel && (
                  <p className="mt-4 text-sm text-ink-muted">This time has passed.</p>
                )}

                <div className="mt-5">
                  {sel?.kind === "booking" && (
                    <ActionBtn
                      busy={busy}
                      tone="danger"
                      onClick={() => {
                        if (window.confirm(`Cancel ${sel.name}’s booking? The slot will reopen.`))
                          act(() => sendJson(`/api/admin/bookings/${sel.id}`, "DELETE"));
                      }}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden /> Cancel booking
                    </ActionBtn>
                  )}
                  {sel?.kind === "block" && (
                    <ActionBtn busy={busy} onClick={() => act(() => sendJson(`/api/admin/bookings/${sel.id}`, "DELETE"))}>
                      <Unlock className="h-4 w-4" aria-hidden /> Unblock slot
                    </ActionBtn>
                  )}
                  {selStatus === "available" && (
                    <ActionBtn
                      busy={busy}
                      onClick={() => act(() => sendJson("/api/admin/bookings", "POST", selected))}
                    >
                      <Ban className="h-4 w-4" aria-hidden /> Block this slot
                    </ActionBtn>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-ink/[0.07] bg-white p-5 shadow-card">
            <h3 className="font-display text-base font-semibold text-ink">Upcoming this week</h3>
            {upcoming.length === 0 ? (
              <p className="mt-2 text-sm text-ink-muted">No upcoming bookings.</p>
            ) : (
              <ul className="mt-3 divide-y divide-ink/[0.06]">
                {upcoming.map((b) => (
                  <li key={b.id}>
                    <button
                      type="button"
                      onClick={() => setSelected({ date: b.date, time: b.time })}
                      className="flex w-full items-center justify-between gap-3 py-2.5 text-left text-sm hover:text-burgundy"
                    >
                      <span className="truncate font-semibold text-ink">{b.name}</span>
                      <span className="flex-none text-ink-muted">
                        {formatShortDate(b.date)} · {b.time}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full text-burgundy transition-colors hover:bg-burgundy-50"
    >
      {children}
    </button>
  );
}

function ActionBtn({
  busy,
  tone = "default",
  onClick,
  children,
}: {
  busy: boolean;
  tone?: "default" | "danger";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={busy}
      onClick={onClick}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50",
        tone === "danger"
          ? "border border-burgundy/30 text-burgundy hover:bg-burgundy-50"
          : "bg-burgundy text-white hover:bg-burgundy-700",
      )}
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : children}
    </button>
  );
}

function Stat({ label, value, className }: { label: string; value: number; className: string }) {
  return (
    <div className={cn("rounded-2xl px-4 py-3", className)}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-semibold text-ink">{value}</dd>
    </div>
  );
}

function Legend({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5">
      <span className={cn("h-3 w-3 rounded", className)} aria-hidden />
      {children}
    </li>
  );
}
