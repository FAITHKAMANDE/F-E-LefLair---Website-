/**
 * Site content, kept separate from UI components.
 * Icons are referenced by name (string) and mapped to components in the UI
 * layer via `lib/icons.ts`, so this file stays free of JSX.
 */

import type { IconName } from "./icons";

export type Value = {
  title: string;
  description: string;
  icon: IconName;
};

export const coreValues: Value[] = [
  {
    title: "Clarity",
    description: "Make complex numbers easy to understand.",
    icon: "eye",
  },
  {
    title: "Integrity",
    description: "Tell the truth, even when the data is uncomfortable.",
    icon: "scale",
  },
  {
    title: "Practicality",
    description: "Every insight should lead to action.",
    icon: "target",
  },
  {
    title: "Growth",
    description: "Help businesses improve continuously.",
    icon: "trendingUp",
  },
  {
    title: "Impact",
    description: "Measure success by the value created for clients.",
    icon: "sparkles",
  },
];

export type ServicePackage = { name: string; note: string };

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  // Compact card (home page)
  description: string;
  capabilities: string[];
  // Detailed service page
  headline: string;
  whoFor: string;
  deliverables: string[];
  gains: string[];
  packages: ServicePackage[];
};

/** Shared note under every pricing card — no prices are invented. */
export const PRICING_NOTE =
  "Final scope and fees are confirmed after a short discovery conversation.";

export const services: Service[] = [
  {
    slug: "business-intelligence",
    title: "Business Intelligence",
    icon: "brainCircuit",
    description:
      "We turn raw business data into a clear line of sight: from what happened to what to do next.",
    capabilities: [
      "What happened",
      "Why it happened",
      "What’s likely to happen",
      "What should be done next",
    ],
    headline:
      "We bring your numbers into one place and turn them into reporting you can trust and read at a glance.",
    whoFor:
      "Owners and managers juggling spreadsheets, till reports and platform exports who need one reliable view.",
    deliverables: [
      "Consolidate sales, stock, costs and cash into a single reporting source.",
      "Define the handful of measures that actually drive your business.",
      "Automated weekly and monthly reporting packs, delivered on time.",
      "Plain-language commentary that explains what changed and why.",
    ],
    gains: [
      "One version of the truth for every meeting.",
      "Hours of manual reporting time returned to your team.",
      "Earlier warning when performance drifts.",
    ],
    packages: [
      { name: "Reporting Foundations", note: "one-off setup project." },
      {
        name: "Monthly Insight Retainer",
        note: "reporting, review call and commentary.",
      },
      { name: "Quarterly Deep Dive", note: "add-on analysis on a specific question." },
    ],
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    icon: "compass",
    description:
      "Practical, hands-on advisory that strengthens how your business runs and performs.",
    capabilities: [
      "Process improvement",
      "Business performance reviews",
      "Strategy sessions",
      "KPI development",
    ],
    headline:
      "We work alongside you to sharpen how the business runs and where it’s heading.",
    whoFor:
      "Owners and teams who know something needs to change but want a clear, practical plan to get there.",
    deliverables: [
      "Review how the business performs and where value quietly leaks out.",
      "Map and improve the processes that slow your team down.",
      "Set the KPIs and targets that keep everyone focused.",
      "Run working strategy sessions that end in decisions, not just notes.",
    ],
    gains: [
      "A clear, prioritised plan instead of a long to-do list.",
      "Fewer bottlenecks and cleaner day-to-day operations.",
      "Confidence that effort is going where it counts.",
    ],
    packages: [
      { name: "Performance Review", note: "one-off diagnostic and recommendations." },
      { name: "Advisory Partnership", note: "ongoing strategy and review sessions." },
      { name: "Focused Sprint", note: "hands-on work on one priority area." },
    ],
  },
  {
    slug: "dashboards-analytics",
    title: "Dashboards & Analytics",
    icon: "barChart",
    description:
      "Living dashboards and reports that make your key numbers visible, current and easy to read.",
    capabilities: [
      "Excel dashboards",
      "Power BI dashboards",
      "KPI tracking",
      "Financial reporting",
    ],
    headline:
      "We turn your data into living dashboards that answer the questions you actually ask.",
    whoFor:
      "Teams tired of static reports who want their key numbers visible, current and easy to read.",
    deliverables: [
      "Design Excel and Power BI dashboards around your real decisions.",
      "Track the KPIs that matter, refreshed on a schedule you can rely on.",
      "Bring sales, stock and finance views into one clear picture.",
      "Build reporting your team can read without a data background.",
    ],
    gains: [
      "Answers at a glance instead of digging through files.",
      "Numbers everyone trusts and reads the same way.",
      "Trends and risks you can see coming.",
    ],
    packages: [
      { name: "Dashboard Build", note: "one-off design and setup." },
      { name: "Analytics Retainer", note: "maintenance, updates and new views." },
      { name: "Reporting Refresh", note: "rework of an existing dashboard or report." },
    ],
  },
  {
    slug: "business-systems",
    title: "Business Systems",
    icon: "layers",
    description:
      "The underlying systems that capture accurate data and keep your operations organised.",
    capabilities: [
      "Sales systems",
      "Inventory systems",
      "Expense trackers",
      "CRM systems",
      "Payroll systems",
    ],
    headline:
      "We put the right systems in place so accurate data is captured from day one.",
    whoFor:
      "Businesses relying on memory, paper or scattered files who need their operations organised.",
    deliverables: [
      "Set up sales, inventory and expense systems that fit how you work.",
      "Introduce simple CRM and payroll tools your team will actually use.",
      "Standardise how data is recorded so it stays clean and consistent.",
      "Train your team to run the systems confidently without us.",
    ],
    gains: [
      "Accurate data captured automatically, not chased after.",
      "Less time lost to manual admin and rework.",
      "A foundation your reporting and decisions can rely on.",
    ],
    packages: [
      { name: "System Setup", note: "one-off build and rollout." },
      { name: "Systems Care", note: "ongoing support and improvements." },
      { name: "Team Enablement", note: "training and documentation add-on." },
    ],
  },
];

