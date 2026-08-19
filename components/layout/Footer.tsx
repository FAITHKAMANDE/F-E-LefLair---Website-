import Link from "next/link";
import { Linkedin, MessageCircle, Instagram, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks, site, socialLinks } from "@/lib/site";
import { services, futureServices } from "@/lib/content";

const socialIcons = {
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  instagram: Instagram,
  x: Twitter,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-burgundy-800 text-pastel-100">
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + promise */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-pastel-100/80">
              {site.shortPromise}
            </p>
            {/* Social placeholders — replace hrefs when available */}
            <ul className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => {
                const SocialIcon = socialIcons[s.key];
                return (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      aria-label={`${s.label} (link coming soon)`}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-pastel-200 transition-colors hover:border-pastel-200 hover:bg-white/5 hover:text-white"
                    >
                      <SocialIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigation */}
          <FooterCol title="Navigation">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Services */}
          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services#${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          {/* Future services */}
          <FooterCol title="Future Services">
            {futureServices.map((f) => (
              <li key={f.title} className="text-sm text-pastel-100/70">
                {f.title}
                <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-pastel-300">
                  Soon
                </span>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-sm text-pastel-100/70 sm:flex-row sm:items-center">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p className="text-pastel-100/60">
            Understand the numbers. Understand the business. Make better decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-pastel-100/75 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
