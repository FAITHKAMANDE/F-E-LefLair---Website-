import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * Logo PLACEHOLDER.
 * ---------------------------------------------------------------------------
 * Swap the inner mark + wordmark for the real logo when it's provided.
 * To use an image instead, replace the <span className="logo-mark"> block with:
 *   <Image src="/logo.svg" alt={site.name} width={40} height={40} priority />
 * Keep the outer <Link> and the `variant` handling so placement stays consistent.
 * ---------------------------------------------------------------------------
 */
export function Logo({
  variant = "dark",
  className,
  withWordmark = true,
  withTagline = false,
}: {
  variant?: "dark" | "light";
  className?: string;
  withWordmark?: boolean;
  /** Show the "Business Intelligence & Advisory" line under the wordmark. */
  withTagline?: boolean;
}) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg",
        className,
      )}
    >
      {/* Mark: "F’E" monogram in a rounded burgundy tile */}
      <span
        aria-hidden
        className={cn(
          "grid h-10 min-w-[2.75rem] place-items-center rounded-xl px-2 font-display text-lg font-bold leading-none tracking-tight transition-transform duration-300 group-hover:scale-[1.04]",
          isLight ? "bg-white text-burgundy" : "bg-burgundy text-white",
        )}
      >
        F’E
      </span>

      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-xl font-bold tracking-tight",
              isLight ? "text-white" : "text-ink",
            )}
          >
            LefLair
          </span>
          {withTagline && (
            <span
              className={cn(
                "mt-1 text-[10px] font-semibold uppercase tracking-[0.16em]",
                isLight ? "text-pastel-200" : "text-burgundy/70",
              )}
            >
              {site.motto}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
