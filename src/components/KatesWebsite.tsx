"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";

// Image assets
const imgPlanetaryDiagram = "/planetary-diagram.png";
const imgBofaCloud = "/bofa-cloud.png";
const imgBofAWorkplace = "/bofa-workplace.png";
const imgPawpawStory = "/pawpaw-story.png";
const imgIOnboard = "/ionboard.png";
const imgJobpilot = "/jobpilot-ship.png";
const imgOneco = "/oneco-ship.png";
const imgKateXu = "/kate-xu.png";

// Project data
const projects = {
  bofaCloud: {
    title: "BOFA CLOUD",
    category: "DESIGN LEAD IN THE TEAM OF 35",
    description: "Cloud infrastructure platform supporting over 4K internal applications.",
    previewImage: "/cloud-cover.png",
    benchmarks: [
      "20% decrease in support tickets",
      "Reduced Task Completion Time by 40%",
      "Unified design system adoption",
    ],
  },
  bofaWorkplace: {
    title: "BOFA WORKIT",
    category: "SOLO DESIGNER IN THE TEAM OF 3 (MOBILE WORKPLACE TOOL)",
    description: "Unified mobile Command Center — reached NPS score as 36.",
    previewImage: "/workit-cover.png",
    benchmarks: [
      "Reached NPS score as 36",
      "91% workflow unification",
      "3+ platforms consolidated into 1",
    ],
  },
  pawpawStory: {
    title: "PAWPAWSTORY",
    category: "SOLO AI PRODUCT BUILDER",
    description: "AI voice-cloning storytelling app for your kids.",
    previewImage: "/pawpaw-cover.png",
    benchmarks: [
      "Design system with Figma variables",
      "Zero to App Store in 4 weeks",
      "Multi-agent AI workflow",
      "Voice cloning integration",
    ],
  },
  ionboard: {
    title: "IONBOARD",
    category: "DESIGN AND MARKETING",
    description: "Electric skateboard brand — $57K+ Kickstarter (570%).",
    previewImage: "/ionboard-cover.png",
    benchmarks: [
      "$57K+ Kickstarter (570% funded)",
      "Global e-commerce marketing",
      "End-to-end brand design",
    ],
  },
  jobpilot: {
    title: "JOBPILOT",
    category: "SOLO AI PRODUCT BUILDER",
    description: "AI-powered job hunting tool — built as User #1.",
    previewImage: "/jobpilot-cover.gif",
    benchmarks: [
      "AI resume analysis & revision",
      "Job matching by interview probability",
      "Form auto-fill assist panel",
      "Figma MCP → Cursor → Claude API workflow",
    ],
  },
  oneco: {
    title: "ONECO",
    category: "SOLO AI PRODUCT BUILDER",
    description: "Builder archetype quiz — are you built to run a one-person company?",
    previewImage: "/oneco-demo.gif",
    benchmarks: [
      "5 builder archetypes",
      "4 languages (EN/ZH/ES/FR)",
      "Personality → career path",
      "One-person company readiness",
    ],
  },
};

type ProjectKey = keyof typeof projects;

// Spec highlights for each spaceship (short phrases)
const specHighlights: Record<ProjectKey, [string, string, string, string]> = {
  bofaCloud: ["Design Lead · 35", "4K+ apps", "-40% task time", "Design system"],
  bofaWorkplace: ["Solo designer", "NPS 36", "3 platforms → 1", "91% unified"],
  pawpawStory: ["Solo AI builder", "0→App Store, 4 wks", "Voice cloning", "Multi-agent AI"],
  ionboard: ["$57K Kickstarter", "570% funded", "Brand + marketing", "Global e-comm"],
  jobpilot: ["AI job hunting", "Form auto-fill", "Scout pipeline", "User #1: Katie"],
  oneco: ["Builder archetype quiz", "5 profiles", "4 languages", "One-person co."],
};

// Project routes mapping
const projectRoutes: Record<ProjectKey, string | null> = {
  bofaCloud: "/projects/bofa-cloud",
  bofaWorkplace: "/projects/bofa-workplace",
  pawpawStory: "/projects/pawpaw-story",
  ionboard: "/projects/ionboard",
  jobpilot: "/projects/jobpilot",
  oneco: "/projects/oneco",
};

