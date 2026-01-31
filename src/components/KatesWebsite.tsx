"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    category: "WEB APP",
    description: "An enterprise cloud management platform designed to streamline infrastructure provisioning and monitoring for global banking operations.",
    timeline: "2023 – Present",
    role: "Lead Product Designer",
    highlights: [
      "Reduced provisioning time by 40%",
      "Unified dashboard analytics",
      "Design System adoption",
    ],
  },
  bofaWorkplace: {
    title: "BOFA WORKPLACE",
    category: "MOBILE APP",
    description: "Mobile application for employee resources, workspace booking, and internal communications.",
    timeline: "2022 – 2023",
    role: "UI/UX Designer",
    highlights: [
      "Mobile-first approach",
      "Accessibility WCAG 2.1",
      "Internal beta launch",
    ],
  },
  pawpawStory: {
    title: "PAWPAWSTORY",
    category: "SIDE PROJECT",
    description: "A community-driven platform for pet adoption stories and connecting shelter animals with forever homes.",
    timeline: "2021 – 2022",
    role: "Solo Founder & Designer",
    highlights: [
      "0 to 1 Product Design",
      "Brand Identity System",
      "React Native Prototype",
    ],
  },
  ionboard: {
    title: "IONBOARD",
    category: "E-SKATEBOARD",
    description: "Companion app for electric skateboards providing real-time telemetry, ride tracking, and configuration.",
    timeline: "2020 – 2021",
    role: "Industrial & Digital Designer",
    highlights: [
      "Hardware-software sync",
      "Real-time data viz",
      "Bluetooth interface",
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
      ease: "easeInOut",
    },
  }),
};

