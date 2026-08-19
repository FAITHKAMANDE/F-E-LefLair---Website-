import { cn } from "@/lib/utils";
import type { ProcessStep as Step } from "@/lib/content";

/** A single node in the How We Work flow. */
export function ProcessStep({
  step,
  number,
  tone = "default",
  className,
}: {
  step: Step;
  number?: string;
  tone?: "default" | "pathA" | "pathB" | "merge";
  className?: string;
}) {
  const toneStyles = {
    default: "border-ink/[0.06] bg-white",
    pathA: "border-pastel-300/70 bg-pastel-50",
    pathB: "border-pastel-300/70 bg-pastel-50",
    merge: "border-burgundy/20 bg-white",
  } as const;

  const badgeStyles = {
    default: "bg-burgundy text-white",
    pathA: "bg-pastel-300 text-burgundy-800",
    pathB: "bg-burgundy-100 text-burgundy",
    merge: "bg-burgundy text-white",
  } as const;

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:p-6",
        toneStyles[tone],
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {number && (
          <span
            className={cn(
              "grid h-8 w-8 flex-none place-items-center rounded-lg font-mono text-xs font-bold",
              badgeStyles[tone],
            )}
          >
            {number}
          </span>
        )}
        <div className="min-w-0">
          <h4 className="font-display text-lg font-semibold leading-snug text-ink">
            {step.title}
          </h4>
          {step.description && (
            <p className="mt-1 text-sm text-ink-muted">{step.description}</p>
          )}
          {step.points && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {step.points.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-ink/[0.06] bg-white/70 px-2.5 py-1 text-xs font-medium text-ink-soft"
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
