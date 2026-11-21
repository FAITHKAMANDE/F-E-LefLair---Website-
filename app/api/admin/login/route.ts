import {
  ADMIN_COOKIE,
  adminConfigured,
  createSessionToken,
  passwordMatches,
  sessionCookieOptions,
} from "@/lib/server/admin-session";
import { fail, json, readJson } from "@/lib/server/http";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return fail(503, "Admin login isn’t set up: add ADMIN_PASSWORD and ADMIN_SESSION_SECRET.");
  }
  const body = await readJson(req);
  if (!passwordMatches(body?.password)) {
    // Small delay blunts password guessing.
    await new Promise((r) => setTimeout(r, 600));
    return fail(401, "Incorrect password.");
  }
  const { token, maxAge } = createSessionToken();
  const res = json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions(maxAge));
  return res;
}
