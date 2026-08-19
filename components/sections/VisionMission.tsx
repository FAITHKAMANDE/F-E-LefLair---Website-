import { Compass, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function VisionMission() {
  return (
    <section id="vision-mission" className="section bg-cream-100">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Vision */}
          <Reveal>
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-burgundy p-8 text-white sm:p-10">
              <div className="grid-backdrop absolute inset-0 opacity-[0.15]" />
              <div className="relative">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-pastel-200">
                  <Compass className="h-4 w-4" />
                  Our Vision
                </span>
                <p className="mt-6 font-display text-2xl font-medium leading-snug sm:text-3xl text-balance">
                  To empower every small and medium-sized business in{" "}
                  <span className="relative whitespace-nowrap text-pastel-200">
                    Africa
                    <svg
                      aria-hidden
                      viewBox="0 0 200 12"
                      preserveAspectRatio="none"
                      className="absolute -bottom-1 left-0 h-2.5 w-full"
                    >
                      <path
                        d="M2 8 Q 50 2, 100 7 T 198 5"
                        fill="none"
                        stroke="#C1DBE8"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{" "}
                  to make confident, data-driven decisions through simple,
                  practical, and accessible business intelligence.
                </p>
              </div>
            </article>
          </Reveal>

          {/* Mission */}
          <Reveal delay={100}>
            <article className="flex h-full flex-col rounded-3xl border border-pastel-300/60 bg-pastel-100 p-8 sm:p-10">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
                <Target className="h-4 w-4" />
                Our Mission
              </span>
              <p className="mt-6 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl text-balance">
                To transform everyday business data into{" "}
                <span className="text-burgundy">clear insights</span> that help
                entrepreneurs improve profitability, reduce losses, and make
                smarter business decisions.
              </p>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
