import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const focusAreas = [
  "Business Intelligence",
  "Advisory",
  "Analytics",
  "Practical Systems",
];

const paragraphs = [
  "I believe every successful business decision starts with understanding what’s really happening inside the business, and the answers are often hidden in the numbers.",
  "I’m Faith Kamande, a Business Intelligence and Advisory Consultant passionate about helping entrepreneurs and organizations make sense of their numbers so they can make smarter decisions, improve performance, and grow with confidence.",
  "My work goes beyond creating dashboards and reports. I help businesses uncover opportunities, identify hidden challenges, improve profitability, strengthen operations, and transform raw business data into practical insights that support better decision-making.",
  "I also believe that data should never be overwhelming. That’s why I’m committed to simplifying business intelligence through practical tools, educational content, and easy-to-understand strategies that empower business owners, regardless of their background.",
  "This vision extends beyond analytics. My long-term goal is to build a multidisciplinary advisory firm that helps organizations not only understand their numbers but also strengthen their strategy, corporate communications, public relations, and overall business performance.",
];

export function Founder({
  headingAs = "h2",
}: {
  headingAs?: "h1" | "h2";
}) {
  const Heading = headingAs;
  return (
    <section id="founder" className="section">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Portrait placeholder */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-none">
              <ImagePlaceholder
                label="Faith Kamande"
                hint="Professional photo to be added"
                ratio="aspect-[4/5]"
                tone="burgundy"
              />
              <div className="surface mt-4 rounded-2xl p-5">
                <p className="font-display text-lg font-semibold text-ink">
                  Faith Kamande
                </p>
                <p className="mt-0.5 text-sm text-burgundy">
                  Founder · Business Intelligence &amp; Advisory Consultant
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {focusAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-pastel-100 px-2.5 py-1 text-xs font-medium text-burgundy-800"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div>
            <Reveal>
              <span className="eyebrow">
                About the Founder
              </span>
              <Heading className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
                About Faith
              </Heading>
            </Reveal>

            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 40}>
                  <p className="text-base leading-relaxed text-ink-soft text-pretty">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <blockquote className="mt-8 rounded-2xl border-l-4 border-burgundy bg-pastel-100 p-6 sm:p-7">
                <p className="font-display text-xl font-medium leading-snug text-burgundy-800 sm:text-2xl text-balance">
                  When businesses understand their numbers, they make better
                  decisions. When they make better decisions, they build better
                  businesses.
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="h-px w-8 bg-burgundy/40" aria-hidden />
                  <span className="font-display text-lg font-semibold text-burgundy">
                    Faith Kamande
                  </span>
                  <span className="text-sm text-ink-muted">Founder, F’E LefLair</span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
