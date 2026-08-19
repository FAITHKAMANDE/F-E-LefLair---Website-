import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Reusable section header: optional eyebrow, a heading and supporting text.
 * `align` controls layout; `as` sets the heading level for correct hierarchy.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
  headingClassName,
  invert = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  headingClassName?: string;
  invert?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow mb-4",
            align === "center" && "justify-center",
            invert && "text-pastel-200",
          )}
        >
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          "text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem]",
          invert ? "text-white" : "text-ink",
          headingClassName,
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg text-pretty",
            invert ? "text-pastel-100/90" : "text-ink-soft",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
