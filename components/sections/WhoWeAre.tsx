import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { journeyStages } from "@/lib/content";
import { cn } from "@/lib/utils";

export function WhoWeAre({
  headingAs = "h2",
  pageStart = false,
}: {
  headingAs?: "h1" | "h2";
  /** Adds extra top padding so it can open a page beneath the fixed navbar. */
  pageStart?: boolean;
}) {
  return (
    <section
      id="who-we-are"
      className={cn("section", pageStart && "pt-28 sm:pt-32 lg:pt-36")}
    >
      <Container>
        <SectionHeading
          as={headingAs}
          eyebrow="Who We Are"
          title="We sit between your business and better decisions."
          description="F’E LefLair helps businesses understand their data, improve performance, and make better decisions through business intelligence, consulting, analytics, and practical business systems."
        />

        {/* Journey: Business → Data → Insight → Action */}
        <Reveal className="mt-14">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {journeyStages.map((stage, i) => (
              <li key={stage.label} className="relative flex lg:block">
                <div className="group flex-1 rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover lg:mx-2">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-pastel-100 text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-white">
                      <Icon name={stage.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-ink-muted">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-xl font-semibold text-ink">
                    {stage.label}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-muted">
                    {stageCopy[i]}
                  </p>
                </div>

                {/* connector arrow */}
                {i < journeyStages.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden lg:absolute lg:-right-1 lg:top-1/2 lg:z-10 lg:grid lg:h-7 lg:w-7 lg:-translate-y-1/2 lg:place-items-center lg:rounded-full lg:border lg:border-ink/[0.06] lg:bg-cream lg:text-burgundy"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}

const stageCopy = [
  "Your operations, sales and day-to-day reality.",
  "Captured, organised and made reliable.",
  "Patterns, trends and opportunities revealed.",
  "Clear, practical steps you can take with confidence.",
];
