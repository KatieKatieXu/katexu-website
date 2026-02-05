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
  philosophy: "/stone-1.png",
  process: "/stone-2.png",
  build: "/stone-3.png",
  takeaways: "/stone-4.png",
  techstack: "/stone-5.png",
};

type SectionKey = keyof typeof stones;

// Section content based on provided content
const sections = {
  philosophy: {
    title: "The Core Philosophy: How I \"Vibe Coding\"",
    subtitle: "Project Detail: 01 — Methodology",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          <span className="font-semibold text-gray-900">&quot;Vibe Coding&quot;</span> is my methodology for modern product development. Instead of writing every line of syntax, I act as the <span className="font-semibold text-gray-900">Architect and Creative Director</span>, while AI agents handle the implementation.
        </p>

        <div className="bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[33px]">
          <p className="text-[20px] text-gray-800 font-medium leading-[1.6]">
            This shift allows me to maintain <span className="font-bold text-[#00bc7d]">100% control</span> over the User Experience while executing at <span className="font-bold text-[#00bc7d]">10x speed</span>.
          </p>
        </div>

        <div>
          <h3 className="text-[20px] font-bold text-gray-900 mb-[24px]">
            Dual-Agent Workflow for PawpawStory
          </h3>
          <div className="grid grid-cols-2 gap-[24px]">
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-[12px] flex items-center justify-center mb-[16px]">
                <span className="text-white text-[20px]">🧠</span>
              </div>
              <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">
                The Architect
              </p>
              <h4 className="text-[18px] font-semibold text-gray-900 mb-[8px]">
                Google Gemini
              </h4>
              <p className="text-[14px] text-gray-600 leading-[1.6]">
                High-level logic, system architecture, and &quot;Tutor-style&quot; prompt engineering.
              </p>
            </div>

            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[12px] flex items-center justify-center mb-[16px]">
                <span className="text-white text-[20px]">⚡</span>
              </div>
              <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">
                The Builder
              </p>
              <h4 className="text-[18px] font-semibold text-gray-900 mb-[8px]">
                Cursor + Figma MCP
              </h4>
              <p className="text-[14px] text-gray-600 leading-[1.6]">
                Pixel-perfect UI implementation and rapid code generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  process: {
    title: "The Process: From Logic to Pixels",
    subtitle: "Project Detail: 02 — Case Study Breakdown",
    content: (
      <div className="space-y-[40px]">
        {/* Phase 1 */}
        <div>
          <div className="flex items-center gap-[16px] mb-[20px]">
            <div className="w-[32px] h-[32px] bg-[#00bc7d] rounded-full flex items-center justify-center text-white font-bold text-[14px]">1</div>
            <h3 className="text-[24px] font-bold text-gray-900">Logic & Architecture</h3>
            <span className="text-[14px] text-gray-400 ml-auto">Tool: Google Gemini</span>
          </div>
          <p className="text-[16px] text-gray-600 leading-[1.6] mb-[20px]">
            Before writing a single line of code, I used Gemini as a &quot;Product Tutor&quot; to clarify the app&apos;s logic. This prevented the &quot;spaghetti code&quot; mess that usually happens with AI coding.
          </p>
          <div className="space-y-[16px]">
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[12px] p-[20px]">
              <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[8px]">Structured Thinking</p>
              <p className="text-[14px] text-gray-700 leading-[1.6]">
                Fed raw feature ideas to Gemini acting as a <span className="font-medium">Senior CTO</span>. Broke the app into clean, isolated modules (Auth, Recorder Service, Story Player).
              </p>
            </div>
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[12px] p-[20px]">
              <p className="text-[12px] font-semibold text-gray-400 tracking-wider uppercase mb-[8px]">The &quot;Context&quot; Strategy</p>
              <p className="text-[14px] text-gray-700 leading-[1.6]">
                Used Gemini to generate a <code className="bg-gray-200 px-2 py-0.5 rounded text-[13px]">.cursorrules</code> file—a master instruction set keeping the codebase clean and preventing hallucinations.
              </p>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div>
          <div className="flex items-center gap-[16px] mb-[20px]">
            <div className="w-[32px] h-[32px] bg-[#00bc7d] rounded-full flex items-center justify-center text-white font-bold text-[14px]">2</div>
            <h3 className="text-[24px] font-bold text-gray-900">Design-to-Code</h3>
            <span className="text-[14px] text-gray-400 ml-auto">Tools: Figma, Cursor, MCP</span>
          </div>
          <p className="text-[16px] text-gray-600 leading-[1.6] mb-[20px]">
            This is where the magic happens. Traditionally, &quot;hand-off&quot; is where design details get lost. I eliminated this gap using the <span className="font-semibold text-gray-800">Figma MCP (Model Context Protocol)</span>.
          </p>
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[12px] p-[20px]">
              <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">Direct Context Injection</p>
              <p className="text-[14px] text-gray-700 leading-[1.6]">
                Connected Cursor directly to Figma via MCP. The AI &quot;reads&quot; design tokens (colors, spacing, typography) directly from the canvas.
              </p>
            </div>
            <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[12px] p-[20px]">
              <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">Human-Controlled AI</p>
              <p className="text-[14px] text-gray-700 leading-[1.6]">
                Adjusting corner radius in Figma = AI updates code to match exactly. <span className="font-medium">Absolute control maintained.</span>
              </p>
            </div>
          </div>
          <div className="mt-[20px] bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[12px] p-[20px]">
            <p className="text-[14px] text-gray-700 font-medium">
              <span className="text-[#00bc7d]">Result:</span> Pixel-to-Pixel identical implementation of high-fidelity prototypes, achieved in <span className="font-bold">minutes rather than days</span>.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  build: {
    title: "The Build & Polish",
    subtitle: "Project Detail: 03 — Production Implementation",
    content: (
      <div className="space-y-[32px]">
        <p className="text-[18px] text-gray-700 leading-[1.7]">
          Tools: <span className="font-semibold">React Native (Expo), Supabase, ElevenLabs</span>
        </p>

        <div className="space-y-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
              Voice Cloning Integration
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              ElevenLabs API
            </h4>
            <p className="text-[16px] text-gray-600 leading-[1.6]">
              Integrated complex third-party APIs to handle <span className="font-medium">secure audio recording and synthesis</span>—enabling personalized AI storytelling with family voices.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
              Real-World Constraints
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Edge Case Iteration
            </h4>
            <p className="text-[16px] text-gray-600 leading-[1.6]">
              Used AI to quickly iterate on edge cases (e.g., &quot;What happens if the user denies microphone permission?&quot;) ensuring the app wasn&apos;t just a demo, but a <span className="font-medium">shippable product</span>.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">
              App Store Launch
            </p>
            <h4 className="text-[20px] font-semibold text-gray-900 mb-[12px]">
              Deployment
            </h4>
            <p className="text-[16px] text-gray-600 leading-[1.6]">
              Successfully navigated Apple App Store&apos;s rigorous review process (including <span className="font-medium">encryption compliance and privacy policies</span>) to launch v1.0.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[24px]">
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[24px] text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">4</p>
            <p className="text-[14px] text-gray-500 mt-2">Weeks to Launch</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[24px] text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">v1.0</p>
            <p className="text-[14px] text-gray-500 mt-2">App Store Release</p>
          </div>
          <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[24px] text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">70%</p>
            <p className="text-[14px] text-gray-500 mt-2">Dev Time Saved</p>
          </div>
        </div>
      </div>
    ),
  },
  takeaways: {
    title: "Key Takeaways",
    subtitle: "Project Detail: 04 — Why This Matters",
    content: (
      <div className="space-y-[24px]">
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-purple-500 to-pink-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">🎨</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Designer-Developer Hybrid
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                I don&apos;t just mock up interfaces; I understand the technical constraints and can build <span className="font-medium">functional prototypes that look and feel real</span>.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-orange-500 to-amber-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">⚡</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Efficiency Master
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                By using Gemini to &quot;manage&quot; Cursor, I cut development time by <span className="font-bold text-[#00bc7d]">~70%</span>, allowing more time for User Testing and Iteration.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">🤖</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                AI Literacy
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                Proficient in the latest AI development protocols (<span className="font-medium">MCP</span>), positioned at the cutting edge of the <span className="font-medium">&quot;Agentic Workflow&quot;</span> era.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[33px]">
          <blockquote className="text-[18px] text-gray-700 italic leading-[1.6]">
            &quot;A personalized AI storytelling app for families, designed and built in 4 weeks using a Vibe Coding workflow that bridges the gap between Figma design and production code.&quot;
          </blockquote>
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
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">
              Design
            </p>
            <div className="space-y-[12px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Figma</span>
              </div>
              <p className="text-[14px] text-gray-500 pl-[20px]">Variables, Auto-layout</p>
            </div>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">
              AI Tools
            </p>
            <div className="space-y-[12px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Google Gemini</span>
              </div>
              <p className="text-[14px] text-gray-500 pl-[20px]">Logic/Prompting</p>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Cursor</span>
              </div>
              <p className="text-[14px] text-gray-500 pl-[20px]">Code Generation</p>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Figma MCP</span>
              </div>
              <p className="text-[14px] text-gray-500 pl-[20px]">Context Bridge</p>
            </div>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">
              Development
            </p>
            <div className="space-y-[12px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">React Native</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Expo</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">TypeScript</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[33px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">
              Backend/Services
            </p>
            <div className="space-y-[12px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Supabase</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">ElevenLabs API</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[16px] p-[33px] text-white">
          <p className="text-[12px] font-semibold text-emerald-400 tracking-wider uppercase mb-[12px]">
            The Workflow Summary
          </p>
          <div className="flex items-center justify-between gap-[16px]">
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Architecture</p>
              <p className="text-[18px] font-bold mt-1">Gemini</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Design</p>
              <p className="text-[18px] font-bold mt-1">Figma</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Code</p>
              <p className="text-[18px] font-bold mt-1">Cursor + MCP</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Ship</p>
              <p className="text-[18px] font-bold mt-1">App Store</p>
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

export default function PawpawStoryPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("philosophy");

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
                stoneImg={stones.philosophy}
                label="Philosophy"
                isActive={activeSection === "philosophy"}
                onClick={() => setActiveSection("philosophy")}
              />
              <NavItem
                stoneImg={stones.process}
                label="Process"
                isActive={activeSection === "process"}
                onClick={() => setActiveSection("process")}
              />
              <NavItem
                stoneImg={stones.build}
                label="Build"
                isActive={activeSection === "build"}
                onClick={() => setActiveSection("build")}
              />
              <NavItem
                stoneImg={stones.takeaways}
                label="Takeaways"
                isActive={activeSection === "takeaways"}
                onClick={() => setActiveSection("takeaways")}
              />
              <NavItem
                stoneImg={stones.techstack}
                label="Tech Stack"
                isActive={activeSection === "techstack"}
                onClick={() => setActiveSection("techstack")}
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
                  PawpawStory
                </h1>
                <p className="text-[16px] text-gray-500 mt-[16px]">
                  Zero-to-One Product Design via AI Vibe Coding
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
              PawpawStory
            </h1>
            <p className="text-[12px] text-gray-500 mt-2">
              Zero-to-One Product Design via AI Vibe Coding
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
                <span className="text-[9px] mt-1 capitalize font-medium">
                  {key === "techstack" ? "Stack" : key}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
