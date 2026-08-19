/**
 * Consultation booking — availability config.
 * ---------------------------------------------------------------------------
 * The availability below is PLACEHOLDER, generated deterministically so the UI
 * can show booked (greyed-out) days and times WITHOUT a backend.
 *
 * TODO(backend): replace `bookedTimesFor` / `isDayFull` with real availability
 * fetched from an API, and POST the booking in BookingModal's submit handler
 * (see the `handleConfirm` TODO there).
 * ---------------------------------------------------------------------------
 */

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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

export function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

/** PLACEHOLDER: which time slots are already taken on a given day. */
export function bookedTimesFor(date: Date): string[] {
  const day = date.getDate();
  // Demo: some days are fully booked…
  if (day % 7 === 0) return [...TIME_SLOTS];
  // …others just have a few slots taken.
  return TIME_SLOTS.filter((_, i) => (day + i) % 3 === 0);
}

export function isDayFull(date: Date): boolean {
  return bookedTimesFor(date).length >= TIME_SLOTS.length;
}

/** A day is bookable if it isn't in the past, a Sunday, or fully booked. */
export function isDaySelectable(date: Date, today: Date): boolean {
  const d = startOfDay(date);
  if (d < startOfDay(today)) return false;
  if (d.getDay() === 0) return false; // closed on Sundays
  if (isDayFull(d)) return false;
  return true;
}

export function formatLongDate(d: Date): string {
  return `${WEEKDAY_FULL[d.getDay()]}, ${d.getDate()} ${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`;
}
