"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";

// ───────────────────────────────────────────────────────────────────────────
// Constants
// ───────────────────────────────────────────────────────────────────────────
const EMAIL = "katherinexu09@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/katherinexu99/";
const TAGLINE = "I ask good questions and build things that make people more capable.";
const SHIP = "/jobpilot-ship.png";
const AVATAR = "/kate-avatar.png"; // colorful astronaut illustration w/ "Hello!" bubble

// Track an event without crashing if PostHog isn't initialized.
function track(event: string, props?: Record<string, unknown>) {
  try {
    posthog.capture(event, props);
  } catch {
    /* no-op */
  }
}

// ───────────────────────────────────────────────────────────────────────────
// Project content
// ───────────────────────────────────────────────────────────────────────────
// A hero image is either a plain src (rendered full-width, for landscape shots)
// or an object flagged `phone` for portrait phone captures, which get capped
// width + centered so they stay crisp and fit a mobile screen.
type ProjectImage = string | { src: string; phone?: boolean };

// Each entry in a project's `images` is either a single image (full-width row)
// or an array of images rendered side-by-side (a two-up row, like Nelson). Rows
// stack into one column on mobile.
type ImageRow = ProjectImage | ProjectImage[];

interface Project {
  key: string;
  title: string;
  description: string;
  images: ImageRow[]; // hero rows, stacked top-to-bottom
  reflection: string[];
  collaborators: string;
}

const projects: Project[] = [
  {
    key: "bofa-cloud",
    title: "BofA Cloud",
    description:
      "Cloud infrastructure platform serving 4,000+ internal applications — design lead in a team of 35.",
    images: ["/bofa-cloud-hero.png"],
    reflection: [
      "Over three-plus years steering UX for a private cloud platform serving 4,000+ internal applications, I learned to treat design as product intelligence. I moved the team from static mockups to daily automated reporting — which changed my relationship with leadership, shifting every conversation from subjective aesthetics to objective product health.",
      "Establishing a baseline before each release let me quantify the ROI of design decisions, and proving a positive shift in feature click rates became the most effective tool for stakeholder buy-in. Working this close to infrastructure taught me technical empathy: a good design is only as good as its implementation, so I synced directly with engineers in Git and HTML to keep complex flows functional in production.",
    ],
    collaborators:
      "A 35-person platform org — product managers, cloud engineers, and the BofA design-system group.",
  },
  {
    key: "bofa-workit",
    title: "BofA WorkIT",
    description:
      "Unified mobile command center for IT support — solo designer in a team of 3. Reached an NPS of 36.",
    images: ["/workit-old-vs-new.gif"],
    reflection: [
      "Over 1.5 years as the solo designer on WorkIT, I learned that a designer's most powerful tools aren't pixels, but observation, empathy, and data. Building a genuinely useful information architecture meant immersing in users' daily lives to find the 20% of features that drive 80% of the value.",
      "I came to view user complaints not as setbacks but as the clearest signal of where the product should go next. When behavior data contradicted my assumptions, I stayed open — re-prioritizing features by comparing release versions and A/B results rather than defending the original design.",
    ],
    collaborators:
      "A team of three, the IT support staff whose real-time struggles shaped every iteration, and partner product managers.",
  },
  {
    key: "pawpaw-story",
    title: "PawPaw Story",
    description:
      "AI voice-cloning storytelling app for kids — solo build, zero to App Store in four weeks.",
    images: ["/pawpaw-lineup.png", "/pawpaw-storycard-demo.gif"],
    reflection: [
      "PawPaw started from a Stanford finding about the cognitive power of a parent's voice. I designed and shipped it in four weeks using a vibe-coding workflow that bridges Figma design and production code — proof that I don't just mock up interfaces, I understand the constraints and build functional prototypes that feel real.",
      "Using Gemini to “manage” Cursor cut development time by roughly 70%, leaving more room for user testing and iteration. The harder design work was restraint: deciding what not to build, and keeping the voice-cloning prompt warm and human rather than technical.",
    ],
    collaborators:
      "A solo build. AI collaborators: Figma and Cursor — orchestrated by Gemini — for the agentic workflow, plus voice cloning for the storytelling.",
  },
  {
    key: "ionboard",
    title: "Ionboard",
    description:
      "Electric skateboard brand — $57K+ Kickstarter (570% funded). End-to-end brand, design, and marketing.",
    images: ["/ionboard-cover.png", ["/ionboard-ces.png", "/ionboard-pitch.png"]],
    reflection: [
      "Ionboard taught me to be a designer-entrepreneur: great design has to be grounded in business law, manufacturing risk, and market timing. We funded the electric skateboard at 570% on Kickstarter, and I owned the brand end to end — from product design to the global e-commerce marketing that drove it.",
      "Analyzing ad performance daily alongside engineers sharpened my ability to make proactive, data-driven design decisions — a habit I now apply at enterprise scale. I also learned that once a brand reaches the majority, its value shifts from the product itself to the connection it creates between people and resources.",
    ],
    collaborators:
      "Co-founders and the hardware/engineering team; daily growth experiments run with marketing engineers.",
  },
  {
    key: "jobpilot",
    title: "Jobpilot",
    description: "AI-powered job-hunting copilot — built as User #1, shipped in two days.",
    images: ["/jobpilot-cover.gif"],
    reflection: [
      "I am User #1. Every feature I built, I tested on my own job hunt. The Resume Reviser exists because my own PDF was image-based and unreadable by parsers; the “why this role for you” section exists because I was tired of applying blind. Dogfooding under real pressure turned every friction point into a feature and every workaround into a flow.",
      "Built in two days on a Figma MCP → Claude Code → Claude API pipeline. Claude didn't just power the features — it powered the build. AI as collaborator and AI as product, in a loop that feels genuinely new.",
    ],
    collaborators: "Solo, with AI as teammate — Figma MCP, Claude Code, and the Claude API.",
  },
  {
    key: "oneco",
    title: "OneCo",
    description:
      "Builder-archetype quiz in four languages — are you built to run a one-person company?",
    images: [{ src: "/oneco-demo.gif", phone: true }],
    reflection: [
      "“Should I go solo?” is the wrong question. The right one is: what kind of builder am I? OneCo exists to answer that honestly, so people can stop second-guessing and start building in alignment with who they actually are.",
      "Building for four languages from day one forced better product decisions — clearer copy, fewer cultural assumptions, more universal framing. And unlike most personality tools that stop at a label, OneCo connects your archetype to real paths: the kind of one-person business you're suited to build, the traps to avoid, and where your edge actually is.",
    ],
    collaborators:
      "Solo build with AI as collaborator. Shipped in English, Chinese, Spanish, and French.",
  },
];

