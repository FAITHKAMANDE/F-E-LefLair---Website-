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

## Bookings

Calendly-style consultation booking with live availability.

- **`/bookings`** — visitors see each day's open-slot count, every time slot
  (booked ones shown as "Booked"), and book with name + email.
- **`/bookings/admin`** — password-protected week view of every slot
  (open / booked / blocked / past), booking details, cancel bookings, block
  or unblock slots.

Opening hours, closed days, slot length, booking window and time zone live in
`lib/booking.ts`. All "Talk to Us" buttons link to `/bookings`.

**Setup**

1. Copy `.env.example` → `.env.local` and set `ADMIN_PASSWORD` and
   `ADMIN_SESSION_SECRET` (`openssl rand -base64 32`).
2. Create a Supabase project, run
   `supabase/migrations/20261121000000_create_bookings.sql` in its SQL editor,
   and set `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (server-only).
   Without these, `npm run dev` stores bookings in `.data/bookings.json`
   (dev only — production refuses to run bookings unconfigured).

Double-booking is prevented in the database (unique index on confirmed
slots), so two people submitting the same slot at once get one booking and
one "slot just taken" message. The table has RLS on with no policies, so only
the server's service-role key can read customer details.

API: `GET /api/availability`, `POST /api/bookings` (public);
`/api/admin/*` (session cookie required).

## Wiring up a backend later

CTA destinations are centralised in `routes` (`lib/site.ts`). Point them at real
endpoints when available:

- ~~Consultation booking~~ — done, see **Bookings** above
- Booking confirmation emails (TODO in `app/api/bookings/route.ts`)
- WhatsApp / email / contact form
- Template purchases & downloads

## Accessibility & motion

- Semantic landmarks, single `<h1>` per page, labelled nav & buttons, visible focus rings, skip link.
- All scroll/hover animation respects `prefers-reduced-motion` (see `app/globals.css`).
