import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/site";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

/**
 * A "Talk to Us" button that links to the /bookings page.
 * Accepts the same visual props as <Button>.
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
  return (
    <Button
      href={routes.bookConsultation}
      variant={variant}
      size={size}
      className={className}
      onClick={onClick}
    >
      {withIcon && <CalendarCheck className="h-4 w-4" aria-hidden />}
      {children}
    </Button>
  );
}
