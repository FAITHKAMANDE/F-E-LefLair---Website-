import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { futureServices } from "@/lib/content";

export function FutureServices() {
  return (
    <section id="future-services" className="section bg-cream-100">
      <Container>
        <SectionHeading
          eyebrow="On The Horizon"
          title="More ways we’re building for better business."
          description="Our long-term vision reaches beyond analytics. These advisory services are in development, not yet available, but coming."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {futureServices.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={(i % 3) * 60} className="h-full">
                <article className="group flex h-full items-center gap-4 rounded-2xl border border-dashed border-burgundy/20 bg-white/60 p-6 transition-colors duration-300 hover:border-burgundy/40 hover:bg-white">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-pastel-100 text-burgundy">
                    <Icon name={service.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {service.title}
                    </h3>
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-burgundy-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-burgundy">
                      <span className="h-1.5 w-1.5 rounded-full bg-burgundy/60" />
                      Coming Soon
                    </span>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