// Floating animation variants for spaceships
const floatingVariants = {
  float: (custom: { duration: number; delay: number; yOffset: number }) => ({
    y: [0, -custom.yOffset, 0, custom.yOffset * 0.5, 0],
    rotate: [0, custom.yOffset * 0.3, 0, -custom.yOffset * 0.2, 0],
    transition: {
      duration: custom.duration,
      delay: custom.delay,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

// Spring transition config
const springTransition = {
  type: "spring" as const,
  stiffness: 60,
  damping: 20,
};

// Spaceship data with initial scattered positions
interface SpaceshipData {
  key: ProjectKey;
  src: string;
  alt: string;
  initialPos: { left: string; top: string; width: string; height: string };
  mobileInitialPos: { left: string; top: string; width: string; height: string };
  floatParams: { duration: number; delay: number; yOffset: number };
}

const spaceships: SpaceshipData[] = [
  {
    key: "bofaCloud",
    src: imgBofaCloud,
    alt: "Bofa Cloud Project",
    initialPos: { left: "18%", top: "12%", width: "192px", height: "139px" },
    mobileInitialPos: { left: "10%", top: "10%", width: "90px", height: "65px" },
    floatParams: { duration: 5, delay: 0, yOffset: 10 },
  },
  {
    key: "jobpilot",
    src: imgJobpilot,
    alt: "Jobpilot Project",
    initialPos: { left: "62%", top: "12%", width: "192px", height: "129px" },
    mobileInitialPos: { left: "55%", top: "10%", width: "90px", height: "60px" },
    floatParams: { duration: 6, delay: 0.5, yOffset: 14 },
  },
  {
    key: "pawpawStory",
    src: imgPawpawStory,
    alt: "Pawpaw Story Project",
    initialPos: { left: "3%", top: "38%", width: "192px", height: "109px" },
    mobileInitialPos: { left: "2%", top: "38%", width: "90px", height: "51px" },
    floatParams: { duration: 4.5, delay: 1, yOffset: 8 },
  },
  {
    key: "bofaWorkplace",
    src: imgBofAWorkplace,
    alt: "BofA Workplace Project",
    initialPos: { left: "76%", top: "38%", width: "192px", height: "99px" },
    mobileInitialPos: { left: "68%", top: "38%", width: "90px", height: "47px" },
    floatParams: { duration: 5.5, delay: 1.5, yOffset: 12 },
  },
  {
    key: "ionboard",
    src: imgIOnboard,
    alt: "iOnboard Project",
    initialPos: { left: "18%", top: "68%", width: "180px", height: "120px" },
    mobileInitialPos: { left: "10%", top: "68%", width: "85px", height: "57px" },
    floatParams: { duration: 5, delay: 0.3, yOffset: 11 },
  },
  {
    key: "oneco",
    src: imgOneco,
    alt: "Oneco Project",
    initialPos: { left: "62%", top: "68%", width: "180px", height: "120px" },
    mobileInitialPos: { left: "58%", top: "68%", width: "85px", height: "57px" },
    floatParams: { duration: 4.8, delay: 0.8, yOffset: 9 },
  },
];

// Mission Command — typewriter on a glass sheet with green edges
function MissionCommand({ visible }: { visible: boolean }) {
  const fullText = "CHOOSE A SPACESHIP TO SEE SPECS";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const charIndex = useState({ current: 0 })[0];

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIndex.current < fullText.length) {
          setDisplayedText(fullText.slice(0, charIndex.current + 1));
          charIndex.current += 1;
        } else {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(startDelay);
  }, [charIndex]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <motion.div
      className="absolute top-14 left-0 right-0 flex justify-center z-10"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="relative px-6 py-3 rounded-[8px] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(0,188,125,0.4)",
          boxShadow: "0 0 12px rgba(0,188,125,0.1), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        {/* Green corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00bc7d] rounded-tl-[8px]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00bc7d] rounded-tr-[8px]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00bc7d] rounded-bl-[8px]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00bc7d] rounded-br-[8px]" />

        <div className="absolute inset-x-0 top-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,188,125,0.5), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,188,125,0.3), transparent)" }} />

        <p className="text-[11px] md:text-[12px] font-mono font-semibold tracking-[3px] text-[#00915f]">
          <span style={{ textShadow: "0 0 8px rgba(0,188,125,0.3)" }}>
            {displayedText}
          </span>
          <span
            className="inline-block w-[2px] h-[14px] ml-0.5 align-middle bg-[#00bc7d]"
            style={{
              opacity: showCursor ? 1 : 0,
              boxShadow: "0 0 4px rgba(0,188,125,0.6)",
              transition: "opacity 0.1s",
            }}
          />
        </p>
      </div>
    </motion.div>
  );
}

// Spaceship intro component (Phase 1)
interface SpaceshipIntroProps {
  ship: SpaceshipData;
  isMobile: boolean;
}

