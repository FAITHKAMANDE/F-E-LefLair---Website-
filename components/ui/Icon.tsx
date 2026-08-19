import { icons, type IconName } from "@/lib/icons";

/** Resolves a content icon name to a Lucide component. */
export function Icon({
  name,
  className,
  strokeWidth = 1.75,
  "aria-hidden": ariaHidden = true,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
}) {
  const Cmp = icons[name];
  if (!Cmp) return null;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden={ariaHidden} />;
}
