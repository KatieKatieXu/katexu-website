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
const imgKateXu = "/kate-xu.png";

// Stone images for navigation
const stones = {
  highlights: "/stone-1.png",
  mission: "/stone-2.png",
  strategy: "/stone-3.png",
  success: "/stone-4.png",
  reflections: "/stone-5.png",
};

type SectionKey = keyof typeof stones;

// Section content based on Figma designs
const sections = {
  highlights: {
    title: "Project Highlights",
    subtitle: null,
    content: (
      <div className="mt-[34px]">
        <div className="flex flex-col gap-[16px]">
          {[
            "Reduced provisioning time by 40%",
            "Unified dashboard analytics",
            "Design System adoption",
          ].map((item, i) => (
            <div key={i} className="flex items-center bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] h-[84px] px-[24px]">
              <span className="text-[24px] text-[#00bc7d] leading-none mr-[26px]">•</span>
              <span className="text-[20px] text-[#364153] font-[family-name:var(--font-tinos)]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  mission: {
    title: "The Mission",
    subtitle: "Project Detail: 001 — Mission Parameters",
    content: (
      <div className="mt-[44px]">
        <p className="text-[18px] text-gray-700 leading-[1.6]">
          Transforming BofA&apos;s hosting infrastructure from fragmented public cloud dependencies to a robust, cost-effective private solution. My role was to bridge the gap between complex backend engineering and a seamless, user-centered management experience.
        </p>
      </div>
    ),
  },
  strategy: {
    title: "The Strategy: Data-Driven Design Leadership",
    subtitle: "Project Detail: 001 — Strategy",
    content: (
      <div className="space-y-[24px]">
        <p className="text-[18px] text-gray-700 leading-[1.6]">
          Beyond high-fidelity prototyping, I established a <span className="font-semibold text-gray-900">Product Intelligence Framework</span> to move the design team from &quot;reactive&quot; to &quot;proactive&quot;.
        </p>

        <div className="mt-[32px]">
          <h3 className="text-[24px] font-semibold text-gray-900 mb-[16px]">
            Automated Executive Reporting
          </h3>
          <p className="text-[16px] text-gray-600 leading-[1.5]">
            I developed and maintained daily automated intelligence reports sent directly to product leadership to maintain a pulse on the ecosystem&apos;s health.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[32px] mt-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Operational Vitality
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Tracking fundamental product stats including Unique Logins, Session Counts, and Build Failure Rates to identify systemic friction before users report it.
            </p>
          </div>
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Feature Impact Analysis
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Measuring the &quot;success delta&quot; by collecting specific baseline data before a release and comparing it with Post-Launch Click Rates to quantify the positive impact of new design implementations.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  success: {
    title: "Measuring Success with Glassbox",
    subtitle: null,
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.6]">
          To gain granular visibility into the user journey, I integrated Glassbox session analytics into our success metrics.
        </p>

        <div className="grid grid-cols-2 gap-[48px]">
          <div>
            <h3 className="text-[24px] font-semibold text-gray-900 mb-[12px]">
              Conversion Optimization
            </h3>
            <p className="text-[16px] text-gray-600 leading-[1.5]">
              Identified and resolved &quot;Day-2&quot; request friction by analyzing real-time session replays and bounce rates.
            </p>
          </div>
          <div>
            <h3 className="text-[24px] font-semibold text-gray-900 mb-[12px]">
              A Seat at the Table
            </h3>
            <p className="text-[16px] text-gray-600 leading-[1.5]">
              This data-led approach empowered me to lead discussions during Quarterly PI Planning, directly influencing the product roadmap.
            </p>
          </div>
        </div>

        <div className="mt-[48px]">
          <h2 className="text-[32px] font-bold text-gray-900 mb-[32px]">
            The Process: User-Centered Foundation
          </h2>
          <div className="grid grid-cols-2 gap-[24px] mb-[24px]">
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
              <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[8px]">
                Phase 01
              </p>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Research
              </h4>
              <p className="text-[14px] text-gray-600 leading-[1.5]">
                Conducted &quot;Think Aloud&quot; qualitative interviews with 15 internal stakeholders (AWS vs. BofA Cloud users).
              </p>
            </div>
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
              <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[8px]">
                Phase 02
              </p>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Persona Mapping
              </h4>
              <p className="text-[14px] text-gray-600 leading-[1.5]">
                Defined three core archetypes—System Architects, Software Engineers, and Product Managers.
              </p>
            </div>
          </div>
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[8px]">
              Phase 03
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
              Rapid Iteration
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.5]">
              Leveraged Sketch, InVision, and Git to maintain a &quot;living design library&quot; that engineers could reference in real-time.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  reflections: {
    title: "Reflections: Beyond the Interface",
    subtitle: null,
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.6]">
          Looking back on 3+ years of steering the UX for BofA Cloud, I&apos;ve distilled several key insights.
        </p>

        <div className="grid grid-cols-2 gap-x-[32px] gap-y-[24px]">
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-[12px]">
              Design as Product Intelligence
            </h3>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Moving from &quot;static designs&quot; to &quot;daily automated reports&quot; fundamentally changed my relationship with leadership. By tracking metrics, I shifted the conversation from subjective aesthetics to objective product health.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-[12px]">
              The Power of &quot;Before &amp; After&quot; Data
            </h3>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Establishing a baseline before every release allowed me to quantify the ROI of my design decisions. Proving a positive shift in Feature Click Rates was the most effective tool for gaining stakeholder buy-in.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-[12px]">
              Complexity Requires Technical Empathy
            </h3>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Working on a private cloud infrastructure taught me that a &quot;good&quot; design is only as good as its implementation. Using Git and HTML to sync with engineers ensured complex flows remained functional in production.
            </p>
          </div>
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-[12px]">
              User Friction as a Strategic Roadmap
            </h3>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              I learned that user complaints—whether gathered through analytics or direct feedback—are invaluable strategic assets that can drive product direction.
            </p>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px] mt-[48px]">
          <blockquote className="text-[18px] text-gray-700 italic leading-[1.6]">
            &quot;In an enterprise ecosystem as massive as Bank of America, the designer&apos;s role isn&apos;t just to simplify the user&apos;s path, but to clarify the product&apos;s value to the business through data.&quot;
          </blockquote>
        </div>
      </div>
    ),
  },
};

// Navigation item component
interface NavItemProps {
  stoneImg: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ stoneImg, label, isActive, onClick }: NavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-[24px] w-[216px] h-[48px] text-left group"
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-[48px] h-[48px] relative transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 group-hover:opacity-100'}`}>
        <img
          src={stoneImg}
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: isActive ? 'drop-shadow(0px 3px 6px rgba(0,0,0,0.12))' : 'none' }}
        />
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 188, 125, 0.3) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        )}
      </div>
      <span className={`transition-all duration-200 ${isActive ? 'text-black text-[24px] font-bold' : 'text-[#99a1af] text-[18px] font-medium'}`}>
        {label}
      </span>
    </motion.button>
  );
}

