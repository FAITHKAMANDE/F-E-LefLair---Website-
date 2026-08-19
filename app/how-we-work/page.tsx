import type { Metadata } from "next";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Our process, from meeting the business to monitoring results. Whether you have existing data or none yet, every path leads to insight and practical action.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <HowWeWork headingAs="h1" pageStart />
      <WhyChooseUs />
    </>
  );
}
