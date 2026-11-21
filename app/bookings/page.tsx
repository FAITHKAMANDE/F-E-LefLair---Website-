import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { BookingScheduler } from "@/components/booking/BookingScheduler";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Pick a day and time that suits you for a consultation with F’E LefLair. See live availability and book in under a minute.",
};

export default function BookingsPage() {
  return (
    <>
      <PageHero
        eyebrow="Bookings"
        title="Book a consultation"
        description="See which times are open, pick one that suits you, and we’ll take it from there."
      />
      <section className="pb-20 lg:pb-28">
        <Container>
          <BookingScheduler />
        </Container>
      </section>
    </>
  );
}