function SpaceshipIntro({ ship, isMobile }: SpaceshipIntroProps) {
  const initPos = isMobile ? ship.mobileInitialPos : ship.initialPos;

  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: initPos.left,
        top: initPos.top,
        width: initPos.width,
        height: initPos.height,
      }}
    >
      <motion.div
        className="w-full h-full relative"
        variants={floatingVariants}
        animate="float"
        custom={ship.floatParams}
      >
        <img
          src={ship.src}
          alt={ship.alt}
          className="w-full h-full object-contain pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

// Navigation Button Component - Mobile only (inside carousel overlay)
interface MobileNavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

function MobileNavButton({ direction, onClick, disabled }: MobileNavButtonProps) {
  const arrow = direction === "left" ? "‹" : "›";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="absolute z-20 flex items-center justify-center transition-all duration-200"
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: disabled ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)",
        border: "1px solid rgba(0,188,125,0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        top: "50%",
        transform: "translateY(-50%)",
        ...(direction === "left" ? { left: "12px" } : { right: "12px" }),
      }}
    >
      <span
        style={{
          fontSize: "28px",
          color: "#00bc7d",
          lineHeight: 1,
          marginTop: "-2px",
        }}
      >
        {arrow}
      </span>
    </button>
  );
}

// Desktop Navigation Button - Full height rectangle panel
interface DesktopNavButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  showcaseHeight: string;
}

function DesktopNavButton({ direction, onClick, disabled, showcaseHeight }: DesktopNavButtonProps) {
  const arrow = direction === "left" ? "‹" : "›";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex-shrink-0 flex items-center justify-center transition-all duration-200"
      style={{
        width: "52px",
        height: showcaseHeight,
        borderRadius: direction === "left" ? "12px 0 0 12px" : "0 12px 12px 0",
        background: disabled ? "rgba(255,255,255,0.35)" : "rgba(0,188,125,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(0,188,125,0.25)",
        borderRight: direction === "left" ? "none" : "1px solid rgba(0,188,125,0.25)",
        borderLeft: direction === "right" ? "none" : "1px solid rgba(0,188,125,0.25)",
        opacity: disabled ? 0.25 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "rgba(0,188,125,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = disabled ? "rgba(255,255,255,0.35)" : "rgba(0,188,125,0.08)";
      }}
    >
      <span
        style={{
          fontSize: "36px",
          color: "#00bc7d",
          lineHeight: 1,
        }}
      >
        {arrow}
      </span>
    </button>
  );
}

// Showcase Window Component
interface ShowcaseWindowProps {
  ship: SpaceshipData;
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isMobile: boolean;
}

