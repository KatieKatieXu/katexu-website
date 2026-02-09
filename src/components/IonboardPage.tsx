"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Image assets
const imgIonboardCover = "/ionboard-cover.png";
const imgIonboardTimeline = "/ionboard-timeline.png";
const imgIonboardCampus = "/ionboard-campus.png";
const imgIonboardCes = "/ionboard-ces.png";
const imgIonboardAlumni = "/ionboard-alumni.png";
const imgIonboardPitch = "/ionboard-pitch.png";
const imgIonboardTeam = "/ionboard-team.png";
const imgPlanetaryDiagram = "/planetary-diagram.png";
const imgBofaCloud = "/bofa-cloud.png";
const imgBofAWorkplace = "/bofa-workplace.png";
const imgPawpawStory = "/pawpaw-story.png";
const imgIOnboard = "/ionboard.png";
const imgKateXu = "/kate-xu.png";

// Stone images for navigation
const stones = {
  vision: "/stone-1.png",
  strategy: "/stone-2.png",
  execution: "/stone-3.png",
  success: "/stone-4.png",
  reflections: "/stone-5.png",
};

type SectionKey = keyof typeof stones;

// Section content based on provided content
const sections = {
  vision: {
    title: "The Vision: Disrupting the Commuter Market",
    subtitle: "Project Detail: 01 — Market Disruption",
    content: (
      <div className="mt-[34px]">
        {/* Kickstarter Link */}
        <a
          href="https://www.kickstarter.com/projects/1728725377/ionboard?ref=discovery&term=ionboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[12px] bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[16px] mb-[24px] hover:border-[#00bc7d]/40 transition-colors group"
        >
          <span className="text-[24px]">🚀</span>
          <div>
            <p className="text-[14px] font-semibold text-[#00bc7d] group-hover:underline">View our Kickstarter Campaign</p>
            <p className="text-[12px] text-gray-500">$57,132 raised — 570% of goal</p>
          </div>
          <span className="ml-auto text-[#00bc7d] text-[18px]">›</span>
        </a>

        {/* Cover Image */}
        <div className="rounded-[16px] overflow-hidden mb-[32px]">
          <img
            src={imgIonboardCover}
            alt="iOnboard Cover"
            className="w-full h-auto object-cover rounded-[16px]"
          />
        </div>

        <p className="text-[18px] text-gray-700 leading-[1.7]">
          The electric travel market was polarized: users needed fast, portable solutions, but high-end boards cost over $1,000. As the Design Lead, I helped disrupt this space by positioning ionboard as a <span className="font-semibold text-gray-900">high-performance, customizable solution for under $500</span>, targeting the &quot;last-mile&quot; needs of students and urban commuters.
        </p>

        <div className="grid grid-cols-3 gap-[24px] mt-[48px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px] text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">$57k+</p>
            <p className="text-[14px] text-gray-500 mt-2">Kickstarter Launch</p>
          </div>
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px] text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">$499</p>
            <p className="text-[14px] text-gray-500 mt-2">Launch Price</p>
          </div>
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px] text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">50%</p>
            <p className="text-[14px] text-gray-500 mt-2">Below Market Price</p>
          </div>
        </div>
      </div>
    ),
  },
  strategy: {
    title: "The Strategy: Data-Driven Growth & Discovery",
    subtitle: "Project Detail: 02 — User-Centered Design Approach",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          I utilized a <span className="font-semibold text-gray-900">User-Centered Design (UCD)</span> approach to bridge the gap between a student project and a global e-commerce brand.
        </p>

        {/* Campus Community Photo */}
        <div className="rounded-[16px] overflow-hidden">
          <img
            src={imgIonboardCampus}
            alt="Community approach on campus"
            className="w-full h-auto object-cover rounded-[16px]"
          />
          <p className="text-[12px] text-gray-400 italic text-center mt-[8px]">Our community-first approach started on campus at UCSD</p>
        </div>

        <div className="space-y-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              User Research
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Identified three core personas—<span className="font-medium">Students, City Walkers, and Skateboard Lovers</span> (ages 16-25)—focusing on their need for addictive fun combined with rigid commuter utility.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Heuristic Analysis
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Evaluated competitors like bike-sharing and Segway, identifying that <span className="font-medium">portability and &quot;DIY&quot; potential</span> were the key differentiators for our audience.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Performance vs. Price
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              We engineered a <span className="font-medium">100% profit margin</span> while selling at 50% of the price of mainstream brands, launching the Model X (25 mph / 15.5-mile range) for just $499.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  execution: {
    title: "The Execution: Full-Stack Brand Ecosystem",
    subtitle: "Project Detail: 03 — End-to-End Ownership",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          I owned the end-to-end visual and strategic touchpoints:
        </p>

        {/* Workflow & Timeline Image */}
        <div className="rounded-[16px] overflow-hidden">
          <img
            src={imgIonboardTimeline}
            alt="Workflow and timeline of tasks"
            className="w-full h-auto object-cover rounded-[16px]"
          />
          <p className="text-[12px] text-gray-400 italic text-center mt-[8px]">Workflow and timeline of execution tasks</p>
        </div>

        <div className="grid grid-cols-2 gap-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">
              Crowdfunding
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Kickstarter Architecture
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              I designed and edited the Kickstarter campaign. We reached our $10k goal within <span className="font-medium">24 hours</span> and finished with <span className="font-medium text-[#00bc7d]">$57,132</span> in total pledges.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">
              Marketing
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Performance Marketing
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              I worked daily with engineers to analyze Google, Facebook, and Instagram Ads data, iterating on creative content based on conversion metrics and SEO backlinks.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">
              Global Presence
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              CES 2018
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Led the booth design and media strategy for the Consumer Electronics Show, successfully negotiating margins with international distributors and buyers.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">
              Funding
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Institutional Backing
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Authored the business plan that secured Incubator Funding from UC San Diego&apos;s &quot;The Basement,&quot; placing us in a high-growth accelerator program.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  success: {
    title: "Success Metrics",
    subtitle: "Project Detail: 04 — Measurable Impact",
    content: (
      <div className="space-y-[32px]">
        <div className="grid grid-cols-3 gap-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px] text-center">
            <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[12px]">
              Financial
            </p>
            <p className="text-[48px] font-bold text-[#00bc7d] leading-none">570%</p>
            <p className="text-[14px] text-gray-600 mt-[12px]">
              of original Kickstarter goal achieved in 34 days
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px] text-center">
            <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[12px]">
              Growth
            </p>
            <p className="text-[48px] font-bold text-[#00bc7d] leading-none">110%</p>
            <p className="text-[14px] text-gray-600 mt-[12px]">
              YoY user increase, expanding into NA, EU & Asia
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px] text-center">
            <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[12px]">
              Community
            </p>
            <p className="text-[48px] font-bold text-[#00bc7d] leading-none">KOL</p>
            <p className="text-[14px] text-gray-600 mt-[12px]">
              YouTube partnerships & referral programs
            </p>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
          <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
            From Product to Platform
          </h4>
          <p className="text-[16px] text-gray-600 leading-[1.6]">
            Transformed a product into a platform, leveraging KOL (YouTube) partnerships and referral programs to build a self-sustaining fan base across three continents.
          </p>
        </div>

        {/* Success Moments Photo Gallery */}
        <div>
          <h4 className="text-[20px] font-semibold text-gray-900 mb-[16px]">
            Success Moments
          </h4>
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="rounded-[12px] overflow-hidden">
              <img src={imgIonboardCes} alt="CES Exhibition" className="w-full h-[200px] object-cover rounded-[12px]" />
              <p className="text-[11px] text-gray-400 text-center mt-[6px]">CES Exhibition demo</p>
            </div>
            <div className="rounded-[12px] overflow-hidden">
              <img src={imgIonboardAlumni} alt="UCSD Alumni event" className="w-full h-[200px] object-cover object-bottom rounded-[12px]" />
              <p className="text-[11px] text-gray-400 text-center mt-[6px]">UCSD Alumni event</p>
            </div>
            <div className="rounded-[12px] overflow-hidden">
              <img src={imgIonboardPitch} alt="Pitch presentation" className="w-full h-[200px] object-cover rounded-[12px]" />
              <p className="text-[11px] text-gray-400 text-center mt-[6px]">Pitch presentation in San Diego</p>
            </div>
            <div className="rounded-[12px] overflow-hidden">
              <img src={imgIonboardTeam} alt="Team at CES booth" className="w-full h-[200px] object-cover rounded-[12px]" />
              <p className="text-[11px] text-gray-400 text-center mt-[6px]">The ionboard team at CES</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  reflections: {
    title: "Reflections: From Product to Community",
    subtitle: null,
    content: (
      <div className="space-y-[32px]">
        <div className="space-y-[24px]">
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-[12px]">
              The &quot;Designer-Entrepreneur&quot; Hybrid
            </h3>
            <p className="text-[16px] text-gray-600 leading-[1.6]">
              This project taught me that great design must be grounded in business law, manufacturing risks, and market timing.
            </p>
          </div>

          <div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-[12px]">
              Timing the Value
            </h3>
            <p className="text-[16px] text-gray-600 leading-[1.6]">
              I learned that once a brand reaches the &quot;majority,&quot; its value shifts from just a &quot;product&quot; to a connection between people and resources.
            </p>
          </div>

          <div>
            <h3 className="text-[20px] font-bold text-gray-900 mb-[12px]">
              Data-Driven Iteration
            </h3>
            <p className="text-[16px] text-gray-600 leading-[1.6]">
              Analyzing ad performance daily with engineers sharpened my ability to make proactive design decisions based on user behavior—a skill I now apply to enterprise-scale systems.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[33px]">
          <blockquote className="text-[18px] text-gray-700 italic leading-[1.6]">
            &quot;Great design must be grounded in business law, manufacturing risks, and market timing—the &apos;Designer-Entrepreneur&apos; hybrid is the future.&quot;
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

export default function IonboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("vision");

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
                className="w-[48px] h-[48px] bg-white rounded-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] flex items-center justify-center border border-[#e5e7eb] hover:border-[#00bc7d] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go back to home"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00bc7d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 14L4 9l5-5" />
                  <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
                </svg>
              </motion.button>
            </Link>
          </div>

          {/* Navigation - vertically centered */}
          <div className="flex-1 flex flex-col justify-center pl-[32px]">
            <nav className="space-y-[32px]">
              <NavItem
                stoneImg={stones.vision}
                label="Vision"
                isActive={activeSection === "vision"}
                onClick={() => setActiveSection("vision")}
              />
              <NavItem
                stoneImg={stones.strategy}
                label="Strategy"
                isActive={activeSection === "strategy"}
                onClick={() => setActiveSection("strategy")}
              />
              <NavItem
                stoneImg={stones.execution}
                label="Execution"
                isActive={activeSection === "execution"}
                onClick={() => setActiveSection("execution")}
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
              <div className="mb-[32px]">
                <h1 className="text-[72px] font-bold text-[#1a1a1a] font-[family-name:var(--font-tinos)] tracking-tight leading-[1]">
                  ionboard
                </h1>
                <p className="text-[16px] text-gray-500 mt-[16px]">
                  Design & Marketing Lead | Impact: $57k+ Kickstarter Launch & Global Brand Scaling
                </p>
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
                    <p className="text-[14px] text-gray-400 tracking-wide mt-[16px]">
                      {currentSection.subtitle}
                    </p>
                  )}
                  <div className="mt-[32px]">
                    {currentSection.content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - with glassmorphism */}
      <div className="md:hidden absolute inset-0 flex flex-col overflow-x-hidden">
        {/* Header with glassmorphism */}
        <div className="h-[80px] bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-4">
          <Link href="/">
            <motion.button
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center border border-gray-100 active:border-[#00bc7d]"
              whileTap={{ scale: 0.95 }}
              aria-label="Go back to home"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00bc7d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 14L4 9l5-5" />
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
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
        <div className="flex-1 overflow-y-auto pb-40">
          <div className="bg-white/85 backdrop-blur-lg mx-2 my-4 rounded-xl p-4 min-h-[calc(100vh-180px)]">
            {/* Title */}
            <h1 className="text-[36px] font-bold text-[#1a365d] font-[family-name:var(--font-tinos)] tracking-tight leading-[1.1]">
              ionboard
            </h1>
            <p className="text-[12px] text-gray-500 mt-2">
              Design & Marketing Lead | $57k+ Kickstarter
            </p>
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
        <div 
          className="fixed bottom-2 left-2 right-2 z-50 backdrop-blur-2xl border border-white/40 rounded-xl px-1 py-1.5 safe-area-pb shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.35) 100%)",
          }}
        >
          {/* High reflection shine overlay */}
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 40%, transparent 100%)",
              height: "50%",
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            }}
          />
          <div className="flex justify-around">
            {(Object.keys(stones) as SectionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex flex-col items-center p-1 transition-all rounded-lg ${activeSection === key ? 'opacity-100 bg-[#00bc7d]/10' : 'opacity-60'}`}
              >
                <img src={stones[key]} alt="" className="w-6 h-6 object-contain" />
                <span className={`text-[9px] mt-0.5 font-semibold capitalize ${activeSection === key ? 'text-[#00bc7d]' : 'text-gray-600'}`}>{key}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
