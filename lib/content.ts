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
  whoForNote?: string;
  deliverables: string[];
  /** Optional richer "We help you:" list (title + description per item). */
  helpWith?: { title: string; description: string }[];
  /** Label for the primary CTA (opens the consultation calendar). */
  ctaLabel: string;
  gains: string[];
  packages: ServicePackage[];
};

/** Shared note under every pricing card — no prices are invented. */
export const PRICING_NOTE =
  "Scope and fees are tailored to the needs of your business and confirmed after a short discovery conversation.";

export const services: Service[] = [
  {
    slug: "business-intelligence",
    title: "Business Intelligence",
    icon: "brainCircuit",
    ctaLabel: "Let’s Talk About Your Business",
    description:
      "Turn your business data into insights you can understand and act on.",
    capabilities: [],
    headline:
      "We help you understand what your data is saying, why it matters, and what to do next.",
    whoFor:
      "Business owners and managers who have data but need help making sense of it, understanding performance, and turning information into better decisions.",
    whoForNote:
      "Whether your data lives across spreadsheets, POS systems, accounting software or other business tools, we help bring the pieces together into a clearer picture.",
    deliverables: [],
    helpWith: [
      {
        title: "Understand performance",
        description:
          "Analyse your sales, costs, profitability, inventory, customers and other key business measures to understand what is really happening.",
      },
      {
        title: "Identify what matters",
        description:
          "Uncover trends, opportunities, underperformance, unusual changes and areas that need attention.",
      },
      {
        title: "Explain the story behind the numbers",
        description:
          "Go beyond what changed to understand why it changed and what it means for the business.",
      },
      {
        title: "Recommend what to do next",
        description:
          "Turn insights into clear, practical recommendations that help you decide where to focus and what action to take.",
      },
    ],
    gains: [
      "A clearer picture of how your business is performing.",
      "Less time spent compiling reports and more time understanding them.",
      "Earlier visibility into problems, trends and opportunities.",
      "Clear recommendations for what to focus on next.",
    ],
    packages: [
      {
        name: "Insight Setup",
        note: "A one-off engagement to organise your data, establish the right measures and create a clear reporting foundation.",
      },
      {
        name: "Ongoing Business Insights",
        note: "Regular reporting, performance reviews, commentary and recommendations to help you stay on top of what your numbers are saying.",
      },
      {
        name: "Focused Analysis",
        note: "A deeper look at a specific business question, problem or opportunity when you need to understand something in more detail.",
      },
    ],
  },
  {
    slug: "business-consulting",
    title: "Business Performance",
    icon: "compass",
    ctaLabel: "Let’s Talk About Your Business",
    description:
      "Understand how your business is performing and identify where to improve.",
    capabilities: [],
    headline:
      "Understand where your business stands, what needs to improve, and where to focus next.",
    whoFor:
      "Business owners and managers who want a clearer view of how their business is performing and practical support to improve the way it operates.",
    whoForNote:
      "We look beyond individual numbers to assess the bigger picture, from sales and profitability to costs, processes, KPIs and day-to-day performance.",
    deliverables: [],
    helpWith: [
      {
        title: "Assess business performance",
        description:
          "Review the key areas of your business to understand what is performing well and where attention is needed.",
      },
      {
        title: "Identify areas for improvement",
        description:
          "Find inefficiencies, performance gaps, rising costs and processes that may be holding the business back.",
      },
      {
        title: "Set meaningful measures",
        description:
          "Define practical KPIs and performance measures that help you track progress against what actually matters.",
      },
      {
        title: "Turn findings into action",
        description:
          "Prioritise improvements and develop practical next steps that your business can realistically implement.",
      },
    ],
    gains: [
      "A clearer understanding of where your business stands.",
      "Visibility into what is helping or holding back performance.",
      "Practical priorities instead of trying to fix everything at once.",
      "A clearer path from identifying a problem to taking action.",
    ],
    packages: [
      {
        name: "Performance Review",
        note: "A focused review of your business performance to identify strengths, gaps, risks and opportunities.",
      },
      {
        name: "Performance Improvement Support",
        note: "Ongoing support to help you address identified challenges, improve processes and monitor progress.",
      },
      {
        name: "KPI & Performance Framework",
        note: "Define the measures, targets and reporting structure you need to consistently monitor business performance.",
      },
    ],
  },
  {
    slug: "dashboards-analytics",
    title: "Dashboards & Analytics",
    icon: "barChart",
    ctaLabel: "Let’s Build Your Dashboard",
    description:
      "See the numbers that matter and monitor your business with clarity.",
    capabilities: [],
    headline:
      "See what matters, monitor performance, and find the story behind your numbers.",
    whoFor:
      "Businesses that have data but need a clearer, more useful way to view, monitor and explore their performance.",
    whoForNote:
      "We turn business data into clear dashboards and reports that bring your most important measures together, making it easier to see trends, compare performance and keep track of what matters.",
    deliverables: [],
    helpWith: [
      {
        title: "Bring your key numbers together",
        description:
          "Connect the information that matters so you can see your business performance in one clear view.",
      },
      {
        title: "Make performance easy to monitor",
        description:
          "Build dashboards around the KPIs and questions that matter to your business, not just a collection of charts.",
      },
      {
        title: "Explore what is driving performance",
        description:
          "Analyse trends, products, customers, periods and other areas to understand what is changing and where.",
      },
      {
        title: "Communicate performance clearly",
        description:
          "Create reports that make your business information easier to understand and share with the people who need it.",
      },
    ],
    gains: [
      "A clear view of the numbers that matter most.",
      "Less time searching through spreadsheets and reports.",
      "Faster visibility into changes in performance.",
      "Information that is easier to understand and communicate.",
    ],
    packages: [
      {
        name: "Dashboard Development",
        note: "Design and build a dashboard around your business goals, data and reporting needs.",
      },
      {
        name: "Reporting Setup",
        note: "Create recurring reports that bring your key performance information together in a consistent format.",
      },
      {
        name: "Analytics & Performance Review",
        note: "Go beyond the dashboard to analyse trends, comparisons and patterns and understand what they mean.",
      },
    ],
  },
  {
    slug: "business-systems",
    title: "Business Systems",
    icon: "layers",
    ctaLabel: "Let’s Build a Better System",
    description:
      "Create practical ways to capture and organise the information your business needs.",
    capabilities: [],
    headline:
      "Build better ways to track, organise and manage the information your business depends on.",
    whoFor:
      "Businesses that are relying on scattered spreadsheets, manual processes or disconnected records or simply need a better way to manage their day-to-day information.",
    whoForNote:
      "We design practical business systems that make it easier to capture accurate information, keep records organised and create a reliable foundation for better reporting and decision-making.",
    deliverables: [],
    helpWith: [
      {
        title: "Capture the right information",
        description:
          "Design practical ways to record the information your business actually needs.",
      },
      {
        title: "Organise your records",
        description:
          "Bring scattered information into structured systems that are easier to maintain and use.",
      },
      {
        title: "Simplify everyday tracking",
        description:
          "Reduce unnecessary manual work and make routine business processes easier to manage.",
      },
      {
        title: "Create a foundation for better decisions",
        description:
          "Build systems that give you reliable information you can later analyze, report on and use to improve the business.",
      },
    ],
    gains: [
      "Better organised business information.",
      "Less reliance on scattered spreadsheets and manual records.",
      "Easier tracking of day-to-day business activity.",
      "A stronger foundation for reporting and decision-making.",
    ],
    packages: [
      {
        name: "Custom Business System",
        note: "A tailored system designed around the way your business operates and the information you need to track.",
      },
      {
        name: "System Improvement",
        note: "Improve an existing spreadsheet, tracker or business process that is no longer working as well as it should.",
      },
      {
        name: "Ready-Made Templates",
        note: "Start with a practical template designed for common business needs and adapt it to your operations.",
      },
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