export default function BofaCloudPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("highlights");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="w-full h-full bg-white/50 animate-pulse" />
      </div>
    );
  }

  const currentSection = sections[activeSection];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fffbf2] relative">
      {/* Background - Home page elements */}
      <div className="absolute inset-0">
        {/* Planetary Diagram Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <img
            src={imgPlanetaryDiagram}
            alt=""
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Orbit Ring */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-black/10" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]">
            <motion.div
              className="w-full h-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.4)]" />
            </motion.div>
          </div>
        </div>

        {/* Spaceships */}
        <motion.img
          src={imgBofaCloud}
          alt=""
          className="absolute left-[10%] top-[14%] w-[192px] h-auto opacity-60"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={imgBofAWorkplace}
          alt=""
          className="absolute right-[5%] top-[35%] w-[224px] h-auto opacity-60"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.img
          src={imgPawpawStory}
          alt=""
          className="absolute left-[15%] top-[58%] w-[208px] h-auto opacity-60"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.img
          src={imgIOnboard}
          alt=""
          className="absolute right-[5%] bottom-[10%] w-[192px] h-auto opacity-60"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Center Badge (faded) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none">
          <div className="w-[300px] bg-white border border-[#e5e7eb] rounded-2xl shadow-lg overflow-hidden">
            <div className="h-16 flex items-start justify-center pt-0">
              <div className="absolute -top-5 w-6 h-12 border-[6px] border-[#333] rounded-full z-0" />
              <div className="relative z-10 mt-4 w-20 h-6 bg-[#f5f5f5] border border-black/10 rounded-lg flex items-center justify-center">
                <div className="w-12 h-1 bg-black/30 rounded-full" />
              </div>
            </div>
            <div className="flex justify-center -mt-2">
              <div className="w-40 h-[117px] rounded-full bg-[#f3f4f6] border-[6px] border-white shadow-lg overflow-hidden">
                <img src={imgKateXu} alt="Kate Xu" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center mt-4">
              <h1 className="text-4xl font-bold text-[#1a1a1a] tracking-tight">Kate Xu</h1>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 pb-6">
              <div className="w-2 h-2 rounded-full bg-[#1e2939] opacity-60" />
              <p className="text-xs font-bold text-[#6a7282] tracking-[3px] uppercase">Product Designer</p>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-xs text-black/30 tracking-[3.6px] uppercase opacity-60">
            Drag Badge to Switch • Click Background to Enter
          </p>
        </div>
      </div>

      {/* Foreground - Project Detail Panels */}
      {/* Desktop Layout */}
      <div className="hidden md:flex absolute inset-0 bg-[#fdfbf7]">
        {/* Left Sidebar - 280px, transparent (shows parent bg) */}
        <div className="w-[280px] h-full flex flex-col">
          {/* Back Button */}
          <div className="p-[32px]">
            <Link href="/">
              <motion.button
                className="w-[48px] h-[48px] bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] flex items-center justify-center border border-[#e5e7eb]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </motion.button>
            </Link>
          </div>

          {/* Navigation - vertically centered */}
          <div className="flex-1 flex flex-col justify-center pl-[32px]">
            <nav className="space-y-[32px]">
              <NavItem
                stoneImg={stones.highlights}
                label="Highlights"
                isActive={activeSection === "highlights"}
                onClick={() => setActiveSection("highlights")}
              />
              <NavItem
                stoneImg={stones.mission}
                label="Mission"
                isActive={activeSection === "mission"}
                onClick={() => setActiveSection("mission")}
              />
              <NavItem
                stoneImg={stones.strategy}
                label="Strategy"
                isActive={activeSection === "strategy"}
                onClick={() => setActiveSection("strategy")}
              />
              <NavItem
                stoneImg={stones.success}
                label="Success"
                isActive={activeSection === "success"}
                onClick={() => setActiveSection("success")}
              />
              <NavItem
                stoneImg={stones.reflections}
                label="Reflections"
                isActive={activeSection === "reflections"}
                onClick={() => setActiveSection("reflections")}
              />
            </nav>
          </div>
        </div>

        {/* Main Content Panel - white with rounded-[40px] */}
        <div className="flex-1 h-full py-[24px] pr-0">
          <div className="h-full bg-white rounded-l-[40px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
            {/* Header - 99px */}
            <div className="h-[99px] flex items-center justify-center bg-[rgba(255,255,255,0.8)] border-b border-[#f9fafb]">
              <div className="flex items-center gap-[12px] bg-white rounded-full px-[17px] py-[9px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] border border-[#f3f4f6]">
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden bg-[#f3f4f6]">
                  <img src={imgKateXu} alt="Kate Xu" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#101828] leading-tight tracking-[2.1px] uppercase">Kate Xu</p>
                  <p className="text-[8px] text-[#99a1af] uppercase tracking-[1px]">Designer</p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-[96px] pt-[64px] pb-[48px]">
              {/* Title Section */}
              <div className="mb-[48px]">
                <h1 className="text-[72px] font-bold text-[#1a1a1a] font-[family-name:var(--font-tinos)] tracking-tight leading-[1]">
                  Bofa Cloud
                </h1>
                <div className="w-[80px] h-[4px] bg-[#00bc7d] mt-[24px]" />
              </div>

              {/* Dynamic Section Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-[36px] font-bold text-[#1a1a1a] font-[family-name:var(--font-tinos)] leading-[1.1]">
                    {currentSection.title}
                  </h2>
                  {currentSection.subtitle && (
                    <p className="text-[14px] text-gray-400 tracking-wide mt-[24px]">
                      {currentSection.subtitle}
                    </p>
                  )}
                  <div className="mt-[40px]">
                    {currentSection.content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - with glassmorphism */}
      <div className="md:hidden absolute inset-0 flex flex-col">
        {/* Header with glassmorphism */}
        <div className="h-[80px] bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-4">
          <Link href="/">
            <motion.button
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-gray-100"
              whileTap={{ scale: 0.95 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </Link>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src={imgKateXu} alt="Kate Xu" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-900">Kate Xu</p>
              <p className="text-[8px] text-gray-500 uppercase tracking-wider">Designer</p>
            </div>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Content with glassmorphism */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="bg-white/85 backdrop-blur-lg m-4 rounded-xl p-6 min-h-[calc(100vh-180px)]">
            {/* Title */}
            <h1 className="text-[36px] font-bold text-[#1a365d] font-[family-name:var(--font-tinos)] tracking-tight leading-[1.1]">
              Bofa Cloud
            </h1>
            <div className="w-[60px] h-[3px] bg-[#00bc7d] mt-4 mb-8" />

            {/* Section Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-[24px] font-bold text-gray-900 leading-[1.3]">
                  {currentSection.title}
                </h2>
                {currentSection.subtitle && (
                  <p className="text-[12px] text-gray-400 tracking-wide mt-3">
                    {currentSection.subtitle}
                  </p>
                )}
                <div className="mt-6 text-sm [&_p]:text-[14px] [&_h3]:text-[18px] [&_h4]:text-[16px] [&_.grid]:grid-cols-1 [&_.grid]:gap-4">
                  {currentSection.content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation with glassmorphism */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200/50 px-2 py-3 safe-area-pb">
          <div className="flex justify-around">
            {(Object.keys(stones) as SectionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex flex-col items-center p-2 transition-all ${activeSection === key ? 'opacity-100 scale-110' : 'opacity-50'}`}
              >
                <img src={stones[key]} alt="" className="w-10 h-10 object-contain" />
                <span className="text-[9px] mt-1 capitalize font-medium">{key}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
