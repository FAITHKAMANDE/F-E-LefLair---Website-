import { isDateKey, isTimeSlot, isClosedDay } from "@/lib/booking";
import { isAdmin } from "@/lib/server/admin-session";
import { getBookingsRepo } from "@/lib/server/bookings-repo";
import { fail, json, parseRange, readJson, serverError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

/** Admin: every confirmed booking and block in the range, with contact details. */
export async function GET(req: Request) {
  if (!isAdmin()) return fail(401, "Please sign in.");
  const range = parseRange(new URL(req.url));
  if ("error" in range) return fail(400, range.error);
  try {
    return json({ bookings: await getBookingsRepo().listConfirmed(range.from, range.to) });
  } catch (err) {
    return serverError(err);
  }
}

/** Admin: block off a slot so nobody can book it. */
export async function POST(req: Request) {
  if (!isAdmin()) return fail(401, "Please sign in.");
  const body = await readJson(req);
  const date = body?.date;
  const time = body?.time;
  if (!isDateKey(date) || !isTimeSlot(time) || isClosedDay(date)) {
    return fail(400, "That slot doesn’t exist.");
  }
  try {
    const result = await getBookingsRepo().create({
      kind: "block",
      date,
      time,
      note: typeof body?.note === "string" ? body.note.slice(0, 1000) : null,
    });
    if (!result.ok) return fail(409, "That slot is already taken.");
    return json({ ok: true, booking: result.booking }, 201);
  } catch (err) {
    return serverError(err);
  }
}
