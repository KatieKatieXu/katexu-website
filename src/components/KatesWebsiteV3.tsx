"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";
import { AnimatePresence } from "framer-motion";
import KatesWebsiteV2, {
  projects,
  workflows,
  ExternalLink,
  type Project,
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

const navClass =
  "text-[#555] hover:text-[#111] underline underline-offset-[3px] decoration-[#d8d8d8] hover:decoration-[#111] transition-colors";

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
        <p className="text-[14px] leading-[1.6] text-[#111] mb-6">
          I design enterprise products where complexity is highest
          <span className="text-[#9a9a9a]"> — cloud platforms, approval systems, AI tooling — </span>
          and I ship them myself, from Figma through production code.
        </p>

        {/* links */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] mb-8">
          <Link href="/resume" className={navClass} onClick={() => track("v3_nav", { href: "/resume" })}>
            Resume
          </Link>
          <Link href="/how-i-think" className={navClass} onClick={() => track("v3_nav", { href: "/how-i-think" })}>
            How I Think
          </Link>
          <Link href="/lab" className={navClass} onClick={() => track("v3_nav", { href: "/lab" })}>
            Visual Lab
          </Link>
          <ExternalLink href={`mailto:${EMAIL}`}>Email</ExternalLink>
          <ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink>
        </nav>

        {/* how I work — framed, neutral until the layout is settled */}
        <div className="rounded-[14px] border border-[#e8e8e8] bg-[#fafafa] p-5 mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#888] mb-4">
            How I ship with engineers
          </p>
          <div className="flex flex-col gap-4">
            {workflows.map((w) => (
              <div key={w.title}>
                <p className="text-[13.5px] font-semibold text-[#1a1a1a] mb-1">{w.title}</p>
                <p className="text-[12px] text-[#777] leading-snug">{w.flow}</p>
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


// ───────────────────────────────────────────────────────────────────────────
// Project card — a horizontal, snapping carousel of the project's media
// ───────────────────────────────────────────────────────────────────────────
type Media = { src: string; phone?: boolean };

function flattenMedia(images: Project["images"]): Media[] {
  const out: Media[] = [];
  const push = (item: unknown) => {
    if (typeof item === "string") out.push({ src: item });
    else if (item && typeof item === "object" && "src" in item)
      out.push(item as Media);
  };
  images.forEach((row) => (Array.isArray(row) ? row.forEach(push) : push(row)));
  return out;
}

function Slide({ media, title }: { media: Media; title: string }) {
  const isVideo = media.src.endsWith(".mp4") || media.src.endsWith(".webm");
  return (
    <div
      className={`snap-start shrink-0 overflow-hidden rounded-[18px] border border-[#ececec] bg-[#fafafa] ${
        media.phone ? "w-[300px]" : "w-[86%] max-w-[860px]"
      }`}
    >
      {isVideo ? (
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            void e.currentTarget.play();
          }}
          className="w-full h-auto block"
        />
      ) : (
        <img src={media.src} alt={title} loading="lazy" className="w-full h-auto block" />
      )}
    </div>
  );
}

function ProjectCarousel({ project }: { project: Project }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const media = flattenMedia(project.images);

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.82, behavior: "smooth" });
    track("v3_carousel_scrolled", { project: project.title, dir });
  };

  return (
    <section className="pt-6 pb-14 border-b border-[#f0f0f0] last:border-b-0">
      {/* header */}
      <div className="flex items-start justify-between gap-8 mb-4">
        <div className="min-w-0">
          <h2 className="text-[22px] font-semibold tracking-[-0.3px] text-[#111]">{project.title}</h2>
          <p className="mt-1 text-[14px] text-[#666] leading-[1.5] max-w-[620px]">{project.description}</p>
        </div>
        {media.length > 1 && (
          <div className="flex items-center gap-2 flex-shrink-0 pt-1">
            <button
              onClick={() => scrollBy(-1)}
              aria-label={`Previous ${project.title} image`}
              className="w-9 h-9 rounded-full border border-[#e2e2e2] flex items-center justify-center text-[#666] hover:border-[#111] hover:text-[#111] transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label={`Next ${project.title} image`}
              className="w-9 h-9 rounded-full border border-[#e2e2e2] flex items-center justify-center text-[#666] hover:border-[#111] hover:text-[#111] transition-colors"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* rail */}
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth -mx-1 px-1 pb-2"
      >
        {media.map((m) => (
          <Slide key={m.src} media={m} title={project.title} />
        ))}
      </div>

      {/* actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => {
            setOpen((v) => !v);
            track("v3_key_decisions_toggled", { project: project.title, open: !open });
          }}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#111] text-white px-4 py-1.5 text-[12px] font-medium hover:bg-black transition-colors"
        >
          <span
            className="text-[13px] leading-none text-[#00bc7d] transition-transform duration-300"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-hidden
          >
            +
          </span>
          {open ? "Hide key decisions" : "Key decisions"}
        </button>
        {project.caseStudyUrl && (
          <Link
            href={project.caseStudyUrl}
            className="inline-flex items-center gap-1 rounded-full border border-[#00bc7d] text-[#00915f] px-4 py-1.5 text-[12px] font-medium hover:bg-[#e6f7f0] transition-colors"
          >
            Full case study →
          </Link>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-[#f1f1f0] hover:bg-[#e9e9e6] px-4 py-1.5 text-[12px] font-medium text-[#555] transition-colors"
          >
            {project.liveLabel ?? "Try it live"} ↗
          </a>
        )}
      </div>

      {/* decisions */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="decisions"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5 flex flex-col gap-4 max-w-[760px]">
              {project.reflection.map((d) => (
                <div key={d.title}>
                  <p className="text-[14px] font-semibold text-[#111] mb-1">{d.title}</p>
                  <p className="text-[13.5px] text-[#666] leading-[1.6]">{d.body}</p>
                </div>
              ))}
              <p className="text-[12.5px] text-[#999] pt-1">{project.collaborators}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
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
              <ProjectCarousel key={project.key} project={project} />
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
