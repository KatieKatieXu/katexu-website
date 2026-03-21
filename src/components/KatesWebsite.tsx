"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Image assets
const imgPlanetaryDiagram = "/planetary-diagram.png";
const imgBofaCloud = "/bofa-cloud.png";
const imgBofAWorkplace = "/bofa-workplace.png";
const imgPawpawStory = "/pawpaw-story.png";
const imgIOnboard = "/ionboard.png";
const imgJobpilot = "/jobpilot-ship.jpeg";
const imgOneco = "/oneco-ship.avif";
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
  const [doneTyping, setDoneTyping] = useState(false);
  const charIndex = useRef(0);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIndex.current < fullText.length) {
          setDisplayedText(fullText.slice(0, charIndex.current + 1));
          charIndex.current += 1;
        } else {
          clearInterval(interval);
          setDoneTyping(true);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 400);
    return () => clearTimeout(startDelay);
  }, []);

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

        {!doneTyping && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(0,188,125,0.03) 50%, transparent 100%)",
              backgroundSize: "100% 8px",
            }}
            animate={{ y: [0, 8] }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
    </motion.div>
  );
}

// SpecBox component - glass box with connector line
interface SpecBoxProps {
  text: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  shipCenterX: number;
  shipCenterY: number;
  boxRef?: React.RefObject<HTMLDivElement | null>;
}

function SpecBox({ text, position, shipCenterX, shipCenterY }: SpecBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxCenter, setBoxCenter] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (boxRef.current && mounted) {
      const rect = boxRef.current.getBoundingClientRect();
      // Calculate box edge point based on position
      let x = rect.left + rect.width / 2;
      let y = rect.top + rect.height / 2;
      
      // Adjust to edge closest to ship
      if (position.includes("top")) {
        y = rect.bottom;
      } else {
        y = rect.top;
      }
      if (position.includes("left")) {
        x = rect.right;
      } else {
        x = rect.left;
      }
      
      setBoxCenter({ x, y });
    }
  }, [mounted, position]);

  // Position offsets based on position prop
  const positionStyles: Record<string, string> = {
    "top-left": "-top-16 -left-8",
    "top-right": "-top-16 -right-8",
    "bottom-left": "-bottom-16 -left-8",
    "bottom-right": "-bottom-16 -right-8",
  };

  return (
    <>
      {/* SVG connector line - rendered at parent level */}
      {mounted && boxCenter.x !== 0 && (
        <svg
          className="absolute inset-0 pointer-events-none z-0"
          style={{ overflow: "visible" }}
        >
          <line
            x1={boxCenter.x}
            y1={boxCenter.y}
            x2={shipCenterX}
            y2={shipCenterY}
            stroke="rgba(0,188,125,0.4)"
            strokeWidth="1"
          />
        </svg>
      )}
      
      <motion.div
        ref={boxRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`absolute ${positionStyles[position]} z-10`}
      >
        <div
          className="relative px-2 py-1.5 rounded-[4px] whitespace-nowrap"
          style={{
            background: "rgba(255,255,255,0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,188,125,0.4)",
          }}
        >
          {/* Green corner accents - smaller */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#00bc7d] rounded-tl-[3px]" />
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#00bc7d] rounded-tr-[3px]" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#00bc7d] rounded-bl-[3px]" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#00bc7d] rounded-br-[3px]" />

          <p className="text-[10px] font-mono tracking-widest text-[#00915f]">
            {text}
          </p>
        </div>
      </motion.div>
    </>
  );
}

// Spaceship with specs annotations
interface SpaceshipWithSpecsProps {
  ship: SpaceshipData;
  phase: "intro" | "transition" | "specs";
  index: number;
  isMobile: boolean;
}

