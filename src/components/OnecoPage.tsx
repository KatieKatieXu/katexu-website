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
const imgOneco = "/oneco-ship.avif";

// Stone images for navigation
const stones = {
  overview: "/stone-1.png",
  archetypes: "/stone-2.png",
  techstack: "/stone-3.png",
  insight: "/stone-4.png",
};

type SectionKey = keyof typeof stones;

const sections = {
  overview: {
    title: "Are You Built to Run a One-Person Company?",
    subtitle: "Project Detail: 01 — Why Oneco",
    content: (
      <div className="space-y-[32px]">
        {/* Cover */}
        <div className="rounded-[16px] overflow-hidden bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e] flex items-center justify-center h-[200px] relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_#6366f1_0%,_transparent_70%)]" />
          <div className="text-center relative z-10">
            <span className="text-[64px]">🚀</span>
            <p className="text-white font-bold text-[24px] mt-2">Oneco</p>
            <p className="text-indigo-300 text-[14px]">Builder archetype quiz</p>
          </div>
        </div>

        <div className="space-y-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">The Question</h4>
            <p className="text-[16px] text-gray-700 leading-[1.6]">
              <span className="font-semibold text-gray-900">Not everyone is built to run a one-person company.</span> And that&apos;s completely fine — but most people never stop to ask which builder archetype they actually are. Oneco exists to answer that question clearly, and point you toward the right path.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">Why It Matters</h4>
            <ul className="space-y-[10px] text-[15px] text-gray-700 leading-[1.6]">
              <li><span className="font-medium text-gray-900">Self-Knowledge First:</span> Most career tools tell you what jobs you qualify for — not who you are</li>
              <li><span className="font-medium text-gray-900">Solo Economy Rising:</span> More people than ever are asking if they can build alone — they deserve a real answer</li>
              <li><span className="font-medium text-gray-900">5 Archetypes:</span> Each maps to real traits, strengths, and paths — not generic personality types</li>
              <li><span className="font-medium text-gray-900">4 Languages:</span> EN / ZH / ES / FR — built for a global audience from day one</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[24px]">
            <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">The Output</h4>
            <p className="text-[16px] text-gray-700 leading-[1.6]">
              Take the quiz → get your archetype → understand your builder DNA → see what kind of one-person company (if any) you&apos;re suited to build.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-[16px]">
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[20px] text-center">
              <p className="text-[28px] font-bold text-[#00bc7d]">5</p>
              <p className="text-[13px] text-gray-500 mt-1">Builder archetypes</p>
            </div>
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[20px] text-center">
              <p className="text-[28px] font-bold text-[#00bc7d]">4</p>
              <p className="text-[13px] text-gray-500 mt-1">Languages</p>
            </div>
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[20px] text-center">
              <p className="text-[28px] font-bold text-[#00bc7d]">Live</p>
              <p className="text-[13px] text-gray-500 mt-1">Status</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  archetypes: {
    title: "5 Builder Archetypes",
    subtitle: "Project Detail: 02 — Product Overview",
    content: (
      <div className="space-y-[24px]">
        {/* Archetype 1 */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">🔭</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Archetype 01</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">The Visionary</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6]">
                Big-picture thinkers who see systems others miss. Best suited for building products that shift how people think — content, platforms, or insight-driven tools. The trap: overbuilding before validating.
              </p>
            </div>
          </div>
        </div>

        {/* Archetype 2 */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">⚙️</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Archetype 02</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">The Craftsperson</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6]">
                Execution-focused builders who ship clean, tight, quality work. Best suited for service businesses, micro-SaaS, or agencies. The trap: underpricing because you love the craft more than the business.
              </p>
            </div>
          </div>
        </div>

        {/* Archetype 3 */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-amber-500 to-orange-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">📣</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Archetype 03</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">The Connector</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6]">
                Network-native operators who build through relationships. Best suited for community-led businesses, newsletters, or curation plays. The trap: relying on vibes over systems.
              </p>
            </div>
          </div>
        </div>

        {/* Archetype 4 */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-rose-500 to-pink-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">🎨</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Archetype 04</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">The Creator</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6]">
                Expression-driven builders whose output IS the product. Best suited for creator economy plays: courses, design, writing, or brand. The trap: chasing novelty at the cost of depth.
              </p>
            </div>
          </div>
        </div>

        {/* Archetype 5 */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-sky-500 to-blue-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">📊</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Archetype 05</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">The Operator</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6]">
                Systems thinkers who optimize processes and scale what already works. Best suited for SaaS, automation tools, or productized services. The trap: waiting for perfect conditions before starting.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  techstack: {
    title: "Tech Stack",
    subtitle: null,
    content: (
      <div className="space-y-[32px]">
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">Design</p>
            <div className="space-y-[10px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Figma</span>
              </div>
              <p className="text-[13px] text-gray-500 pl-[20px]">UI design with variables & components</p>
            </div>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">AI</p>
            <div className="space-y-[10px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Claude API</span>
              </div>
              <p className="text-[13px] text-gray-500 pl-[20px]">Archetype scoring, result generation & i18n copy</p>
            </div>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">Frontend</p>
            <div className="space-y-[10px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Next.js</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">TypeScript</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Tailwind CSS</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">i18n</p>
            <div className="space-y-[10px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">next-intl</span>
              </div>
              <p className="text-[13px] text-gray-500 pl-[20px]">EN / ZH / ES / FR</p>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">AI-assisted translation</span>
              </div>
              <p className="text-[13px] text-gray-500 pl-[20px]">Claude for nuanced localization</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[16px] p-4 md:p-[33px] text-white">
          <p className="text-[11px] md:text-[12px] font-semibold text-emerald-400 tracking-wider uppercase mb-[12px]">
            The Workflow Summary
          </p>
          {/* Desktop: horizontal row */}
          <div className="hidden md:flex items-center justify-between gap-[16px]">
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Design</p>
              <p className="text-[18px] font-bold mt-1">Figma MCP</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Code</p>
              <p className="text-[18px] font-bold mt-1">Cursor</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">AI</p>
              <p className="text-[18px] font-bold mt-1">Claude API</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Languages</p>
              <p className="text-[18px] font-bold mt-1">4 × i18n</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Ship</p>
              <p className="text-[18px] font-bold mt-1">Live</p>
            </div>
          </div>
          {/* Mobile: grid */}
          <div className="md:hidden grid grid-cols-5 gap-1 text-center">
            <div>
              <p className="text-[9px] text-gray-400">Design</p>
              <p className="text-[11px] font-bold">Figma</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400">Code</p>
              <p className="text-[11px] font-bold">Cursor</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400">AI</p>
              <p className="text-[11px] font-bold">Claude</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400">i18n</p>
              <p className="text-[11px] font-bold">4 lang</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-400">Ship</p>
              <p className="text-[11px] font-bold">Live</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  insight: {
    title: "Builder Insight: Know Yourself First",
    subtitle: "Project Detail: 04 — Personal Reflection",
    content: (
      <div className="space-y-[24px]">
        <div className="bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[33px]">
          <blockquote className="text-[18px] text-gray-700 italic leading-[1.7]">
            &ldquo;The question &lsquo;should I go solo?&rsquo; is actually the wrong question. The right question is: what kind of builder am I? Oneco exists to answer that honestly — so people can stop second-guessing and start building in alignment with who they actually are.&rdquo;
          </blockquote>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-purple-500 to-pink-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">🌍</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Global from Day One
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                The solo builder question isn&apos;t American — it&apos;s universal. Building for 4 languages from the start forced better product decisions: clearer copy, less cultural assumption, more universal framing.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-orange-500 to-amber-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">🎯</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Personality → Career Path
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                Most personality tools stop at labels. Oneco connects your archetype to actual paths: what kind of one-person business you&apos;re suited to build, what traps to avoid, and what your edge actually is.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">⚡</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Solo Builder Philosophy
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                Every project I build, I build alone — with AI as a collaborator. Oneco is both a product and a statement: one person with the right tools can build something meaningful, fast, and global.
              </p>
            </div>
          </div>
        </div>

        {/* Status card */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[16px] p-[28px] text-white">
          <p className="text-[12px] font-semibold text-emerald-400 tracking-wider uppercase mb-[16px]">Current Status</p>
          <div className="grid grid-cols-3 gap-[16px]">
            <div>
              <p className="text-[13px] text-gray-400">Built in</p>
              <p className="text-[16px] font-bold mt-1">Solo<br /><span className="text-[13px] text-gray-400 font-normal">2026</span></p>
            </div>
            <div>
              <p className="text-[13px] text-gray-400">Stack</p>
              <p className="text-[16px] font-bold mt-1">Next.js<br /><span className="text-[13px] text-gray-400 font-normal">+ Claude API</span></p>
            </div>
            <div>
              <p className="text-[13px] text-gray-400">Status</p>
              <div className="flex items-center gap-[6px] mt-1">
                <div className="w-[8px] h-[8px] bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-[16px] font-bold">Live</p>
              </div>
              <p className="text-[13px] text-gray-400">4 languages</p>
            </div>
          </div>
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
      <div className={`w-[48px] h-[48px] relative transition-all duration-300 ${isActive ? "scale-110" : "opacity-60 group-hover:opacity-100"}`}>
        <img
          src={stoneImg}
          alt=""
          className="w-full h-full object-contain"
          style={{ filter: isActive ? "drop-shadow(0px 3px 6px rgba(0,0,0,0.12))" : "none" }}
        />
        {isActive && (
          <motion.div
            layoutId="activeGlowOneco"
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0, 188, 125, 0.3) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        )}
      </div>
      <span className={`transition-all duration-200 ${isActive ? "text-black text-[24px] font-bold" : "text-[#99a1af] text-[18px] font-medium"}`}>
        {label}
      </span>
    </motion.button>
  );
}

export default function OnecoPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");

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
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <img src={imgPlanetaryDiagram} alt="" className="w-full h-full object-cover pointer-events-none" />
        </div>

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

        {/* Floating background spaceships */}
        <motion.img src={imgBofaCloud} alt="" className="absolute left-[10%] top-[14%] w-[192px] h-auto opacity-60" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={imgBofAWorkplace} alt="" className="absolute right-[5%] top-[35%] w-[224px] h-auto opacity-60" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
        <motion.img src={imgPawpawStory} alt="" className="absolute left-[15%] top-[58%] w-[208px] h-auto opacity-60" animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.img src={imgIOnboard} alt="" className="absolute right-[5%] bottom-[10%] w-[192px] h-auto opacity-60" animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex absolute inset-0 bg-[#fdfbf7]">
        {/* Left Sidebar */}
        <div className="w-[280px] h-full flex flex-col">
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

          <div className="flex-1 flex flex-col justify-center pl-[32px]">
            <nav className="space-y-[32px]">
              <NavItem stoneImg={stones.overview}    label="Overview"   isActive={activeSection === "overview"}    onClick={() => setActiveSection("overview")} />
              <NavItem stoneImg={stones.archetypes}  label="Archetypes" isActive={activeSection === "archetypes"}  onClick={() => setActiveSection("archetypes")} />
              <NavItem stoneImg={stones.techstack}   label="Tech Stack" isActive={activeSection === "techstack"}   onClick={() => setActiveSection("techstack")} />
              <NavItem stoneImg={stones.insight}     label="Insight"    isActive={activeSection === "insight"}     onClick={() => setActiveSection("insight")} />
            </nav>
          </div>
        </div>

        {/* Main Content Panel */}
        <div className="flex-1 h-full py-[24px] pr-0">
          <div className="h-full bg-white rounded-l-[40px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
            {/* Header */}
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
                  Oneco 🚀
                </h1>
                <p className="text-[16px] text-gray-500 mt-[16px]">
                  Builder archetype quiz. Are you built to run a one-person company?
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-[8px] mt-[16px]">
                  {["Solo Builder", "AI Product", "Next.js", "4 Languages"].map((tag) => (
                    <span key={tag} className="px-[12px] py-[6px] bg-[#f0fdf4] border border-[#00bc7d]/30 text-[#00bc7d] text-[12px] font-semibold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
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

      {/* Mobile Layout */}
      <div className="md:hidden absolute inset-0 flex flex-col overflow-x-hidden">
        {/* Header */}
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
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-40">
          <div className="bg-white/85 backdrop-blur-lg mx-2 my-4 rounded-xl p-4 min-h-[calc(100vh-180px)]">
            {/* Oneco ship image */}
            <div className="flex justify-center mb-4">
              <img src={imgOneco} alt="Oneco" className="w-[120px] h-auto object-contain" />
            </div>
            <h1 className="text-[36px] font-bold text-[#1a365d] font-[family-name:var(--font-tinos)] tracking-tight leading-[1.1]">
              Oneco 🚀
            </h1>
            <p className="text-[12px] text-gray-500 mt-2">
              Builder archetype quiz. Are you built to run a one-person company?
            </p>
            <div className="flex flex-wrap gap-[6px] mt-[12px]">
              {["Solo Builder", "AI Product", "Next.js", "4 Languages"].map((tag) => (
                <span key={tag} className="px-[10px] py-[4px] bg-[#f0fdf4] border border-[#00bc7d]/30 text-[#00bc7d] text-[10px] font-semibold rounded-full">
                  {tag}
                </span>
              ))}
            </div>
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

        {/* Bottom Navigation */}
        <div
          className="fixed bottom-2 left-2 right-2 z-50 backdrop-blur-2xl border border-white/40 rounded-xl px-1 py-1.5 safe-area-pb shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.35) 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 40%, transparent 100%)",
              height: "50%",
            }}
          />
          <div className="flex justify-around">
            {(Object.keys(stones) as SectionKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`flex flex-col items-center p-1 transition-all rounded-lg ${activeSection === key ? "opacity-100 bg-[#00bc7d]/10" : "opacity-60"}`}
              >
                <img src={stones[key]} alt="" className="w-6 h-6 object-contain" />
                <span className={`text-[9px] mt-0.5 font-semibold ${activeSection === key ? "text-[#00bc7d]" : "text-gray-600"}`}>
                  {key === "overview" ? "Overview" : key === "archetypes" ? "Types" : key === "techstack" ? "Stack" : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
