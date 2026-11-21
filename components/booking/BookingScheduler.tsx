"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  Globe,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import {
  BOOKING_TIMEZONE,
  SLOT_MINUTES,
  addDaysKey,
  daysInMonth,
  formatLongDate,
  isBeyondWindow,
  monthKey,
  slotEnd,
  timeZoneLabel,
  type TakenSlots,
} from "@/lib/booking";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { SlotList } from "./SlotList";
import { sendJson, useJson, useZonedNow } from "./hooks";

type Step = "select" | "details" | "done";
type Form = { name: string; email: string; phone: string; note: string; website: string };
const emptyForm: Form = { name: "", email: "", phone: "", note: "", website: "" };

export function BookingScheduler() {
  const now = useZonedNow();
  const [nowYear, nowMonth] = now.dateKey.split("-").map(Number);

  const [view, setView] = useState({ year: nowYear, month: nowMonth - 1 });
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("select");
  const [form, setForm] = useState<Form>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [tz, setTz] = useState(BOOKING_TIMEZONE);
  const slotsRef = useRef<HTMLElement>(null);

  // On phones the times sit below the calendar: bring them into view.
  useEffect(() => {
    if (date && window.matchMedia("(max-width: 1023px)").matches) {
      slotsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [date]);

  // Resolve the short zone label on the client only (avoids hydration drift).
  useEffect(() => setTz(`${timeZoneLabel()} · ${BOOKING_TIMEZONE.replace("_", " ")}`), []);

  const from = monthKey(view.year, view.month, 1);
  const to = monthKey(view.year, view.month, daysInMonth(view.year, view.month));
  const { data, error, loading, reload } = useJson<{ taken: TakenSlots }>(
    `/api/availability?from=${from}&to=${to}`,
  );
  const taken = data?.taken ?? null;

  const canGoPrev = view.year * 12 + view.month > nowYear * 12 + (nowMonth - 1);
  const canGoNext = !isBeyondWindow(addDaysKey(to, 1), now);

  // While choosing, drop the selected slot if someone else takes it meanwhile.
  // (Not after booking — then it's taken by *this* visitor.)
  const takenForDate = useMemo(() => (date && taken?.[date]) || [], [date, taken]);
  useEffect(() => {
    if (step === "select" && time && takenForDate.includes(time)) setTime(null);
  }, [step, time, takenForDate]);

  const changeMonth = (delta: -1 | 1) => {
    const m = view.month + delta;
    setView({ year: view.year + Math.floor(m / 12), month: ((m % 12) + 12) % 12 });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    if (!form.name.trim() || !form.email.trim()) {
      setNotice("Please add your name and email so we can confirm.");
      return;
    }
    setSubmitting(true);
    setNotice(null);
    const res = await sendJson("/api/bookings", "POST", { date, time, ...form });
    setSubmitting(false);
    if (res.ok) {
      setStep("done");
      reload();
      return;
    }
    if (res.status === 409) {
      // Someone beat them to it: go back to the slot list with fresh data.
      setTime(null);
      setStep("select");
      reload();
    }
    setNotice(res.error);
  };

  const reset = () => {
    setStep("select");
    setDate(null);
    setTime(null);
    setForm(emptyForm);
    setNotice(null);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-ink/[0.07] bg-white shadow-card">
      <div
        className={cn(
          "grid divide-y divide-ink/[0.07] lg:divide-x lg:divide-y-0",
          step === "select" && date
            ? "lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.4fr)_minmax(260px,0.9fr)]"
            : "lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,2.3fr)]",
        )}
      >
        {/* Event details (left rail) */}
        <aside className="p-6 sm:p-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pastel-600">
            <CalendarCheck className="h-4 w-4" aria-hidden />
            {site.name}
          </span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
            Consultation call
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 flex-none text-burgundy" aria-hidden />
              {SLOT_MINUTES} min
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 flex-none text-burgundy" aria-hidden />
              Times shown in {tz}
            </li>
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            A free introductory call to talk through your business, your numbers
            and where you want to grow.
          </p>

          {date && time && step !== "select" && (
            <div className="mt-6 rounded-2xl bg-pastel-100 p-4">
              <p className="text-sm font-semibold text-ink">{formatLongDate(date)}</p>
              <p className="mt-0.5 text-sm text-burgundy">
                {time} – {slotEnd(time)}
              </p>
            </div>
          )}
        </aside>

        {step === "select" && (
          <>
            <section className="p-6 sm:p-8" aria-label="Choose a day">
              <p className="mb-5 font-display text-lg font-semibold text-ink">
                Select a date &amp; time
              </p>
              {notice && <Notice>{notice}</Notice>}
              {error && (
                <Notice>
                  {error}{" "}
                  <button type="button" onClick={reload} className="font-semibold underline">
                    Retry
                  </button>
                </Notice>
              )}
              <AvailabilityCalendar
                year={view.year}
                month={view.month}
                onMonthChange={changeMonth}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
                taken={taken}
                loading={loading}
                now={now}
                selected={date}
                onSelect={(k) => {
                  setDate(k);
                  setTime(null);
                  setNotice(null);
                }}
              />
            </section>

            {date && (
              <section ref={slotsRef} className="scroll-mt-20 p-6 sm:p-8 lg:max-h-[640px] lg:overflow-y-auto" aria-label="Choose a time">
                <SlotList
                  dateKey={date}
                  takenTimes={takenForDate}
                  now={now}
                  selected={time}
                  onSelect={setTime}
                  onConfirm={() => {
                    setNotice(null);
                    setStep("details");
                  }}
                />
              </section>
            )}
          </>
        )}

        {step === "details" && (
          <section className="p-6 sm:p-8" aria-label="Your details">
            <form onSubmit={submit} className="max-w-lg" noValidate>
              <p className="font-display text-lg font-semibold text-ink">Enter details</p>
              <div className="mt-5 space-y-4">
                <Field label="Full name" required value={form.name} autoFocus
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Your name" autoComplete="name" />
                <Field label="Email" type="email" required value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="you@example.com" autoComplete="email" />
                <Field label="Phone (optional)" type="tel" value={form.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="+…" autoComplete="tel" />
                <div>
                  <label htmlFor="booking-note" className="mb-1.5 block text-sm font-semibold text-ink">
                    What would you like to discuss?
                  </label>
                  <textarea
                    id="booking-note"
                    rows={4}
                    maxLength={1000}
                    value={form.note}
                    onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                    placeholder="A short note about your business and what you need…"
                    className={inputClass}
                  />
                </div>
                {/* Honeypot for bots — hidden from people and screen readers. */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={form.website}
                      onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
                  </label>
                </div>
              </div>

              {notice && <div className="mt-4"><Notice>{notice}</Notice></div>}

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNotice(null);
                    setStep("select");
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-ink/[0.12] bg-white px-4 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-burgundy-700 disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Check className="h-4 w-4" aria-hidden />
                  )}
                  {submitting ? "Booking…" : "Schedule event"}
                </button>
              </div>
            </form>
          </section>
        )}

        {step === "done" && date && time && (
          <section className="grid place-items-center p-8 text-center sm:p-12" aria-live="polite">
            <div>
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pastel-100 text-burgundy">
                <CheckCircle2 className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
                You’re booked, {form.name.trim().split(" ")[0]}!
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-ink-soft">
                Your consultation is set for{" "}
                <span className="font-semibold text-ink">{formatLongDate(date)}</span> at{" "}
                <span className="font-semibold text-ink">{time}</span>. We’ll be in touch at{" "}
                <span className="font-semibold text-ink">{form.email.trim()}</span>.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border border-burgundy/25 px-5 py-3 text-sm font-semibold text-burgundy transition-colors hover:border-burgundy hover:bg-burgundy-50"
                >
                  Book another time
                </button>
                <Link
                  href="/"
                  className="rounded-xl bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-700"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/[0.12] bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20";

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="mb-4 flex items-start gap-2 rounded-xl bg-blush-100 px-4 py-3 text-sm font-medium text-burgundy-800">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  autoFocus = false,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
}) {
  const id = `booking-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-burgundy"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}
