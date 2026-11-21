import { isAdmin } from "@/lib/server/admin-session";
import { getBookingsRepo } from "@/lib/server/bookings-repo";
import { fail, json, serverError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

/** Admin: cancel a booking or remove a block (frees the slot). */
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return fail(401, "Please sign in.");
  try {
    const ok = await getBookingsRepo().cancel(params.id);
    if (!ok) return fail(404, "Booking not found or already cancelled.");
    return json({ ok: true });
  } catch (err) {
    return serverError(err);
  }
}
