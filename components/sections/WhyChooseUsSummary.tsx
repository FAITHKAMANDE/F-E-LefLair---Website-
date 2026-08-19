import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Home-page "Why Choose Us" — a two-column header + checklist layout.
 * The animated large-statement version (component `WhyChooseUs`) is kept
 * as-is on the Services and How We Work pages.
 */
const reasons = [
  {
    title: "We explain, never lecture",
    description:
      "You get findings in everyday language, so you can act without needing a translator.",
  },
  {
    title: "We start where you are",
    description:
      "Notebook or full ERP, we work with what you have today and improve it from there.",
  },
  {
    title: "We build for daily use",
    description:
      "Every tool we hand over is simple enough for your team to run without us.",
  },
  {
    title: "We focus on decisions",
    description:
      "Analysis ends with a recommendation, not a 40-page report nobody opens.",
  },
  {
    title: "We stay for the results",
    description:
      "We monitor what changed after the decision and refine the strategy with you.",
  },
];

export function WhyChooseUsSummary() {
  return (
    <section id="why-us" className="section bg-blush-50">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — header */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-pastel-600">
              Why Choose Us
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.12] text-ink sm:text-4xl lg:text-[2.75rem]">
              Clear answers, practical tools, and someone in your corner.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg text-pretty">
              We measure our work by the decisions you make afterwards, not by
              the size of the report.
            </p>
          </Reveal>

          {/* Right — checklist */}
          <ul className="space-y-8">
            {reasons.map((reason, i) => (
              <li key={reason.title}>
                <Reveal delay={i * 70}>
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-full bg-burgundy text-white shadow-sm">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">
                        {reason.title}
                      </h3>
                      <p className="mt-1.5 text-base leading-relaxed text-ink-muted">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