function SpaceshipWithSpecs({ ship, phase, index, isMobile }: SpaceshipWithSpecsProps) {
  const shipRef = useRef<HTMLDivElement>(null);
  const [shipCenter, setShipCenter] = useState({ x: 0, y: 0 });
  const specs = specHighlights[ship.key];

  useEffect(() => {
    const updateCenter = () => {
      if (shipRef.current) {
        const rect = shipRef.current.getBoundingClientRect();
        setShipCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };
    
    updateCenter();
    window.addEventListener("resize", updateCenter);
    return () => window.removeEventListener("resize", updateCenter);
  }, [phase]);

  // Calculate final position in the row
  const shipWidth = 160;
  const totalShips = 6;
  const gap = 20;
  const totalWidth = totalShips * shipWidth + (totalShips - 1) * gap;
  
  // Desktop: single row centered
  // Mobile: 3x2 grid
  let finalX: number;
  let finalY: number;
  
  if (isMobile) {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const mobileShipWidth = 100;
    const mobileGap = 16;
    const mobileTotalWidth = 3 * mobileShipWidth + 2 * mobileGap;
    const mobileStartX = (window.innerWidth - mobileTotalWidth) / 2;
    finalX = mobileStartX + col * (mobileShipWidth + mobileGap) + mobileShipWidth / 2;
    finalY = window.innerHeight / 2 - 60 + row * 140;
  } else {
    const startX = (window.innerWidth - totalWidth) / 2;
    finalX = startX + index * (shipWidth + gap) + shipWidth / 2;
    finalY = window.innerHeight / 2;
  }

  // Initial position from data
  const initPos = isMobile ? ship.mobileInitialPos : ship.initialPos;
  const initLeft = parseFloat(initPos.left);
  const initTop = parseFloat(initPos.top);
  const initWidth = parseFloat(initPos.width);
  const initHeight = parseFloat(initPos.height);

  // Calculate initial center in pixels
  const initCenterX = (initLeft / 100) * window.innerWidth + initWidth / 2;
  const initCenterY = (initTop / 100) * window.innerHeight + initHeight / 2;

  const isIntro = phase === "intro";
  const isSpecs = phase === "specs";

  // Target dimensions
  const targetWidth = isMobile ? 100 : shipWidth;
  const targetHeight = isMobile ? 67 : 107;

  return (
    <motion.div
      ref={shipRef}
      className="absolute z-10"
      initial={{
        x: initCenterX - targetWidth / 2,
        y: initCenterY - targetHeight / 2,
        width: initWidth,
        height: initHeight,
      }}
      animate={{
        x: isIntro ? initCenterX - initWidth / 2 : finalX - targetWidth / 2,
        y: isIntro ? initCenterY - initHeight / 2 : finalY - targetHeight / 2,
        width: isIntro ? initWidth : targetWidth,
        height: isIntro ? initHeight : targetHeight,
      }}
      transition={springTransition}
      style={{ position: "absolute", left: 0, top: 0 }}
    >
      {/* Floating container */}
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

      {/* Spec annotations - only show in specs phase */}
      <AnimatePresence>
        {isSpecs && (
          <>
            {/* Top specs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <SpecBoxSimple text={specs[0]} />
              <SpecBoxSimple text={specs[1]} />
            </motion.div>
            
            {/* Bottom specs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <SpecBoxSimple text={specs[2]} />
              <SpecBoxSimple text={specs[3]} />
            </motion.div>

            {/* Connector lines */}
            <svg
              className="absolute inset-0 pointer-events-none overflow-visible"
              style={{ width: "100%", height: "100%", left: 0, top: 0 }}
            >
              {/* Top line */}
              <line
                x1="50%"
                y1="-8"
                x2="50%"
                y2="-65"
                stroke="rgba(0,188,125,0.4)"
                strokeWidth="1"
              />
              {/* Bottom line */}
              <line
                x1="50%"
                y1="calc(100% + 8px)"
                x2="50%"
                y2="calc(100% + 65px)"
                stroke="rgba(0,188,125,0.4)"
                strokeWidth="1"
              />
            </svg>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Simple spec box without positioning logic
function SpecBoxSimple({ text }: { text: string }) {
  return (
    <div
      className="relative px-2 py-1 rounded-[4px] whitespace-nowrap"
      style={{
        background: "rgba(255,255,255,0.35)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(0,188,125,0.4)",
      }}
    >
      {/* Green corner accents */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#00bc7d] rounded-tl-[3px]" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#00bc7d] rounded-tr-[3px]" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#00bc7d] rounded-bl-[3px]" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#00bc7d] rounded-br-[3px]" />

      <p className="text-[10px] font-mono tracking-widest text-[#00915f]">
        {text}
      </p>
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

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-[#fffbf2] relative fixed inset-0 pt-6"
      style={{ touchAction: "none", overscrollBehavior: "none" }}
    >
      {/* Credit line */}
      <div className="absolute top-6 left-0 right-0 text-center z-10 px-4">
        <p className="text-[10px] text-black/40 tracking-wide">
          🤍 This website is imagined and handcrafted by Kate and her beloved AIs 🤍
        </p>
      </div>

      {/* Mission Command Glass Panel - fades out during transition */}
      <MissionCommand visible={phase === "intro"} />

      {/* Planetary Diagram Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-60">
        <img
          src={imgPlanetaryDiagram}
          alt=""
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Orbit Rings */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Spaceships with specs */}
      {spaceships.map((ship, index) => (
        <SpaceshipWithSpecs
          key={ship.key}
          ship={ship}
          phase={phase}
          index={index}
          isMobile={isMobile}
        />
      ))}

      {/* Center Badge Card - animates to top-left */}
      <BadgeCard phase={phase} />
    </div>
  );
}
