import {
  CalendarCheck,
  MessageCircle,
  Mail,
  Linkedin,
  Share2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BookConsultationButton } from "@/components/booking/BookConsultationButton";
import { cn } from "@/lib/utils";
import { contact, routes } from "@/lib/site";

/**
 * Contact options with clearly-marked placeholders.
 * No real contact details are invented — update `lib/site.ts` when available.
 */
const options = [
  {
    icon: CalendarCheck,
    label: "Talk to Us",
    value: "Schedule a free introductory call",
    href: routes.bookConsultation,
    cta: "Book now",
    primary: true,
  },
  {
    icon: MessageCircle,
    label: contact.whatsapp.label,
    value: contact.whatsapp.value, // [WhatsApp Number]
    href: contact.whatsapp.href,
    cta: "Message us",
  },
  {
    icon: Mail,
    label: contact.email.label,
    value: contact.email.value, // [Email Address]
    href: contact.email.href,
    cta: "Email us",
  },
  {
    icon: Linkedin,
    label: contact.linkedin.label,
    value: contact.linkedin.value, // [LinkedIn URL]
    href: contact.linkedin.href,
    cta: "Connect",
  },
  {
    icon: Share2,
    label: contact.social.label,
    value: contact.social.value, // [Social Media Links]
    href: contact.social.href,
    cta: "Follow",
  },
];

export function Contact({
  headingAs = "h2",
  pageStart = false,
}: {
  headingAs?: "h1" | "h2";
  /** Adds extra top padding so it can open a page beneath the fixed navbar. */
  pageStart?: boolean;
}) {
  return (
    <section
      id="contact"
      className={cn(
        "section scroll-mt-24",
        pageStart && "pt-28 sm:pt-32 lg:pt-36",
      )}
    >
      <Container>
        <SectionHeading
          as={headingAs}
          eyebrow="Contact"
          title="Let’s start a conversation."
          description="Reach out through whichever channel suits you best. Contact details will be added here soon. Booking a consultation is the fastest way to connect."
        />

        {/* Anchor target for booking links */}
        <span id="book" className="block scroll-mt-28" aria-hidden />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {options.map((option, i) => {
            const OptionIcon = option.icon;
            return (
              <Reveal key={option.label} delay={(i % 3) * 70} className="h-full">
                <div
                  className={
                    option.primary
                      ? "flex h-full flex-col rounded-2xl bg-burgundy p-7 text-white shadow-card"
                      : "flex h-full flex-col rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  }
                >
                  <span
                    className={
                      option.primary
                        ? "grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-white"
                        : "grid h-12 w-12 place-items-center rounded-xl bg-pastel-100 text-burgundy"
                    }
                  >
                    <OptionIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3
                    className={
                      option.primary
                        ? "mt-5 font-display text-lg font-semibold text-white"
                        : "mt-5 font-display text-lg font-semibold text-ink"
                    }
                  >
                    {option.label}
                  </h3>
                  <p
                    className={
                      option.primary
                        ? "mt-1 text-sm text-pastel-100/90"
                        : "mt-1 text-sm text-ink-muted"
                    }
                  >
                    {option.value}
                  </p>
                  <div className="mt-6 pt-1">
                    {option.primary ? (
                      <BookConsultationButton
                        variant="secondary"
                        size="sm"
                        withIcon={false}
                      >
                        {option.cta}
                      </BookConsultationButton>
                    ) : (
                      <Button href={option.href} variant="outline" size="sm">
                        {option.cta}
                      </Button>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Note about placeholders */}
        <Reveal>
          <p className="mt-8 rounded-xl border border-dashed border-burgundy/20 bg-cream-100 p-4 text-center text-sm text-ink-muted">
            Contact details shown in brackets are placeholders and will be
            updated with real information soon.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
