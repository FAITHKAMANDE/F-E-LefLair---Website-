import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Compact hero for interior pages. Renders the page's single H1.
 * `tone="blush"` gives the warm home-page hero treatment; `align="center"`
 * centres the content; `chips` renders a row of small pills under the copy.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  tone = "cream",
  align = "left",
  chips,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "cream" | "blush";
  align?: "left" | "center";
  chips?: string[];
}) {
  const isBlush = tone === "blush";
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16",
        isBlush && "bg-gradient-to-b from-blush-100 via-blush-50 to-cream",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {!isBlush && (
          <div className="grid-backdrop absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        )}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-pastel-200/40 blur-3xl" />
        {isBlush && (
          <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-blush-200/50 blur-3xl" />
        )}
      </div>

      <Container>
        <Reveal
          className={cn(
            "max-w-3xl",
            isCenter && "mx-auto text-center",
          )}
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
              isCenter && "justify-center",
              isBlush ? "text-pastel-600" : "text-burgundy",
            )}
          >
            {eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty",
                isCenter && "mx-auto",
              )}
            >
              {description}
            </p>
          )}
          {chips && chips.length > 0 && (
            <ul
              className={cn(
                "mt-7 flex flex-wrap gap-2.5",
                isCenter && "justify-center",
              )}
            >
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-burgundy/15 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-burgundy-800 backdrop-blur-sm"
                >
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
