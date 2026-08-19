import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { beliefs } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Editorial card layout for our beliefs — not a wall of text. */
export function Beliefs() {
  const regular = beliefs.filter((b) => !b.emphasis);
  const highlight = beliefs.find((b) => b.emphasis);

  return (
    <section id="belief" className="section bg-cream-100">
      <Container>
        <SectionHeading
          eyebrow="Our Belief"
          title="Why we do this work."
          description="A few convictions sit underneath everything we build and every conversation we have."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {regular.map((belief, i) => (
            <Reveal key={i} delay={(i % 3) * 70} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                <Quote className="h-6 w-6 text-pastel-300" aria-hidden />
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {belief.text}
                </p>
              </article>
            </Reveal>
          ))}

          {highlight && (
            <Reveal className="h-full lg:col-span-3">
              <article
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-burgundy p-8 text-center sm:p-10",
                )}
              >
                <div className="grid-backdrop absolute inset-0 opacity-[0.12]" />
                <p className="relative mx-auto max-w-3xl font-display text-2xl font-medium leading-snug text-white sm:text-[1.75rem] text-balance">
                  {highlight.text}
                </p>
              </article>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
