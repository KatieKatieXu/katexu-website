"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";

// ───────────────────────────────────────────────────────────────────────────
// Constants
// ───────────────────────────────────────────────────────────────────────────
const EMAIL = "katherinexu09@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/katherinexu99/";
const TAGLINE = "I ask good questions and build things that make people more capable.";
const AVATAR_ASTRONAUT = "/kate-avatar-astronaut.png"; // astronaut layer
const AVATAR_BUBBLE = "/kate-avatar-bubble.png"; // "Hello!" bubble layer
const STORYTELLING_GITHUB =
  "https://github.com/KatieKatieXu/kate-xu-storytelling";
const STORYTELLING_CHOICES = ["a", "b", "c", "d"] as const;

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
type ProjectImage = string | { src: string; phone?: boolean; bare?: boolean };

// Each entry in a project's `images` is either a single image (full-width row)
// or an array of images rendered side-by-side (a two-up row, like Nelson). Rows
// stack into one column on mobile.
type ImageRow = ProjectImage | ProjectImage[];

// A key design decision, framed as the call I made and why this, not that.
interface Decision {
  title: string;
  body: string;
}

// An AI-native collaboration method, highlighted at the top of the portfolio.
export interface WorkflowHighlight {
  title: string;
  body: string;
  flow: string; // arrow-separated pipeline, rendered as a small green line
}

export const workflows: WorkflowHighlight[] = [
  {
    title: "The Intent-First Design Loop",
    body: "Interviews and behavior data clarify who the users are, what they need, and where they will use the product. That evidence shapes the landing page and product together. Claude Design and Figma Make generate directions from my starting layouts. I evaluate the options and make the call.",
    flow: "interviews + behavior data → precise intent → hand-crafted layouts → Claude Design / Figma Make → options → my call",
  },
  {
    title: "The AI-Verifiable Handoff",
    body: "Engineers receive TSX, CSS, a design system spec, and reference images. Their coding agent validates the implementation against my design.",
    flow: "Figma → TSX + CSS + DS spec → reference image → agent validates → PR",
  },
  {
    title: "The Living Screen Registry",
    body: "A coding agent captures every core flow in a screen registry. It updates with each code push, so documentation stays aligned with production.",
    flow: "coding agent → key screens → registry table → auto-update on push",
  },
];

