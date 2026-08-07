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

function TopBar() {
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
    <header className="flex items-start justify-between gap-14 pt-20 pb-10">
      {/* identity + brief + links */}
      <div className="min-w-0 max-w-[620px]">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="relative w-[62px] select-none flex-shrink-0">
            <img src={AVATAR_ASTRONAUT} alt="Kate Xu" className="w-full h-auto block" />
            {playHello ? (
              <motion.img
                src={AVATAR_BUBBLE}
                alt=""
                aria-hidden
                className="absolute block"
                style={{ left: "56.1%", top: "6.4%", width: "43.6%" }}
                initial={{ y: -38, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 340, damping: 10, mass: 0.8, delay: 0.25 }}
              />
            ) : (
              <img
                src={AVATAR_BUBBLE}
                alt=""
                aria-hidden
                className="absolute block"
                style={{ left: "56.1%", top: "6.4%", width: "43.6%" }}
              />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-[18px] font-semibold leading-tight text-[#111]">
              Kate Xu — Product Designer &amp; Builder
            </h1>
            <p className="text-[13.5px] text-[#888] leading-snug">
              Enterprise products, shipped end to end — Figma through production code.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13.5px] pl-[76px]">
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
      </div>

      {/* my latest workflow */}
      <div className="flex-shrink-0 max-w-[560px] rounded-[16px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_36px_-24px_rgba(0,0,0,0.18)] px-5 py-4">
        <p className="text-[10.5px] font-semibold uppercase tracking-[1.5px] text-[#888] mb-3">
          My latest workflow
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {workflows.map((w) => (
            <div key={w.title}>
              <p className="text-[13px] font-semibold text-[#1a1a1a] leading-snug mb-0.5">{w.title}</p>
              <p className="text-[11.5px] text-[#777] leading-snug">{w.flow}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
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

function Slide({
  media,
  title,
  caption,
}: {
  media: Media;
  title: string;
  caption?: string;
}) {
  const isVideo = media.src.endsWith(".mp4") || media.src.endsWith(".webm");
  return (
    <figure
      className={`snap-start shrink-0 m-0 ${media.phone ? "w-[340px]" : "w-[74%] max-w-[1080px]"}`}
    >
      <div className="overflow-hidden rounded-[20px] bg-[#f5f5f7] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_36px_-24px_rgba(0,0,0,0.18)]">
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
      {caption && (
        <figcaption className="mt-7 text-[13px] leading-[1.55] text-[#777] max-w-[460px]">
          <span className="font-semibold text-[#111]">{title}</span> {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ProjectCarousel({ project }: { project: Project }) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const media = flattenMedia(project.images);

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * rail.clientWidth * 0.76, behavior: "smooth" });
    track("v3_carousel_scrolled", { project: project.title, dir });
  };

  return (
    <section className="pt-2 pb-12 border-b border-[#f2f2f4] last:border-b-0">
      {/* title only — the description rides under each slide, Apple-style */}
      <h2 className="text-[22px] font-semibold tracking-[-0.4px] text-[#111] mb-4 pt-8">{project.title}</h2>

      {/* rail */}
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth -mx-1 px-1 pb-1"
      >
        {media.map((m, i) => (
          <Slide
            key={m.src}
            media={m}
            title={project.title}
            caption={i === 0 ? project.description : undefined}
          />
        ))}
      </div>

      {/* controls under the rail, right-aligned */}
      {media.length > 1 && (
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label={`Previous ${project.title} image`}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[14px] text-[#6e6e73] hover:bg-[#ebebef] hover:text-[#111] transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label={`Next ${project.title} image`}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[14px] text-[#6e6e73] hover:bg-[#ebebef] hover:text-[#111] transition-colors"
          >
            ›
          </button>
        </div>
      )}

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
            className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f7] hover:bg-[#ebebef] px-4 py-1.5 text-[12px] font-medium text-[#555] transition-colors"
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

      {/* ── desktop: one wide column, the work as close to the fold as possible ── */}
      <div className="hidden md:block min-h-screen bg-white text-[#111]">
        <div className="mx-auto w-full max-w-[1440px] px-10">
          <TopBar />
          <main>
            {projects.map((project) => (
              <ProjectCarousel key={project.key} project={project} />
            ))}
          </main>
          <footer className="py-10 flex items-center justify-between border-t border-[#f0f0f0]">
            <div className="flex items-center gap-5 text-[13.5px]">
              <ExternalLink href={`mailto:${EMAIL}`}>Email</ExternalLink>
              <ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink>
            </div>
            <p className="text-[12.5px] text-[#aaa]">© Kate Xu 2026</p>
          </footer>
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
