"use client";

import { useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";
import { AnimatePresence } from "framer-motion";
import KatesWebsiteV2, {
  projects,
  workflows,
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
const PORTRAIT = "/kate-photo.jpg";

function track(event: string, props?: Record<string, unknown>) {
  try {
    posthog.capture(event, props);
  } catch {
    /* no-op */
  }
}

// ── Type scale — three sizes, plus one exception ───────────────────────────
//   display  clamp(96px, 11.1vw, 160px)   "Kate Xu" only. The exception.
//   1 title  22px   project names — the biggest thing on the page
//   2 body   15px   everything else: nav, labels, workflow titles, pills, footer
//   3 desc   14px   descriptions only: captions, flows, decision bodies, credits
//                  14px is the floor — nothing on the page renders smaller.
// Weight and color carry the hierarchy that size used to. Do not add a fourth.
//
// Radius follows one rule: SURFACES are sharp, CONTROLS are round.
//   4px    things that hold content — media wells, the header portrait
//   full   things you press — action buttons, carousel arrows, the glass nav
// Two values, and which one applies is never a judgement call.
//
// Leading is a system too — one value per step, never ad hoc:
//   display 1.0    a single line; extra leading is just dead box
//   title   1.25
//   body    1.45
//   desc    1.6    descriptions are read, not scanned — they get the most air
//
// Tracking scales INVERSELY with size. The uppercase label was tuned at 10.5px
// with 1.5px; at 15px that reads as shouting, so it drops to 0.9px.
// ───────────────────────────────────────────────────────────────────────────

// Nav links: no underline, full ink, and a quiet fade on hover (Figma 42:239 —
// every link is #111 with textDecoration NONE). The hover fade is the affordance
// the underline used to provide.
const navClass = "text-[#111] hover:text-[#777] transition-colors";

// V3's own external link. Deliberately NOT the ExternalLink exported from V2 —
// that one is shared with the mobile site and must keep its underline.
function ExternalLinkV3({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-0.5 ${navClass}`}
      onClick={() => track("v3_nav", { href })}
    >
      {children}
      <span aria-hidden className="text-[0.93em] translate-y-[-1px]">
        ↗
      </span>
    </a>
  );
}

// ── Scroll reveal, learned from apple.com/mac ──────────────────────────────
// Apple's sequence is always the same: the heading resolves first, then the
// media follows a beat later. Nothing arrives at the same time, and nothing
// bounces — a single long ease-out, no spring.
//   ease      cubic-bezier(0.28, 0.11, 0.32, 1)  — long tail, no overshoot
//   title     y 24 -> 0 over 0.7s
//   media     x -40 -> 0 over 0.9s, staggered 0.12s apart, left to right
//   trigger   once, at 20% visible
const EASE = [0.28, 0.11, 0.32, 1] as const;

const sectionReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.02 } },
};

const titleReveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// The rail itself is a stagger parent; each slide slides in from the left, so
// the row assembles in reading order rather than appearing all at once.
const railReveal = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const slideReveal = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

// Where the header hands off to the floating pill. The photo shrinks toward its
// top-right corner and fades out over this range; the pill springs in at the end.
const HANDOFF_START = 120;
const HANDOFF_END = 260;

function TopBar() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const photoScale = useTransform(
    scrollY,
    [0, HANDOFF_END],
    reduce ? [1, 1] : [1, 0.6],
  );
  const photoOpacity = useTransform(
    scrollY,
    [HANDOFF_START, HANDOFF_END],
    reduce ? [1, 1] : [1, 0],
  );

  return (
    <header
      className="pt-6 pb-0"
      // --name-size drives the display type; --name-width is its measured ink
      // width, which the nav group below inherits so the two can never drift.
      // 3.4955 = ink width per unit font-size for "Kate Xu" in Instrument Sans
      // SemiBold at zero tracking (measured in Figma, node 33:62). Re-measure if
      // the family, weight, tracking, or the name itself changes.
      style={
        {
          "--name-size": "clamp(96px, 11.1vw, 160px)",
          "--name-width": "calc(clamp(96px, 11.1vw, 160px) * 3.4955)",
        } as React.CSSProperties
      }
    >
      {/* ── name, with identity and portrait to the right ── */}
      <div className="flex items-start justify-between gap-10">
        <motion.h1
          className="w-fit shrink-0 font-semibold leading-[1] text-[#111] whitespace-nowrap"
          // -0.062em cancels the K's left side bearing so the ink — not the glyph
          // box — starts flush with the column edge. Scales with the clamp.
          style={{
            fontSize: "var(--name-size)",
            marginLeft: "calc(var(--name-size) * -0.062)",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Kate Xu
        </motion.h1>

        <div className="flex shrink-0 items-stretch gap-[13px]">
          <div className="flex flex-col items-end justify-between text-right">
            <p className="text-[15px] leading-[1.45] text-[#111]">
              Based in the U.S.
            </p>
            <p className="text-[15px] leading-[1.45] text-[#111]">
              8+ yrs · Product Designer &amp; Builder
            </p>
          </div>
          <motion.img
            src={PORTRAIT}
            alt="Kate Xu"
            width={136}
            height={136}
            draggable={false}
            style={{ scale: photoScale, opacity: photoOpacity, originX: 1, originY: 1 }}
            className="w-[136px] h-[136px] rounded-[4px] object-cover select-none"
          />
        </div>
      </div>

      {/* The rule sits just under the name's baseline. "Kate Xu" has no
          descenders, so the font's descender box overhangs the ink by ~12px —
          hence the negative margin. It is trimming dead box, not fixing leading. */}
      <nav className="mt-[-10px] flex items-center justify-between border-t border-[#e6e6e6] pt-5 text-[15px] leading-[1.45]">
        {/* Optical, not geometric. The group is nudged left by "Resume"'s own
            0.54-1.29px bearing and widened by "Visual Lab"'s trailing bearing, so
            the R starts and the b ends on the same verticals as the name's ink. */}
        <div
          className="flex justify-between"
          style={{
            width: "calc(var(--name-width) + 2.53px)",
            marginLeft: "-1.29px",
            maxWidth: "100%",
          }}
        >
          <Link
            href="/resume"
            className={navClass}
            onClick={() => track("v3_nav", { href: "/resume" })}
          >
            Resume
          </Link>
          <Link
            href="/how-i-think"
            className={navClass}
            onClick={() => track("v3_nav", { href: "/how-i-think" })}
          >
            How I Think
          </Link>
          <Link
            href="/lab"
            className={navClass}
            onClick={() => track("v3_nav", { href: "/lab" })}
          >
            Visual Lab
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-4 mr-[-1.04px]">
          <ExternalLinkV3 href={`mailto:${EMAIL}`}>Email</ExternalLinkV3>
          <ExternalLinkV3 href={LINKEDIN}>LinkedIn</ExternalLinkV3>
        </div>
      </nav>

      {/* ── workflow — plain text, no card, no shadow ── */}
      <div className="mt-[250px] w-[348px]">
        <p className="text-[15px] leading-[1.45] font-semibold uppercase tracking-[0.9px] text-[#888] mb-[13px]">
          My latest workflow
        </p>
        <div className="flex flex-col gap-[11px]">
          {workflows.map((w) => (
            <div key={w.title}>
              <p className="text-[15px] font-semibold leading-[1.45] text-[#1a1a1a] mb-[3px]">
                {w.title}
              </p>
              <p className="text-[14px] leading-[1.6] text-[#777]">{w.flow}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Floating nav — what the header condenses into once you scroll past it.
// The header photo shrinks and fades toward its top-right corner; this pill
// springs down from above and the avatar pops in just after, so the two read
// as one object moving rather than two separate elements.
// ───────────────────────────────────────────────────────────────────────────
const pillLink =
  "relative text-[15px] leading-[1.45] text-[#3a3a3c] hover:text-[#111] transition-colors px-2.5 py-1 rounded-full";

// Liquid glass. Four layers stacked inside one pill, back to front:
//   1. backdrop-filter   blurs + saturates whatever scrolls underneath
//   2. tint              a thin white wash so the glass has a body
//   3. refraction        a top-light / bottom-shadow gradient, the "thickness"
//   4. specular          a soft highlight that chases the pointer on a spring
// The spring lag on layer 4 is what makes it read as liquid rather than a
// hover state — the light arrives a beat after the cursor does.
function FloatingNav() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    // small hysteresis so it can't flicker on a jittery trackpad
    setShown((was) => (was ? y > HANDOFF_END - 40 : y > HANDOFF_END));
  });

  // pointer position, softened — the highlight trails the cursor
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const glareOpacity = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 260, damping: 28, mass: 0.6 });
  const so = useSpring(glareOpacity, { stiffness: 180, damping: 30 });

  const specular = useMotionTemplate`radial-gradient(120px circle at ${sx}px ${sy}px, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 45%, rgba(255,255,255,0) 72%)`;

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    glareOpacity.set(1);
  };

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.9 };

  return (
    <AnimatePresence>
      {shown && (
        <motion.nav
          key="floating-nav"
          ref={navRef}
          onMouseMove={handleMove}
          onMouseLeave={() => glareOpacity.set(0)}
          style={{ x: "-50%" }}
          initial={{ y: -72, opacity: 0, scale: 0.94 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -72, opacity: 0, scale: 0.94 }}
          transition={spring}
          className={[
            "fixed left-1/2 top-4 z-50 isolate flex items-center gap-1 overflow-hidden rounded-full p-2",
            // 1 + 2 — the glass itself. High-clarity: a whisper of tint and a
            // 4px blur, so content stays legible THROUGH the bar. The lens
            // distortion comes from the SVG filter via .v3-liquid-glass
            // (Chromium); Safari falls back to plain clear glass.
            "v3-liquid-glass bg-white/[0.16]",
            // the rim, and the light caught inside the top and bottom edges
            "ring-1 ring-white/70",
            "shadow-[0_1px_1px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,0,0,0.06)]",
          ].join(" ")}
        >
          {/* the lens — a displacement map the backdrop is pulled through.
              Referenced by .v3-liquid-glass; Chromium-only, by design. */}
          <svg aria-hidden className="absolute h-0 w-0 overflow-hidden">
            <filter
              id="v3-glass-lens"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.006 0.014"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="3" result="soft" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="soft"
                scale="46"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>

          {/* 3 — refraction: light collects at the top, shadow pools at the base */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-white/45 via-white/0 to-black/[0.03]"
          />

          {/* 4 — specular highlight, trailing the pointer */}
          <motion.div
            aria-hidden
            style={{ background: specular, opacity: so }}
            className="pointer-events-none absolute inset-0 -z-10 rounded-full"
          />

          <motion.img
            src={PORTRAIT}
            alt="Kate Xu"
            width={34}
            height={34}
            draggable={false}
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 520, damping: 26, delay: 0.06 }
            }
            className="w-[34px] h-[34px] rounded-full object-cover select-none mr-2 shadow-[0_0_0_1px_rgba(255,255,255,0.65)]"
          />

          <Link
            href="/resume"
            className={pillLink}
            onClick={() => track("v3_floating_nav", { href: "/resume" })}
          >
            Resume
          </Link>
          <Link
            href="/how-i-think"
            className={pillLink}
            onClick={() => track("v3_floating_nav", { href: "/how-i-think" })}
          >
            How I Think
          </Link>
          <Link
            href="/lab"
            className={pillLink}
            onClick={() => track("v3_floating_nav", { href: "/lab" })}
          >
            Visual Lab
          </Link>

          <a
            href={`mailto:${EMAIL}`}
            onClick={() => track("v3_floating_nav", { href: "contact" })}
            className="ml-2 rounded-full bg-[#111]/90 px-5 py-2 text-[15px] font-medium text-white backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-black transition-colors"
          >
            Contact
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
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
    <motion.figure
      variants={slideReveal}
      className={`snap-start shrink-0 m-0 ${
        media.phone ? "w-[340px]" : "w-[74%] max-w-[1080px]"
      }`}
    >
      <div className="overflow-hidden rounded-[4px] bg-[#f5f5f7] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_36px_-24px_rgba(0,0,0,0.18)]">
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
          <img
            src={media.src}
            alt={title}
            loading="lazy"
            className="w-full h-auto block"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-7 text-[14px] leading-[1.6] text-[#777] max-w-[460px]">
          <span className="font-semibold text-[#111]">{title}</span> {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function ProjectCarousel({
  project,
  first = false,
}: {
  project: Project;
  first?: boolean;
}) {
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
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionReveal}
      className={`${first ? "pt-2" : "pt-20"} pb-12 border-b border-[#f2f2f4] last:border-b-0`}
    >
      {/* Title row spans the full column: title left, section label pinned to
          the far right edge, top-aligned (Figma 42:237 / 44:277). The label uses
          the same two-tone treatment as the slide captions — bold ink, then a
          quieter regular tail. */}
      <motion.div
        variants={titleReveal}
        className="flex w-full items-center justify-between gap-6 mb-4 pt-8"
      >
        {/* the title and its actions read as one unit */}
        <div className="flex min-w-0 flex-wrap items-center gap-4">
          <h2 className="text-[22px] leading-[1.25] font-semibold tracking-[-0.4px] text-[#111]">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => {
            setOpen((v) => !v);
            track("v3_key_decisions_toggled", {
              project: project.title,
              open: !open,
            });
          }}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#111] text-white px-4 py-1.5 text-[15px] font-medium hover:bg-black transition-colors"
        >
          <span
            className="text-[15px] leading-none text-white transition-transform duration-300"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
            aria-hidden
          >
            +
          </span>
          {open ? "Hide key decisions" : "Key decisions"}
        </button>
        {project.caseStudyUrl && (
          <a
            href={project.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("v3_case_study_clicked", { project: project.title })
            }
            className="group inline-flex items-center gap-1 text-[15px] font-medium text-[#111] hover:underline underline-offset-[3px] transition-colors"
          >
            Full case study
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
              ›
            </span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f7] hover:bg-[#ebebef] px-4 py-1.5 text-[15px] font-medium text-[#555] transition-colors"
          >
            {project.liveLabel ?? "Try it live"} ↗
          </a>
        )}
          </div>
        </div>
        {first && (
          <p className="shrink-0 text-[15px] leading-[1.45] text-[#777]">
            <span className="font-bold text-[#111]">Selected work</span> @ 2026
          </p>
        )}
      </motion.div>

      {/* decisions expand directly under their trigger, above the media */}
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
            <div className="pb-6 flex flex-col gap-4 max-w-[760px]">
              {project.reflection.map((d) => (
                <div key={d.title}>
                  <p className="text-[15px] leading-[1.45] font-semibold text-[#111] mb-1">
                    {d.title}
                  </p>
                  <p className="text-[14px] text-[#666] leading-[1.6]">
                    {d.body}
                  </p>
                </div>
              ))}
              <p className="text-[14px] leading-[1.6] text-[#999] pt-1">
                {project.collaborators}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* rail — slides arrive left to right */}
      <motion.div
        ref={railRef}
        variants={railReveal}
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
      </motion.div>

      {/* controls under the rail, right-aligned */}
      {media.length > 1 && (
        <div className="mt-3 flex items-center justify-end gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label={`Previous ${project.title} image`}
            className="w-12 h-12 rounded-full bg-[#f5f5f7] shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center text-[22px] font-semibold leading-none text-[#3a3a3c] hover:bg-[#ebebef] hover:text-[#111] transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label={`Next ${project.title} image`}
            className="w-12 h-12 rounded-full bg-[#f5f5f7] shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center text-[22px] font-semibold leading-none text-[#3a3a3c] hover:bg-[#ebebef] hover:text-[#111] transition-colors"
          >
            ›
          </button>
        </div>
      )}

    </motion.section>
  );
}

export default function KatesWebsiteV3() {
  return (
    <MotionConfig reducedMotion="user">
      {/* ── mobile: unchanged V2 ── */}
      <div className="md:hidden">
        <KatesWebsiteV2 />
      </div>

      {/* ── desktop: one wide column, the work as close to the fold as possible ── */}
      <div className="hidden md:block min-h-screen bg-white text-[#111]">
        <FloatingNav />
        <div className="mx-auto w-full max-w-[1440px] px-10">
          <TopBar />
          <main>
            {projects.map((project, i) => (
              <ProjectCarousel
                key={project.key}
                project={project}
                first={i === 0}
              />
            ))}
          </main>
          <footer className="py-10 flex items-center justify-between border-t border-[#f0f0f0]">
            <div className="flex items-center gap-5 text-[15px] leading-[1.45]">
              <ExternalLinkV3 href={`mailto:${EMAIL}`}>Email</ExternalLinkV3>
              <ExternalLinkV3 href={LINKEDIN}>LinkedIn</ExternalLinkV3>
            </div>
            <p className="text-[14px] leading-[1.6] text-[#aaa]">© Kate Xu 2026</p>
          </footer>
        </div>
      </div>

      <style jsx global>{`
        /* High-clarity liquid glass. Two declarations on purpose: Safari can't
           run SVG filters in backdrop-filter and drops the second line at
           parse, leaving clean clear glass; Chromium takes the lens. */
        .v3-liquid-glass {
          -webkit-backdrop-filter: blur(4px) saturate(190%) brightness(1.06);
          backdrop-filter: blur(4px) saturate(190%) brightness(1.06);
          backdrop-filter: url(#v3-glass-lens) blur(4px) saturate(190%)
            brightness(1.06);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </MotionConfig>
  );
}
