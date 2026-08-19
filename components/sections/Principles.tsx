import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Vision / Mission / Our Promise — three clean cards on the About page.
 */
const principles = [
  {
    label: "Vision",
    text: "A world where every business owner can read their numbers with confidence and grow on purpose, not by chance.",
  },
  {
    label: "Mission",
    text: "To turn business data into clear insight and practical action through honest analysis, simple systems and plain-language communication.",
  },
  {
    label: "Our Promise",
    text: "You will always leave our conversations knowing what your numbers mean and what to do next.",
  },
];

export function Principles() {
  return (
    <section id="principles" className="section pt-4 sm:pt-6 lg:pt-8">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pastel-600">
                  {item.label}
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-soft text-pretty">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
