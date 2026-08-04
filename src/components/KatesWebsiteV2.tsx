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

// A key design decision, framed as the call I made and why this, not that.
interface Decision {
  title: string;
  body: string;
}

// An AI-native collaboration method, highlighted at the top of the portfolio.
interface WorkflowHighlight {
  title: string;
  body: string;
  flow: string; // arrow-separated pipeline, rendered as a small green line
}

const workflows: WorkflowHighlight[] = [
  {
    title: "The AI-Verifiable Handoff",
    body: "Engineers receive a package of TSX, CSS, and design-system spec plus reference demo images — their coding agent validates the implementation against my design.",
    flow: "Figma → TSX + CSS + DS spec → reference image → agent validates → PR",
  },
  {
    title: "The Living Screen Registry",
    body: "A coding agent captures the key screens of every core flow into a registry table that auto-updates on each code push — documentation that can't drift from production.",
    flow: "coding agent → key screens → registry table → auto-update on push",
  },
];

interface Project {
  key: string;
  title: string;
  description: string;
  images: ImageRow[]; // hero rows, stacked top-to-bottom
  reflection: Decision[]; // key decisions: the call + why this, not that
  collaborators: string;
  liveUrl?: string; // renders an external link button when set
  liveLabel?: string; // button text (defaults to "Try it live")
  caseStudyUrl?: string; // internal link to the full process case study
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
    key: "jobpilot",
    caseStudyUrl: "/projects/jobpilot",
    title: "Jobpilot",
    description:
      "Your AI coach to land the next role — resume, stories, market fit, and application tracking.",
    images: ["/jobpilot-design-demo.mp4", "/jobpilot-screens-showcase.mp4"],
    liveUrl: "https://jobpilot.katexu.com/dashboard",
    reflection: [
      {
        title: "Design for the nervous system, not just the tasks",
        body: "Job hunting is a high-anxiety activity, so the v2 redesign starts from one sentence: lower cortisol before asking for effort, then deliver small dopamine hits at real moments of progress — a saved job, a finished analysis, a moved card. “Dopamine Bauhaus” is that argument as a visual language: a warm cream field with primary blue, red, and yellow, 2px ink lines, hard offset shadows, and a fixed ratio of 70% paper, 20% ink, 10% color. Calm first, then a spark.",
      },
      {
        title: "Motion moves like furniture, not jelly",
        body: "Mechanical, axis-aligned, quick: buttons press 1px into their shadow, scores fill left-to-right in 400ms, and a single 1.15× overshoot is reserved for real wins so it still means something. Even the loading spinner is the logo doing physics — the yellow ball bounces with gravity and squash while red and blue hold still. Numbers are the dopamine: oversized, tabular, one color max, making progress feel physical.",
      },
      {
        title: "Coach, not tool — and honest about the boundary",
        body: "The original page promised “auto-apply” and “smart matching” — automation the product didn't do. I rejected the tool-that-finds-you-a-job frame for a coach-that-makes-you-prepared one, and v2 keeps that honesty structural: in onboarding, one of the four journey arches is drawn in dashed outline — “You apply — out there.” The product doesn't pretend to do the part it doesn't do, and the copy (“The job search is lonely. This one isn't.”) shipped verbatim from design to production.",
      },
    ],
    collaborators: "Solo, with AI as teammate — Figma MCP, Claude Code, and the Claude API.",
  },
  {
    key: "bofa-cloud",
    caseStudyUrl: "/projects/bofa-cloud",
    title: "BofA Cloud",
    description:
      "Cloud infrastructure platform serving 1,000+ internal applications — design lead in a team of 35.",
    images: ["/bofa-cloud-hero.png", "/bofa-cloud-components.jpg"],
    reflection: [
      {
        title: "Nothing to cut → Pre-approval Tickets",
        body: "The resource-ordering wizard was long, and my tracking showed it was driving drop-off and support tickets. Using a standing 15-minute UX slot I'd carved out in the engineering standup, I pushed to cut steps — and lost that argument: engineering and the PM were right that every field was a required technical input, and cramming them onto one screen was worse. So I kept the goal (convenience) and dropped my fix, noticing that repeat orders ask the identical setup every time. Reusing that setup for frequent orders became this feature — our monthly build-success rate rose 23% and average ordering time fell 32%, all without dropping a single necessary step.",
      },
      {
        title: "Grid of tiles → Comparison View",
        body: "This came in as a vague mandate — a PM asking, on behalf of stakeholders, to “show more details on each machine” in the ordering flow, where users pick an OS image from a grid of logos. Instead of building the relayed request, I traced it to the source and pressed on what “details” even meant — price, provisioning time, specs? “All of it,” so I contacted a few of those stakeholders together with the PM and narrowed it to what actually drives the choice: cost, availability-zone capacity, and whether DMZ is enabled. That told me the real problem wasn't the tile at all — users couldn't decide which machine to pick, and no tile could hold enough to compare. So rather than decorate the grid, I designed this comparison view — specs as rows, machines as columns — to choose side by side. It added ~3% to the flow time, but order completion rose 6%: people finished because they could finally decide with confidence instead of abandoning.",
      },
    ],
    collaborators:
      "A 35-person platform org — product managers, cloud engineers, and the BofA design-system group.",
  },
  {
    key: "pawpaw-story",
    caseStudyUrl: "/projects/pawpaw-story",
    title: "PawPaw Story",
    description:
      "AI voice-cloning storytelling app for kids — solo build, zero to App Store in four weeks.",
    images: ["/pawpaw-hero.mp4", "/pawpaw-collage.mp4"],
    reflection: [
      {
        title: "Why I'm making this app",
        body: "Two scenes kept coming up. A parent home at bedtime but too drained to tell a good story — the time is there, the energy isn't. And a mom away on a work trip while her kid lies awake at home, wanting her voice, because her voice is what makes it feel safe enough to sleep. PawPaw Story serves both: it turns a parent's voice into bedtime stories, so the exhausted parent can still give quality storytime, and the parent who stayed home can press play on the one who's away. Voice cloning is usually sold as efficiency; I built it for presence.",
      },
      {
        title: "The karaoke pacer — fix the cause, not the symptom",
        body: "Users finished the voice-cloning sample in under 30 seconds, the quality minimum. I rejected lowering the minimum (hurts clone quality) and padding the script (fragile). Instead: a word-by-word highlight paced at word count ÷ 30s, so any script fills the window — and a slower, warmer read gives ElevenLabs richer prosody. One UX mechanic fixed both the duration bug and the clone quality.",
      },
      {
        title: "Root-cause the crash, then fix the class of bug",
        body: "Toggling day↔night crashed the navigator. The root cause was subtle: the theme class flipping between empty and set made NativeWind remount the subtree mid-render. The fix was minimal — always apply a theme class so element identity never changes. Same habit at the visual layer: when one back button overlapped the status bar, I audited every screen with a back button and fixed the class of bug, not the instance.",
      },
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
    caseStudyUrl: "/projects/ionboard",
    title: "Ionboard",
    description:
      "Electric skateboard brand — $57K+ Kickstarter (570% funded). End-to-end brand, design, and marketing.",
    images: ["/ionboard-cover.png", ["/ionboard-ces.png", "/ionboard-pitch.png"]],
    liveUrl:
      "https://www.kickstarter.com/projects/1728725377/ionboard?ref=discovery&term=ionboard",
    liveLabel: "View Kickstarter",
    reflection: [
      {
        title: "Treat business reality as a design constraint",
        body: "I designed with manufacturing risk, business law, and market timing as first-class constraints, not afterthoughts — because a product that can't ship or sell isn't a good design, however beautiful.",
      },
      {
        title: "Iterate on ad data, daily",
        body: "I analyzed ad performance with engineers every day and let it drive proactive design changes, rather than designing once and defending it — the campaign funded at 570% of goal.",
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
    caseStudyUrl: "/projects/bofa-workplace",
    title: "BofA WorkIT",
    description:
      "Unified mobile command center for IT support — solo designer in a team of 3. Reached an NPS of 36.",
    images: ["/workit-old-vs-new.mp4", "/workit-eda-demo.jpg"],
    reflection: [
      {
        title: "Build the IA around the vital 20%",
        body: "Instead of designing for every requested feature, I immersed in users' daily workflows to find the 20% that drives 80% of the value — and structured the whole information architecture around those.",
      },
      {
        title: "Treat complaints as the roadmap",
        body: "I chose to read user complaints not as setbacks but as the clearest signal of where the product should go next — the most meaningful context I had for what to build.",
      },
      {
        title: "Let data overrule my assumptions",
        body: "When behavior data contradicted my expectations, I re-prioritized features by comparing release versions and A/B results rather than defending the original design.",
      },
    ],
    collaborators:
      "A team of three, the IT support staff whose real-time struggles shaped every iteration, and partner product managers.",
  },
  {
    key: "oneco",
    caseStudyUrl: "/projects/oneco",
    title: "OneCo",
    description:
      "Builder-archetype quiz in four languages — are you built to run a one-person company?",
    images: [{ src: "/oneco-demo.mp4", phone: true }],
    liveUrl: "https://oneco.katexu.com/",
    reflection: [
      {
        title: "Reframe the question",
        body: "“Should I go solo?” is the wrong question — no quiz can answer it. “What kind of builder am I?” is the right one, and the whole product is built to answer that honestly so people can build in alignment with who they actually are.",
      },
      {
        title: "Global from day one",
        body: "I designed for four languages from the start rather than bolting on localization later — which forced clearer copy, fewer cultural assumptions, and more universal framing.",
      },
      {
        title: "Paths, not labels",
        body: "Most personality tools stop at a label. I connected each archetype to real paths: the kind of one-person business you're suited to build, the traps to avoid, and where your edge actually is.",
      },
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
        <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#00915f] mb-3">
          How I ship with engineers — AI-native workflow
        </h3>
        <div className="divide-y divide-[#e9e9e6]">
          {workflows.map((w, i) => (
            <div key={i} className="py-2.5 first:pt-0 last:pb-0">
              <h4 className="text-[14px] font-semibold text-[#1a1a1a] mb-0.5">{w.title}</h4>
              <p className="text-[12px] font-medium text-[#00915f]">{w.flow}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[#e9e9e6]">
          <Link
            href="/how-i-think"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-[#00915f] hover:underline underline-offset-[3px]"
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
      className={`overflow-hidden rounded-[24px] border border-[#ececec] bg-[#fafafa] ${
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
        <button
          onClick={toggle}
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
            onClick={() => track("v2_case_study_clicked", { project: project.title })}
            className="inline-flex items-center gap-1 rounded-full border border-[#00bc7d] text-[#00915f] px-4 py-1.5 text-[12px] font-medium hover:bg-[#e6f7f0] transition-colors"
          >
            Full case study
            <span aria-hidden className="translate-y-[-1px]">→</span>
          </Link>
        )}
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
              <h3 className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#00915f] mb-3">
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
        <WorkflowHighlightBlock />
        {projects.map((project) => (
          <ProjectBlock key={project.key} project={project} />
        ))}
        <Footer />
      </main>
    </div>
  );
}
