"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  CalendarCheck,
  Clock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TIME_SLOTS,
  WEEKDAY_LABELS,
  MONTH_LABELS,
  startOfDay,
  bookedTimesFor,
  isDaySelectable,
  isDayFull,
  formatLongDate,
} from "@/lib/booking";

type Step = "select" | "details" | "done";

type Form = { name: string; email: string; phone: string; note: string };

const emptyForm: Form = { name: "", email: "", phone: "", note: "" };

export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [step, setStep] = useState<Step>("select");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset to a clean state each time the modal opens.
  useEffect(() => {
    if (open) {
      setStep("select");
      setSelectedDate(null);
      setSelectedTime(null);
      setForm(emptyForm);
      setError(null);
      setViewMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [open, today]);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const canGoPrev =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  const bookedForSelected = selectedDate ? bookedTimesFor(selectedDate) : [];

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please add your name and email so we can confirm.");
      return;
    }
    setError(null);

    // TODO(backend): POST this payload to a real booking endpoint, then only
    // advance to "done" on success. This currently just records the request
    // in the UI — nothing is persisted or sent yet.
    const payload = {
      date: selectedDate ? formatLongDate(selectedDate) : null,
      time: selectedTime,
      ...form,
    };
    if (typeof console !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("[booking] request captured (front-end only):", payload);
    }

    setStep("done");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      aria-hidden={false}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close booking dialog"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream shadow-lift outline-none sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink/[0.07] bg-white px-6 py-5">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pastel-600">
              <CalendarCheck className="h-4 w-4" aria-hidden />
              Talk to Us
            </span>
            <h2
              id="booking-title"
              className="mt-1 font-display text-xl font-semibold text-ink"
            >
              {step === "select" && "Pick a day and time"}
              {step === "details" && "Your details"}
              {step === "done" && "You’re booked!"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 flex-none place-items-center rounded-lg text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === "select" && (
            <div>
              {/* Calendar */}
              <div className="flex items-center justify-between">
                <p className="font-display text-base font-semibold text-ink">
                  {MONTH_LABELS[month]} {year}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      canGoPrev && setViewMonth(new Date(year, month - 1, 1))
                    }
                    disabled={!canGoPrev}
                    aria-label="Previous month"
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-burgundy-50 hover:text-burgundy disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMonth(new Date(year, month + 1, 1))}
                    aria-label="Next month"
                    className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-burgundy-50 hover:text-burgundy"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-1 text-center">
                {WEEKDAY_LABELS.map((d) => (
                  <div
                    key={d}
                    className="py-1 text-xs font-semibold uppercase tracking-wide text-ink-muted"
                  >
                    {d}
                  </div>
                ))}

                {Array.from({ length: firstWeekday }).map((_, i) => (
                  <div key={`pad-${i}`} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const date = new Date(year, month, dayNum);
                  const selectable = isDaySelectable(date, today);
                  const past = startOfDay(date) < today;
                  const full = !past && isDayFull(date);
                  const isSelected =
                    selectedDate &&
                    selectedDate.getTime() === date.getTime();

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => selectable && handleSelectDate(date)}
                      disabled={!selectable}
                      aria-label={
                        full
                          ? `${dayNum}, fully booked`
                          : formatLongDate(date)
                      }
                      aria-pressed={!!isSelected}
                      className={cn(
                        "relative mx-auto grid h-10 w-10 place-items-center rounded-lg text-sm font-medium transition-colors",
                        // Selected day
                        isSelected &&
                          "bg-burgundy text-white hover:bg-burgundy",
                        // Available — bluish
                        !isSelected &&
                          selectable &&
                          "bg-pastel-100 text-ink hover:bg-pastel-200",
                        // Booked / past / closed — greyish (no crossing)
                        !selectable &&
                          "cursor-not-allowed bg-ink/[0.06] text-ink-muted/50",
                      )}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-3 flex items-center gap-4 text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-pastel-100" />
                  Available
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-ink/[0.06]" />
                  Booked / closed
                </span>
              </div>

              {/* Time slots */}
              <div className="mt-6">
                <p className="flex items-center gap-2 font-display text-base font-semibold text-ink">
                  <Clock className="h-4 w-4 text-burgundy" aria-hidden />
                  {selectedDate
                    ? `Times for ${selectedDate.getDate()} ${MONTH_LABELS[selectedDate.getMonth()]}`
                    : "Select a day to see times"}
                </p>

                {selectedDate && (
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {TIME_SLOTS.map((slot) => {
                      const booked = bookedForSelected.includes(slot);
                      const isSel = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={booked}
                          onClick={() => setSelectedTime(slot)}
                          aria-pressed={isSel}
                          className={cn(
                            "rounded-lg border px-2 py-2 text-sm font-medium transition-colors",
                            isSel &&
                              "border-burgundy bg-burgundy text-white",
                            !isSel &&
                              !booked &&
                              "border-transparent bg-pastel-100 text-ink hover:bg-pastel-200",
                            booked &&
                              "cursor-not-allowed border-transparent bg-ink/[0.06] text-ink-muted/50",
                          )}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep("details")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-base font-semibold text-white transition-all hover:bg-burgundy-700 disabled:opacity-40"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === "details" && (
            <form onSubmit={handleConfirm}>
              {/* Chosen slot summary */}
              <div className="flex items-center gap-3 rounded-xl bg-pastel-100 p-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-white text-burgundy">
                  <CalendarCheck className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {selectedDate && formatLongDate(selectedDate)}
                  </p>
                  <p className="text-sm text-burgundy">{selectedTime}</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <Field
                  label="Full name"
                  required
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="Your name"
                  autoFocus
                />
                <Field
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="you@example.com"
                />
                <Field
                  label="Phone (optional)"
                  value={form.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  placeholder="+…"
                />
                <div>
                  <label
                    htmlFor="booking-note"
                    className="mb-1.5 block text-sm font-semibold text-ink"
                  >
                    What would you like to discuss?
                  </label>
                  <textarea
                    id="booking-note"
                    rows={3}
                    value={form.note}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, note: e.target.value }))
                    }
                    placeholder="A short note about your business and what you need…"
                    className="w-full rounded-xl border border-ink/[0.12] bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm font-medium text-burgundy">{error}</p>
              )}

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep("select")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-ink/[0.12] bg-white px-4 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-base font-semibold text-white transition-all hover:bg-burgundy-700"
                >
                  <Check className="h-4 w-4" />
                  Book consultation
                </button>
              </div>
            </form>
          )}

          {step === "done" && (
            <div className="py-4 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pastel-100 text-burgundy">
                <CheckCircle2 className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                Thanks, {form.name.split(" ")[0] || "there"}!
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-ink-soft">
                Your consultation has been scheduled for{" "}
                <span className="font-semibold text-ink">
                  {selectedDate && formatLongDate(selectedDate)}
                </span>{" "}
                at <span className="font-semibold text-ink">{selectedTime}</span>.
                See you soon!
              </p>
              <div className="mt-7">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-xl bg-burgundy px-6 py-3 text-base font-semibold text-white transition-all hover:bg-burgundy-700"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  const id = `booking-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-ink"
      >
        {label}
        {required && <span className="text-burgundy"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/[0.12] bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
      />
    </div>
  );
}
