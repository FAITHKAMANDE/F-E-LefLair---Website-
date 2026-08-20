"use client";

import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBooking } from "./BookingProvider";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

/**
 * A "Book a Consultation" button that opens the shared booking modal instead
 * of navigating. Accepts the same visual props as <Button>.
 */
export function BookConsultationButton({
  children = "Talk to Us",
  variant = "primary",
  size = "md",
  className,
  withIcon = true,
  onClick,
}: {
  children?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withIcon?: boolean;
  onClick?: () => void;
}) {
  const { open } = useBooking();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        onClick?.();
        open();
      }}
    >
      {withIcon && <CalendarCheck className="h-4 w-4" aria-hidden />}
      {children}
    </Button>
  );
}
