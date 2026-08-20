import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BookConsultationButton } from "@/components/booking/BookConsultationButton";
import { HeroVisual } from "./HeroVisual";
import { routes } from "@/lib/site";

const highlights = [
  "Clear dashboards that answer the questions you actually ask.",
  "Practical systems that keep your records clean and current.",
  "Plain-language guidance on what to do next.",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-100 via-blush-50 to-cream pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* soft blush backdrop accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blush-200/50 blur-3xl" />
        <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-pastel-100/60 blur-3xl" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-pastel-600">
              Business Intelligence
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-burgundy-900 sm:text-5xl lg:text-[3.5rem]">
              Helping businesses understand what their data is saying and what to
              do next.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Every business has a story, and its numbers tell it. We partner
              with businesses to make sense of their data, understand what is
              driving their performance, uncover opportunities, and turn insights
              into clear, practical actions. Whether you already have systems in
              place or need better ways to track your business, we help you turn
              information into decisions that support better performance and
              long-term growth.
            </p>
          </Reveal>

          {/* Highlight bullets */}
          <Reveal delay={160}>
            <ul className="mt-7 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-pastel-200 text-pastel-600">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-base text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220}>
            {/* Hover-swap: Explore Solutions hover moves the burgundy fill off Talk to Us */}
            <div className="group mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BookConsultationButton
                size="lg"
                className="group-has-[.hero-explore:hover]:bg-white group-has-[.hero-explore:hover]:text-burgundy group-has-[.hero-explore:hover]:shadow-none group-has-[.hero-explore:hover]:ring-1 group-has-[.hero-explore:hover]:ring-inset group-has-[.hero-explore:hover]:ring-burgundy/30"
              />
              <Button
                href={routes.exploreSolutions}
                variant="outline"
                size="lg"
                className="hero-explore bg-white hover:!border-burgundy hover:!bg-burgundy hover:!text-white"
              >
                Explore Solutions
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={160} className="lg:pl-6">
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