export interface Project {
  key: string;
  title: string;
  description: string;
  images: ImageRow[]; // hero rows, stacked top-to-bottom
  reflection: Decision[]; // key decisions: the call + why this, not that
  collaborators: string;
  liveUrl?: string; // renders an external link button when set
  liveLabel?: string; // button text (defaults to "Try it live")
  caseStudyUrl?: string; // internal link to the full process case study
  tile?: string; // dedicated 4:3 cover for grid layouts (falls back to images[0])
  timeline?: string; // e.g. "2025 – 2026", shown in the expanded grid panel
  role?: string; // e.g. "Design Lead", shown in the expanded grid panel
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

export const projects: Project[] = [
  {
    key: "bofa-cloud",
    caseStudyUrl: "/decks/bofa-cloud-v3.html",
    tile: "/bofa-cloud-tile.jpg",
    timeline: "2025 to 2026",
    role: "Design Lead (with 2 UX interns)",
    title: "BofA Cloud",
    description:
      "Cloud infrastructure platform serving 1,000+ internal applications. Design lead in a team of 35.",
    images: ["/bofa-cloud-demo.jpg", "/bofa-cloud-components.jpg"],
    reflection: [
      {
        title: "Nothing to cut → Pre-approval Tickets",
        body: "The ordering wizard was driving drop-off and support tickets. I proposed cutting steps, but engineering showed that every field was required. I kept the goal and changed the solution. Reusing previous configurations increased monthly build success by 23% and reduced ordering time by 32%.",
      },
      {
        title: "Grid of tiles → Comparison View",
        body: "Stakeholders asked for more details on each machine. I traced the request to the real problem: users could not compare cost, capacity, and DMZ status. I replaced the tile grid with a comparison view. The flow became 3% longer, but completion rose 6%.",
      },
    ],
    collaborators:
      "A 35-person platform org with product managers, cloud engineers, and the BofA design system group.",
  },
  {
    key: "vetra",
    caseStudyUrl: "/decks/vetra-case-study/",
    timeline: "2026 · one month",
    role: "Only designer",
    title: "Vetra AI",
    description:
      "AI studio for startup owners. I turned one complex product into three focused products and shipped all three in one month.",
    images: ["/vetra-tile.jpg"],
    liveUrl: "https://www.vetraai.com/",
    liveLabel: "Visit Vetra",
    reflection: [
      {
        title: "Use confusion as evidence",
        body: "I logged every point of friction as a first-time user, then tested the improved product with more than 30 people. Users were getting blocked before they reached the product's core value.",
      },
      {
        title: "Split one product into three",
        body: "The integrated product served different users and made feedback noisy. I convinced the founder to launch three focused products so each could make one promise and produce cleaner signals.",
      },
      {
        title: "Own the path to production",
        body: "I shaped the strategy, redesigned the workspace, and built three landing pages. All three shipped within one month.",
      },
    ],
    collaborators: "2 people: engineer founder + me",
  },
  {
    key: "jobpilot",
    caseStudyUrl: "/decks/jobpilot-case-study.html",
    tile: "/jobpilot-tile.mp4",
    timeline: "2026",
    role: "Designer · builder · founder",
    title: "Jobpilot",
    description:
      "An AI coach that helps job seekers understand their market position and learn from application results.",
    images: ["/jobpilot-demo-v3.mp4", "/jobpilot-screens-showcase.mp4"],
    liveUrl: "https://jobpilot.katexu.com/dashboard",
    reflection: [
      {
        title: "Make job hunting feel lighter",
        body: "Job hunting is stressful, so I used a moodboard to define a lighter, more playful environment. That direction shaped the warm color palette and motion system, making progress feel clearer and the experience less painful.",
      },
      {
        title: "Cut to two AI features",
        body: "I removed job matching and resume analysis, where larger competitors already had better data. Jobpilot now uses AI to estimate your market position, then correct it with real outcomes from your application board, including interviews, rounds, and offers. The feedback loop helps you understand where you actually perform best.",
      },
      {
        title: "Coach, not tool",
        body: "The original page promised automation the product did not provide. I repositioned Jobpilot as a coach that prepares users while leaving applications in their hands. The product now makes that boundary clear.",
      },
    ],
    collaborators: "Solo, using Figma MCP, Claude Code, and the Claude API.",
  },
  {
    key: "pawpaw-story",
    timeline: "2026 · four weeks",
    role: "Solo designer and builder",
    // caseStudyUrl: "/projects/pawpaw-story", // hidden until case studies are ready
    title: "PawPaw Story",
    description:
      "AI voice-cloning storytelling app for kids. Solo build from zero to the App Store in four weeks.",
    images: ["/pawpaw-dribbble-43.mp4", "/pawpaw-collage-hd.mp4"],
    reflection: [
      {
        title: "Why I'm making this app",
        body: "Two scenes shaped the product. One parent is home but too tired to tell a story. Another is traveling while their child wants the comfort of their voice. PawPaw Story uses voice cloning to create presence, not efficiency.",
      },
      {
        title: "Fix the cause, not the symptom",
        body: "Users finished the voice sample before the 30-second quality minimum. I kept the minimum and added word-by-word pacing based on script length. One interaction fixed both recording duration and voice quality.",
      },
      {
        title: "Root-cause the crash, then fix the class of bug",
        body: "Switching themes crashed the navigator because NativeWind remounted the subtree. I fixed the root cause by always applying a theme class. When one back button overlapped the status bar, I audited every related screen and fixed the whole class of problem.",
      },
    ],
    collaborators:
      "A solo build using Figma, Cursor, Gemini, and voice cloning technology.",
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
    tile: "/ionboard-tile.png",
    caseStudyUrl:
      "https://www.figma.com/deck/taMJWLPYTuhGUHeiHYZauO/Ionboard?node-id=0-1&t=kXZU00tuN8yKxsZu-1",
    timeline: "2017 to 2018",
    role: "Design & Marketing Lead",
    title: "Ionboard",
    description:
      "Electric skateboard brand. $57K+ Kickstarter at 570% funded. I led the brand, design, and marketing.",
    // Both letterboxed onto a 1600x1000 white canvas so the rail keeps one
    // aspect: the board is centred with air around it, and the two low-res
    // event photos are stacked small in one column where the pixels don't show.
    images: ["/ionboard-cover-v2.png"],
    liveUrl:
      "https://www.kickstarter.com/projects/1728725377/ionboard?ref=discovery&term=ionboard",
    liveLabel: "View Kickstarter",
    reflection: [
      {
        title: "Treat business reality as a design constraint",
        body: "I treated manufacturing risk, business law, and market timing as design constraints. A product that cannot ship or sell is not good design, however beautiful.",
      },
      {
        title: "Iterate on ad data, daily",
        body: "I reviewed ad performance with engineers every day and used it to guide design changes. The campaign funded at 570% of goal.",
      },
      {
        title: "Shift from product to community",
        body: "As the brand reached the majority, I reframed its value away from the board itself and toward the connection it creates between people and resources.",
      },
    ],
    collaborators:
      "Co-founders and the hardware/engineering team; daily growth experiments run with marketing engineers.",
  },
  {
    key: "bofa-workit",
    // caseStudyUrl: "/projects/bofa-workplace", // hidden until case studies are ready
    title: "BofA WorkIT",
    description:
      "Unified mobile command center for IT support. Solo designer in a team of three. Reached an NPS of 36.",
    images: ["/workit-old-vs-new.mp4", "/workit-eda-demo.jpg"],
    reflection: [
      {
        title: "Build the IA around the vital 20%",
        body: "I studied daily workflows to find the 20% of features that created 80% of the value. That evidence shaped the information architecture.",
      },
      {
        title: "Treat complaints as the roadmap",
        body: "I treated user complaints as the clearest signal of what to build next.",
      },
      {
        title: "Let data overrule my assumptions",
        body: "When behavior data contradicted my expectations, I re-prioritized features by comparing release versions and A/B results rather than defending the original design.",
      },
    ],
    collaborators:
      "A team of three, the IT support staff whose real-time struggles shaped every iteration, and partner product managers.",
  },
];

// ───────────────────────────────────────────────────────────────────────────
// Links — gray, underlined, hover-green; external ones get a ↗
// ───────────────────────────────────────────────────────────────────────────
const linkClass =
  "text-[#555] underline underline-offset-[3px] decoration-[#cfcfcf] hover:text-[#111111] hover:decoration-[#111111] transition-colors";

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
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
  // Play the Hello drop only on the first landing of this browser session —
  // not again when the visitor returns from a subpage or soft-navigates back.
  const [playHello, setPlayHello] = useState(false);
  useLayoutEffect(() => {
    try {
      if (!window.sessionStorage.getItem("v2_hello_played")) {
        window.sessionStorage.setItem("v2_hello_played", "1");
        setPlayHello(true);
      }
    } catch {
      /* private mode — just show the bubble statically */
    }
  }, []);

