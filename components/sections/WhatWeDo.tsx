import { TrendingUp, TrendingDown, Gauge, Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "What We Do" — frames the offering as the plain-language questions every
 * business owner actually asks. Sits between the hero and the Services grid.
 */
const questions = [
  {
    icon: TrendingUp,
    question: "What’s working?",
    answer:
      "Identify the products, services, customers and channels driving your results and understand what’s worth doing more of.",
  },
  {
    icon: TrendingDown,
    question: "What’s not working?",
    answer:
      "Surface the quiet leaks: slow-moving stock, rising costs, weak margins and underperforming areas before they hurt your business.",
  },
  {
    icon: Gauge,
    question: "How is the business doing?",
    answer:
      "Get a clear picture of your performance across sales, profit, cash flow, customers and operations, not just isolated numbers.",
  },
  {
    icon: Compass,
    question: "What should you do next?",
    answer:
      "Go beyond charts and reports to turn insights into practical, prioritised actions, so you know where to focus and what to do next.",
  },
];

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="section bg-cream-100">
      <Container>
        <SectionHeading
          eyebrow="What We Help You Answer"
          title="We answer the questions that actually run your business."
          description="Your numbers are always talking. We help you hear them clearly, turning everyday business data into straightforward answers you can act on."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {questions.map((item, i) => {
            const CardIcon = item.icon;
            return (
              <Reveal key={item.question} delay={(i % 4) * 70} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-pastel-300 hover:shadow-card-hover sm:p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-pastel-100 text-burgundy transition-colors duration-300 group-hover:bg-burgundy group-hover:text-white">
                    <CardIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.answer}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* One-line summary of the promise */}
        <Reveal className="mt-10">
          <p className="mx-auto max-w-2xl text-center font-display text-lg font-medium text-burgundy-800 sm:text-xl text-balance">
            In short: we help you understand what happened, why it happened, and
            what to do next.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
