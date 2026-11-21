import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AdminLogin } from "@/components/booking/admin/AdminLogin";
import { AdminSchedule } from "@/components/booking/admin/AdminSchedule";
import { adminConfigured, isAdmin } from "@/lib/server/admin-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bookings admin",
  robots: { index: false, follow: false },
};

export default function BookingsAdminPage() {
  const signedIn = isAdmin();

  return (
    <section className="pb-20 pt-28 sm:pt-32">
      <Container>
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">
            Admin
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Bookings schedule
          </h1>
        </div>
        {signedIn ? <AdminSchedule /> : <AdminLogin configured={adminConfigured()} />}
      </Container>
    </section>
  );
}
