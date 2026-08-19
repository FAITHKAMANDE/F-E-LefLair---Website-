import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Condensed 7-step "How We Work" used on the HOME page.
 * The full branching process lives on the /how-we-work page (component
 * `HowWeWork`) and is intentionally left as-is.
 */
const steps = [
  {
    title: "Meet the Business",
    description:
      "We start with a conversation about your business, your goals and the decisions you’re facing.",
  },
  {
    title: "Understand the Data",
    description:
      "We review what you already record, where it lives and how reliable it is.",
  },
  {
    title: "Clean & Organise",
    description:
      "We tidy, structure and validate the data so the numbers can be trusted.",
  },
  {
    title: "Analyse & Interpret",
    description:
      "We look for patterns, gaps and opportunities, then translate them into plain language.",
  },
  {
    title: "Build the Tools",
    description:
      "We create the dashboards, templates and systems that keep insight in front of you.",
  },
  {
    title: "Share Insights & Recommendations",
    description:
      "We walk you through what the data says and the specific steps we recommend.",
  },
  {
    title: "Monitor Results & Refine the Strategy",
    description:
      "We track what happens after the decision and adjust the approach as your business changes.",
  },
];

export function HowWeWorkSummary() {
  return (
    <section id="how-we-work" className="section bg-cream-100">
      <Container>
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-pastel-600">
            How We Work
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] text-ink sm:text-4xl lg:text-[2.75rem]">
            A seven-step path from raw records to confident decisions.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg text-pretty">
            Every engagement follows the same clear route, so you always know
            where we are and what comes next.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={(i % 4) * 70} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-pastel-300 hover:shadow-card-hover">
                <p className="font-display text-base font-semibold text-pastel-600">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}

          {/* "See the full flow" CTA card fills the 8th cell */}
          <Reveal delay={210} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl bg-pastel-200 p-7">
              <p className="font-display text-2xl font-semibold leading-tight text-burgundy-900">
                See the full flow
              </p>
              <p className="mt-2 text-sm text-burgundy-800/80">
                Including how we handle businesses with and without existing
                data.
              </p>
              <Button href="/how-we-work" size="md" className="mt-5 w-fit">
                How We Work
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
