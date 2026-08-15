"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  MotionConfig,
  animate,
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
      // 3.4410 = ink width per unit font-size for "Kate Xu" in Schibsted
      // Grotesk Medium at zero tracking (measured from the font file with
      // PIL/fontTools). Re-measure if the family, weight, tracking, or the
      // name itself changes. (SemiBold was 3.5360.)
      style={
        {
          "--name-size": "clamp(96px, 11.1vw, 160px)",
          "--name-width": "calc(clamp(96px, 11.1vw, 160px) * 3.4410)",
        } as React.CSSProperties
      }
    >
      {/* ── name, with identity and portrait to the right ── */}
      <div className="flex items-start justify-between gap-10">
        <motion.h1
          className="w-fit shrink-0 font-medium leading-[1] text-[#111] whitespace-nowrap"
          // -0.077em cancels the K's left side bearing so the ink — not the glyph
          // box — starts flush with the column edge. Scales with the clamp.
          style={{
            fontSize: "var(--name-size)",
            marginLeft: "calc(var(--name-size) * -0.077)",
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Kate Xu
        </motion.h1>

        {/* The photo spans exactly the name's INK: measured in Schibsted
            Grotesk at leading 1, "Kate Xu" ink height = 0.704em, with 0.1554em
            of dead box above the cap and 0.1406em of empty descender box below.
            The block offsets by the top slack and sizes to the ink, so photo
            top = K's top and photo bottom = baseline — at every clamp size. */}
        <div
          className="flex shrink-0 items-stretch gap-[13px]"
          style={{
            marginTop: "calc(var(--name-size) * 0.1554)",
            height: "calc(var(--name-size) * 0.704)",
          }}
        >
          <div className="flex h-full flex-col items-end justify-between text-right">
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
            className="aspect-square h-full w-auto rounded-[4px] object-cover select-none"
          />
        </div>
      </div>

      {/* The rule sits just under the name's baseline. "Kate Xu" has no
          descenders, so the font's descender box overhangs the ink by ~22px in
          Schibsted Grotesk — the negative margin trims it to keep the same
          ~10px baseline-to-rule gap as before. Dead box, not leading. */}
      <nav className="mt-[-12px] flex items-center justify-between border-t border-[#e6e6e6] pt-5 text-[15px] leading-[1.45]">
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

      {/* ── workflow (left) + section label (right), bottom-aligned so the
             label sits level with the workflow's last row of text ── */}
      <div className="mt-[250px] flex items-end justify-between">
        <div className="w-[348px]">
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

        <p className="shrink-0 text-[15px] leading-[1.45] text-[#777]">
          <span className="font-bold text-[#111]">Selected work</span> @ 2026
        </p>
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
type Media = { src: string; phone?: boolean; bare?: boolean };

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
  // Inside the device frame the media is width-driven (the frame sets width);
  // in an open well it is height-driven (the rail sets height).
  const mediaClass = media.phone ? "w-full h-auto block" : "h-full w-auto block";

  const mediaEl = isVideo ? (
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
      className={mediaClass}
    />
  ) : (
    <img src={media.src} alt={title} loading="lazy" className={mediaClass} />
  );

  return (
    <motion.figure
      variants={slideReveal}
      // Each slide takes its media's natural width at the shared rail height:
      // free widths, straight row. A phone slide fills the rail instead, so a
      // single-slide project (OneCo) centres on the whole column.
      className={`snap-start shrink-0 m-0 ${media.phone ? "w-full" : "w-auto"}`}
    >
      {media.phone ? (
        /* Phone slides: the screen recording sits inside a device frame — a
           dark titanium body with a bezel and Dynamic Island — centred in the
           same grey well every other slide uses, so the rail keeps one width. */
        <div className="relative flex h-[var(--rail-h)] w-full items-center justify-center">
          {/* the panel sits BEHIND the device and is deliberately shorter, so
              the phone breaks its top and bottom edges — popped out, not framed */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-[calc(var(--rail-h)-96px)] -translate-y-1/2 rounded-[4px] bg-[#f5f5f7]"
          />
          <div className="relative w-[260px] rounded-[44px] bg-[#3b3b3d] p-[9px] shadow-[inset_0_0_2px_rgba(255,255,255,0.35)]">
            {/* side buttons, drawn in the frame's own metal */}
            <div aria-hidden className="absolute -left-[2px] top-[84px] h-[22px] w-[3px] rounded-l bg-[#2e2e30]" />
            <div aria-hidden className="absolute -left-[2px] top-[118px] h-[39px] w-[3px] rounded-l bg-[#2e2e30]" />
            <div aria-hidden className="absolute -left-[2px] top-[165px] h-[39px] w-[3px] rounded-l bg-[#2e2e30]" />
            <div aria-hidden className="absolute -right-[2px] top-[130px] h-[58px] w-[3px] rounded-r bg-[#2e2e30]" />
            <div className="relative overflow-hidden rounded-[24px] bg-black">
              {mediaEl}
            </div>
          </div>
        </div>
      ) : media.bare ? (
        /* naked media: no well, no fill, no shadow — the picture on the page */
        <div className="h-[var(--rail-h)] overflow-hidden rounded-[4px]">
          {mediaEl}
        </div>
      ) : (
        <div className="h-[var(--rail-h)] overflow-hidden rounded-[4px] bg-[#f5f5f7]">
          {mediaEl}
        </div>
      )}
      {caption && (
        <figcaption className="mt-7 text-[14px] leading-[1.6] text-[#777] max-w-[460px]">
          <span className="font-semibold text-[#111]">{title}</span> {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

// One height for every rail. Slides keep their natural widths, so the gaps
// still fall wherever the media says — but the rows themselves run straight.
const RAIL_H = 600;

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
      className={`${first ? "pt-2" : "pt-20"} pb-12`}
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
        <div className="flex min-w-0 flex-wrap items-center gap-8">
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
        style={{ "--rail-h": `${RAIL_H}px` } as React.CSSProperties}
        className="flex items-start gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth -mx-1 px-1 pb-1"
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
        <div className="-mt-8 flex items-center justify-end gap-2">
          <button
            onClick={() => scrollBy(-1)}
            aria-label={`Previous ${project.title} image`}
            className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[22px] font-semibold leading-none text-[#3a3a3c] hover:bg-[#ebebef] hover:text-[#111] transition-colors"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label={`Next ${project.title} image`}
            className="w-12 h-12 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[22px] font-semibold leading-none text-[#3a3a3c] hover:bg-[#ebebef] hover:text-[#111] transition-colors"
          >
            ›
          </button>
        </div>
      )}

    </motion.section>
  );
}


// ───────────────────────────────────────────────────────────────────────────
// Project grid — the branch experiment. Three tiles per row; each project is
// one cell. The action buttons live BEHIND the tile and surface on hover (and
// on keyboard focus). Key decisions expand as a full-width band under the grid.
// ───────────────────────────────────────────────────────────────────────────
// The tile plays the project's whole reel: each video runs to its end, each
// image holds ~5s with a slow push-in, and items hand off with a crossfade.
// The baked 4:3 tile cover stands in for the first item where one exists.
function tileReel(project: Project): Media[] {
  const all = flattenMedia(project.images);
  if (project.tile) return [{ src: project.tile }, ...all.slice(1)];
  return all;
}

const isVideoSrc = (src: string) => src.endsWith(".mp4") || src.endsWith(".webm");

function TileShow({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const reel = tileReel(project);
  const [idx, setIdx] = useState(0);
  const media = reel[idx % reel.length];
  const advance = () => setIdx((i) => (i + 1) % reel.length);

  // images hold 5s; videos get a 12s safety cap in case metadata lies
  useEffect(() => {
    if (reel.length < 2) return;
    const ms = isVideoSrc(media.src) ? 12000 : 5000;
    const t = setTimeout(advance, ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={media.src + idx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.7, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {isVideoSrc(media.src) ? (
          <video
            src={media.src}
            autoPlay
            muted
            playsInline
            preload="metadata"
            aria-label={project.title}
            onEnded={reel.length > 1 ? advance : undefined}
            loop={reel.length < 2}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <motion.img
            src={media.src}
            alt={project.title}
            // Ken Burns only makes sense mid-reel — a lone image would just
            // end up parked at 1.08, cropping ~4% off every edge (the Vetra
            // mockup's margins). Single-image tiles show the full frame.
            initial={{ scale: 1 }}
            animate={{ scale: reduce || reel.length < 2 ? 1 : 1.08 }}
            transition={{ duration: 5.4, ease: "linear" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// The expansion choreography: the clicked cover GLIDES to its landing slot
// (shared layoutId, 0.85s, long ease) while the band gap widens and siblings
// reflow on the same clock. The panel's text waits, then follows the cover in:
// left card first, decisions next, button last — context arriving at the pace
// the eye travels, so the user is led, not teleported.
const GLIDE = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };
// The cover itself travels on a slower clock than the reflow around it — the
// hero of the transition gets the longest note; everything else stays quick.
const COVER_GLIDE = { duration: 0.85, ease: GLIDE.ease };

function ProjectTile({
  project,
  onToggle,
  innerRef,
}: {
  project: Project;
  onToggle: () => void;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div ref={innerRef} layout transition={{ layout: GLIDE }} className="group flex flex-col">
      <motion.div
        layoutId={"cover-" + project.key}
        transition={{ layout: COVER_GLIDE }}
        className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#f5f5f7]"
      >
        <TileShow project={project} />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onToggle}
              aria-expanded={false}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#111] px-3.5 py-1.5 text-[14px] font-medium text-white hover:bg-black transition-colors"
            >
              <span className="leading-none text-white" aria-hidden>+</span>
              Key decisions
            </button>
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  track("v3_case_study_clicked", { project: project.title });
                }}
                className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3.5 py-1.5 text-[14px] font-medium text-[#111] hover:bg-white transition-colors"
              >
                Case study ›
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3.5 py-1.5 text-[14px] font-medium text-[#111] hover:bg-white transition-colors"
              >
                {project.liveLabel ?? "Try it live"} ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
      <h2 className="mt-6 text-[15px] font-semibold leading-[1.45] text-[#111]">
        {project.title}
      </h2>
      <p className="mt-0.5 text-[14px] leading-[1.6] text-[#777]">
        {project.description}
      </p>
    </motion.div>
  );
}

// The expanded state, per the Figma reference (56:2246): the clicked project
// shifts to the very left of its own row and the decisions fill the rest —
// the panel spans all three columns AT that row's position, so the layout
// always reads the same, only the row changes.
function ExpandedProject({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Bring the panel to the middle of the viewport as it opens. Not native
  // scrollIntoView: the browser's smooth curve is abrupt and out of our
  // control. We drive the scroll ourselves on the SAME ease as the cover's
  // glide, measured on the offset chain (transform-immune, so mid-animation
  // positions can't fool it) — one curve, two motions, one journey.
  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const t = setTimeout(() => {
      let top = 0;
      let el: HTMLElement | null = node;
      while (el) {
        top += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      const target = Math.max(
        0,
        top + node.offsetHeight / 2 - window.innerHeight / 2,
      );
      if (reduce) {
        window.scrollTo(0, target);
        return;
      }
      const controls = animate(window.scrollY, target, {
        duration: 0.7,
        ease: GLIDE.ease,
        onUpdate: (v) => window.scrollTo(0, v),
      });
      // hand control back the moment the user touches the wheel
      const cancel = () => controls.stop();
      window.addEventListener("wheel", cancel, { once: true, passive: true });
      window.addEventListener("touchstart", cancel, { once: true, passive: true });
    }, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={panelRef}
      layout
      transition={{ layout: GLIDE }}
      // pb doubles the panel's breathing room to the tile row below it:
      // 40px row gap + 40px panel padding = 80px, twice the normal row gap.
      className="col-span-3 grid grid-cols-[440px_1fr] gap-x-[70px] pb-10 scroll-mt-24"
    >
      {/* left third — the cover glides in via the shared layoutId */}
      <div className="flex flex-col">
        <motion.div
          layoutId={"cover-" + project.key}
          transition={{ layout: COVER_GLIDE }}
          className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#f5f5f7]"
        >
          <TileShow project={project} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ delay: 0.45, duration: 0.35, ease: GLIDE.ease }}
        >
        <h2 className="mt-[38px] text-[15px] font-semibold leading-[1.45] text-[#111]">
          {project.title}
        </h2>
        <p className="mt-2 text-[14px] leading-[1.6] text-[#777]">
          {project.description}
        </p>
        {/* label column + value column on a shared tab stop, per the reference */}
        <div className="mt-9 grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-[14px] leading-[1.6] text-[#777]">
          {project.timeline && (
            <>
              <p>Timeline:</p>
              <p>{project.timeline}</p>
            </>
          )}
          {project.role && (
            <>
              <p>Role:</p>
              <p>{project.role}</p>
            </>
          )}
          <div aria-hidden className="col-span-2 h-3" />
          <p>Team size:</p>
          <p>{project.collaborators}</p>
        </div>
        </motion.div>
      </div>

      {/* right two thirds — the decisions follow the cover in, then the button */}
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ delay: 0.5, duration: 0.35, ease: GLIDE.ease }}
          className="flex items-start justify-between"
        >
          <p className="text-[15px] font-semibold leading-[1.45] text-[#111]">
            {project.title} — key decisions
          </p>
          <button
            onClick={onClose}
            aria-label="Close key decisions"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f7] text-[16px] leading-none text-[#3a3a3c] hover:bg-[#ebebef] hover:text-[#111] transition-colors"
          >
            ✕
          </button>
        </motion.div>
        {/* decisions run as two INDEPENDENT columns — items keep a steady
            paragraph gap within their own column and are never stretched to
            match the height of their neighbor across the gutter. Reading
            order is preserved: item 0,2,4 fill the left, 1,3,5 the right.
            The first column develops first, the second follows. */}
        <div className="mt-[30px] grid grid-cols-2 items-start gap-x-[85px]">
          {[0, 1].map((col) => (
            <div key={col} className="flex flex-col gap-8">
              {project.reflection
                .filter((_, i) => i % 2 === col)
                .map((d, row) => (
                  <motion.div
                    key={d.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    transition={{
                      delay: 0.55 + col * 0.35 + row * 0.08,
                      duration: col === 1 ? 0.5 : 0.4,
                      ease: GLIDE.ease,
                    }}
                  >
                    <p className="text-[15px] leading-[1.45] font-semibold text-[#111] mb-1.5">
                      {d.title}
                    </p>
                    <p className="text-[14px] text-[#666] leading-[1.6]">{d.body}</p>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
        {(project.caseStudyUrl || project.liveUrl) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ delay: 1.15, duration: 0.4, ease: GLIDE.ease }}
            className="mt-8 flex justify-end"
          >
            {project.caseStudyUrl ? (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track("v3_case_study_clicked", { project: project.title })
                }
                className="inline-flex items-center rounded-full bg-[#f5f5f7] px-5 py-2.5 text-[15px] font-medium text-[#111] hover:bg-[#ebebef] transition-colors"
              >
                Case Study
              </a>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-[#f5f5f7] px-5 py-2.5 text-[15px] font-medium text-[#111] hover:bg-[#ebebef] transition-colors"
              >
                {project.liveLabel ?? "Try it live"} ↗
              </a>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function ProjectGrid() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closingRef = useRef<string | null>(null);
  const scrollBeforeOpen = useRef<number>(0);
  const tileRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const openIdx = projects.findIndex((p) => p.key === openKey);

  // On close the document gets several hundred px shorter. Left alone, the
  // browser clamps/anchors the scroll position a frame later — the residual
  // shake. Instead we ride the viewport DOWN to the cover's landing slot on
  // the same curve the cover glides home on.
  useLayoutEffect(() => {
    if (openKey !== null || !closingRef.current) return;
    closingRef.current = null;
    // Round trip: the viewport returns to the exact position the user was at
    // when they clicked, clamped to the collapsed document's height.
    const target = Math.max(0, scrollBeforeOpen.current);
    const releaseHeight = () => {
      document.body.style.minHeight = "";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, target);
      releaseHeight();
      return;
    }
    const controls = animate(window.scrollY, target, {
      duration: 0.5,
      ease: GLIDE.ease,
      onUpdate: (v) => window.scrollTo(0, v),
      onComplete: releaseHeight,
    });
    const cancel = () => {
      controls.stop();
      releaseHeight();
    };
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, { once: true, passive: true });
  }, [openKey]);

  // Build the render order: the expanded panel replaces its project and sits
  // at the START of that project's row; everyone else reflows around it.
  const items: { kind: "tile" | "open"; project: Project }[] = [];
  if (openIdx < 0) {
    projects.forEach((p) => items.push({ kind: "tile", project: p }));
  } else {
    const rowStart = Math.floor(openIdx / 3) * 3;
    const others = projects.filter((_, i) => i !== openIdx);
    others.slice(0, rowStart).forEach((p) => items.push({ kind: "tile", project: p }));
    items.push({ kind: "open", project: projects[openIdx] });
    others.slice(rowStart).forEach((p) => items.push({ kind: "tile", project: p }));
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      variants={sectionReveal}
      className="pt-2 pb-12 [overflow-anchor:none]"
    >
      {/* The gap change is part of the LAYOUT pass, not a separately animated
          padding: animating paddingTop re-layouts every frame while the tiles'
          FLIP corrections fight it — that fight was the shake on close. As a
          static style + layout, the whole reflow happens in one measured pass
          on one clock. */}
      <motion.div
        layout
        transition={{ layout: GLIDE }}
        style={{ paddingTop: openIdx >= 0 ? 85 : 10 }}
        className="grid grid-cols-3 gap-x-2.5 gap-y-10"
      >
        {items.map(({ kind, project }) =>
          kind === "open" ? (
            <ExpandedProject
              key={"open-" + project.key}
              project={project}
              onClose={() => {
                // Freeze the page height BEFORE the panel unmounts: without
                // this the document shrinks in the same frame and the browser
                // hard-clamps the scroll — the shake. The lock releases after
                // the ride home lands.
                document.body.style.minHeight =
                  document.documentElement.scrollHeight + "px";
                closingRef.current = project.key;
                setOpenKey(null);
              }}
            />
          ) : (
            <ProjectTile
              key={project.key}
              innerRef={(el) => {
                tileRefs.current[project.key] = el;
              }}
              project={project}
              onToggle={() => {
                scrollBeforeOpen.current = window.scrollY;
                track("v3_key_decisions_toggled", {
                  project: project.title,
                  open: true,
                });
                setOpenKey(project.key);
              }}
            />
          )
        )}
      </motion.div>
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
            <ProjectGrid />
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
