/**
 * Consultation booking — shared availability rules (used by the API routes,
 * the public /bookings page and the admin schedule).
 *
 * All dates are calendar dates in the business time zone, as `YYYY-MM-DD`
 * keys, and times are wall-clock `HH:MM` slot starts in that zone. That way a
 * visitor in another country still sees (and books) the business's hours.
 */

/** TODO: confirm with the business. Override with NEXT_PUBLIC_BOOKING_TIMEZONE. */
export const BOOKING_TIMEZONE =
  process.env.NEXT_PUBLIC_BOOKING_TIMEZONE || "Africa/Nairobi";

/** Opening hours: one slot per entry. */
export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

/** Days of the week with no slots (0 = Sunday). */
export const CLOSED_WEEKDAYS: readonly number[] = [0];

/** Length of one consultation, shown in the UI. */
export const SLOT_MINUTES = 60;

/** How far ahead people can book. */
export const BOOKING_WINDOW_DAYS = 90;

/** At or below this many open slots a day is flagged "filling up". */
export const LOW_AVAILABILITY = 2;

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEKDAY_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* ------------------------------------------------------------------ types */

export type BookingKind = "booking" | "block";
export type BookingStatus = "confirmed" | "cancelled";

export type Booking = {
  id: string;
  kind: BookingKind;
  status: BookingStatus;
  date: string;
  time: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  note: string | null;
  createdAt: string;
};

/** What the public availability endpoint returns: taken times per date. */
export type TakenSlots = Record<string, string[]>;

export type SlotStatus = "available" | "booked" | "blocked" | "past" | "closed";

/** "Now" expressed in the business time zone. */
export type ZonedNow = { dateKey: string; minutes: number };

/* ------------------------------------------------------------------ dates */

/** Calendar math on date keys, done in UTC so the host's zone never leaks in. */
function keyToUTC(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function utcToKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function isDateKey(v: unknown): v is string {
  if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  return utcToKey(keyToUTC(v)) === v; // rejects 2026-02-31 etc.
}

export function addDaysKey(key: string, n: number): string {
  const d = keyToUTC(key);
  d.setUTCDate(d.getUTCDate() + n);
  return utcToKey(d);
}

export function weekdayOf(key: string): number {
  return keyToUTC(key).getUTCDay();
}

/** Monday of the week containing `key`. */
export function startOfWeekKey(key: string): string {
  return addDaysKey(key, -((weekdayOf(key) + 6) % 7));
}

export function monthKey(year: number, month: number, day = 1): string {
  return utcToKey(new Date(Date.UTC(year, month, day)));
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

export function diffDays(a: string, b: string): number {
  return Math.round((keyToUTC(b).getTime() - keyToUTC(a).getTime()) / 86_400_000);
}

export function zonedNow(date = new Date(), timeZone = BOOKING_TIMEZONE): ZonedNow {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  return {
    dateKey: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

/** Short zone label, e.g. "GMT+3", for "times shown in …". */
export function timeZoneLabel(timeZone = BOOKING_TIMEZONE): string {
  const part = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName");
  return part?.value ?? timeZone;
}

export function formatLongDate(key: string): string {
  const d = keyToUTC(key);
  return `${WEEKDAY_FULL[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTH_LABELS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function formatShortDate(key: string): string {
  const d = keyToUTC(key);
  return `${WEEKDAY_SHORT[d.getUTCDay()]} ${d.getUTCDate()} ${MONTH_LABELS[d.getUTCMonth()].slice(0, 3)}`;
}

export function dayOfMonth(key: string): number {
  return keyToUTC(key).getUTCDate();
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** "09:00" → "10:00" for a slot of SLOT_MINUTES. */
export function slotEnd(time: string): string {
  const total = toMinutes(time) + SLOT_MINUTES;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/* ----------------------------------------------------------- availability */

export function isTimeSlot(v: unknown): v is (typeof TIME_SLOTS)[number] {
  return typeof v === "string" && (TIME_SLOTS as readonly string[]).includes(v);
}

export function isClosedDay(key: string): boolean {
  return CLOSED_WEEKDAYS.includes(weekdayOf(key));
}

export function isPastSlot(key: string, time: string, now: ZonedNow): boolean {
  if (key < now.dateKey) return true;
  return key === now.dateKey && toMinutes(time) <= now.minutes;
}

export function isBeyondWindow(key: string, now: ZonedNow): boolean {
  return diffDays(now.dateKey, key) > BOOKING_WINDOW_DAYS;
}

/**
 * Status of one slot. `taken` maps time → "booked" | "blocked" for that day
 * (the public view only knows "booked").
 */
export function slotStatus(
  key: string,
  time: string,
  taken: Record<string, "booked" | "blocked">,
  now: ZonedNow,
): SlotStatus {
  if (isClosedDay(key) || isBeyondWindow(key, now)) return "closed";
  if (taken[time]) return taken[time];
  if (isPastSlot(key, time, now)) return "past";
  return "available";
}

/** Reason a new booking for this slot would be refused, or null if it's OK. */
export function slotRejection(key: string, time: string, now: ZonedNow): string | null {
  if (!isDateKey(key) || !isTimeSlot(time)) return "That slot doesn’t exist.";
  if (isClosedDay(key)) return "We’re closed on that day.";
  if (isPastSlot(key, time, now)) return "That time has already passed.";
  if (isBeyondWindow(key, now))
    return `Bookings open up to ${BOOKING_WINDOW_DAYS} days ahead.`;
  return null;
}

export type DayAvailability = {
  status: "available" | "low" | "full" | "past" | "closed";
  open: number;
};

export function dayAvailability(
  key: string,
  takenTimes: string[],
  now: ZonedNow,
): DayAvailability {
  if (isClosedDay(key) || isBeyondWindow(key, now)) return { status: "closed", open: 0 };
  if (key < now.dateKey) return { status: "past", open: 0 };

  const taken = new Set(takenTimes);
  const open = TIME_SLOTS.filter(
    (t) => !taken.has(t) && !isPastSlot(key, t, now),
  ).length;
  if (open === 0) {
    return { status: taken.size > 0 ? "full" : "past", open };
  }
  return { status: open <= LOW_AVAILABILITY ? "low" : "available", open };
}
