import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { whyChooseUs } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * Each statement is two sentences ("We don't just X. We Y."). We split on the
 * sentence break to emphasise the second, stronger half.
 */
export function WhyChooseUs() {
  return (
    <section id="why-us" className="section">
      <Container>
        <SectionHeading
          eyebrow="Why Choose Us"
          title={<>Why choose {site.name}?</>}
          description="The difference is in what happens after the numbers: interpretation, direction and systems that keep working as you grow."
        />

        <ul className="mt-14 space-y-4 sm:space-y-5">
          {whyChooseUs.map((statement, i) => {
            const sentences = statement.split(/(?<=\.)\s+/);
            const before = sentences[0];
            const after = sentences.slice(1).join(" ");
            return (
              <li key={i}>
                <Reveal delay={i * 60}>
                  <div className="group flex items-start gap-5 rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card transition-all duration-300 hover:border-pastel-300 hover:shadow-card-hover sm:items-center sm:p-8">
                    <span
                      aria-hidden
                      className="font-display text-3xl font-semibold text-pastel-300 transition-colors duration-300 group-hover:text-burgundy sm:text-4xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-xl font-medium leading-snug text-ink-soft sm:text-2xl lg:text-[1.75rem]">
                      {before}
                      {after && (
                        <>
                          {" "}
                          <span className="text-burgundy">{after}</span>
                        </>
                      )}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