// Project Spec Card component - renders at fixed position
interface SpecCardProps {
  project: typeof projects.bofaCloud;
  className: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function SpecCard({ project, className, onMouseEnter, onMouseLeave }: SpecCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute w-[280px] rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border border-white/40 overflow-hidden z-50 ${className}`}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {/* Glassmorphism shine overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
        }}
      />
      
      {/* Green accent bracket */}
      <div className="absolute left-0 top-4 bottom-4 w-1 bg-emerald-500 rounded-r" />
      
      {/* Title section - highly transparent */}
      <div 
        className="relative px-5 pt-5 pb-3 pl-6"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Header */}
        <h3 className="text-lg font-bold text-gray-900 tracking-wide">
          {project.title}
        </h3>
        <p className="text-xs font-semibold text-emerald-600 tracking-wider mt-0.5">
          {project.category}
        </p>
      </div>

      {/* Lower section - more opaque */}
      <div 
        className="relative px-5 pt-4 pb-5 pl-6"
        style={{
          background: "rgba(255,255,255,0.85)",
        }}
      >
        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {project.description}
        </p>

        {/* Timeline & Role */}
        <div className="flex gap-6 mt-4">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
              Timeline
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">
              {project.timeline}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
              Role
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-0.5">
              {project.role}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-4">
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
            Highlights
          </p>
          <ul className="mt-1.5 space-y-1">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Read More Button */}
        <button className="mt-4 w-full py-2.5 bg-white/50 border border-white/60 rounded-lg text-sm font-semibold text-emerald-600 hover:bg-white/70 transition-colors flex items-center justify-center gap-1 backdrop-blur-sm">
          READ MORE
          <span className="text-lg">›</span>
        </button>
      </div>
    </motion.div>
  );
}

// Spaceship component with floating animation
interface SpaceshipProps {
  src: string;
  alt: string;
  className: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  isActive?: boolean;
  glowColor?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

function Spaceship({ 
  src, 
  alt, 
  className, 
  duration = 4, 
  delay = 0, 
  yOffset = 12,
  isActive = false,
  glowColor = "rgba(74, 222, 128, 1)", // bright mint green by default
  onHoverStart,
  onHoverEnd,
}: SpaceshipProps) {
  return (
    <motion.div
      className={`${className} relative`}
      variants={floatingVariants}
      animate="float"
      custom={{ duration, delay, yOffset }}
      whileHover={{ 
        scale: 1.08, 
        opacity: 1,
        transition: { duration: 0.3 } 
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
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
  const cardPositions: Record<ProjectKey, string> = {
    bofaCloud: "left-[22%] top-[5%]",
    bofaWorkplace: "right-[22%] top-[18%]",
    pawpawStory: "left-[28%] top-[38%]",
    ionboard: "right-[28%] top-[48%]",
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffbf2] relative">
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
      {/* Top Left - Bofa Cloud */}
      <Spaceship
        src={imgBofaCloud}
        alt="Bofa Cloud Project"
        className="absolute left-[8%] top-[18%] w-[192px] h-[139px] opacity-80 cursor-pointer z-10"
        duration={5}
        delay={0}
        yOffset={10}
        isActive={hoveredProject === "bofaCloud"}
        onHoverStart={() => setHoveredProject("bofaCloud")}
        onHoverEnd={() => setHoveredProject(null)}
      />

      {/* Top Right - BofA Workplace */}
      <Spaceship
        src={imgBofAWorkplace}
        alt="BofA Workplace Project"
        className="absolute left-[72%] top-[18%] w-[192px] h-[129px] opacity-80 cursor-pointer z-10"
        duration={6}
        delay={0.5}
        yOffset={14}
        isActive={hoveredProject === "bofaWorkplace"}
        onHoverStart={() => setHoveredProject("bofaWorkplace")}
        onHoverEnd={() => setHoveredProject(null)}
      />

      {/* Bottom Left - Pawpaw Story */}
      <Spaceship
        src={imgPawpawStory}
        alt="Pawpaw Story Project"
        className="absolute left-[8%] top-[30%] w-[192px] h-[109px] opacity-80 cursor-pointer z-10"
        duration={4.5}
        delay={1}
        yOffset={8}
        isActive={hoveredProject === "pawpawStory"}
        onHoverStart={() => setHoveredProject("pawpawStory")}
        onHoverEnd={() => setHoveredProject(null)}
      />

      {/* Bottom Right - iOnboard */}
      <Spaceship
        src={imgIOnboard}
        alt="iOnboard Project"
        className="absolute left-[72%] top-[30%] w-[192px] h-[99px] opacity-80 cursor-pointer z-10"
        duration={5.5}
        delay={1.5}
        yOffset={12}
        isActive={hoveredProject === "ionboard"}
        onHoverStart={() => setHoveredProject("ionboard")}
        onHoverEnd={() => setHoveredProject(null)}
      />

      {/* Static Spec Cards - Rendered at fixed positions on hover */}
      <AnimatePresence>
        {hoveredProject && (
          <SpecCard 
            project={projects[hoveredProject]} 
            className={cardPositions[hoveredProject]}
            onMouseEnter={() => setHoveredProject(hoveredProject)}
            onMouseLeave={() => setHoveredProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Center Badge Card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[300px] bg-white border border-[#e5e7eb] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Glassmorphism overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              backgroundImage: "linear-gradient(124deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)" 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Clip/Hook at top */}
          <div className="relative h-16 flex items-start justify-center pt-0">
            {/* Hook loop - behind the clip slot */}
            <div className="absolute -top-5 w-6 h-12 border-[6px] border-[#333] rounded-full z-0" />
            {/* Clip slot - in front of the hook */}
            <div className="relative z-10 mt-4 w-20 h-6 bg-[#f5f5f5] border border-black/10 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-12 h-1 bg-black/30 rounded-full" />
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-2">
            <div className="w-40 h-[117px] rounded-full bg-[#f3f4f6] border-[6px] border-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
              <img
                src={imgKateXu}
                alt="Kate Xu"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center mt-4">
            <h1 className="text-4xl font-bold text-[#1a1a1a] tracking-tight font-[family-name:var(--font-tinos)]">
              Kate Xu
            </h1>
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-[#1e2939] opacity-60" />
            <p className="text-xs font-bold text-[#6a7282] tracking-[3px] uppercase">
              Product Designer
            </p>
          </div>

          {/* Mission & Resume */}
          <div className="px-6 pb-6 mt-6">
            <div className="flex items-end justify-between gap-4 opacity-80">
              {/* Mission */}
              <div className="flex-1">
                <p className="text-[9px] font-bold text-[#99a1af] tracking-wider uppercase mb-1">
                  Mission
                </p>
                <div className="bg-[#f9fafb] border border-[#d1d5dc] rounded p-2">
                  <p className="text-[10px] text-[#364153] tracking-wider uppercase leading-5">
                    Creating things fun and beautiful
                  </p>
                </div>
              </div>

              {/* Resume Button */}
              <button className="bg-black text-white px-5 py-2.5 rounded-[10px] text-xs font-bold tracking-wider uppercase hover:bg-black/80 transition-colors">
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Instruction */}
      <div className="absolute bottom-12 left-0 right-0 text-center">
        <p className="text-xs text-black/30 tracking-[3.6px] uppercase opacity-60">
          Drag Badge to Switch • Click Background to Enter
        </p>
      </div>
    </div>
  );
}
