"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { TemplateTier } from "@/lib/content";
import { TemplateRequestModal, type RequestTarget } from "./TemplateRequestModal";

type Ctx = {
  open: (templateName: string, tier: TemplateTier) => void;
  close: () => void;
};

const TemplateRequestContext = createContext<Ctx | null>(null);

/** Wraps the Templates page so tier buttons can open the purchase modal. */
export function TemplateRequestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [target, setTarget] = useState<RequestTarget>(null);

  const open = useCallback(
    (templateName: string, tier: TemplateTier) =>
      setTarget({ templateName, tier }),
    [],
  );
  const close = useCallback(() => setTarget(null), []);

  return (
    <TemplateRequestContext.Provider value={{ open, close }}>
      {children}
      <TemplateRequestModal target={target} onClose={close} />
    </TemplateRequestContext.Provider>
  );
}

export function useTemplateRequest(): Ctx {
  const ctx = useContext(TemplateRequestContext);
  if (!ctx) {
    throw new Error(
      "useTemplateRequest must be used within a TemplateRequestProvider",
    );
  }
  return ctx;
}
