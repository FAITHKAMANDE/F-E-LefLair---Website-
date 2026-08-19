import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with F’E LefLair. Book a consultation, or reach out via WhatsApp, email, LinkedIn or social media.",
};

export default function ContactPage() {
  return (
    <>
      <Contact headingAs="h1" pageStart />
    </>
  );
}
