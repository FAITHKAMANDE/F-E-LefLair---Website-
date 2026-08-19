"use client";

import { Button } from "@/components/ui/Button";
import type { TemplateTier } from "@/lib/content";
import { useTemplateRequest } from "./TemplateRequestProvider";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

/** Opens the template purchase flow (delivery choice → payment). */
export function TemplateRequestButton({
  templateName,
  tier,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  templateName: string;
  tier: TemplateTier;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { open } = useTemplateRequest();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => open(templateName, tier)}
    >
      {children}
    </Button>
  );
}