// ───────────────────────────────────────────────────────────────────────────
// Intro: a spaceship swings across, then the overlay fades to reveal the page
// ───────────────────────────────────────────────────────────────────────────
function SpaceshipIntro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  // Play the spaceship fly-in only the very first time this browser ever lands on
  // the main page. On every later visit — return from /resume or /how-i-think, a
  // reload, a new tab, or a future session — collapse to a near-instant reveal so
  // the ship never flies again. Persisted in localStorage so it survives sessions.
  // Reduced-motion preference also skips it. `skip` only drives framer transition
  // props (not SSR'd markup), so reading storage in the initializer can't mismatch.
  const [seenBefore] = useState(
    () => typeof window !== "undefined" && localStorage.getItem("v2IntroSeen") === "1",
  );
  const skip = reduce || seenBefore;

  const handleDone = () => {
    try {
      localStorage.setItem("v2IntroSeen", "1");
    } catch {
      /* no-op */
    }
    onDone();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "#ffffff" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{
        duration: skip ? 0.01 : 0.95,
        times: [0, 0.55, 1],
        ease: "easeInOut",
      }}
      onAnimationComplete={handleDone}
    >
      {/* Ship always rendered (keeps SSR markup stable); when skipping, the overlay
          fades in ~10ms so it's never perceived. */}
      <motion.img
        src={SHIP}
        alt=""
        aria-hidden
        className="w-[260px] md:w-[420px] h-auto select-none pointer-events-none"
        initial={{ x: "-65vw", y: 30, rotate: -16, opacity: 0 }}
        animate={
          skip
            ? { opacity: 0 }
            : { x: "65vw", y: [30, -40, 30], rotate: [-16, 0, 14], opacity: [0, 1, 1, 0] }
        }
        transition={{ duration: skip ? 0.01 : 0.6, ease: "easeInOut", times: [0, 0.5, 1] }}
      />
    </motion.div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Links — gray, underlined, hover-green; external ones get a ↗
