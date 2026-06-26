"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";

// ───────────────────────────────────────────────────────────────────────────
// Constants
// ───────────────────────────────────────────────────────────────────────────
const EMAIL = "katherinexu09@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/katherinexu99/";
const TAGLINE = "I ask good questions and build things that make people more capable.";
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
  liveUrl?: string; // renders an external link button when set
  liveLabel?: string; // button text (defaults to "Try it live")
  appStore?: AppStore; // renders a download widget when set
}

// App Store listing data for the download widget.
interface AppStore {
  url: string;
  icon: string;
  name: string;
  subtitle: string;
  ratingLabel: string; // e.g. "5.0 · 2 Ratings · Ages 4+ · Books"
  review?: string;
}

const projects: Project[] = [
  {
    key: "bofa-cloud",
    title: "BofA Cloud",
    description:
      "Cloud infrastructure platform serving 1,000+ internal applications — design lead in a team of 35.",
    images: ["/bofa-cloud-hero.png", "/bofa-cloud-components.jpg"],
    reflection: [
      "Over three-plus years steering UX for a private cloud platform serving 1,000+ internal applications, I learned to treat design as product intelligence. I moved the team from static mockups to daily automated reporting — which changed my relationship with leadership, shifting every conversation from subjective aesthetics to objective product health.",
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
    images: ["/workit-old-vs-new.gif", "/workit-eda-demo.jpg"],
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
    images: [
      "/pawpaw-day-demo.jpg",
      ["/pawpaw-night-demo.jpg", "/pawpaw-logo.png"],
      "/pawpaw-storycard-demo.gif",
    ],
    reflection: [
      "PawPaw started from a Stanford finding about the cognitive power of a parent's voice. I designed and shipped it in four weeks using a vibe-coding workflow that bridges Figma design and production code — proof that I don't just mock up interfaces, I understand the constraints and build functional prototypes that feel real.",
      "Using Gemini to “manage” Cursor cut development time by roughly 70%, leaving more room for user testing and iteration. The harder design work was restraint: deciding what not to build, and keeping the voice-cloning prompt warm and human rather than technical.",
    ],
    collaborators:
      "A solo build. AI collaborators: Figma and Cursor — orchestrated by Gemini — for the agentic workflow, plus voice cloning for the storytelling.",
    appStore: {
      url: "https://apps.apple.com/us/app/pawpawstory/id6757112694",
      icon: "/pawpaw-appicon.png",
      name: "pawpawStory",
      subtitle: "Bedtime Stories in Your Voice",
      ratingLabel: "5.0 · 2 Ratings · Ages 4+ · Books",
      review:
        "The app can narrate 10 short stories in my voice and tone with simply a 20s demo. The interface is so easy to navigate!",
    },
  },
  {
    key: "ionboard",
    title: "Ionboard",
    description:
      "Electric skateboard brand — $57K+ Kickstarter (570% funded). End-to-end brand, design, and marketing.",
    images: ["/ionboard-cover.png", ["/ionboard-ces.png", "/ionboard-pitch.png"]],
    liveUrl:
      "https://www.kickstarter.com/projects/1728725377/ionboard?ref=discovery&term=ionboard",
    liveLabel: "View Kickstarter",
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
    description:
      "Your AI coach to land the next role — resume, stories, market fit, and application tracking.",
    images: [
      "/jobpilot-welcome.jpg",
      "/jobpilot-stories.jpg",
      "/jobpilot-market.jpg",
      "/jobpilot-tracking.jpg",
    ],
    liveUrl: "https://jobpilot.katexu.com/dashboard",
    reflection: [
      "Jobpilot started from a dangerously vague ambition — “help people manage their job search” — and the real work was narrowing it into something opinionated. The biggest call was framing: not a tool that finds you a job (judged on output), but a coach that makes you more prepared (judged on how ready you feel). That reframe — “your AI coach to land the next role” — set the tone for every feature: Jobpilot doesn't replace your effort, it makes it count.",
      "It shows up in the details: no sign-up wall, so the whole product works in anonymous browser storage and value arrives before the ask; onboarding as a five-step journey, not a form; and a job-description field framed as a coaching moment — “postings disappear, so save the key points now; future you will thank you.” That's the line between a database and a coach: a database stores what you give it; a coach tells you what you'll wish you'd saved.",
    ],
    collaborators: "Solo, with AI as teammate — Figma MCP, Claude Code, and the Claude API.",
  },
  {
    key: "oneco",
    title: "OneCo",
    description:
      "Builder-archetype quiz in four languages — are you built to run a one-person company?",
    images: [{ src: "/oneco-demo.gif", phone: true }],
    liveUrl: "https://oneco.katexu.com/",
    reflection: [
      "“Should I go solo?” is the wrong question. The right one is: what kind of builder am I? OneCo exists to answer that honestly, so people can stop second-guessing and start building in alignment with who they actually are.",
      "Building for four languages from day one forced better product decisions — clearer copy, fewer cultural assumptions, more universal framing. And unlike most personality tools that stop at a label, OneCo connects your archetype to real paths: the kind of one-person business you're suited to build, the traps to avoid, and where your edge actually is.",
    ],
    collaborators:
      "Solo build with AI as collaborator. Shipped in English, Chinese, Spanish, and French.",
  },
];

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
        Kate Xu — Senior Product Designer & Builder
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
        phone ? "mx-auto w-full max-w-[240px] md:max-w-[340px]" : ""
      } ${className}`}
    >
      <img src={imgSrc(img)} alt={title} loading="lazy" className="w-full h-auto block" />
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Download widget — App Store-style card: icon, rating, review, Get button
// ───────────────────────────────────────────────────────────────────────────
function DownloadWidget({ app, project }: { app: AppStore; project: string }) {
  return (
    <div className="mt-5 max-w-[480px] rounded-[18px] border border-[#ececec] bg-white p-4 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-3.5">
        <img
          src={app.icon}
          alt={`${app.name} icon`}
          className="w-[58px] h-[58px] rounded-[13px] flex-shrink-0 border border-black/5"
        />
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold text-[#111] leading-tight">{app.name}</div>
          <div className="text-[12.5px] text-[#888] truncate">{app.subtitle}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="text-[12px] leading-none tracking-[1px] text-[#00bc7d]" aria-hidden>
              ★★★★★
            </span>
            <span className="text-[11.5px] text-[#999]">{app.ratingLabel}</span>
          </div>
        </div>
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("v2_appstore_clicked", { project })}
          className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#111] text-white px-4 py-2 text-[13px] font-semibold hover:bg-black transition-colors"
        >
          <svg width="11" height="13" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          Get
        </a>
      </div>
      {app.review && (
        <p className="mt-3.5 pt-3.5 border-t border-[#f1f1f1] text-[13px] leading-[1.55] text-[#555]">
          <span className="text-[#00bc7d]" aria-hidden>
            ★★★★★
          </span>{" "}
          “{app.review}” <span className="text-[#aaa]">— App Store review</span>
        </p>
      )}
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

      {/* Download widget — App Store card with rating + review (if shipped) */}
      {project.appStore && <DownloadWidget app={project.appStore} project={project.title} />}

      {/* Actions: try-it link (if live) + expand pill */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("v2_try_clicked", { project: project.title })}
            className="inline-flex items-center gap-1 rounded-full bg-[#111] text-white px-4 py-1.5 text-[12px] font-medium hover:bg-black transition-colors"
          >
            {project.liveLabel ?? "Try it live"}
            <span aria-hidden className="text-[0.9em] translate-y-[-1px]">
              ↗
            </span>
          </a>
        )}
        <button
          onClick={toggle}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f1f0] hover:bg-[#e9e9e6] px-3 py-1.5 text-[12px] font-medium text-[#555] transition-colors"
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
      </div>

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
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <main className="mx-auto w-full max-w-[1040px] px-6 md:px-10">
        <IntroBlock />
        {projects.map((project) => (
          <ProjectBlock key={project.key} project={project} />
        ))}
        <Footer />
      </main>
    </div>
  );
}
