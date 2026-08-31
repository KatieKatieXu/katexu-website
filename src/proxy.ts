import { NextRequest, NextResponse } from "next/server";

// ── Case-study gate ─────────────────────────────────────────────────────────
// Everything under /decks/* — the case-study HTML and every image/video
// inside them — requires a one-time password. The password lives in the
// DECK_PASSWORD env var (set it in Vercel → Project → Settings → Environment
// Variables, and in .env.local for dev). The cookie stores a hash of the
// password, so changing the password invalidates everyone's access at once.
// If DECK_PASSWORD is unset the gate stays open (fail-open), so a missing
// env var can never lock recruiters out silently — but set it!

const COOKIE = "deck_access";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function proxy(req: NextRequest) {
  const password = process.env.DECK_PASSWORD;
  if (!password) return NextResponse.next();

  const expected = await sha256(password);
  if (req.cookies.get(COOKIE)?.value === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = "?next=" + encodeURIComponent(req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = { matcher: "/decks/:path*" };
