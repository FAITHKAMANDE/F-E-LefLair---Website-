import { ChevronDown, GitFork, GitMerge, XCircle, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { ProcessStep } from "./ProcessStep";
import {
  processIntro,
  pathNoData,
  pathWithData,
  processMerge,
} from "@/lib/content";

/** Vertical connector between stacked steps. */
function Connector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden>
      <span className="h-5 w-px bg-burgundy/20" />
      <span className="grid h-6 w-6 place-items-center rounded-full border border-burgundy/15 bg-cream text-burgundy">
        <ChevronDown className="h-4 w-4" />
      </span>
      {label && (
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wide text-ink-muted">
          {label}
        </span>
      )}
      <span className="h-5 w-px bg-burgundy/20" />
    </div>
  );
}

export function HowWeWork({
  headingAs = "h2",
  pageStart = false,
}: {
  headingAs?: "h1" | "h2";
  /** Adds extra top padding so it can open a page beneath the fixed navbar. */
  pageStart?: boolean;
}) {
  return (
    <section
      id="how-we-work"
      className={cn("section bg-cream-100", pageStart && "pt-28 sm:pt-32 lg:pt-36")}
    >
      <Container>
        <SectionHeading
          as={headingAs}
          eyebrow="How We Work"
          title="A transparent process, from first conversation to measured results"
          description="No black boxes. You always know which step we’re on, what we need from you, and what you’ll have in your hands at the end of it."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {/* Intro steps */}
          {processIntro.map((step, i) => (
            <div key={step.id}>
              <Reveal>
                <ProcessStep step={step} number={String(i + 1)} />
              </Reveal>
              {i < processIntro.length - 1 && <Connector />}
            </div>
          ))}

          {/* Branch marker */}
          <Reveal>
            <div className="my-4 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-burgundy/15 bg-white px-4 py-2 text-sm font-semibold text-burgundy shadow-card">
                <GitFork className="h-4 w-4" />
                Two possible paths from here
              </span>
            </div>
          </Reveal>

          {/* Two paths */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Path A */}
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-pastel-300/60 bg-pastel-100/50 p-4 sm:p-5">
                <PathHeader
                  tone="pathA"
                  icon={<XCircle className="h-4 w-4" />}
                  eyebrow="Path A"
                  title="No Existing Data"
                />
                <div className="mt-4">
                  {pathNoData.map((step, i) => (
                    <div key={step.id}>
                      <ProcessStep step={step} tone="pathA" />
                      {i < pathNoData.length - 1 && <Connector />}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Path B */}
            <Reveal delay={100} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-pastel-300/60 bg-pastel-100/50 p-4 sm:p-5">
                <PathHeader
                  tone="pathB"
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  eyebrow="Path B"
                  title="Existing Data"
                />
                <div className="mt-4">
                  {pathWithData.map((step, i) => (
                    <div key={step.id}>
                      <ProcessStep step={step} tone="pathB" />
                      {i < pathWithData.length - 1 && <Connector />}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Merge marker */}
          <Reveal>
            <div className="my-4 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-burgundy px-4 py-2 text-sm font-semibold text-white shadow-card">
                <GitMerge className="h-4 w-4" />
                Both paths merge here
              </span>
            </div>
          </Reveal>

          {/* Merged steps */}
          {processMerge.map((step, i) => (
            <div key={step.id}>
              <Reveal>
                <ProcessStep step={step} tone="merge" number={String(i + 1)} />
              </Reveal>
              {i < processMerge.length - 1 && <Connector />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PathHeader({
  tone,
  icon,
  eyebrow,
  title,
}: {
  tone: "pathA" | "pathB";
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3">
      <span
        className={
          tone === "pathA"
            ? "grid h-9 w-9 place-items-center rounded-lg bg-pastel-300 text-burgundy-800"
            : "grid h-9 w-9 place-items-center rounded-lg bg-burgundy-100 text-burgundy"
        }
      >
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          {eyebrow}
        </p>
        <p className="font-display text-base font-semibold text-ink">{title}</p>
      </div>
    </div>
  );
}
