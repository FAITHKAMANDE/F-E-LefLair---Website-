import { ADMIN_COOKIE, sessionCookieOptions } from "@/lib/server/admin-session";
import { json } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function POST() {
  const res = json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", sessionCookieOptions(0));
  return res;
}