export type Belief = {
  text: string;
  emphasis?: boolean;
};

export const beliefs: Belief[] = [
  { text: "We believe every business deserves to understand its numbers." },
  { text: "We believe decisions should be driven by insight, not assumptions." },
  {
    text: "We believe data should be simple, practical, and accessible, not complicated or intimidating.",
  },
  {
    text: "We believe every number tells a story, every challenge leaves a clue, and every opportunity can be uncovered through understanding.",
  },
  {
    text: "We believe that business intelligence is not about dashboards or reports. It’s about giving leaders the confidence to make better decisions.",
  },
  {
    text: "We believe that strong businesses are built on clarity, strategy, and effective communication.",
  },
  {
    text: "Above all, we believe that when businesses make sense of their numbers, they unlock their full potential.",
    emphasis: true,
  },
];

export const whyChooseUs: string[] = [
  "We don’t just build templates. We build systems.",
  "We don’t just show reports. We explain them.",
  "We don’t just present numbers. We interpret them.",
  "We don’t just identify problems. We recommend practical next steps.",
  "We design solutions that grow with your business.",
];

/* ---------------------------------- How We Work ---------------------------------- */

export type ProcessStep = {
  id: string;
  title: string;
  description?: string;
  points?: string[];
};

export const processIntro: ProcessStep[] = [
  {
    id: "meet",
    title: "Meet the Business",
    description: "Understand the business and establish context.",
  },
  {
    id: "understand",
    title: "Understand the Business",
    description: "Get to the heart of what matters most.",
    points: ["Goals", "Challenges", "Operations", "Priorities"],
  },
  {
    id: "assess",
    title: "Assess Existing Data & Systems",
    description: "Establish the starting point. This determines the path.",
  },
];

export const pathNoData: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover Information Needs",
    description: "Identify what the business needs to track and measure.",
  },
  {
    id: "recommend-system",
    title: "Recommend the Right System",
    points: ["Sales", "Inventory", "Expenses", "CRM", "Dashboards"],
  },
  {
    id: "build",
    title: "Build & Set Up the System",
    description: "Put the right tools in place to capture what matters.",
  },
  {
    id: "collect",
    title: "Collect Accurate Data",
    description: "Start gathering clean, reliable data.",
  },
];

export const pathWithData: ProcessStep[] = [
  {
    id: "review",
    title: "Review Existing Data",
    description: "Examine what you already have.",
  },
  {
    id: "quality",
    title: "Check Data Quality & Completeness",
    points: ["Accuracy", "Consistency", "Missing information"],
  },
  {
    id: "gaps",
    title: "Identify Gaps & Opportunities",
    description: "Find what’s missing and what could be better.",
  },
];

