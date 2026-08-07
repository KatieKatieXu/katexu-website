"use client";

import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import posthog from "posthog-js";
import KatesWebsiteV2, {
  projects,
  workflows,
  ProjectBlock,
  ExternalLink,
} from "@/components/KatesWebsiteV2";

// ───────────────────────────────────────────────────────────────────────────
// V3 — desktop only: a two-column portfolio.
//   left  · a sticky identity column (who I am, how I work, the numbers)
//   right · the work itself, scrolling past it
// Below md the page renders V2 untouched, so mobile is unchanged.
// ───────────────────────────────────────────────────────────────────────────
const EMAIL = "katherinexu09@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/katherinexu99/";
const AVATAR_ASTRONAUT = "/kate-avatar-astronaut.png";
const AVATAR_BUBBLE = "/kate-avatar-bubble.png";

function track(event: string, props?: Record<string, unknown>) {
  try {
    posthog.capture(event, props);
  } catch {
    /* no-op */
  }
}

const STATS: [string, string][] = [
  ["8 yrs", "Enterprise product design"],
  ["12+", "Teams on the design system"],
  ["5", "AI products shipped solo"],
  ["4.8★", "App Store rating"],
];

function LeftColumn() {
  const [playHello, setPlayHello] = useState(false);
  useLayoutEffect(() => {
    try {
      if (!window.sessionStorage.getItem("v3_hello_played")) {
        window.sessionStorage.setItem("v3_hello_played", "1");
        setPlayHello(true);
      }
    } catch {
      /* private mode */
    }
  }, []);

  return (
    <aside className="w-[400px] xl:w-[440px] flex-shrink-0">
      <div className="sticky top-0 h-screen overflow-y-auto no-scrollbar pr-8 py-10 flex flex-col">
        {/* identity */}
        <div className="flex items-center gap-4 mb-7">
          <div className="relative w-[76px] select-none flex-shrink-0">
            <img src={AVATAR_ASTRONAUT} alt="Kate Xu" className="w-full h-auto block" />
            {playHello && (
              <motion.img
                src={AVATAR_BUBBLE}
                alt=""
                aria-hidden
                className="absolute block"
                style={{ left: "56.1%", top: "6.4%", width: "43.6%" }}
                initial={{ y: -46, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 340, damping: 10, mass: 0.8, delay: 0.3 }}
              />
            )}
          </div>
          <div>
            <h1 className="text-[19px] font-semibold leading-tight text-[#111]">Kate Xu</h1>
            <p className="text-[14px] text-[#888]">Product Designer &amp; Builder</p>
          </div>
        </div>

        {/* statement */}
        <p className="text-[17px] leading-[1.55] text-[#111] mb-6">
          I design enterprise products where complexity is highest
          <span className="text-[#9a9a9a]"> — cloud platforms, approval systems, AI tooling — </span>
          and I ship them myself, from Figma through production code.
        </p>

        {/* availability + contact */}
        <div className="flex items-center gap-2 mb-5">
          <span className="w-[7px] h-[7px] rounded-full bg-[#00bc7d] inline-block" />
          <span className="text-[13px] text-[#666]">Open to senior &amp; staff design roles</span>
        </div>
        <a
          href={`mailto:${EMAIL}`}
          onClick={() => track("v3_get_in_touch_clicked")}
          className="inline-flex items-center justify-center self-start rounded-full bg-[#111] text-white px-5 py-2.5 text-[13px] font-medium hover:bg-black transition-colors mb-8"
        >
          Get in touch
        </a>

        {/* how I work */}
        <div className="border-t border-[#ececec] pt-6 mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#00915f] mb-4">
            How I ship with engineers
          </p>
          <div className="flex flex-col gap-4">
            {workflows.map((w) => (
              <div key={w.title}>
                <p className="text-[14px] font-semibold text-[#1a1a1a] mb-0.5">{w.title}</p>
                <p className="text-[12px] font-medium text-[#00915f] leading-snug">{w.flow}</p>
              </div>
            ))}
          </div>
        </div>

        {/* the numbers */}
        <div className="border-t border-[#ececec] pt-6 mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#999] mb-4">
            About me
          </p>
          <p className="text-[14px] leading-[1.6] text-[#555] mb-5">
            VP &amp; Design Lead at Bank of America, Cognitive Science at UC San Diego, and a year of
            shipping AI-native products end to end as a sole designer and developer.
          </p>
          <dl className="flex flex-col gap-2">
            {STATS.map(([value, label]) => (
              <div key={label} className="flex items-baseline gap-3 text-[13px]">
                <dt className="w-[58px] font-semibold text-[#111] tabular-nums">{value}</dt>
                <dd className="text-[#777]">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* footer pinned to the bottom of the column */}
        <div className="mt-auto border-t border-[#ececec] pt-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[13px]">
            <ExternalLink href={`mailto:${EMAIL}`}>Email</ExternalLink>
            <ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink>
          </div>
          <p className="text-[12px] text-[#aaa]">© 2026</p>
        </div>
      </div>
    </aside>
  );
}

export default function KatesWebsiteV3() {
  return (
    <>
      {/* ── mobile: unchanged V2 ── */}
      <div className="md:hidden">
        <KatesWebsiteV2 />
      </div>

      {/* ── desktop: two columns ── */}
      <div className="hidden md:block min-h-screen bg-white text-[#111]">
        <div className="mx-auto w-full max-w-[1560px] px-10 flex gap-12">
          <LeftColumn />
          <main className="flex-1 min-w-0 py-10">
            {projects.map((project) => (
              <ProjectBlock key={project.key} project={project} />
            ))}
            <div className="h-24" />
          </main>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
