"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MONTH_LABELS,
  WEEKDAY_LABELS,
  dayAvailability,
  daysInMonth,
  formatLongDate,
  monthKey,
  weekdayOf,
  type TakenSlots,
  type ZonedNow,
} from "@/lib/booking";

/**
 * Month calendar that shows availability per day, Calendly-style:
 * open days are tinted and show how many slots are left; fully booked,
 * past and closed days are greyed out with a short label.
 */
export function AvailabilityCalendar({
  year,
  month,
  onMonthChange,
  canGoPrev,
  canGoNext,
  taken,
  loading,
  now,
  selected,
  onSelect,
}: {
  year: number;
  month: number;
  onMonthChange: (delta: -1 | 1) => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  taken: TakenSlots | null;
  loading: boolean;
  now: ZonedNow;
  selected: string | null;
  onSelect: (dateKey: string) => void;
}) {
  const first = monthKey(year, month, 1);
  const leading = weekdayOf(first);
  const count = daysInMonth(year, month);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink" aria-live="polite">
          {MONTH_LABELS[month]} {year}
        </h2>
        <div className="flex items-center gap-1">
          <NavButton label="Previous month" disabled={!canGoPrev} onClick={() => onMonthChange(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </NavButton>
          <NavButton label="Next month" disabled={!canGoNext} onClick={() => onMonthChange(1)}>
            <ChevronRight className="h-5 w-5" />
          </NavButton>
        </div>
      </div>

      <div
        className={cn(
          "mt-4 grid grid-cols-7 gap-1.5 text-center transition-opacity",
          loading && "opacity-60",
        )}
        aria-busy={loading}
      >
        {WEEKDAY_LABELS.map((d) => (
          <div
            key={d}
            className="pb-1 text-[11px] font-semibold uppercase tracking-wide text-ink-muted"
          >
            {d}
          </div>
        ))}
        {Array.from({ length: leading }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {Array.from({ length: count }).map((_, i) => {
          const key = monthKey(year, month, i + 1);
          const avail = dayAvailability(key, taken?.[key] ?? [], now);
          const known = taken !== null;
          const open = avail.status === "available" || avail.status === "low";
          const selectable = known && open;
          const isSelected = selected === key;
          const isToday = key === now.dateKey;

          const sub = !known
            ? ""
            : avail.status === "full"
              ? "Full"
              : avail.status === "closed" || avail.status === "past"
                ? ""
                : `${avail.open} left`;

          const label =
            `${formatLongDate(key)}: ` +
            (!known
              ? "loading"
              : open
                ? `${avail.open} slot${avail.open === 1 ? "" : "s"} available`
                : avail.status === "full"
                  ? "fully booked"
                  : "unavailable");

          return (
            <button
              key={key}
              type="button"
              disabled={!selectable}
              onClick={() => onSelect(key)}
              aria-label={label}
              aria-pressed={isSelected}
              className={cn(
                "relative flex aspect-square min-h-[44px] flex-col items-center justify-center rounded-xl text-sm font-semibold transition-colors",
                isSelected && "bg-burgundy text-white shadow-card",
                !isSelected && selectable && avail.status === "available" &&
                  "bg-pastel-100 text-burgundy-800 hover:bg-pastel-200",
                !isSelected && selectable && avail.status === "low" &&
                  "bg-blush-100 text-burgundy-800 hover:bg-blush-200",
                !selectable && "cursor-not-allowed text-ink-muted/45",
                !selectable && avail.status === "full" && "bg-ink/[0.05] text-ink-muted/70",
              )}
            >
              <span>{i + 1}</span>
              {sub && (
                <span
                  className={cn(
                    "mt-0.5 hidden text-[10px] font-medium leading-none sm:block",
                    isSelected ? "text-white/80" : "text-ink-muted",
                  )}
                >
                  {sub}
                </span>
              )}
              {isToday && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-1 h-1 w-1 rounded-full sm:hidden",
                    isSelected ? "bg-white" : "bg-burgundy",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-muted">
        <Legend className="bg-pastel-100">Available</Legend>
        <Legend className="bg-blush-100">Filling up</Legend>
        <Legend className="bg-ink/[0.05]">Fully booked</Legend>
        <Legend className="border border-ink/10 bg-transparent">Closed / past</Legend>
      </ul>
    </div>
  );
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full text-burgundy transition-colors hover:bg-burgundy-50 disabled:text-ink-muted/30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
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
