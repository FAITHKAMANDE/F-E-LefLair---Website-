import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BookConsultationButton } from "@/components/booking/BookConsultationButton";
import { services, PRICING_NOTE, type Service } from "@/lib/content";

/** Detailed, alternating two-column layout for each service. */
function ServiceBlock({
  service,
  as: Title,
}: {
  service: Service;
  as: "h1" | "h2";
}) {
  return (
    <div
      id={service.slug}
      className="scroll-mt-24 border-t border-ink/[0.07] pt-14 first:border-t-0 first:pt-0 sm:pt-16 lg:pt-20"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Copy — always left */}
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pastel-600">
            {service.title}
          </span>
          <Title className="mt-4 font-display text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
            {service.headline}
          </Title>

          <h3 className="mt-6 font-display text-lg font-semibold text-ink">
            Who it’s for
          </h3>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-muted">
            {service.whoFor}
          </p>
          {service.whoForNote && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted/80">
              {service.whoForNote}
            </p>
          )}

          {service.helpWith ? (
            <>
              <h3 className="mt-7 font-display text-lg font-semibold text-ink">
                We help you:
              </h3>
              <ul className="mt-4 space-y-5">
                {service.helpWith.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check
                      className="mt-1 h-5 w-5 flex-none text-pastel-600"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="mt-0.5 text-base leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="mt-7 space-y-3.5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 flex-none text-pastel-600"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="text-base text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookConsultationButton size="lg" withIcon={false}>
              {service.ctaLabel}
            </BookConsultationButton>
            <Button
              href="/how-we-work"
              variant="outline"
              size="lg"
              className="bg-white"
            >
              See How We Work
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Reveal>

        {/* Cards — always right */}
        <Reveal delay={100} className="space-y-5">
          {/* What you gain */}
          <div className="rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              What you gain
            </h3>
            <ul className="mt-5 space-y-3.5">
              {service.gains.map((gain) => (
                <li key={gain} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 flex-none text-pastel-600"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  <span className="text-base text-ink-soft">{gain}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How engagements are priced — package names only, no invented prices */}
          <div className="rounded-2xl border border-blush-200/70 bg-blush-50 p-7 sm:p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              Ways we can work together
            </h3>
            <ul className="mt-5 space-y-4">
              {service.packages.map((pkg) => (
                <li key={pkg.name}>
                  <p className="font-semibold text-burgundy-800">{pkg.name}</p>
                  <p className="mt-0.5 text-base leading-relaxed text-ink-soft">
                    {pkg.note}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-muted">{PRICING_NOTE}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function ServiceSections() {
  return (
    <section
      id="services"
      className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      <Container>
        <div className="space-y-14 sm:space-y-16 lg:space-y-20">
          {services.map((service) => (
            <ServiceBlock key={service.slug} service={service} as="h2" />
          ))}
        </div>
      </Container>
    </section>
  );
}
