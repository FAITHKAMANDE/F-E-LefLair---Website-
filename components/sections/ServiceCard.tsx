import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/content";

/** Premium service card — deliberately not a SaaS pricing card. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      id={service.slug}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.06] bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-pastel-300 hover:shadow-card-hover sm:p-8"
    >
      {/* corner index */}
      <span
        aria-hidden
        className="absolute right-6 top-6 font-mono text-xs font-semibold text-ink-muted/60"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-pastel-100 text-burgundy transition-colors duration-300 group-hover:bg-burgundy group-hover:text-white">
        <Icon name={service.icon} className="h-7 w-7" />
      </span>

      <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
        {service.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
        {service.description}
      </p>

      {service.capabilities.length > 0 && (
        <ul className="mt-6 grid gap-2.5 border-t border-ink/[0.06] pt-6">
          {service.capabilities.map((cap) => (
            <li key={cap} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-pastel-200 text-burgundy">
                <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
              </span>
              {cap}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-7">
        <Link
          href={`/services#${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy transition-colors hover:text-burgundy-700"
        >
          Explore Service
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
