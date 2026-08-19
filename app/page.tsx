import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Services } from "@/components/sections/Services";
import { HowWeWorkSummary } from "@/components/sections/HowWeWorkSummary";
import { WhyChooseUsSummary } from "@/components/sections/WhyChooseUsSummary";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Services />
      <HowWeWorkSummary />
      <WhyChooseUsSummary />
      <ContactCTA
        title={
          <>
            Ready to understand what your numbers are{" "}
            <span className="text-burgundy">telling you?</span>
          </>
        }
        description="Book a consultation and we’ll look at what you track today, what’s missing, and the fastest path to clarity. Let’s start with a conversation."
        showViewTemplates
      />
    </>
  );
}
