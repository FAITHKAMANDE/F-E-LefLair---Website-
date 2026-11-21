import type { TakenSlots } from "@/lib/booking";
import { getBookingsRepo } from "@/lib/server/bookings-repo";
import { fail, json, parseRange, serverError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

/**
 * Public: which slots are taken between `from` and `to`.
 * Returns only dates + times — never who booked them.
 */
export async function GET(req: Request) {
  const range = parseRange(new URL(req.url));
  if ("error" in range) return fail(400, range.error);

  try {
    const rows = await getBookingsRepo().listConfirmed(range.from, range.to);
    const taken: TakenSlots = {};
    for (const r of rows) (taken[r.date] ??= []).push(r.time);
    return json({ taken });
  } catch (err) {
    return serverError(err);
  }
}
