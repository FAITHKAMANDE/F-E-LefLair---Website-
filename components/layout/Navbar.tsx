"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BookConsultationButton } from "@/components/booking/BookConsultationButton";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Sticky navbar changes appearance once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change + lock body scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth",
        scrolled || open
          ? "border-b border-ink/[0.06] bg-cream/85 backdrop-blur-md shadow-[0_1px_20px_-12px_rgba(30,23,25,0.3)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container flex h-16 items-center justify-between gap-4 lg:h-20"
      >
        <Logo withTagline />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-burgundy"
                    : "text-ink-soft hover:text-burgundy",
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-burgundy" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <BookConsultationButton size="sm" />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg text-burgundy transition-colors hover:bg-burgundy-50 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-ink/[0.06] bg-cream transition-[max-height,opacity] duration-300 ease-smooth lg:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="container flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-burgundy-50 text-burgundy"
                    : "text-ink-soft hover:bg-burgundy-50 hover:text-burgundy",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 px-1">
            <BookConsultationButton
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
