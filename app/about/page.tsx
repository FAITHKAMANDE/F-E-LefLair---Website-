import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Principles } from "@/components/sections/Principles";
import { CoreValues } from "@/components/sections/CoreValues";
import { Beliefs } from "@/components/sections/Beliefs";
import { Founder } from "@/components/sections/Founder";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Faith Kamande founded F’E LefLair to close the gap between the data businesses collect and the decisions they need to make.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We exist so business owners never have to guess"
        description="Faith Kamande founded F’E LefLair to close the gap between the data businesses collect and the decisions they need to make."
        tone="blush"
        align="center"
      />
      <Principles />
      <CoreValues />
      <Beliefs />
      <Founder />
      <ContactCTA
        title={
          <>
            Let&apos;s make the{" "}
            <span className="text-burgundy">million-dollar difference</span> in
            your business.
          </>
        }
        description="It often comes down to one clear decision at the right moment. Let’s understand what your numbers are telling you, and turn it into your next smart move."
        showViewTemplates
      />
    </>
  );
}
