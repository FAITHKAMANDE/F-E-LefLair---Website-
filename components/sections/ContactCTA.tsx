import { ArrowRight, LayoutTemplate } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BookConsultationButton } from "@/components/booking/BookConsultationButton";
import { routes } from "@/lib/site";

/**
 * Final call-to-action band.
 * Content is configurable so the HOME page can show a tailored message and the
 * "View Templates" button, while other pages keep the default copy.
 */
export function ContactCTA({
  title,
  description,
  showViewTemplates = false,
  showExploreSolutions = true,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  showViewTemplates?: boolean;
  showExploreSolutions?: boolean;
}) {
  const heading = title ?? (
    <>
      Your numbers are already telling a story.{" "}
      <span className="text-burgundy">Let&apos;s understand it.</span>
    </>
  );

  const body =
    description ??
    "Whether you need help setting up your business data, understanding your performance, building a dashboard, or improving your systems, let’s start with a conversation.";

  return (
    <section className="section">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-pastel-300/60 bg-pastel-100 px-6 py-16 sm:px-12 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="grid-backdrop absolute inset-0 opacity-50" />
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/50 blur-2xl" />
            </div>

            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
                {heading}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg text-pretty">
                {body}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <BookConsultationButton size="lg" />
                {showExploreSolutions && (
                  <Button
                    href={routes.exploreSolutions}
                    variant="outline"
                    size="lg"
                    className="bg-white"
                  >
                    Explore Solutions
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                )}
                {showViewTemplates && (
                  <Button href={routes.viewTemplates} variant="secondary" size="lg">
                    <LayoutTemplate className="h-4 w-4" aria-hidden />
                    View Templates
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
