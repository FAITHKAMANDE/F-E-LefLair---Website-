# F’E LefLair — Front End

Marketing site for **F’E LefLair**, a Business Intelligence & Advisory firm.
Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide** icons.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Brand

| Role                 | Color         |
| -------------------- | ------------- |
| Primary (Burgundy)   | `#64313E`     |
| Secondary (Pastel)   | `#C1DBE8`     |

Tokens live in `tailwind.config.ts` (`burgundy.*`, `pastel.*`, `ink.*`, `cream.*`).
Typography: **Fraunces** (display) + **Inter** (body) via `next/font`.

## Structure

```
app/                      # routes: / about services templates how-we-work contact
components/
  layout/                 # Navbar, Footer
  ui/                     # Button, Logo, SectionHeading, Reveal, Container, Icon, ImagePlaceholder
  sections/               # Hero, WhoWeAre, Services, HowWeWork, Founder, ... (page sections)
lib/
  site.ts                 # brand config, nav links, routes, CONTACT PLACEHOLDERS
  content.ts              # services, values, beliefs, process, templates, future services (data)
  icons.ts                # icon-name -> Lucide component registry
public/favicon.svg        # favicon placeholder
```

Content is kept as **data arrays** in `lib/content.ts` and rendered through reusable
components, so copy/services/templates can be edited without touching UI code.

## Placeholders to replace

Everything below is intentionally a placeholder — no information was invented.

- **Logo** — `components/ui/Logo.tsx` (swap the placeholder mark for the real logo).
- **Favicon** — `public/favicon.svg`.
- **Founder & template images** — `components/ui/ImagePlaceholder.tsx` usages.
- **Contact details** — `lib/site.ts` (`contact`, `socialLinks`): `[WhatsApp Number]`,
  `[Email Address]`, `[LinkedIn URL]`, `[Social Media Links]`.
- **Template prices** — `TEMPLATE_PRICE_PLACEHOLDER` in `lib/content.ts` ("Coming Soon").
- **Production domain** — `site.url` in `lib/site.ts`.

## Wiring up a backend later

CTA destinations are centralised in `routes` (`lib/site.ts`). Point them at real
endpoints when available:

- Consultation booking (`routes.bookConsultation`)
- Demo booking (`routes.bookDemo`)
- WhatsApp / email / contact form
- Template purchases & downloads

## Accessibility & motion

- Semantic landmarks, single `<h1>` per page, labelled nav & buttons, visible focus rings, skip link.
- All scroll/hover animation respects `prefers-reduced-motion` (see `app/globals.css`).
