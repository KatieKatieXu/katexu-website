"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    previewImage: "/jobpilot-cover.png",
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
    previewImage: "/oneco-ship.avif",
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
  oneco: null, // coming soon
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
    initialPos: { left: "12%", top: "18%", width: "192px", height: "139px" },
    mobileInitialPos: { left: "18%", top: "12%", width: "90px", height: "65px" },
    floatParams: { duration: 5, delay: 0, yOffset: 10 },
  },
  {
    key: "bofaWorkplace",
    src: imgBofAWorkplace,
    alt: "BofA Workplace Project",
    initialPos: { left: "72%", top: "18%", width: "192px", height: "129px" },
    mobileInitialPos: { left: "58%", top: "12%", width: "90px", height: "60px" },
    floatParams: { duration: 6, delay: 0.5, yOffset: 14 },
  },
  {
    key: "pawpawStory",
    src: imgPawpawStory,
    alt: "Pawpaw Story Project",
    initialPos: { left: "5%", top: "30%", width: "192px", height: "109px" },
    mobileInitialPos: { left: "5%", top: "52%", width: "90px", height: "51px" },
    floatParams: { duration: 4.5, delay: 1, yOffset: 8 },
  },
  {
    key: "ionboard",
    src: imgIOnboard,
    alt: "iOnboard Project",
    initialPos: { left: "72%", top: "30%", width: "192px", height: "99px" },
    mobileInitialPos: { left: "68%", top: "52%", width: "90px", height: "47px" },
    floatParams: { duration: 5.5, delay: 1.5, yOffset: 12 },
  },
  {
    key: "jobpilot",
    src: imgJobpilot,
    alt: "Jobpilot Project",
    initialPos: { left: "20%", top: "55%", width: "180px", height: "120px" },
    mobileInitialPos: { left: "10%", top: "75%", width: "85px", height: "57px" },
    floatParams: { duration: 5, delay: 0.3, yOffset: 11 },
  },
  {
    key: "oneco",
    src: imgOneco,
    alt: "Oneco Project",
    initialPos: { left: "68%", top: "55%", width: "180px", height: "120px" },
    mobileInitialPos: { left: "60%", top: "75%", width: "85px", height: "57px" },
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
        background: disabled ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.55)",
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
        e.currentTarget.style.background = disabled ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.55)";
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
  const specs = specHighlights[ship.key];
  const route = projectRoutes[ship.key];

  // Spec positions inside the showcase window
  const specPositions = [
    { left: "5%", top: "10%" },
    { right: "5%", top: "18%" },
    { left: "8%", bottom: "12%" },
    { right: "8%", bottom: "18%" },
  ];

  return (
    <div
      className="relative"
      style={{
        width: isMobile ? "92vw" : "680px",
        height: isMobile ? "62vh" : "480px",
        maxWidth: "680px",
        background: "rgba(255,251,242,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.8)",
        borderRadius: isMobile ? "24px" : "0",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
      }}
    >
      {/* Green corner accents (L-shaped) - only on mobile since desktop has flush nav buttons */}
      {isMobile && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00bc7d] rounded-tl-[24px]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00bc7d] rounded-tr-[24px]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00bc7d] rounded-bl-[24px]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00bc7d] rounded-br-[24px]" />
        </>
      )}

      {/* SVG connector lines from center to specs - shortened, dashed */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ borderRadius: isMobile ? "24px" : "0", overflow: "hidden" }}
      >
        {specPositions.map((pos, i) => {
          // Calculate approximate label center percentages
          let labelX: number;
          let labelY: number;
          
          if (pos.left) {
            labelX = parseFloat(pos.left) + 8;
          } else if (pos.right) {
            labelX = 100 - parseFloat(pos.right) - 8;
          } else {
            labelX = 50;
          }
          
          if (pos.top) {
            labelY = parseFloat(pos.top) + 4;
          } else if (pos.bottom) {
            labelY = 100 - parseFloat(pos.bottom) - 4;
          } else {
            labelY = 50;
          }
          
          // Shorten the line: stop at 55% of the way to the label
          const shortenedX = 50 + (labelX - 50) * 0.55;
          const shortenedY = 50 + (labelY - 50) * 0.55;
          
          return (
            <g key={i}>
              <line
                x1="50%"
                y1="50%"
                x2={`${shortenedX}%`}
                y2={`${shortenedY}%`}
                stroke="rgba(0,188,125,0.35)"
                strokeWidth="0.8"
                strokeDasharray="4 3"
              />
              <circle
                cx="50%"
                cy="50%"
                r="3"
                fill="rgba(0,188,125,0.5)"
              />
            </g>
          );
        })}
      </svg>

      {/* Project title - bigger and more obvious */}
      <div className="absolute top-6 left-0 right-0 flex flex-col items-center">
        <p
          style={{
            fontFamily: "monospace",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "3px",
            color: "#00915f",
            textTransform: "uppercase",
          }}
        >
          {project.title}
        </p>
        {/* Brief intro row under project title */}
        <p
          style={{
            fontSize: "12px",
            color: "rgba(0,0,0,0.5)",
            fontFamily: "sans-serif",
            textAlign: "center",
            maxWidth: "80%",
            margin: "4px auto 12px",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Ship image centered with floating animation */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={floatingVariants}
              animate="float"
              custom={ship.floatParams}
              style={{ width: isMobile ? "180px" : "280px" }}
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

      {/* Spec labels scattered inside window - lowkey style, no decorations */}
      {specPositions.map((pos, i) => (
        <motion.div
          key={`${selectedIndex}-${i}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
          className="absolute"
          style={{
            ...pos,
          }}
        >
          <div
            style={{
              background: "transparent",
              padding: "2px 0",
              borderBottom: "1px solid rgba(0,188,125,0.4)",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "1px",
                color: "#1a1a1a",
                whiteSpace: "nowrap",
              }}
            >
              {specs[i]}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Read More button - paper white with corner accents */}
      {route && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <Link href={route}>
            <span
              className="relative inline-block transition-colors"
              style={{
                background: "#fff",
                padding: "10px 24px",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#00915f",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,188,125,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
              }}
            >
              {/* L-shape corner accents (10px) */}
              <span className="absolute top-0 left-0 w-[10px] h-[10px] border-t-[1.5px] border-l-[1.5px] border-[#00bc7d] rounded-tl-[4px]" />
              <span className="absolute top-0 right-0 w-[10px] h-[10px] border-t-[1.5px] border-r-[1.5px] border-[#00bc7d] rounded-tr-[4px]" />
              <span className="absolute bottom-0 left-0 w-[10px] h-[10px] border-b-[1.5px] border-l-[1.5px] border-[#00bc7d] rounded-bl-[4px]" />
              <span className="absolute bottom-0 right-0 w-[10px] h-[10px] border-b-[1.5px] border-r-[1.5px] border-[#00bc7d] rounded-br-[4px]" />
              READ MORE →
            </span>
          </Link>
        </div>
      )}

      {/* Mobile: Nav buttons inside showcase */}
      {isMobile && (
        <>
          <MobileNavButton direction="left" onClick={onPrev} disabled={!canGoPrev} />
          <MobileNavButton direction="right" onClick={onNext} disabled={!canGoNext} />
        </>
      )}
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
  return (
    <div
      className="flex justify-center items-start overflow-x-auto"
      style={{
        gap: "20px",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {ships.map((ship, index) => {
        const isActive = index === selectedIndex;
        const project = projects[ship.key];
        return (
          <button
            key={ship.key}
            onClick={() => onSelect(index)}
            className="flex-shrink-0 flex flex-col items-center transition-all duration-200"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                width: "80px",
                height: "64px",
                opacity: isActive ? 1 : 0.45,
                border: isActive ? "1.5px solid #00bc7d" : "1.5px solid transparent",
                borderRadius: "8px",
                boxShadow: isActive ? "0 0 10px rgba(0,188,125,0.25)" : "none",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={ship.src}
                alt={ship.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            {/* Project short title under thumbnail */}
            <p
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                letterSpacing: "1px",
                color: "rgba(0,0,0,0.4)",
                textAlign: "center",
                marginTop: "4px",
                textTransform: "uppercase",
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

// Badge card component
function BadgeCard({ phase }: { phase: "intro" | "transition" | "specs" }) {
  const isIntro = phase === "intro";

  return (
    <motion.div
      className="absolute z-20"
      initial={{
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "-50%",
        scale: 1,
      }}
      animate={{
        left: isIntro ? "50%" : "24px",
        top: isIntro ? "50%" : "24px",
        x: isIntro ? "-50%" : "0%",
        y: isIntro ? "-50%" : "0%",
        scale: isIntro ? 1 : 0.8,
      }}
      transition={springTransition}
    >
      <div 
        className="relative bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden"
        style={{ width: isIntro ? "280px" : "220px" }}
      >
        {/* Glassmorphism overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            backgroundImage: "linear-gradient(124deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

        {/* Clip/Hook at top */}
        <div className="relative h-12 flex items-start justify-center pt-0">
          <div className="absolute -top-4 w-5 h-10 border-[5px] border-[#333] rounded-full z-0" />
          <div className="relative z-10 mt-3 w-16 h-5 bg-[#f5f5f5] border border-black/10 rounded-lg flex items-center justify-center shadow-sm">
            <div className="w-10 h-1 bg-black/30 rounded-full" />
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center -mt-2">
          <div 
            className="rounded-full bg-[#f3f4f6] border-[4px] border-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden"
            style={{ width: isIntro ? "112px" : "80px", height: isIntro ? "82px" : "59px" }}
          >
            <img
              src={imgKateXu}
              alt="Kate Xu"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <div className="text-center mt-2">
          <h1 
            className="font-bold text-[#1a1a1a] tracking-tight font-[family-name:var(--font-tinos)]"
            style={{ fontSize: isIntro ? "28px" : "20px" }}
          >
            Kate Xu
          </h1>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center mt-2">
          <p className="text-[10px] font-bold text-[#6a7282] tracking-[2px] uppercase text-center">
            Gen AI
          </p>
          <div className="flex items-center justify-center gap-2 mt-0.5">
            <p className="text-[10px] font-bold text-[#6a7282] tracking-[2px] uppercase">
              Product Designer
            </p>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00bc7d] flex-shrink-0" />
          </div>
        </div>

        {/* Mission & Resume */}
        <div className="px-4 pb-4 mt-3">
          <div className="flex flex-col gap-2 opacity-80">
            {/* Mission */}
            <div>
              <p className="text-[8px] font-bold text-[#99a1af] tracking-wider uppercase mb-0.5">
                Mission
              </p>
              <div className="bg-[#f9fafb] border border-[#d1d5dc] rounded p-1.5">
                <p className="text-[9px] text-[#364153] tracking-wider uppercase leading-4">
                  <span className="whitespace-nowrap">Imagination + Expression</span> to Build Fun & Beautiful Things
                </p>
              </div>
            </div>

            {/* Resume Button */}
            <Link href="/resume" className="w-full">
              <button className="bg-black text-white px-4 py-2 rounded-[8px] text-[10px] font-bold tracking-wider uppercase hover:bg-black/80 transition-colors w-full">
                Resume
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function KatesWebsite() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"intro" | "transition" | "specs">("intro");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goNext = () => setSelectedIndex(i => Math.min(i + 1, spaceships.length - 1));
  const goPrev = () => setSelectedIndex(i => Math.max(i - 1, 0));

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Phase transition timer
  useEffect(() => {
    if (!mounted) return;

    // After 2 seconds, start transition
    const transitionTimer = setTimeout(() => {
      setPhase("transition");
    }, 2000);

    // After transition completes (~1.2s), show specs
    const specsTimer = setTimeout(() => {
      setPhase("specs");
    }, 3200);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(specsTimer);
    };
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
      className="w-screen h-screen bg-[#fffbf2] relative overflow-hidden fixed inset-0"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
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

      {/* Credit line - fixed */}
      <div className="fixed top-6 left-0 right-0 text-center z-10 px-4">
        <p className="text-[10px] text-black/40 tracking-wide">
          🤍 This website is imagined and handcrafted by Kate and her beloved AIs 🤍
        </p>
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
              justifyContent: "center",
              minHeight: "100vh",
              padding: "80px 0 40px",
            }}
          >
            {/* Showcase row: left btn + showcase + right btn (flush, no gap) */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              {/* Desktop left nav button - full height rectangle */}
              {!isMobile && (
                <DesktopNavButton
                  direction="left"
                  onClick={goPrev}
                  disabled={selectedIndex === 0}
                  showcaseHeight="480px"
                />
              )}

              {/* Showcase Window */}
              <ShowcaseWindow
                ship={selectedShip}
                selectedIndex={selectedIndex}
                onPrev={goPrev}
                onNext={goNext}
                canGoPrev={selectedIndex > 0}
                canGoNext={selectedIndex < spaceships.length - 1}
                isMobile={isMobile}
              />

              {/* Desktop right nav button - full height rectangle */}
              {!isMobile && (
                <DesktopNavButton
                  direction="right"
                  onClick={goNext}
                  disabled={selectedIndex === spaceships.length - 1}
                  showcaseHeight="480px"
                />
              )}
            </div>

            {/* Thumbnail strip directly below, with 24px gap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                marginTop: "24px",
                width: "100%",
                maxWidth: "800px",
                padding: "0 16px",
              }}
            >
              <ThumbnailRow
                ships={spaceships}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
                isMobile={isMobile}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge Card - fixed position in top-left after intro */}
      <BadgeCard phase={phase} />
    </div>
  );
}