export const processMerge: ProcessStep[] = [
  {
    id: "analyze",
    title: "Analyze the Data",
    description: "Both paths converge here.",
  },
  {
    id: "insights",
    title: "Turn Data into Insights",
    points: ["Performance", "Trends", "Opportunities", "Risks"],
  },
  {
    id: "actions",
    title: "Recommend Practical Actions",
    description: "Translate insight into clear next steps.",
  },
  {
    id: "support",
    title: "Support Implementation & Improvement",
    description: "Stay involved as changes take hold.",
  },
  {
    id: "monitor",
    title: "Monitor Results & Refine the Strategy",
    description: "Measure impact and keep improving.",
  },
];

/* ---------------------------------- Templates ---------------------------------- */

export type TemplateTier = {
  name: string;
  price: string; // EDITABLE — confirm real pricing before publishing.
  note: string;
  cta: string;
  highlighted?: boolean;
  /** When true, the CTA opens the consultation calendar instead of purchase. */
  consult?: boolean;
};

export type Template = {
  slug: string;
  name: string;
  tagline: string;
  whatsInside: string[];
  whoFor: string;
  benefits: string[];
  tiers: TemplateTier[];
};

/**
 * PRICING — EDIT HERE.
 * ---------------------------------------------------------------------------
 * These amounts came from the design mockup and are NOT yet confirmed as the
 * business's real prices. Update or replace with "Coming Soon" as needed.
 * Both templates currently share these tiers.
 * ---------------------------------------------------------------------------
 */
export const templateTiers: TemplateTier[] = [
  {
    name: "Template",
    price: "KES 4,500",
    note: "Workbook, sample data and setup guide.",
    cta: "Request this template",
  },
  {
    name: "Template + Setup",
    price: "KES 12,000",
    note: "We load your stock list and run a 60-minute training call.",
    cta: "Request this template",
    highlighted: true,
  },
  {
    name: "Custom Build",
    price: "From KES 35,000",
    note: "Tailored to your branches, categories and reporting needs.",
    cta: "Discuss a custom build",
    consult: true,
  },
];

export const templates: Template[] = [
  {
    slug: "boutique-sales-inventory",
    name: "Boutique Sales & Inventory Tracker",
    tagline:
      "Track every piece, price and sale in one clean workbook built for boutique retail.",
    whatsInside: [
      "Item-level stock register with sizes, colours and cost prices.",
      "Daily sales entry with automatic margin per sale.",
      "Low-stock and slow-mover alerts.",
      "Monthly performance summary with best and worst sellers.",
      "Simple dashboard tab, no formulas to touch.",
    ],
    whoFor:
      "Boutique and fashion retailers managing varied stock across styles and sizes.",
    benefits: [
      "Know your true margin per item, not just total sales.",
      "Reorder with confidence and free up cash tied in slow stock.",
      "Close the month in minutes instead of an evening.",
    ],
    tiers: templateTiers,
  },
  {
    slug: "shoes-sales-inventory",
    name: "Shoes Sales & Inventory Tracker",
    tagline:
      "Track every model, size and pair in one clean workbook built for footwear retail.",
    whatsInside: [
      "Stock register organised by model, size and cost price.",
      "Daily sales entry with automatic margin per pair.",
      "Low-stock and slow-mover alerts by size.",
      "Monthly summary of best and worst-selling lines.",
      "Simple dashboard tab, no formulas to touch.",
    ],
    whoFor:
      "Shoe shops and footwear sellers managing many models and size runs.",
    benefits: [
      "See true margin per pair, not just total sales.",
      "Never lose track of which sizes are in stock.",
      "Restock the fast movers before they sell out.",
    ],
    tiers: templateTiers,
  },
];

/* ------------------------------- Future Services ------------------------------- */

export type FutureService = {
  title: string;
  icon: IconName;
};

export const futureServices: FutureService[] = [
  { title: "Corporate Communications", icon: "megaphone" },
  { title: "Internal Communications", icon: "messagesSquare" },
  { title: "Public Relations", icon: "radio" },
  { title: "Crisis Communication", icon: "shieldAlert" },
  { title: "Brand Messaging", icon: "penTool" },
];

/* --------------------------------- Journey ------------------------------------ */

export const journeyStages = [
  { label: "Business", icon: "building" as IconName },
  { label: "Data", icon: "database" as IconName },
  { label: "Insight", icon: "lightbulb" as IconName },
  { label: "Action", icon: "rocket" as IconName },
];
