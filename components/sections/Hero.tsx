import { ArrowRight, LayoutTemplate, Check } from "lucide-react";
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
              Data &amp; Business Intelligence
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.06] text-burgundy-900 sm:text-5xl lg:text-[3.5rem]">
              Helping businesses understand their numbers and make smarter
              decisions.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty">
              Every business has a story, and the numbers tell it. We help you
              make sense of your data, so you can spot opportunities, measure
              performance and decide with facts instead of guesswork.
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
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BookConsultationButton size="lg" />
              <Button
                href={routes.exploreSolutions}
                variant="outline"
                size="lg"
                className="bg-white"
              >
                Explore Solutions
              </Button>
              <Button href={routes.viewTemplates} variant="secondary" size="lg">
                <LayoutTemplate className="h-4 w-4" aria-hidden />
                View Templates
                <ArrowRight className="h-4 w-4" aria-hidden />
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
