"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TIME_SLOTS,
  formatLongDate,
  slotEnd,
  slotStatus,
  type ZonedNow,
} from "@/lib/booking";

/**
 * Every slot for a day, including taken ones, so people can see at a glance
 * what's open. Choosing an open slot reveals a "Next" button (Calendly-style).
 */
export function SlotList({
  dateKey,
  takenTimes,
  now,
  selected,
  onSelect,
  onConfirm,
}: {
  dateKey: string;
  takenTimes: string[];
  now: ZonedNow;
  selected: string | null;
  onSelect: (time: string) => void;
  onConfirm: () => void;
}) {
  const taken = Object.fromEntries(takenTimes.map((t) => [t, "booked" as const]));
  const statuses = TIME_SLOTS.map((t) => ({ time: t, status: slotStatus(dateKey, t, taken, now) }));
  const openCount = statuses.filter((s) => s.status === "available").length;

  return (
    <div>
      <h3 className="font-display text-base font-semibold text-ink">
        {formatLongDate(dateKey)}
      </h3>
      <p className="mt-1 text-sm text-ink-muted">
        {openCount === 0
          ? "No times left on this day."
          : `${openCount} of ${TIME_SLOTS.length} times available`}
      </p>

      <ul className="mt-4 space-y-2">
        {statuses.map(({ time, status }) => {
          const isSel = selected === time;
          const range = `${time} – ${slotEnd(time)}`;

          if (status !== "available") {
            return (
              <li
                key={time}
                className="flex items-center justify-between rounded-xl border border-dashed border-ink/10 px-4 py-3 text-sm text-ink-muted/70"
                aria-label={`${range}, ${status === "booked" ? "booked" : "no longer available"}`}
              >
                <span className="line-through decoration-ink/20">{range}</span>
                <span className="rounded-full bg-ink/[0.05] px-2 py-0.5 text-xs font-semibold text-ink-muted">
                  {status === "booked" ? "Booked" : "Passed"}
                </span>
              </li>
            );
          }

          return (
            <li key={time} className="flex gap-2">
              <button
                type="button"
                onClick={() => onSelect(time)}
                aria-pressed={isSel}
                className={cn(
                  "flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition-all",
                  isSel
                    ? "border-ink-soft bg-ink-soft text-white"
                    : "border-burgundy/30 bg-white text-burgundy hover:border-burgundy hover:shadow-card",
                )}
              >
                {range}
              </button>
              {isSel && (
                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-burgundy px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-700"
                >
                  Next
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
