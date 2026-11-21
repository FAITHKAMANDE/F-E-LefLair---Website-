import { slotRejection, zonedNow } from "@/lib/booking";
import { getBookingsRepo } from "@/lib/server/bookings-repo";
import { fail, json, readJson, serverError } from "@/lib/server/http";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

/** Public: book a consultation slot. */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return fail(400, "Invalid request.");

  // Honeypot: real people never fill the hidden "website" field.
  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true }, 201);
  }

  const date = String(body.date ?? "");
  const time = String(body.time ?? "");
  const rejection = slotRejection(date, time, zonedNow());
  if (rejection) return fail(400, rejection);

  const name = text(body.name, 100);
  const email = text(body.email, 200);
  if (!name) return fail(400, "Please add your name.");
  if (!email || !EMAIL_RE.test(email)) return fail(400, "Please add a valid email.");

  try {
    const result = await getBookingsRepo().create({
      kind: "booking",
      date,
      time,
      name,
      email,
      phone: text(body.phone, 40),
      note: text(body.note, 1000),
    });
    if (!result.ok) {
      return fail(409, "Sorry — that slot was just taken. Please pick another time.");
    }
    const { id } = result.booking;
    // TODO: send confirmation emails (customer + business) here.
    return json({ ok: true, booking: { id, date, time } }, 201);
  } catch (err) {
    return serverError(err);
  }
}