  return (
    <section className="pt-20 md:pt-28 pb-2">
      <div className="relative w-[150px] md:w-[164px] mb-5 -ml-2 select-none">
        <img src={AVATAR_ASTRONAUT} alt="Kate Xu" className="w-full h-auto block" />
        {playHello ? (
          <motion.img
            src={AVATAR_BUBBLE}
            alt=""
            aria-hidden
            className="absolute block"
            style={{ left: "56.1%", top: "6.4%", width: "43.6%" }}
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 10, mass: 0.8, delay: 0.3 }}
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
      <h1 className="text-[20px] md:text-[21px] font-medium text-[#111] tracking-[-0.4px] leading-[1.35]">
        Kate Xu, Senior Product Designer & Builder
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
          href="/lab"
          className={linkClass}
          onClick={() => track("v2_nav_link_clicked", { href: "/lab" })}
        >
          Visual Lab
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
// Portfolio-wide highlight — how I ship with engineers, AI-native
// ───────────────────────────────────────────────────────────────────────────
function WorkflowHighlightBlock() {
  return (
    <section className="pt-12 md:pt-14">
      <div className="max-w-[620px] rounded-[18px] bg-white p-4 md:p-5 shadow-[2px_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[2px_4px_16px_rgba(0,0,0,0.16)] hover:scale-[1.01] transition-all duration-300 ease-[cubic-bezier(0,0,0.5,1)]">
        <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#111111] mb-3">
          How I ship with engineers using an AI-native workflow
        </h3>
        <div className="divide-y divide-[#e9e9e6]">
          {workflows.map((w, i) => (
            <div key={i} className="py-2.5 first:pt-0 last:pb-0">
              <h4 className="text-[14px] font-semibold text-[#1a1a1a] mb-0.5">{w.title}</h4>
              <p className="text-[12px] font-medium text-[#111111]">{w.flow}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[#e9e9e6]">
          <Link
            href="/how-i-think"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#111111] hover:underline underline-offset-[3px]"
            onClick={() => track("v2_workflow_see_more_clicked", { href: "/how-i-think" })}
          >
            See more AI workflows
            <span aria-hidden className="translate-y-[-1px]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function StorytellingSkillBlock() {
  return (
    <section className="pt-16">
      <div className="rounded-[18px] bg-[#f5f5f7] p-4 md:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#777]">
          Agent Experience · Storytelling skill
        </p>
        <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.35px] text-[#111]">
          KateXuStorytelling.md
        </h2>
        <p className="mt-2 max-w-[520px] text-[15px] leading-[1.5] text-[#333]">
          Turn hard-to-explain ideas into narrative illustrations for an
          existing presentation deck.
        </p>
        <p className="mt-3 max-w-[560px] text-[13px] leading-[1.6] text-[#777]">
          Find the right scenes, choose A–D, and match the visual language of
          the existing deck.
        </p>

        <div
          className="mt-5 grid grid-cols-2 gap-x-2.5 gap-y-4"
          aria-label="Four illustration directions generated by Kate Xu Storytelling"
        >
          {STORYTELLING_CHOICES.map((choice) => (
            <figure key={choice}>
              <div className="aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
                <img
                  src={`/kate-storytelling-choice-${choice}.webp`}
                  alt={`Kate Xu Storytelling direction ${choice.toUpperCase()}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-1.5 text-center text-[12px] font-semibold uppercase text-[#111]">
                {choice}
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={STORYTELLING_GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("v2_storytelling_skill_clicked")}
          className="mt-5 inline-flex items-center rounded-full bg-[#111] px-4 py-2 text-[13px] font-medium text-white hover:bg-black transition-colors"
        >
          View on GitHub ↗
        </a>
      </div>
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
  const src = imgSrc(img);
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");
  return (
    <div
      className={`overflow-hidden rounded-[24px] bg-[#f5f5f7] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_36px_-24px_rgba(0,0,0,0.18)] ${
        phone ? "mx-auto w-full max-w-[240px] md:max-w-[340px]" : ""
      } ${className}`}
    >
      {isVideo ? (
        <video
          src={src}
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
        <img src={src} alt={title} loading="lazy" className="w-full h-auto block" />
      )}
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
            <span className="text-[12px] leading-none tracking-[1px] text-[#111111]" aria-hidden>
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
          <span className="text-[#111111]" aria-hidden>
            ★★★★★
          </span>{" "}
          “{app.review}” <span className="text-[#aaa]">App Store review</span>
        </p>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// A single project block — small title, one-liner, gray pill, then big image
// ───────────────────────────────────────────────────────────────────────────
export function ProjectBlock({ project }: { project: Project }) {
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
        <button
          onClick={toggle}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#111] text-white px-4 py-1.5 text-[12px] font-medium hover:bg-black transition-colors"
        >
          <span
            className="text-[13px] leading-none text-white transition-transform duration-300"
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
            onClick={() => track("v2_try_clicked", { project: project.title })}
            className="inline-flex items-center gap-1 rounded-full bg-[#f1f1f0] hover:bg-[#e9e9e6] px-4 py-1.5 text-[12px] font-medium text-[#555] transition-colors"
          >
            {project.liveLabel ?? "Try it live"}
            <span aria-hidden className="text-[0.9em] translate-y-[-1px]">
              ↗
            </span>
          </a>
        )}
        {project.caseStudyUrl && (
          <a
            href={project.caseStudyUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("v2_case_study_clicked", { project: project.title })}
            className="group inline-flex items-center gap-1 text-[12px] font-medium text-[#111] hover:underline underline-offset-[3px] transition-colors"
          >
            Full case study
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">›</span>
          </a>
        )}
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
              <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#111111] mb-3">
                Key decisions
              </h3>
              <div className="divide-y divide-[#eeeeee]">
                {project.reflection.map((d, i) => (
                  <div key={i} className="py-3.5 first:pt-0 last:pb-0">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#1a1a1a] mb-1">
                      {d.title}
                    </h4>
                    <p className="text-[14px] md:text-[15px] leading-[1.65] text-[#555]">{d.body}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#111111] mb-2">
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
        <WorkflowHighlightBlock />
        <StorytellingSkillBlock />
        {projects.map((project) => (
          <ProjectBlock key={project.key} project={project} />
        ))}
        <Footer />
      </main>
    </div>
  );
}
