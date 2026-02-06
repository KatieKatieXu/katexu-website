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
  challenge: "/stone-1.png",
  research: "/stone-2.png",
  design: "/stone-3.png",
  success: "/stone-4.png",
  reflections: "/stone-5.png",
};

type SectionKey = keyof typeof stones;

// Section content based on provided content
const sections = {
  challenge: {
    title: "The Challenge: The \"Context-Switching\" Tax",
    subtitle: "Project Detail: 01 — Problem Discovery",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          Bank of America technicians and managers were suffering from <span className="font-semibold text-gray-900">massive cognitive load</span>. To track a single day of work, 91% of users had to navigate over three different websites (Jira, ARM, EMS, Wiki).
        </p>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
          <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
            The Pain Point
          </p>
          <p className="text-[16px] text-gray-700 leading-[1.6]">
            Managers spent excessive time logging into multiple platforms just to approve a request or check a ticket status.
          </p>
          <div className="mt-[24px] bg-white rounded-[12px] p-[24px] border border-[#e5e7eb]">
            <p className="text-[16px] text-gray-600 italic leading-[1.6]">
              &quot;I have to open up over 3 websites to catch up with what&apos;s going on at my workplace to track all my related work.&quot;
            </p>
            <p className="text-[14px] text-gray-400 mt-[12px]">— Field Technician</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px] text-center">
            <p className="text-[48px] font-bold text-[#00bc7d] leading-none">91%</p>
            <p className="text-[14px] text-gray-500 mt-[12px]">Users navigating 3+ websites daily</p>
          </div>
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px] text-center">
            <p className="text-[48px] font-bold text-[#00bc7d] leading-none">3+</p>
            <p className="text-[14px] text-gray-500 mt-[12px]">Platforms per workflow</p>
          </div>
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px] text-center">
            <p className="text-[48px] font-bold text-[#00bc7d] leading-none">NPS 10</p>
            <p className="text-[14px] text-gray-500 mt-[12px]">Final achievement</p>
          </div>
        </div>
      </div>
    ),
  },
  research: {
    title: "Research & Empathize: Finding the Scenario",
    subtitle: "Project Detail: 02 — User-Centered Discovery",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          I conducted <span className="font-semibold text-gray-900">qualitative interviews with 20 existing users</span> to synthesize actionable insights.
        </p>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
          <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
            User Persona
          </p>
          <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
            Tim Doe (Product Owner)
          </h4>
          <p className="text-[16px] text-gray-600 leading-[1.6]">
            Needs a clear &quot;skeleton view&quot; of his to-do list the moment he wakes up to be efficient during a busy day.
          </p>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
          <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
            The Opportunity Loop
          </p>
          <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
            &quot;Between Office and Home&quot;
          </h4>
          <p className="text-[16px] text-gray-600 leading-[1.6]">
            I identified a critical gap—on public transit, users have the motivation to preview their day but lack the mobile tools to do so effectively without a laptop and VPN.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[24px]">
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[24px]">
            <p className="text-[36px] font-bold text-[#00bc7d]">20</p>
            <p className="text-[14px] text-gray-500 mt-2">User interviews conducted</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[24px]">
            <p className="text-[36px] font-bold text-[#00bc7d]">1.5yr</p>
            <p className="text-[14px] text-gray-500 mt-2">Project timeline</p>
          </div>
        </div>
      </div>
    ),
  },
  design: {
    title: "Design Evolution: Rational Iteration",
    subtitle: "Project Detail: 03 — Strategic Design Process",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          With limited budget and tight deadlines, I used a <span className="font-semibold text-gray-900">&quot;Rationally Push Forward&quot;</span> strategy, leveraging existing internal resources to prioritize high-value features.
        </p>

        <div>
          <h3 className="text-[24px] font-bold text-gray-900 mb-[24px]">
            A. Dashboard Transformation (The 80/20 Rule)
          </h3>
          <p className="text-[16px] text-gray-600 leading-[1.6] mb-[24px]">
            Applying the 80/20 rule, I mapped out the 20% of vital features that drove 80% of user returns.
          </p>

          <div className="grid grid-cols-2 gap-[24px]">
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
              <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[8px]">
                Old vs. New
              </p>
              <p className="text-[14px] text-gray-600 leading-[1.6]">
                The original dashboard required excessive scrolling to see tasks. I evolved it into a <span className="font-medium">card-based UI</span> that provides a 360-degree view of all tickets in a single screen.
              </p>
            </div>
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
              <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[8px]">
                Quick Action
              </p>
              <p className="text-[14px] text-gray-600 leading-[1.6]">
                I introduced a Quick Action section with <span className="font-medium">color-coded categories</span>, allowing users to &quot;Permit or Reject&quot; tickets instantly while avoiding accidental slips.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[24px] font-bold text-gray-900 mb-[24px]">
            B. The Support Dashboard (Data-Led Pivot)
          </h3>
          <p className="text-[16px] text-gray-600 leading-[1.6] mb-[24px]">
            Initial data showed that users frequently clicked &quot;My Approval&quot; and &quot;Assigned to me&quot; but ignored other sections.
          </p>

          <div className="space-y-[16px]">
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
              <div className="flex items-center gap-[16px] mb-[12px]">
                <span className="text-[14px] font-semibold text-gray-400">Version 2</span>
              </div>
              <p className="text-[14px] text-gray-600 leading-[1.6]">
                I pulled &quot;Recently Viewed&quot; into an independent section, but data showed it wasn&apos;t the primary driver.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[24px]">
              <div className="flex items-center gap-[16px] mb-[12px]">
                <span className="text-[14px] font-semibold text-[#00bc7d]">Version 3 — The Breakthrough</span>
              </div>
              <p className="text-[14px] text-gray-700 leading-[1.6]">
                I replaced it with the <span className="font-semibold">Quick Action section</span> and added a <span className="font-semibold">&quot;Plan for Day-Off&quot;</span> feature after detecting a frequent user need for easy leave-management. This version achieved a <span className="font-bold text-[#00bc7d]">perfect NPS of 10</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  success: {
    title: "Measuring Success: The Continuous Roadmap",
    subtitle: "Project Detail: 04 — Data-Driven Validation",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          Testing wasn&apos;t a one-time event; it was a <span className="font-semibold text-gray-900">cycle integrated into every release</span>.
        </p>

        <div className="grid grid-cols-2 gap-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
              Quantitative Success
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Metrics Tracking
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Using <span className="font-medium">Qualtrics and Matomo</span>, we tracked NPS and Conversion Rate (defined as users logging in at least once daily).
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
              Qualitative Insights
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Continuous Feedback
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Continuous feedback loops with the tech support team provided inspiring insights to improve designs based on real-time user struggles.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[33px] text-center">
          <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">
            Final Result
          </p>
          <p className="text-[72px] font-bold text-[#00bc7d] leading-none">NPS 10</p>
          <p className="text-[16px] text-gray-600 mt-[16px]">
            Unified fragmented workflows into a high-performance &quot;Command Center&quot;
          </p>
        </div>
      </div>
    ),
  },
  reflections: {
    title: "Reflections: The Art of Strategic Design",
    subtitle: null,
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          Over 1.5 years on the WorkIT team, I learned that a designer&apos;s most powerful tools aren&apos;t just pixels, but <span className="font-semibold text-gray-900">observation, empathy, and data</span>.
        </p>

        <div className="space-y-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[18px] font-bold text-gray-900 mb-[12px]">
              Information Structure is an Observational Craft
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Building a truly effective Information Architecture (IA) takes time and deep immersion in the user&apos;s daily life. You must ask users what they care about most to identify the &quot;20% vital features&quot; that drive 80% of the value.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[18px] font-bold text-gray-900 mb-[12px]">
              Complaints as a Strategic Roadmap
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              I learned to view user complaints not as setbacks, but as the most meaningful context for product thinking. A complaint today is a signal for the product&apos;s direction tomorrow.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[18px] font-bold text-gray-900 mb-[12px]">
              Data vs. Expectation
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              In enterprise design, user needs and user behavior data do not always match initial expectations. I learned to stay open-minded and &quot;think out of the box&quot; when the data challenged my assumptions.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[18px] font-bold text-gray-900 mb-[12px]">
              Data-Driven Prioritization
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Inspiration comes from tracking shifting behavior data. By comparing release versions and analyzing A/B testing results, I was able to re-prioritize features rationally.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[18px] font-bold text-gray-900 mb-[12px]">
              The Bridge to Product Strategy
            </h4>
            <p className="text-[14px] text-gray-600 leading-[1.6]">
              Bringing these insights—gathered from technical support teams and raw analytics—to meetings with Product Managers allowed me to influence the product roadmap directly.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[33px]">
          <blockquote className="text-[18px] text-gray-700 italic leading-[1.6]">
            &quot;A designer&apos;s most powerful tools aren&apos;t just pixels, but observation, empathy, and data—balancing business value with true UX happiness.&quot;
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

export default function WorkITPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("challenge");

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
                stoneImg={stones.challenge}
                label="Challenge"
                isActive={activeSection === "challenge"}
                onClick={() => setActiveSection("challenge")}
              />
              <NavItem
                stoneImg={stones.research}
                label="Research"
                isActive={activeSection === "research"}
                onClick={() => setActiveSection("research")}
              />
              <NavItem
                stoneImg={stones.design}
                label="Design"
                isActive={activeSection === "design"}
                onClick={() => setActiveSection("design")}
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
                  BofA WorkIT
                </h1>
                <p className="text-[16px] text-gray-500 mt-[16px]">
                  UX Researcher & Product Designer | Timeline: 1.5 Years
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
      <div className="md:hidden absolute inset-0 flex flex-col">
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
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="bg-white/85 backdrop-blur-lg m-4 rounded-xl p-6 min-h-[calc(100vh-180px)]">
            {/* Title */}
            <h1 className="text-[36px] font-bold text-[#1a365d] font-[family-name:var(--font-tinos)] tracking-tight leading-[1.1]">
              BofA WorkIT
            </h1>
            <p className="text-[12px] text-gray-500 mt-2">
              UX Researcher & Product Designer | 1.5 Years
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
