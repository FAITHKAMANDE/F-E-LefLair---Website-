import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Single-password admin session: a signed, httpOnly cookie holding an expiry.
 * Requires ADMIN_PASSWORD and ADMIN_SESSION_SECRET (long random string).
 */

export const ADMIN_COOKIE = "fe_admin";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

const sha = (v: string) => createHash("sha256").update(v).digest();

export function passwordMatches(input: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  // Hash both sides so lengths match, then compare in constant time.
  return timingSafeEqual(sha(input), sha(expected));
}

function sign(payload: string): string {
  return createHmac("sha256", secret()!).update(payload).digest("base64url");
}

export function createSessionToken(): { token: string; maxAge: number } {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS);
  return { token: `${exp}.${sign(exp)}`, maxAge: MAX_AGE_SECONDS };
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expected = Buffer.from(sign(exp));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  return Number(exp) > Date.now() / 1000;
}

/** For server components and route handlers. */
export function isAdmin(): boolean {
  return isValidSessionToken(cookies().get(ADMIN_COOKIE)?.value);
}

export const sessionCookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge,
});
