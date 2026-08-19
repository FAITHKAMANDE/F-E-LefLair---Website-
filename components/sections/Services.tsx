import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Services({
  headingAs = "h2",
  pageStart = false,
}: {
  headingAs?: "h1" | "h2";
  /** Adds extra top padding so it can open a page beneath the fixed navbar. */
  pageStart?: boolean;
}) {
  return (
    <section
      id="services"
      className={cn("section", pageStart && "pt-28 sm:pt-32 lg:pt-36")}
    >
      <Container>
        <SectionHeading
          as={headingAs}
          eyebrow="Services"
          title="Four ways we help you use your numbers."
          description="From understanding what your data means to building the systems that capture it. Practical support across the whole picture."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 80} className="h-full">
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
