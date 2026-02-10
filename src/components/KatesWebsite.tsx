"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Image assets
const imgPlanetaryDiagram = "/planetary-diagram.png";
const imgBofaCloud = "/bofa-cloud.png";
const imgBofAWorkplace = "/bofa-workplace.png";
const imgPawpawStory = "/pawpaw-story.png";
const imgIOnboard = "/ionboard.png";
const imgKateXu = "/kate-xu.png";

// Project data
const projects = {
  bofaCloud: {
    title: "BOFA CLOUD",
    category: "ENTERPRISE PLATFORM",
    description: "Cloud infrastructure platform for 200K+ enterprise users.",
    previewImage: "/cloud-cover.png",
    benchmarks: [
      "200K+ enterprise users served",
      "40% reduction in provisioning time",
      "Unified design system adoption",
    ],
  },
  bofaWorkplace: {
    title: "BOFA WORKIT",
    category: "MOBILE ECOSYSTEM",
    description: "Unified mobile Command Center — NPS 10.",
    previewImage: "/workit-cover.png",
    benchmarks: [
      "Perfect NPS score of 10",
      "91% workflow unification",
      "3+ platforms consolidated into 1",
    ],
  },
  pawpawStory: {
    title: "PAWPAWSTORY",
    category: "AI PRODUCT",
    description: "AI voice-cloning storytelling app for your kids.",
    previewImage: "/pawpaw-cover.png",
    benchmarks: [
      "Zero to App Store in 4 weeks",
      "Multi-agent AI workflow",
      "Voice cloning integration",
    ],
  },
  ionboard: {
    title: "IONBOARD",
    category: "STARTUP",
    description: "Electric skateboard brand — $57K+ Kickstarter (570%).",
    previewImage: "/ionboard-cover.png",
    benchmarks: [
      "$57K+ Kickstarter (570% funded)",
      "Global e-commerce scaling",
      "End-to-end brand ownership",
    ],
  },
};

type ProjectKey = keyof typeof projects;

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

// Project routes mapping
const projectRoutes: Record<ProjectKey, string | null> = {
  bofaCloud: "/projects/bofa-cloud",
  bofaWorkplace: "/projects/bofa-workplace",
  pawpawStory: "/projects/pawpaw-story",
  ionboard: "/projects/ionboard",
};

