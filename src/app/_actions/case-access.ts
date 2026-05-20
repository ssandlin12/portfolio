"use server";

// Password gating for /fluent and /teams. Everything in this file runs
// server-side only — the password and session token are NEVER bundled into
// client code or sent over the wire to the browser. Verification happens
// here; the browser only ever sees the form input and an HttpOnly cookie.
//
// The cookie value is an unguessable random session token (not "true" or
// "1") so a curious user can't bypass the gate by manually setting the
// cookie in devtools — they'd need to know the token, which only the
// server holds.
//
// Set CASE_STUDY_PASSWORD and CASE_STUDY_SESSION_TOKEN in `.env.local` for
// local dev, and in the host's env (e.g. Vercel project settings) for
// production. The hardcoded fallbacks below exist so the dev experience
// works out of the box; in production prefer real env vars.

import { cookies } from "next/headers";

const PASSWORD = process.env.CASE_STUDY_PASSWORD ?? "annaportfolio2026";
const SESSION_TOKEN =
  process.env.CASE_STUDY_SESSION_TOKEN ??
  "0cfc47472705423eafa1b34db96713988742f2111287828389d076a89fd84c19";
const COOKIE_NAME = "case-access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type CaseAccessState = { ok: boolean; error?: string };

export async function submitCasePassword(
  _prev: CaseAccessState | null,
  formData: FormData,
): Promise<CaseAccessState> {
  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0) {
    return { ok: false, error: "Password is required" };
  }
  if (password !== PASSWORD) {
    return { ok: false, error: "Incorrect password" };
  }
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, SESSION_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
  return { ok: true };
}

export async function hasCaseAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === SESSION_TOKEN;
}
