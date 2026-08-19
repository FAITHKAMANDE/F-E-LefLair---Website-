/**
 * Central site configuration.
 * Update brand-wide values, routes and contact placeholders here.
 * Contact details are intentionally placeholders — replace when available.
 */

export const site = {
  name: "F’E LefLair", // F’E LefLair (uses a curly apostrophe)
  tagline: "Business Intelligence & Advisory",
  motto: "Understand • Decide • Grow", // short sub-title shown under the logo

  shortPromise:
    "Helping businesses understand their numbers and make smarter decisions.",
  description:
    "F’E LefLair helps businesses understand their numbers, improve performance, build practical business systems, and make smarter data-driven decisions.",
  url: "https://feleflair.com", // TODO: replace with production domain
};

/** Primary navigation. Kept in one place so Navbar + Footer stay in sync. */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Templates", href: "/templates" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Placeholder routes / actions for future backend integration.
 * TODO: wire these to real booking, WhatsApp and form endpoints.
 */
export const routes = {
  bookConsultation: "/contact#book", // TODO: connect to booking system
  exploreSolutions: "/services",
  viewTemplates: "/templates",
  bookDemo: "/contact#book", // TODO: connect to demo booking
};

/**
 * Contact placeholders — NO real details invented.
 * Replace the `value` fields when the real information is provided.
 */
export const contact = {
  whatsapp: { label: "WhatsApp", value: "[WhatsApp Number]", href: "#" },
  email: { label: "Email", value: "[Email Address]", href: "#" },
  linkedin: { label: "LinkedIn", value: "[LinkedIn URL]", href: "#" },
  social: { label: "Social Media", value: "[Social Media Links]", href: "#" },
} as const;

/** Placeholder social links for the footer. */
export const socialLinks = [
  { label: "LinkedIn", href: "#", key: "linkedin" },
  { label: "WhatsApp", href: "#", key: "whatsapp" },
  { label: "Instagram", href: "#", key: "instagram" },
  { label: "X (Twitter)", href: "#", key: "x" },
] as const;
