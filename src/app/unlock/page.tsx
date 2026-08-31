"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

// The gate in front of /decks/*. Styled in the site's own language:
// paper white, ink text, quiet grey, round controls.
function UnlockForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong">("idle");

  // Only ever return visitors into the decks — never to an arbitrary URL.
  const rawNext = params.get("next") ?? "/decks/";
  const next = rawNext.startsWith("/decks/") ? rawNext : "/decks/";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || state === "checking") return;
    setState("checking");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = next;
    } else {
      setState("wrong");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-[420px]">
        <p className="text-[15px] font-semibold uppercase tracking-[0.9px] text-[#888]">
          Case studies
        </p>
        <h1 className="mt-3 text-[28px] font-medium leading-[1.25] text-[#111]">
          This work is password-protected.
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-[#777]">
          The password is in my resume and outreach emails. Don&rsquo;t have
          it?{" "}
          <a
            href="mailto:katherinexu09@gmail.com?subject=Case%20study%20access"
            className="text-[#111] underline underline-offset-2 hover:text-[#777] transition-colors"
          >
            Email me
          </a>{" "}
          and I&rsquo;ll send it over.
        </p>
        <form onSubmit={submit} className="mt-8 flex gap-2">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (state === "wrong") setState("idle");
            }}
            placeholder="Password"
            autoFocus
            aria-label="Case study password"
            className="h-11 flex-1 rounded-full border border-[#e6e6e6] bg-white px-5 text-[15px] text-[#111] outline-none placeholder:text-[#aaa] focus:border-[#111] transition-colors"
          />
          <button
            type="submit"
            disabled={state === "checking"}
            className="h-11 shrink-0 rounded-full bg-[#111] px-6 text-[15px] font-medium text-white hover:bg-black disabled:opacity-50 transition-colors"
          >
            {state === "checking" ? "…" : "Unlock"}
          </button>
        </form>
        {state === "wrong" && (
          <p className="mt-3 text-[14px] leading-[1.6] text-[#b3261e]">
            That password didn&rsquo;t match — check for typos, or email me for
            the current one.
          </p>
        )}
        <p className="mt-10 text-[14px] leading-[1.6] text-[#aaa]">
          <a href="/" className="hover:text-[#111] transition-colors">
            ← Back to katexu.com
          </a>
        </p>
      </div>
    </main>
  );
}

export default function UnlockPage() {
  return (
    <Suspense>
      <UnlockForm />
    </Suspense>
  );
}
