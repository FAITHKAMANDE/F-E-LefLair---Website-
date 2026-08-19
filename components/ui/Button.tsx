import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  // Strongest — primary CTA
  primary:
    "bg-burgundy text-white shadow-card hover:bg-burgundy-700 hover:shadow-card-hover hover:-translate-y-0.5 focus-visible:outline-burgundy",
  // Secondary — pastel-tinted, clearly lighter than primary
  secondary:
    "bg-pastel-200 text-burgundy-800 hover:bg-pastel-300 hover:-translate-y-0.5 focus-visible:outline-burgundy",
  // Outline — quiet third action
  outline:
    "border border-burgundy/25 text-burgundy hover:border-burgundy hover:bg-burgundy-50 focus-visible:outline-burgundy",
  // Ghost — text-like
  ghost:
    "text-burgundy hover:bg-burgundy-50 focus-visible:outline-burgundy",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5 sm:text-base",
  lg: "text-base px-7 py-3.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
