import { cn } from "@/lib/utils";

/** Consistent horizontal gutters + max width for every section. */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}) {
  return <Tag className={cn("container", className)}>{children}</Tag>;
}
