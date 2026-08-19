import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Replaceable image placeholder.
 * ---------------------------------------------------------------------------
 * Clearly marked as a placeholder so it's never mistaken for real content.
 * To use a real image later, swap this component for next/image:
 *   <Image src="/founder.jpg" alt="Faith Kamande" fill className="object-cover" />
 * while keeping the same wrapper aspect ratio.
 * ---------------------------------------------------------------------------
 */
export function ImagePlaceholder({
  label = "Image placeholder",
  hint,
  ratio = "aspect-[4/3]",
  className,
  tone = "pastel",
}: {
  label?: string;
  hint?: string;
  ratio?: string;
  className?: string;
  tone?: "pastel" | "burgundy";
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border grid-backdrop",
        ratio,
        tone === "pastel"
          ? "border-pastel-300/60 bg-pastel-100"
          : "border-burgundy-200 bg-burgundy-50",
        className,
      )}
    >
      <div className="absolute inset-0 grid place-items-center p-6 text-center">
        <div>
          <span
            className={cn(
              "mx-auto grid h-12 w-12 place-items-center rounded-full",
              tone === "pastel"
                ? "bg-pastel-200 text-burgundy"
                : "bg-burgundy-100 text-burgundy",
            )}
          >
            <ImageIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <p className="mt-3 text-sm font-semibold text-burgundy-800">{label}</p>
          {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
        </div>
      </div>
    </div>
  );
}
