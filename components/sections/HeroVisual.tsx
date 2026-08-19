import { TrendingUp, Package, Wallet, ArrowUpRight } from "lucide-react";

/**
 * Abstract, decorative data-visualisation composition for the hero.
 * Intentionally NOT a working dashboard — it evokes charts, KPIs and growth
 * using only the brand palette. Marked aria-hidden as it is purely decorative
 * (the hero's meaning is carried by the text).
 */
export function HeroVisual() {
  const bars = [38, 52, 46, 64, 58, 78, 72, 92];

  return (
    <div aria-hidden className="relative select-none">
      {/* soft glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-pastel-200/40 blur-2xl" />

      {/* Main "insight" card */}
      <div className="surface relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="grid-backdrop absolute inset-0 opacity-60" />

        <div className="relative">
          {/* header row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Performance
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">
                Business Overview
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-burgundy-50 px-2.5 py-1 text-xs font-semibold text-burgundy">
              <TrendingUp className="h-3.5 w-3.5" />
              Growth
            </span>
          </div>

          {/* bar + line chart */}
          <div className="relative mt-5 h-40 rounded-xl bg-cream/70 p-4">
            <div className="flex h-full items-end justify-between gap-2">
              {bars.map((h, i) => (
                <div key={i} className="flex h-full flex-1 items-end">
                  <span
                    className="w-full origin-bottom rounded-t-md bg-gradient-to-t from-burgundy to-burgundy-400 animate-grow-bar"
                    style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                  />
                </div>
              ))}
            </div>
            {/* trend line overlay */}
            <svg
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-4 top-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]"
            >
              <polyline
                points="2,30 15,26 28,28 42,18 56,21 70,10 84,13 98,3"
                fill="none"
                stroke="#42758F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="98" cy="3" r="2.4" fill="#42758F" />
            </svg>
          </div>

          {/* KPI chips */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <KpiChip icon={<Wallet className="h-4 w-4" />} label="Profit" trend="up" />
            <KpiChip icon={<Package className="h-4 w-4" />} label="Inventory" trend="steady" />
            <KpiChip icon={<TrendingUp className="h-4 w-4" />} label="Sales" trend="up" />
          </div>
        </div>
      </div>

      {/* floating donut card */}
      <div className="surface absolute -left-5 -bottom-6 hidden w-44 rounded-2xl p-4 animate-float-slow sm:block">
        <p className="text-xs font-medium text-ink-muted">Decision confidence</p>
        <div className="mt-3 flex items-center gap-3">
          <Donut value={82} />
          <div>
            <p className="font-display text-2xl font-semibold text-burgundy">82%</p>
            <p className="text-[11px] text-ink-muted">data-driven</p>
          </div>
        </div>
      </div>

      {/* floating insight tag */}
      <div className="surface absolute -right-3 -top-5 hidden items-center gap-2 rounded-xl px-3 py-2 sm:flex">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-pastel-200 text-burgundy">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="text-[11px] text-ink-muted">Opportunity</p>
          <p className="text-xs font-semibold text-ink">Identified</p>
        </div>
      </div>
    </div>
  );
}

function KpiChip({
  icon,
  label,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  trend: "up" | "steady";
}) {
  return (
    <div className="rounded-xl border border-ink/[0.06] bg-white p-3">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-pastel-100 text-burgundy">
        {icon}
      </span>
      <p className="mt-2 text-xs font-medium text-ink-soft">{label}</p>
      <div className="mt-1.5 flex items-center gap-1">
        <span
          className={
            trend === "up"
              ? "text-[11px] font-semibold text-burgundy"
              : "text-[11px] font-semibold text-ink-muted"
          }
        >
          {trend === "up" ? "▲" : "▬"}
        </span>
        <span className="h-1 flex-1 rounded-full bg-pastel-200">
          <span
            className="block h-1 rounded-full bg-burgundy"
            style={{ width: trend === "up" ? "72%" : "48%" }}
          />
        </span>
      </div>
    </div>
  );
}

function Donut({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <svg viewBox="0 0 40 40" className="h-12 w-12 -rotate-90">
      <circle cx="20" cy="20" r={r} fill="none" stroke="#E9F3F8" strokeWidth="6" />
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="#64313E"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
      />
    </svg>
  );
}
