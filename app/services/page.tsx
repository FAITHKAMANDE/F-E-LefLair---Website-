import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceSections } from "@/components/sections/ServiceSections";
import { FutureServices } from "@/components/sections/FutureServices";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business Intelligence, Business Consulting, Dashboards & Analytics, and Business Systems. Practical services to help you understand and act on your numbers.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Practical solutions for businesses that want to decide with facts"
        description="Whether you’re just starting to track your data or already have systems in place, we help you uncover insights, measure performance and understand what to do next."
        tone="blush"
        align="center"
      />
      <ServiceSections />
      <FutureServices />
    </>
  );
}
