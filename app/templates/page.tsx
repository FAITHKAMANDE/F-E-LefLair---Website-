import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TemplateShowcase } from "@/components/sections/TemplateShowcase";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { TemplateRequestProvider } from "@/components/templates/TemplateRequestProvider";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Ready-to-use business systems and templates, starting with Boutique Sales Inventory and Shoes Sales Inventory. Book a free demo to see them in action.",
};

export default function TemplatesPage() {
  return (
    <TemplateRequestProvider>
      <PageHero
        eyebrow="Templates"
        title="Trackers built for real shops, not spreadsheet experts"
        description="Each template is a working system: fill in what you sell, and it tells you what’s moving, what’s tying up cash and what you actually earned. Start with the template, add setup help, or ask us to build it around your business."
        tone="blush"
      />
      <TemplateShowcase />
      <ContactCTA
        title={
          <>
            Want the tracker shaped around{" "}
            <span className="text-burgundy">your own stock?</span>
          </>
        }
        description="Custom builds cover multiple branches, wholesale pricing and reporting specific to how you sell. Let’s talk through what would help most."
        showExploreSolutions={false}
      />
    </TemplateRequestProvider>
  );
}