// Project Spec Card component - renders at fixed position
interface SpecCardProps {
  project: { title: string; category: string; description: string; previewImage: string | null; benchmarks: string[] };
  projectKey: ProjectKey;
  className: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function SpecCard({ project, projectKey, className, onMouseEnter, onMouseLeave }: SpecCardProps) {
  const projectRoute = projectRoutes[projectKey];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute w-[260px] md:w-[280px] z-50 ${className}`}
    >
      {/* Outer panel frame — liquid glass */}
      <div
        className="relative rounded-[12px] overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -6px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Top notch/tab accent */}
        <div className="flex justify-center">
          <div
            className="w-[60px] h-[6px] rounded-b-[4px] bg-[#00bc7d]"
          />
        </div>

        {/* Glass shine overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[12px]"
          style={{
            backgroundImage: "linear-gradient(124deg, rgba(255,255,255,0.4) 0%, transparent 40%, rgba(255,255,255,0.1) 70%, transparent 100%)",
          }}
        />
        {/* Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] pointer-events-none rounded-t-[12px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)" }} />

        {/* Preview Image */}
        {project.previewImage && (
          <div className="relative w-full h-[120px] overflow-hidden mx-auto mt-2 px-3">
            <div className="rounded-[8px] overflow-hidden h-full" style={{ border: "1px solid rgba(255,255,255,0.4)" }}>
              <img
                src={project.previewImage}
                alt={`${project.title} preview`}
                className="w-full h-full object-contain bg-white/50 p-1"
              />
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="relative px-5 pt-4 pb-3">
          {/* Title */}
          <h3 className="text-[16px] font-bold text-gray-900 tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {project.title}
          </h3>
          <p className="text-[11px] font-semibold text-gray-600 tracking-widest mt-0.5 uppercase">
            {project.category}
          </p>

          {/* Divider line */}
          <div className="w-full h-[1px] mt-3 mb-3" style={{ background: "rgba(255,255,255,0.4)" }} />

          {/* Description */}
          <p className="text-[13px] text-gray-700 leading-relaxed">
            {project.description}
          </p>

          {/* Benchmarks */}
          <ul className="mt-3 space-y-1.5">
            {project.benchmarks.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-[12px] text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00bc7d] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom plate — subtle separator */}
        <div
          className="relative mt-1"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.35)",
          }}
        >
          <div className="px-5 py-3">
            {projectRoute ? (
              <Link href={projectRoute}>
                <div className="relative rounded-[6px] cursor-pointer group overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.2) 100%)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(0,188,125,0.08) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative flex items-center justify-center gap-2 py-2.5 px-4">
                    <span className="text-[12px] font-bold tracking-[3px] text-[#00bc7d] uppercase group-hover:text-[#4ade80] transition-colors drop-shadow-[0_0_4px_rgba(0,188,125,0.3)]">
                      Read More
                    </span>
                    <span className="text-[#00bc7d] text-lg group-hover:translate-x-0.5 transition-transform group-hover:text-[#4ade80] drop-shadow-[0_0_4px_rgba(0,188,125,0.3)]">›</span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="relative rounded-[6px] overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  border: "1px solid rgba(255,255,255,0.4)",
                }}
              >
                <div className="flex items-center justify-center gap-2 py-2.5 px-4">
                  <span className="text-[12px] font-bold tracking-[3px] text-[#00bc7d]/30 uppercase">
                    Coming Soon
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Spaceship component with floating animation
interface SpaceshipProps {
  src: string;
  alt: string;
  className: string;
  projectKey: ProjectKey;
  duration?: number;
  delay?: number;
  yOffset?: number;
  isActive?: boolean;
  glowColor?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onTap?: () => void;
}

function Spaceship({ 
  src, 
  alt, 
  className, 
  projectKey,
  duration = 4, 
  delay = 0, 
  yOffset = 12,
  isActive = false,
  glowColor = "rgba(74, 222, 128, 1)", // bright mint green by default
  onHoverStart,
  onHoverEnd,
  onTap,
}: SpaceshipProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Detect touch device on mount
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = () => {
    if (isTouchDevice) {
      onTap?.();
    } else {
      const route = projectRoutes[projectKey];
      if (route) router.push(route);
    }
  };

  return (
    <motion.div
      className={`${className} relative`}
      variants={floatingVariants}
      animate="float"
      custom={{ duration, delay, yOffset }}
      // Only apply hover animation on non-touch devices
      whileHover={!isTouchDevice ? { 
        scale: 1.08, 
        opacity: 1,
        transition: { duration: 0.3 } 
      } : undefined}
      // Desktop only: hover to show/hide
      onMouseEnter={() => {
        if (!isTouchDevice) onHoverStart?.();
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) onHoverEnd?.();
      }}
      onClick={handleClick}
      style={{ touchAction: 'manipulation' }}
    >
      {/* Background glow layer to fill transparent holes */}
      {isActive && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, rgba(74, 222, 128, 0.3) 0%, transparent 70%)`,
            filter: "blur(8px)",
            transform: "scale(1.1)",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className="relative w-full h-full object-contain pointer-events-none"
        style={{
          filter: isActive 
            ? `drop-shadow(0 0 3px ${glowColor}) drop-shadow(0 0 6px ${glowColor}) drop-shadow(0 0 10px rgba(74, 222, 128, 0.5))`
            : "none",
          transition: "filter 0.3s ease-in-out",
        }}
      />
    </motion.div>
  );
}

// Mission Command — typewriter on a glass sheet with green edges
function MissionCommand({ position = "top" }: { position?: "top" | "bottom" }) {
  const fullText = "CHOOSE A SPACESHIP TO SEE SPECS";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [doneTyping, setDoneTyping] = useState(false);
  const charIndex = useRef(0);

  useEffect(() => {
    // Small initial delay before typing starts
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
    }, position === "bottom" ? 800 : 400);
    return () => clearTimeout(startDelay);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  const posClass = position === "top"
    ? "absolute top-6 left-0 right-0 flex justify-center z-10"
    : "absolute bottom-10 left-0 right-0 flex justify-center z-10";

  return (
    <motion.div
      className={posClass}
      initial={{ opacity: 0, y: position === "top" ? -10 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: position === "bottom" ? 0.3 : 0 }}
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

        {/* Top edge glow */}
        <div className="absolute inset-x-0 top-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,188,125,0.5), transparent)" }} />
        {/* Bottom edge glow */}
        <div className="absolute inset-x-0 bottom-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(0,188,125,0.3), transparent)" }} />

        {/* Typewriter text */}
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

        {/* Subtle scan line effect */}
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