function ShowcaseWindow({ ship, selectedIndex, onPrev, onNext, canGoPrev, canGoNext, isMobile }: ShowcaseWindowProps) {
  const project = projects[ship.key];
  const route = projectRoutes[ship.key];
  const benchmarks = project.benchmarks.slice(0, 4);

  // Forward wheel events from the glass panel to window so trackpad scroll works on desktop
  const onWheel = !isMobile
    ? (e: React.WheelEvent) => { window.scrollBy({ top: e.deltaY, behavior: "auto" }); }
    : undefined;

  return (
    <div
      style={{
        position: "relative",
        overflow: "visible",
        width: isMobile ? "92vw" : "820px",
        maxWidth: "820px",
        ...(isMobile ? { height: "auto", position: "relative" as const } : {}),
      }}
    >
      {/* The frosted glass panel itself - liquid glass style */}
      <div
        className="relative"
        onWheel={onWheel}
        style={{
          width: "100%",
          height: isMobile ? "auto" : "clamp(400px, calc(100vh - 220px), 620px)",
          ...(isMobile ? { maxHeight: "calc(100dvh - env(safe-area-inset-top, 0px) - 150px)" } : {}),
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: isMobile ? "24px" : "12px",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Green top notch/tab - centered at top */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "60px", height: "6px", borderRadius: "0 0 4px 4px", background: "#00bc7d" }} />
        </div>

        {/* Glass shine overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "inherit",
            backgroundImage: "linear-gradient(124deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(255,255,255,0.1) 70%, transparent 100%)",
          }}
        />

        {/* Top edge highlight */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: "1px",
            pointerEvents: "none",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          }}
        />

        {/* Inner content area — centered column, scrollable */}
        <div style={{ padding: isMobile ? "0 16px 12px" : "0 28px 20px", display: "flex", flexDirection: "column", flex: 1, minHeight: 0, alignItems: "center", overflowY: "auto" }}>
          {/* Title + category — left-aligned */}
          <div style={{ width: "100%", paddingRight: isMobile ? "60px" : "120px", marginTop: isMobile ? "10px" : "16px" }}>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: isMobile ? "22px" : "36px",
                fontWeight: 700,
                letterSpacing: "0px",
                color: "#1d1d1f",
                textTransform: "uppercase",
                margin: "0 0 4px 0",
                lineHeight: "1.08",
                textShadow: "0 0 8px rgba(255,255,255,0.5)",
              }}
            >
              {project.title}
            </p>
            {/* Category/role subtitle */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#00bc7d" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="7" r="4" />
                <path d="M4 21c0-4 3.582-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
              <p
                style={{
                  fontSize: isMobile ? "9px" : "11px",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  letterSpacing: "0.5px",
                  color: "#00915f",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                {project.category}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: "1px", margin: isMobile ? "8px 0 10px" : "14px 0 20px", background: "rgba(200,200,200,0.5)" }} />

          {/* Project intro description — centered */}
          <p
            style={{
              width: "100%",
              fontSize: isMobile ? "13px" : "17px",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: "#1d1d1f",
              fontWeight: 600,
              lineHeight: "1.3",
              marginBottom: isMobile ? "10px" : "20px",
              marginTop: "0",
              textAlign: "center",
            }}
          >
            {project.description}
          </p>

          {/* Cover image area — centered */}
          <div
            style={{
              width: "100%",
              ...(isMobile
                ? { height: "150px", minHeight: "120px", maxHeight: "150px" }
                : { height: "240px", minHeight: "240px", maxHeight: "240px" }),
              background: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "8px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {ship.key === "oneco" ? (
                  /* Two iPhone 16 Pro frames for OneCo - side by side, height constrained */
                  <div style={{ display: "flex", gap: isMobile ? "8px" : "16px", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    {/* First iPhone */}
                    <div style={{ position: "relative", height: isMobile ? "140px" : "220px" }}>
                      <div style={{
                        position: "relative",
                        height: "100%",
                        background: "#2c2c2e",
                        borderRadius: isMobile ? "14px" : "22px",
                        padding: isMobile ? "3px" : "4px",
                        boxShadow: "0 15px 30px -8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
                      }}>
                        <div style={{ position: "absolute", inset: 0, borderRadius: isMobile ? "14px" : "22px", border: "1px solid rgba(72,72,74,0.5)" }} />
                        <div style={{ position: "relative", height: "100%", background: "#000", borderRadius: isMobile ? "12px" : "18px", overflow: "hidden" }}>
                          <img
                            src="/oneco-demo.gif"
                            alt="Oneco language demo"
                            style={{ height: "100%", width: "auto", objectFit: "cover" }}
                          />
                          <div style={{
                            position: "absolute",
                            bottom: isMobile ? "3px" : "4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: isMobile ? "30px" : "45px",
                            height: "2px",
                            background: "rgba(255,255,255,0.3)",
                            borderRadius: "999px",
                          }} />
                        </div>
                      </div>
                    </div>
                    {/* Second iPhone */}
                    <div style={{ position: "relative", height: isMobile ? "140px" : "220px" }}>
                      <div style={{
                        position: "relative",
                        height: "100%",
                        background: "#2c2c2e",
                        borderRadius: isMobile ? "14px" : "22px",
                        padding: isMobile ? "3px" : "4px",
                        boxShadow: "0 15px 30px -8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
                      }}>
                        <div style={{ position: "absolute", inset: 0, borderRadius: isMobile ? "14px" : "22px", border: "1px solid rgba(72,72,74,0.5)" }} />
                        <div style={{ position: "relative", height: "100%", background: "#000", borderRadius: isMobile ? "12px" : "18px", overflow: "hidden" }}>
                          <img
                            src="/oneco-share.gif"
                            alt="Oneco share demo"
                            style={{ height: "100%", width: "auto", objectFit: "cover" }}
                          />
                          <div style={{
                            position: "absolute",
                            bottom: isMobile ? "3px" : "4px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: isMobile ? "30px" : "45px",
                            height: "2px",
                            background: "rgba(255,255,255,0.3)",
                            borderRadius: "999px",
                          }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", borderRadius: "4px" }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Highlights — centered block */}
          <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: isMobile ? "12px" : "32px", flexShrink: 0 }}>
            {isMobile ? (
              /* Mobile: inline-block table trick — shrinks to content, then margin:auto centers it */
              <div style={{ display: "table", margin: "0 auto" }}>
                {benchmarks.map((benchmark, i) => (
                  <motion.div
                    key={`${selectedIndex}-benchmark-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "5px" }}
                  >
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00bc7d", flexShrink: 0, marginTop: "4px", display: "inline-block" }} />
                    <p style={{ fontSize: "12px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1d1d1f", fontWeight: 400, margin: 0, lineHeight: "1.4", whiteSpace: "nowrap" }}>
                      {benchmark}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* Desktop: 2-col grid */
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
                {benchmarks.map((benchmark, i) => (
                  <motion.div
                    key={`${selectedIndex}-benchmark-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}
                  >
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#00bc7d", flexShrink: 0, marginTop: "4px", display: "inline-block" }} />
                    <p style={{ fontSize: "17px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#1d1d1f", fontWeight: 400, margin: 0, lineHeight: "1.4", whiteSpace: "nowrap" }}>
                      {benchmark}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom section + Read More button */}
          <div style={{ marginTop: isMobile ? "12px" : "38px", paddingBottom: isMobile ? "6px" : "12px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
            {route ? (
              <Link href={route} style={{ display: "block" }} onClick={() => posthog.capture("project_read_more_clicked", { project_name: project.title, project_route: route })}>
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.2) 100%)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const glow = e.currentTarget.querySelector('.hover-glow') as HTMLElement;
                    if (glow) glow.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    const glow = e.currentTarget.querySelector('.hover-glow') as HTMLElement;
                    if (glow) glow.style.opacity = '0';
                  }}
                >
                  {/* Hover glow overlay */}
                  <div
                    className="hover-glow"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      borderRadius: "6px",
                      background: "radial-gradient(ellipse at center, rgba(0,188,125,0.08) 0%, transparent 70%)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px 16px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "3px", color: "#00bc7d", textTransform: "uppercase", textShadow: "0 0 4px rgba(0,188,125,0.3)", lineHeight: 1 }}>
                      Read More
                    </span>
                    <span style={{ color: "#00bc7d", fontSize: "13px", lineHeight: 1, position: "relative", top: "-1px" }}>›</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.2) 100%)",
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                  borderRadius: "6px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "10px 16px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "3px", color: "rgba(0,188,125,0.3)", textTransform: "uppercase", lineHeight: 1 }}>
                    Coming Soon
                  </span>
                  <span style={{ color: "rgba(0,188,125,0.3)", fontSize: "13px", lineHeight: 1 }}>›</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Nav buttons inside showcase */}
        {isMobile && (
          <>
            <MobileNavButton direction="left" onClick={onPrev} disabled={!canGoPrev} />
            <MobileNavButton direction="right" onClick={onNext} disabled={!canGoNext} />
          </>
        )}
      </div>

      {/* Spaceship absolutely positioned at top-right, overflowing */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "8px" : "auto",
          bottom: isMobile ? "auto" : "-52px",
          right: isMobile ? "8px" : "auto",
          left: isMobile ? "auto" : "-30px",
          zIndex: 50,
          pointerEvents: "none",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={floatingVariants}
              animate="float"
              custom={ship.floatParams}
              style={{ width: isMobile ? "65px" : "180px" }}
            >
              <img
                src={ship.src}
                alt={ship.alt}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Thumbnail Row Component - now positioned below showcase, not fixed to bottom
interface ThumbnailRowProps {
  ships: SpaceshipData[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  isMobile: boolean;
}

function ThumbnailRow({ ships, selectedIndex, onSelect, isMobile }: ThumbnailRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active thumbnail into view on mobile
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    const btn = scrollRef.current.children[selectedIndex] as HTMLElement;
    if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedIndex, isMobile]);

  const itemW  = isMobile ? 56 : 80;
  const itemH  = isMobile ? 44 : 64;
  const gap    = isMobile ? 12 : 40;
  const labelSz = isMobile ? "11px" : "13px";

  return (
    <div
      ref={scrollRef}
      style={{
        display: "flex",
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: "flex-start",
        overflowX: isMobile ? "auto" : "visible",
        gap: `${gap}px`,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
        scrollSnapType: isMobile ? "x mandatory" : "none",
        paddingLeft:  isMobile ? "20px" : "0",
        paddingRight: isMobile ? "20px" : "0",
      } as React.CSSProperties}
    >
      {ships.map((ship, index) => {
        const isActive = index === selectedIndex;
        const project = projects[ship.key];
        return (
          <button
            key={ship.key}
            onClick={() => { onSelect(index); posthog.capture("project_selected", { project_name: projects[ship.key].title, project_index: index }); }}
            className="flex-shrink-0 flex flex-col items-center transition-all duration-200"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              scrollSnapAlign: isMobile ? "center" : "none",
            }}
          >
            <div
              style={{
                width: `${itemW}px`,
                height: `${itemH}px`,
                border: isActive ? "1.5px solid #00bc7d" : "1.5px solid transparent",
                borderRadius: "8px",
                boxShadow: isActive ? "0 0 10px rgba(0,188,125,0.25)" : "none",
                filter: isActive ? "none" : "grayscale(30%) brightness(0.85)",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={ship.src}
                alt={ship.alt}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <p
              style={{
                fontSize: labelSz,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: "#1d1d1f",
                textAlign: "center",
                marginTop: "6px",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              {project.title}
            </p>
          </button>
        );
      })}
    </div>
  );
}

// Nameplate component — full badge in intro, slim horizontal strip in specs
function BadgeCard({ phase }: { phase: "intro" | "transition" | "specs" }) {
  const isIntro = phase === "intro";

  return (
    <>
      {/* ── INTRO: centered vertical badge ── */}
      <AnimatePresence>
        {isIntro && (
          <motion.div
            key="badge-intro"
            className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={springTransition}
          >
            <div className="relative bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden w-[280px]">
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(124deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)" }} />

              {/* Clip/Hook */}
              <div className="relative h-12 flex items-start justify-center pt-0">
                <div className="absolute -top-4 w-5 h-10 border-[5px] border-[#333] rounded-full z-0" />
                <div className="relative z-10 mt-3 w-16 h-5 bg-[#f5f5f5] border border-black/10 rounded-lg flex items-center justify-center shadow-sm">
                  <div className="w-10 h-1 bg-black/30 rounded-full" />
                </div>
              </div>

              {/* Avatar */}
              <div className="flex justify-center -mt-2">
                <div className="w-[112px] h-[82px] rounded-full bg-[#f3f4f6] border-[4px] border-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
                  <img src={imgKateXu} alt="Kate Xu" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Name */}
              <div className="text-center mt-2">
                <h1 className="text-[28px] font-bold text-[#1a1a1a] tracking-tight font-[family-name:var(--font-tinos)]">Kate Xu</h1>
              </div>

              {/* Title */}
              <div className="flex flex-col items-center mt-2">
                <p className="text-[10px] font-bold text-[#6a7282] tracking-[2px] uppercase">Gen AI</p>
                <div className="flex items-center justify-center gap-2 mt-0.5">
                  <p className="text-[10px] font-bold text-[#6a7282] tracking-[2px] uppercase">Product Designer & Builder</p>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d]" />
                </div>
              </div>

              {/* Mission & Resume */}
              <div className="px-4 pb-4 mt-3">
                <div className="flex flex-col gap-2 opacity-80">
                  <div>
                    <p className="text-[8px] font-bold text-[#99a1af] tracking-wider uppercase mb-0.5">Mission</p>
                    <div className="bg-[#f9fafb] border border-[#d1d5dc] rounded p-1.5">
                      <p className="text-[9px] text-[#364153] tracking-wider uppercase leading-4">
                        Ask good questions. Build things that make people more capable.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <Link href="/resume" className="flex-1">
                      <button className="bg-black text-white px-4 py-2 rounded-[8px] text-[10px] font-bold tracking-wider uppercase hover:bg-black/80 transition-colors w-full">
                        Resume
                      </button>
                    </Link>
                    <Link href="/how-i-think" className="flex-1">
                      <button className="bg-white text-black border border-[#d1d5dc] px-4 py-2 rounded-[8px] text-[10px] font-bold tracking-wider uppercase hover:bg-[#f3f4f6] transition-colors w-full">
                        How I Think
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SPECS: desktop fixed header bar — name + role on left, Resume on right.
           Uses fixed positioning + its own frosted background so the tunnel
           can never slide up behind it regardless of viewport height. ── */}
      <AnimatePresence>
        {!isIntro && (
          <motion.div
            key="header-bar-specs"
            className="hidden md:flex fixed top-0 left-0 right-0 z-40 items-center justify-between px-4"
            style={{
              height: "52px",
              background: "rgba(255, 251, 242, 0.82)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
              borderBottom: "1px solid rgba(0,188,125,0.15)",
              boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Left: avatar + name + role */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                <img src={imgKateXu} alt="Kate Xu" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-bold text-[#1a1a1a] tracking-tight font-[family-name:var(--font-tinos)]">
                  Kate Xu
                </span>
                <span className="text-[10px] font-semibold text-[#00915f] tracking-[1.5px] uppercase">
                  Gen AI Product Designer & Builder
                </span>
              </div>
            </div>

            {/* Right: Resume + How I Think buttons */}
            <div className="flex items-center gap-2">
              <Link href="/how-i-think">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 hover:shadow-md"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px) saturate(160%)",
                    WebkitBackdropFilter: "blur(16px) saturate(160%)",
                    border: "1px solid rgba(0,188,125,0.35)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                  <span className="text-[11px] font-bold text-[#00915f] tracking-[2px] uppercase">
                    How I Think
                  </span>
                </div>
              </Link>
              <Link href="/resume">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 hover:shadow-md"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px) saturate(160%)",
                    WebkitBackdropFilter: "blur(16px) saturate(160%)",
                    border: "1px solid rgba(0,188,125,0.35)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                  <span className="text-[11px] font-bold text-[#00915f] tracking-[2px] uppercase">
                    Resume
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function KatesWebsite() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"intro" | "transition" | "specs">("intro");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goNext = () => setSelectedIndex(i => {
    const next = Math.min(i + 1, spaceships.length - 1);
    if (next !== i) posthog.capture("project_navigated", { project_name: projects[spaceships[next].key].title, project_index: next, direction: "next" });
    return next;
  });
  const goPrev = () => setSelectedIndex(i => {
    const prev = Math.max(i - 1, 0);
    if (prev !== i) posthog.capture("project_navigated", { project_name: projects[spaceships[prev].key].title, project_index: prev, direction: "prev" });
    return prev;
  });

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Skip intro on all devices — go straight to showcase
  useEffect(() => {
    if (!mounted) return;
    setPhase("specs");
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-[#fffbf2] flex items-center justify-center">
        <div className="w-[300px] h-[450px] bg-white/50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  const isIntroPhase = phase === "intro";
  const selectedShip = spaceships[selectedIndex];

  return (
    <div 
      className={`bg-[#fffbf2] relative ${isMobile ? "w-screen overflow-hidden fixed inset-0" : ""}`}
      style={isMobile ? { height: "100dvh", touchAction: "none", overscrollBehavior: "none" } : { minWidth: "1024px", minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* Fixed background layer */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Planetary Diagram Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <img
            src={imgPlanetaryDiagram}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Orbit Rings */}
        <div className="absolute inset-0">
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-black/10"
          />
          
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            <motion.div
              className="w-full h-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              />
            </motion.div>
          </div>
        </div>
      </div>



      {/* Mission Command Glass Panel - fades out during transition */}
      <MissionCommand visible={isIntroPhase} />

      {/* Phase 1: Intro with scattered spaceships */}
      <AnimatePresence>
        {isIntroPhase && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {spaceships.map((ship) => (
              <SpaceshipIntro
                key={ship.key}
                ship={ship}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2/3: Showcase Window with Nav Arrows + Thumbnail Strip below */}
      <AnimatePresence>
        {!isIntroPhase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="z-10"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // Desktop: natural page scroll (window scrolls, not an inner div).
              // paddingTop = fixed header height so tunnel appears immediately below it.
              ...(isMobile
                ? {
                    // Mobile: fill viewport, center content cluster
                    height: "100dvh",
                    paddingTop: "calc(env(safe-area-inset-top, 0px) + 44px)", // clear safe area + nameplate
                    paddingBottom: "env(safe-area-inset-bottom, 0px)",
                    justifyContent: "space-between",
                    gap: "0px",
                    overflow: "hidden",
                  }
                : {
                    minHeight: "100vh",
                    paddingTop: "52px",
                    paddingBottom: "40px",
                  }),
            }}
          >
            {/* Desktop: tunnel — always the first thing visible below the fixed header */}
            {!isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  width: "100vw",
                  maxWidth: "100vw",
                  padding: "16px 0",
                  background: "rgba(255, 255, 255, 0.45)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.5)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 8px 32px -4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2)",
                  position: "relative",
                  overflow: "visible",
                  flexShrink: 0,
                }}
              >
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: "0 0 auto 0", height: "1px", pointerEvents: "none", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, transparent 100%)" }} />
                <ThumbnailRow ships={spaceships} selectedIndex={selectedIndex} onSelect={setSelectedIndex} isMobile={false} />
              </motion.div>
            )}

            {/* Mobile top spacer — pushes showcase toward center while tunnel stays at bottom */}
            {isMobile && <div style={{ flex: "1 1 0%" }} />}

            {/* Showcase row — shrinks gracefully on short viewports */}
            <div
              style={{
                display: "flex",
                alignItems: isMobile ? "center" : "stretch",
                justifyContent: "center",
                marginTop: isMobile ? "0" : "12px",
                ...(isMobile
                  ? { flex: "0 0 auto", overflow: "visible" }
                  : { flexShrink: 0 }),
              }}
            >
              {!isMobile && (
                <DesktopNavButton direction="left" onClick={goPrev} disabled={selectedIndex === 0} showcaseHeight="clamp(400px, calc(100vh - 220px), 620px)" />
              )}
              <ShowcaseWindow
                ship={selectedShip}
                selectedIndex={selectedIndex}
                onPrev={goPrev}
                onNext={goNext}
                canGoPrev={selectedIndex > 0}
                canGoNext={selectedIndex < spaceships.length - 1}
                isMobile={isMobile}
              />
              {!isMobile && (
                <DesktopNavButton direction="right" onClick={goNext} disabled={selectedIndex === spaceships.length - 1} showcaseHeight="clamp(400px, calc(100vh - 220px), 620px)" />
              )}
            </div>

            {/* Mobile bottom spacer — pushes tunnel to bottom */}
            {isMobile && <div style={{ flex: "1 1 0%" }} />}

            {/* Mobile: tunnel below showcase */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  width: "100vw",
                  maxWidth: "100vw",
                  padding: "8px 0",
                  background: "rgba(255, 255, 255, 0.45)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.5)",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  boxShadow: "0 8px 32px -4px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2)",
                  position: "relative",
                  overflow: "visible",
                  pointerEvents: "auto",
                  flexShrink: 0, // don't let tunnel get squeezed away
                }}
            >
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: "0 0 auto 0", height: "1px", pointerEvents: "none", background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, transparent 100%)" }} />
              <ThumbnailRow ships={spaceships} selectedIndex={selectedIndex} onSelect={setSelectedIndex} isMobile={true} />
            </motion.div>
            )}

            {/* Desktop footer taglines — inline below showcase, scrolls with page */}
            <div className="hidden md:flex flex-col items-center w-full pt-32 pb-8 pointer-events-none" style={{ gap: "8px" }}>
              <p className="text-[12px] tracking-[2px] uppercase font-semibold" style={{ color: "rgba(0,188,125,0.75)" }}>
                ASKS THE RIGHT QUESTIONS · FRAMES THE GOAL · TURNS FUZZY THINKING INTO CLEAR DIRECTION
              </p>
              <p className="text-[12px] tracking-wide" style={{ color: "rgba(0,0,0,0.5)" }}>
                🤍 This website is imagined and handcrafted by Kate and her beloved AIs 🤍
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nameplate + buttons — absolute top-left, shown after intro */}
      <AnimatePresence>
        {phase === "specs" && isMobile && (
          <motion.div
            key="nameplate-mobile"
            className="flex flex-col absolute left-3 z-30 gap-2"
            style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Avatar + name + buttons */}
            <div className="flex items-center gap-2">
              <Link href="/how-i-think">
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 hover:ring-2 hover:ring-[#00bc7d] hover:ring-offset-1 transition-all">
                  <img src={imgKateXu} alt="Kate Xu" className="w-full h-full object-cover" />
                </div>
              </Link>
              <div className="flex flex-col leading-tight gap-1.5">
                <div>
                  <span className="text-[12px] font-bold text-[#1a1a1a] tracking-tight font-[family-name:var(--font-tinos)]">Kate Xu</span>
                  <span className="block text-[9px] font-semibold text-[#00915f] tracking-[1.5px] uppercase">Gen AI Product Designer & Builder</span>
                </div>
                <div className="flex items-center gap-2">
              <Link href="/how-i-think">
                <div
                  className="flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px) saturate(160%)",
                    WebkitBackdropFilter: "blur(16px) saturate(160%)",
                    border: "1px solid rgba(0,188,125,0.35)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                  <span className="text-[10px] font-bold text-[#00915f] tracking-[1.5px] uppercase">How I Think</span>
                </div>
              </Link>
              <Link href="/resume">
                <div
                  className="flex items-center px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px) saturate(160%)",
                    WebkitBackdropFilter: "blur(16px) saturate(160%)",
                    border: "1px solid rgba(0,188,125,0.35)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                    <span className="text-[10px] font-bold text-[#00915f] tracking-[1.5px] uppercase">Resume</span>
                  </div>
                </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Card - fixed position in top-left after intro */}
      <BadgeCard phase={phase} />
    </div>
  );
}
