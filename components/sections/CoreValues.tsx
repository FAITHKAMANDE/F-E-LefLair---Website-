import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { coreValues } from "@/lib/content";

export function CoreValues() {
  return (
    <section id="values" className="section">
      <Container>
        <SectionHeading
          eyebrow="Core Values"
          title="What guides every engagement."
          description="Five principles shape how we work with the numbers, and with the people behind them."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, i) => (
            <li key={value.title}>
              <Reveal delay={i * 60} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-pastel-300 hover:shadow-card-hover">
                  {/* hover accent */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-burgundy transition-transform duration-300 ease-smooth group-hover:scale-x-100"
                  />
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-pastel-100 text-burgundy transition-colors duration-300 group-hover:bg-burgundy group-hover:text-white">
                    <Icon name={value.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {value.description}
                  </p>
                  {/* faint index number */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-3 right-3 font-display text-6xl font-semibold text-pastel-100 transition-colors duration-300 group-hover:text-pastel-200"
                  >
                    {i + 1}
                  </span>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
