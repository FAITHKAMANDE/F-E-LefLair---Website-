"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Download,
  Mail,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TemplateTier } from "@/lib/content";

type Step = "delivery" | "payment" | "done";
type Delivery = "download" | "email";

export type RequestTarget = { templateName: string; tier: TemplateTier } | null;

export function TemplateRequestModal({
  target,
  onClose,
}: {
  target: RequestTarget;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("delivery");
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const open = target !== null;

  // Reset each time it opens.
  useEffect(() => {
    if (open) {
      setStep("delivery");
      setDelivery(null);
      setEmail("");
      setPhone("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !target) return null;

  const { templateName, tier } = target;

  const chooseDelivery = (d: Delivery) => {
    setDelivery(d);
    setStep("payment");
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (delivery === "email" && !email.trim()) {
      setError("Please add the email to send the template to.");
      return;
    }
    if (!phone.trim()) {
      setError("Please add the M-Pesa phone number to pay from.");
      return;
    }
    setError(null);

    // TODO(backend): trigger a real payment (e.g. M-Pesa Daraja STK push or
    // Stripe), and only on success deliver the file (download link / email).
    // Nothing is charged or sent yet — this just advances the UI.
    if (typeof console !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("[template request] (front-end only):", {
        templateName,
        tier: tier.name,
        price: tier.price,
        delivery,
        email,
        phone,
      });
    }

    setStep("done");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-title"
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-cream shadow-lift outline-none sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-ink/[0.07] bg-white px-6 py-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-pastel-600">
              {templateName}
            </span>
            <h2
              id="request-title"
              className="mt-1 font-display text-xl font-semibold text-ink"
            >
              {step === "delivery" && "How would you like it?"}
              {step === "payment" && "Complete your payment"}
              {step === "done" && "Payment received"}
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

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Item summary (always visible) */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-pastel-100 p-4">
            <div>
              <p className="text-sm font-semibold text-ink">{tier.name}</p>
              <p className="text-sm text-ink-muted">{tier.note}</p>
            </div>
            <span className="font-display text-lg font-bold text-burgundy">
              {tier.price}
            </span>
          </div>

          {step === "delivery" && (
            <div className="mt-6 grid gap-3">
              <p className="text-sm text-ink-soft">
                Choose how you&apos;d like to receive the template. You&apos;ll
                complete payment on the next step.
              </p>
              <button
                type="button"
                onClick={() => chooseDelivery("download")}
                className="group flex items-center gap-4 rounded-2xl border border-ink/[0.1] bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-burgundy hover:shadow-card"
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-pastel-100 text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-white">
                  <Download className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">Download</span>
                  <span className="block text-sm text-ink-muted">
                    Get the file straight away after payment.
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => chooseDelivery("email")}
                className="group flex items-center gap-4 rounded-2xl border border-ink/[0.1] bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-burgundy hover:shadow-card"
              >
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-pastel-100 text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">
                    Send to email
                  </span>
                  <span className="block text-sm text-ink-muted">
                    We&apos;ll email it to you after payment.
                  </span>
                </span>
              </button>
            </div>
          )}

          {step === "payment" && (
            <form onSubmit={handlePay} className="mt-6">
              <div className="space-y-4">
                {delivery === "email" && (
                  <Field
                    id="request-email"
                    label="Email to send to"
                    type="email"
                    required
                    value={email}
                    onChange={setEmail}
                    placeholder="you@example.com"
                    autoFocus
                  />
                )}

                {/* Payment method */}
                <div>
                  <label
                    htmlFor="request-phone"
                    className="mb-1.5 block text-sm font-semibold text-ink"
                  >
                    Pay with M-Pesa <span className="text-burgundy">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-ink/[0.12] bg-white px-3.5 focus-within:border-burgundy focus-within:ring-2 focus-within:ring-burgundy/20">
                    <Smartphone
                      className="h-4 w-4 flex-none text-ink-muted"
                      aria-hidden
                    />
                    <input
                      id="request-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="07XX XXX XXX"
                      className="w-full bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="mt-3 text-sm font-medium text-burgundy">{error}</p>
              )}

              <p className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                <ShieldCheck className="h-4 w-4 text-pastel-600" aria-hidden />
                Secure payment. You&apos;ll get a prompt on your phone to
                approve.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep("delivery")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-ink/[0.12] bg-white px-4 py-3 text-sm font-semibold text-ink-soft transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-burgundy px-5 py-3 text-base font-semibold text-white transition-all hover:bg-burgundy-700"
                >
                  Pay {tier.price}
                </button>
              </div>
            </form>
          )}

          {step === "done" && (
            <div className="py-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pastel-100 text-burgundy">
                <CheckCircle2 className="h-7 w-7" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                You&apos;re all set!
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-ink-soft">
                {delivery === "email" ? (
                  <>
                    Once your payment is confirmed, we&apos;ll send{" "}
                    <span className="font-semibold text-ink">{templateName}</span>{" "}
                    to <span className="font-semibold text-ink">{email}</span>.
                  </>
                ) : (
                  <>
                    Once your payment is confirmed, your download of{" "}
                    <span className="font-semibold text-ink">{templateName}</span>{" "}
                    will be ready.
                  </>
                )}
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
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  autoFocus = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
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
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/[0.12] bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
      />
    </div>
  );
}
