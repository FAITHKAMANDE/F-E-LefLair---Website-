import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { BookConsultationButton } from "@/components/booking/BookConsultationButton";
import { TemplateRequestButton } from "@/components/templates/TemplateRequestButton";
import { templates, type Template } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Detailed two-column layout for one template. */
function TemplateDetail({ template }: { template: Template }) {
  return (
    <div
      id={template.slug}
      className="scroll-mt-24 border-t border-ink/[0.07] pt-14 first:border-t-0 first:pt-0 sm:pt-16 lg:pt-20"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Copy */}
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-pastel-600">
            Template
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {template.name}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {template.tagline}
          </p>

          <h3 className="mt-8 font-display text-lg font-semibold text-ink">
            What’s inside
          </h3>
          <ul className="mt-4 space-y-3.5">
            {template.whatsInside.map((item) => (
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

          {/* Who it's for + benefits */}
          <div className="mt-8 rounded-2xl border border-blush-200/70 bg-blush-50 p-6 sm:p-7">
            <p className="text-base text-ink-soft">
              <span className="font-semibold text-ink">Who it’s for:</span>{" "}
              {template.whoFor}
            </p>
            <ul className="mt-4 space-y-2">
              {template.benefits.map((benefit) => (
                <li key={benefit} className="text-base text-ink-muted">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Screenshot + pricing */}
        <Reveal delay={100} className="space-y-5">
          {/* Screenshot placeholder — replace with a real screenshot later */}
          <ImagePlaceholder
            label="Template preview screenshot"
            hint="Replace with a real screenshot"
            ratio="aspect-[16/7]"
          />

          {template.tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "rounded-2xl bg-white p-6 shadow-card sm:p-7",
                tier.highlighted
                  ? "border-2 border-pastel-300"
                  : "border border-ink/[0.06]",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-ink">
                  {tier.name}
                </h3>
                {/* EDITABLE price — confirm before publishing */}
                <span className="font-display text-xl font-bold text-burgundy">
                  {tier.price}
                </span>
              </div>
              <p className="mt-2 text-base text-ink-muted">{tier.note}</p>
              <div className="mt-5">
                {tier.consult ? (
                  // "Discuss a custom build" → consultation calendar
                  <BookConsultationButton
                    variant="outline"
                    size="md"
                    className="bg-cream"
                    withIcon={false}
                  >
                    {tier.cta}
                  </BookConsultationButton>
                ) : (
                  // "Request this template" → delivery choice + payment
                  <TemplateRequestButton
                    templateName={template.name}
                    tier={tier}
                    variant={tier.highlighted ? "primary" : "outline"}
                    size="md"
                    className={tier.highlighted ? undefined : "bg-cream"}
                  >
                    {tier.cta}
                  </TemplateRequestButton>
                )}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

export function TemplateShowcase() {
  return (
    <section
      id="templates"
      className="pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      <Container>
        <div className="space-y-14 sm:space-y-16 lg:space-y-24">
          {templates.map((template) => (
            <TemplateDetail key={template.slug} template={template} />
          ))}
        </div>
      </Container>
    </section>
  );
}