export default function KatesWebsite() {
  const [mounted, setMounted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<ProjectKey | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-[#fffbf2] flex items-center justify-center">
        <div className="w-[300px] h-[450px] bg-white/50 rounded-2xl animate-pulse" />
      </div>
    );
  }

  // Fixed positions for each spec card (static, doesn't float)
  // Mobile: centered, Desktop: positioned around the badge
  const cardPositions: Record<ProjectKey, string> = {
    bofaCloud: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:left-[22%] md:top-[5%]",
    bofaWorkplace: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:left-auto md:right-[22%] md:top-[18%]",
    pawpawStory: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:left-[28%] md:top-[38%]",
    ionboard: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 md:left-auto md:right-[28%] md:top-[48%]",
  };

  return (
    <div 
      className="h-screen w-screen overflow-hidden bg-[#fffbf2] relative fixed inset-0"
      style={{ touchAction: 'none', overscrollBehavior: 'none' }}
    >
      {/* Mission Command Glass Panel */}
      <MissionCommand />

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
        {/* Large orbit ring */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-black/10"
        />
        
        {/* Rotating planet on orbit */}
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
            {/* Black planet positioned on the orbit edge */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </div>
      </div>

      {/* Project Spaceships - Floating in standby */}
      {/* Top Left - Bofa Cloud - closer to center */}
      <Spaceship
        src={imgBofaCloud}
        alt="Bofa Cloud Project"
        projectKey="bofaCloud"
        className="absolute left-[18%] md:left-[12%] top-[12%] md:top-[18%] w-[90px] md:w-[192px] h-[65px] md:h-[139px] opacity-80 cursor-pointer z-10"
        duration={5}
        delay={0}
        yOffset={10}
        isActive={hoveredProject === "bofaCloud"}
        onHoverStart={() => setHoveredProject("bofaCloud")}
        onHoverEnd={() => setHoveredProject(null)}
        onTap={() => setHoveredProject(hoveredProject === "bofaCloud" ? null : "bofaCloud")}
      />

      {/* Top Right - BofA Workplace */}
      <Spaceship
        src={imgBofAWorkplace}
        alt="BofA Workplace Project"
        projectKey="bofaWorkplace"
        className="absolute left-[58%] md:left-[72%] top-[12%] md:top-[18%] w-[90px] md:w-[192px] h-[60px] md:h-[129px] opacity-80 cursor-pointer z-10"
        duration={6}
        delay={0.5}
        yOffset={14}
        isActive={hoveredProject === "bofaWorkplace"}
        onHoverStart={() => setHoveredProject("bofaWorkplace")}
        onHoverEnd={() => setHoveredProject(null)}
        onTap={() => setHoveredProject(hoveredProject === "bofaWorkplace" ? null : "bofaWorkplace")}
      />

      {/* Bottom Left - Pawpaw Story - farther from center */}
      <Spaceship
        src={imgPawpawStory}
        alt="Pawpaw Story Project"
        projectKey="pawpawStory"
        className="absolute left-[5%] md:left-[5%] top-[52%] md:top-[30%] w-[90px] md:w-[192px] h-[51px] md:h-[109px] opacity-80 cursor-pointer z-10"
        duration={4.5}
        delay={1}
        yOffset={8}
        isActive={hoveredProject === "pawpawStory"}
        onHoverStart={() => setHoveredProject("pawpawStory")}
        onHoverEnd={() => setHoveredProject(null)}
        onTap={() => setHoveredProject(hoveredProject === "pawpawStory" ? null : "pawpawStory")}
      />

      {/* Bottom Right - iOnboard */}
      <Spaceship
        src={imgIOnboard}
        alt="iOnboard Project"
        projectKey="ionboard"
        className="absolute left-[68%] md:left-[72%] top-[52%] md:top-[30%] w-[90px] md:w-[192px] h-[47px] md:h-[99px] opacity-80 cursor-pointer z-10"
        duration={5.5}
        delay={1.5}
        yOffset={12}
        isActive={hoveredProject === "ionboard"}
        onHoverStart={() => setHoveredProject("ionboard")}
        onHoverEnd={() => setHoveredProject(null)}
        onTap={() => setHoveredProject(hoveredProject === "ionboard" ? null : "ionboard")}
      />

      {/* Static Spec Cards - Rendered at fixed positions on hover */}
      <AnimatePresence>
        {hoveredProject && (
          <>
            {/* Dim overlay - dims surroundings when card is shown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 md:pointer-events-none"
              onClick={() => setHoveredProject(null)}
            />
            <SpecCard 
              project={projects[hoveredProject]}
              projectKey={hoveredProject}
              className={cardPositions[hoveredProject]}
              onMouseEnter={() => setHoveredProject(hoveredProject)}
              onMouseLeave={() => setHoveredProject(null)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Center Badge Card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[240px] md:w-[300px] bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Glassmorphism overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              backgroundImage: "linear-gradient(124deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)" 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Clip/Hook at top */}
          <div className="relative h-12 md:h-16 flex items-start justify-center pt-0">
            {/* Hook loop - behind the clip slot */}
            <div className="absolute -top-4 md:-top-5 w-5 md:w-6 h-10 md:h-12 border-[5px] md:border-[6px] border-[#333] rounded-full z-0" />
            {/* Clip slot - in front of the hook */}
            <div className="relative z-10 mt-3 md:mt-4 w-16 md:w-20 h-5 md:h-6 bg-[#f5f5f5] border border-black/10 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-10 md:w-12 h-1 bg-black/30 rounded-full" />
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-2">
            <div className="w-28 md:w-40 h-[82px] md:h-[117px] rounded-full bg-[#f3f4f6] border-[4px] md:border-[6px] border-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
              <img
                src={imgKateXu}
                alt="Kate Xu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center mt-3 md:mt-4">
            <h1 className="text-2xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight font-[family-name:var(--font-tinos)]">
              Kate Xu
            </h1>
          </div>

          {/* Title */}
          <div className="flex flex-col items-center mt-4">
            <p className="text-xs font-bold text-[#6a7282] tracking-[2px] md:tracking-[3px] uppercase text-center">
              Gen AI
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-xs font-bold text-[#6a7282] tracking-[2px] md:tracking-[3px] uppercase">
                Product Designer
              </p>
              <div className="w-2 h-2 rounded-full bg-[#00bc7d] flex-shrink-0" />
            </div>
          </div>

          {/* Mission & Resume */}
          <div className="px-4 md:px-6 pb-4 md:pb-6 mt-4 md:mt-6">
            <div className="flex flex-col gap-3 md:gap-4 opacity-80">
              {/* Mission */}
              <div>
                <p className="text-[8px] md:text-[9px] font-bold text-[#99a1af] tracking-wider uppercase mb-1">
                  Mission
                </p>
                <div className="bg-[#f9fafb] border border-[#d1d5dc] rounded p-1.5 md:p-2">
                  <p className="text-[9px] md:text-[10px] text-[#364153] tracking-wider uppercase leading-4 md:leading-5">
                    <span className="whitespace-nowrap">Imagination + Expression</span> to Build Fun & Beautiful Things
                  </p>
                </div>
              </div>

              {/* Resume Button */}
              <Link href="/resume" className="w-full">
                <button className="bg-black text-white px-4 md:px-5 py-2 md:py-2.5 rounded-[8px] md:rounded-[10px] text-[10px] md:text-xs font-bold tracking-wider uppercase hover:bg-black/80 transition-colors w-full">
                  Resume
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer — Mission Command repeated */}
      <MissionCommand position="bottom" />

      {/* Credit line */}
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="text-[10px] text-black/25 tracking-wide">
          🤍 This website is imagined and handcrafted by Kate and her beloved AIs 🤍
        </p>
      </div>
    </div>
  );
}