// ───────────────────────────────────────────────────────────────────────────
const linkClass =
  "text-[#555] underline underline-offset-[3px] decoration-[#cfcfcf] hover:text-[#00915f] hover:decoration-[#00915f] transition-colors";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-0.5 ${linkClass}`}
      onClick={() => track("v2_nav_link_clicked", { href })}
    >
      {children}
      <span aria-hidden className="text-[0.85em] no-underline translate-y-[-1px]">
        ↗
      </span>
    </a>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Intro block — name, title, bio, links, in the content flow (no header)
// ───────────────────────────────────────────────────────────────────────────
function IntroBlock() {
  return (
    <section className="pt-20 md:pt-28 pb-2">
      <img
        src={AVATAR}
        alt="Kate Xu"
        className="w-[150px] md:w-[164px] h-auto block mb-5 -ml-2 select-none"
      />
      <h1 className="text-[20px] md:text-[21px] font-medium text-[#111] tracking-[-0.4px] leading-[1.35]">
        Kate Xu — <span className="text-[#00915f]">Gen AI Product Designer</span>
      </h1>
      <p className="mt-1.5 text-[14px] md:text-[15px] text-[#555] leading-[1.5] max-w-[460px]">
        {TAGLINE}
      </p>
      <nav className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[14px]">
        <ExternalLink href={`mailto:${EMAIL}`}>Email</ExternalLink>
        <ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink>
        <Link
          href="/how-i-think"
          className={linkClass}
          onClick={() => track("v2_nav_link_clicked", { href: "/how-i-think" })}
        >
          How I Think
        </Link>
        <Link
          href="/resume"
          className={linkClass}
          onClick={() => track("v2_nav_link_clicked", { href: "/resume" })}
        >
          Resume
        </Link>
      </nav>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// A single hero image in its rounded card. Phone captures are capped + centered.
// ───────────────────────────────────────────────────────────────────────────
const imgSrc = (img: ProjectImage) => (typeof img === "string" ? img : img.src);

function ImageCard({
  img,
  title,
  className = "",
}: {
  img: ProjectImage;
  title: string;
  className?: string;
}) {
  const phone = typeof img === "object" && img.phone;
  return (
    <div
      className={`overflow-hidden rounded-[24px] border border-[#ececec] bg-[#fafafa] ${
        phone ? "mx-auto w-full max-w-[340px]" : ""
      } ${className}`}
    >
      <img src={imgSrc(img)} alt={title} loading="lazy" className="w-full h-auto block" />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// A single project block — small title, one-liner, gray pill, then big image
// ───────────────────────────────────────────────────────────────────────────
function ProjectBlock({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((v) => {
      track("v2_project_expanded", { project: project.title, expanded: !v });
      return !v;
    });
  };

  return (
    <section className="pt-24 md:pt-28">
      {/* Title — small, like Nelson */}
      <h2 className="text-[17px] md:text-[18px] font-semibold text-[#111] tracking-[-0.2px] leading-[1.4]">
        {project.title}
      </h2>

      {/* One-line description */}
      <p className="mt-1 text-[14px] md:text-[15px] text-[#555] leading-[1.5] max-w-[540px]">
        {project.description}
      </p>

      {/* Expand pill */}
      <button
        onClick={toggle}
        aria-expanded={open}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#f1f1f0] hover:bg-[#e9e9e6] px-3 py-1.5 text-[12px] font-medium text-[#555] transition-colors"
      >
        <span
          className="text-[13px] leading-none text-[#00915f] transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          +
        </span>
        {open ? `Less about ${project.title}` : `More about ${project.title}`}
      </button>

      {/* Expandable reflection + collaborators */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 max-w-[620px]">
              <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#00915f] mb-2.5">
                Reflection
              </h3>
              {project.reflection.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.65] text-[#3a3a3a] mb-3.5 last:mb-0"
                >
                  {para}
                </p>
              ))}

              <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#00915f] mb-2">
                Collaborators
              </h3>
              <p className="text-[15px] leading-[1.65] text-[#3a3a3a]">{project.collaborators}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big hero rows — stacked, the part that dominates, like Nelson. A row can
          be a single full-width image or a side-by-side pair (stacks on mobile).
          Phone captures are capped + centered so they stay crisp and fit mobile. */}
      {project.images.map((row, i) => {
        const mt = i === 0 ? "mt-6 md:mt-7" : "mt-4 md:mt-5";
        if (Array.isArray(row)) {
          return (
            <div key={i} className={`${mt} grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5`}>
              {row.map((img) => (
                <ImageCard key={imgSrc(img)} img={img} title={project.title} />
              ))}
            </div>
          );
        }
        return <ImageCard key={imgSrc(row)} img={row} title={project.title} className={mt} />;
      })}
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Footer
// ───────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="pt-24 md:pt-32 pb-16">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5 text-[14px]">
          <ExternalLink href={`mailto:${EMAIL}`}>Email</ExternalLink>
          <ExternalLink href={LINKEDIN}>LinkedIn</ExternalLink>
        </div>
        <p className="text-[13px] text-[#999]">© Kate Xu 2026</p>
      </div>
    </footer>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Page
// ───────────────────────────────────────────────────────────────────────────
export default function KatesWebsiteV2() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <AnimatePresence>
        {!introDone && <SpaceshipIntro onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <main className="mx-auto w-full max-w-[1040px] px-6 md:px-10">
          <IntroBlock />
          {projects.map((project) => (
            <ProjectBlock key={project.key} project={project} />
          ))}
          <Footer />
        </main>
      </motion.div>
    </div>
  );
}
