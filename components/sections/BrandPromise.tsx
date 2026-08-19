import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** A single, memorable promise moment. */
export function BrandPromise() {
  return (
    <section className="section">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-burgundy px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24">
            {/* decorative data motifs */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="grid-backdrop absolute inset-0 opacity-[0.12]" />
              <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-pastel-200/20 blur-2xl" />
              <div className="absolute -right-8 bottom-0 h-52 w-52 rounded-full bg-pastel-200/10 blur-3xl" />
              {/* faint ascending bars */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 opacity-[0.12]">
                {[30, 55, 40, 70, 52, 84, 66, 96, 74].map((h, i) => (
                  <span
                    key={i}
                    className="w-6 rounded-t bg-pastel-200 sm:w-10"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>

            <div className="relative mx-auto max-w-4xl">
              <p className="eyebrow justify-center text-pastel-200">
                <span className="h-px w-6 bg-pastel-300" />
                Our Promise
              </p>
              <p className="mt-6 font-display text-3xl font-medium leading-[1.2] text-white sm:text-4xl lg:text-5xl text-balance">
                “If your business has data, we&apos;ll help you understand what
                it&apos;s{" "}
                <span className="text-pastel-200">telling you.</span>”
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
