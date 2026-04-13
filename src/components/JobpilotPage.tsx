"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";

// Image assets
const imgPlanetaryDiagram = "/planetary-diagram.png";
const imgBofaCloud = "/bofa-cloud.png";
const imgBofAWorkplace = "/bofa-workplace.png";
const imgPawpawStory = "/pawpaw-story.png";
const imgIOnboard = "/ionboard.png";
const imgKateXu = "/kate-xu.png";

// Stone images for navigation
const stones = {
  overview: "/stone-1.png",
  designthinking: "/stone-2.png",
  features: "/stone-3.png",
  techstack: "/stone-4.png",
  insight: "/stone-5.png",
};

type SectionKey = keyof typeof stones;

const sections = {
  overview: {
    title: "The Problem: Job Hunting Is Broken",
    subtitle: "Project Detail: 01 — Why Jobpilot",
    content: (
      <div className="space-y-[32px]">
        {/* Cover image */}
        <div className="rounded-[16px] overflow-hidden">
          <img src="/jobpilot-cover.gif" alt="Jobpilot product demo" className="w-full h-auto object-cover" />
        </div>

        {/* Try it Live CTA */}
        <div className="flex justify-center">
          <a
            href="https://jobpilot.katexu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[8px] px-[24px] py-[14px] bg-[#00bc7d] hover:bg-[#00a66d] text-white font-semibold text-[16px] rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            onClick={() => posthog.capture("live_app_clicked", { project_name: "Jobpilot", url: "https://jobpilot.katexu.com" })}
          >
            <span>🚀</span>
            <span>Try Jobpilot Live</span>
            <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="space-y-[24px]">
          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">The Reality</h4>
            <p className="text-[16px] text-gray-700 leading-[1.6]">
              <span className="font-semibold text-gray-900">Job hunting in 2026 is broken.</span> Mass applications go ignored by ATS systems. Image-based PDFs that even recruiters can&apos;t parse. No clarity on why you&apos;re actually a fit for any given role.
            </p>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
            <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[12px]">The Pain Points</h4>
            <ul className="space-y-[10px] text-[15px] text-gray-700 leading-[1.6]">
              <li><span className="font-medium text-gray-900">ATS Blackhole:</span> Applications disappear with zero feedback or signal</li>
              <li><span className="font-medium text-gray-900">Unreadable Resumes:</span> Image-based PDFs that parsers can&apos;t read — including yours</li>
              <li><span className="font-medium text-gray-900">Blind Applications:</span> No idea why you&apos;re a fit until it&apos;s too late</li>
              <li><span className="font-medium text-gray-900">Repetitive Forms:</span> Typing the same info 100 times across different portals</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[24px]">
            <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">The Solution</h4>
            <p className="text-[16px] text-gray-700 leading-[1.6]">
              I needed a tool that actually worked for me — so I built one. Jobpilot is an AI-powered job hunting tool built from the perspective of User #1: me.
            </p>
          </div>

          {/* Status metrics */}
          <div className="grid grid-cols-3 gap-[16px]">
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[20px] text-center">
              <p className="text-[28px] font-bold text-[#00bc7d]">2</p>
              <p className="text-[13px] text-gray-500 mt-1">Days to build</p>
            </div>
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] p-[20px] text-center">
              <p className="text-[28px] font-bold text-[#00bc7d]">4</p>
              <p className="text-[13px] text-gray-500 mt-1">Core features</p>
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
  designthinking: {
    title: "Design Thinking: The Hard Calls",
    subtitle: "Project Detail: 02 — Why It Works This Way",
    content: (
      <div className="space-y-[32px]">
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
          <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">The Approval Layer</h4>
          <p className="text-[16px] text-gray-700 leading-[1.6]">
            The easiest version of the Resume Reviser would have been: upload PDF → Claude rewrites it → download. Fast, impressive in a demo. But I kept asking: <span className="font-semibold text-gray-900">whose resume is this?</span>
          </p>
          <p className="text-[16px] text-gray-700 leading-[1.6] mt-[16px]">
            If AI silently rewrites your resume and you don&apos;t understand the changes, you can&apos;t defend them in an interview. You&apos;ve handed over authorship. So I added a mandatory review step: Claude surfaces 6–10 specific suggestions, you approve or edit each individually, then export. This slows the experience down on purpose — it keeps the human in the loop at the moment that matters most.
          </p>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[24px]">
          <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">What I Chose Not To Build</h4>
          <p className="text-[16px] text-gray-700 leading-[1.6]">
            Auto-apply — where Jobpilot submits applications on your behalf — is technically feasible and users would love it conceptually. I cut it because it removes the human from a decision with real consequences. Sending 200 auto-applications with your name on them, without your judgment on each one, is a <span className="font-semibold text-gray-900">design failure wearing a product feature costume.</span>
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[24px]">
          <h4 className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[8px]">The Filter Every Feature Went Through</h4>
          <p className="text-[16px] text-gray-700 leading-[1.6]">
            <span className="font-semibold text-gray-900">Does this make the user more capable, or more dependent?</span> A tool that does everything for you isn&apos;t a job hunting tool — it&apos;s a crutch. Jobpilot is designed to make you a better applicant, not to replace your judgment. AI&apos;s job is to extend human capability, not substitute for it.
          </p>
        </div>
      </div>
    ),
  },
  features: {
    title: "5 Features That Actually Help",
    subtitle: "Project Detail: 02 — Product Overview",
    content: (
      <div className="space-y-[24px]">
        {/* Feature 1 - Resume Reviser */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">🧠</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Feature 01</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">Resume Reviser</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6] mb-[16px]">
                Upload any PDF — even image-based ones. Claude Vision extracts the text, analyzes it, and surfaces 6–10 structured improvement suggestions. You approve or edit each one. Export a revised, ATS-ready resume.
              </p>
              <div className="rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-sm">
                <img src="/jobpilot-resume.gif" alt="Resume Reviser demo" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 - Job Matching */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-blue-500 to-cyan-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">✈️</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Feature 02</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">Job Matching</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6] mb-[16px]">
                Jobs ranked by interview probability — not just keyword match. Each role includes a &ldquo;Why this role for you&rdquo; brief: company outlook + personal compatibility signal. No more applying blind.
              </p>
              <div className="rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-sm">
                <img src="/jobpilot-jobs.gif" alt="Job Matching demo" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3 - Market Analysis */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">📈</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Feature 03</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">Market Analysis</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6] mb-[16px]">
                AI analyzes your profile and tells you your best-fit roles, what company types you&apos;ll win at, and specific LinkedIn optimizations. Market fit score shows how well-positioned you are.
              </p>
              <div className="rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-sm">
                <img src="/jobpilot-market.gif" alt="Market Analysis demo" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4 - Stories Bank */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-amber-500 to-orange-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">📖</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Feature 04</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">Stories Bank</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6] mb-[16px]">
                Save your career stories for interviews and applications. AI suggests questions based on your profile. Search instantly when filling out application forms — your answers power personalized cover letters.
              </p>
              <div className="rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-sm">
                <img src="/jobpilot-stories.gif" alt="Stories Bank demo" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 5 - Application Tracker */}
        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[16px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-pink-500 to-rose-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-[24px]">📊</span>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[4px]">Feature 05</p>
              <h4 className="text-[20px] font-bold text-gray-900 mb-[8px]">Application Tracker</h4>
              <p className="text-[15px] text-gray-600 leading-[1.6] mb-[16px]">
                Kanban board to track every application: <span className="font-medium">Saved → Applied → Interviewing → Offer → Rejected</span>. Know exactly where you stand across your entire pipeline at a glance.
              </p>
              <div className="rounded-[12px] overflow-hidden border border-[#e5e7eb] shadow-sm">
                <img src="/jobpilot-applications.gif" alt="Application Tracker demo" className="w-full h-auto" />
              </div>
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
                <span className="text-[16px] text-gray-800 font-medium">Hand Sketch</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Figma Make</span>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Google Stitch</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
            <p className="text-[12px] font-semibold text-[#00bc7d] tracking-wider uppercase mb-[16px]">Frontend</p>
            <div className="space-y-[10px]">
              <div className="flex items-center gap-[12px]">
                <div className="w-[8px] h-[8px] bg-[#00bc7d] rounded-full" />
                <span className="text-[16px] text-gray-800 font-medium">Next.js 16</span>
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

        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[16px] p-4 md:p-[33px] text-white">
          <p className="text-[11px] md:text-[12px] font-semibold text-emerald-400 tracking-wider uppercase mb-[12px]">
            The Workflow Summary
          </p>
          {/* Desktop: horizontal row */}
          <div className="hidden md:flex items-center justify-between gap-[16px]">
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Design</p>
              <p className="text-[18px] font-bold mt-1">Sketch + Figma + Stitch</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">MCP</p>
              <p className="text-[18px] font-bold mt-1">Figma MCP</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Code</p>
              <p className="text-[18px] font-bold mt-1">Claude Code</p>
            </div>
            <div className="text-emerald-400 text-[24px]">→</div>
            <div className="text-center">
              <p className="text-[14px] text-gray-400">Ship</p>
              <p className="text-[18px] font-bold mt-1">Vercel</p>
            </div>
          </div>
          {/* Mobile: 4-col grid */}
          <div className="md:hidden grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-[10px] text-gray-400">Design</p>
              <p className="text-[13px] font-bold">Sketch+Figma+Stitch</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">MCP</p>
              <p className="text-[13px] font-bold">Figma MCP</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Code</p>
              <p className="text-[13px] font-bold">Claude Code</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Ship</p>
              <p className="text-[13px] font-bold">Vercel</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  insight: {
    title: "Builder Insight: I Am User #1",
    subtitle: "Project Detail: 04 — Personal Reflection",
    content: (
      <div className="space-y-[24px]">
        <div className="bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-[16px] p-[33px]">
          <blockquote className="text-[18px] text-gray-700 italic leading-[1.7]">
            &ldquo;I am User #1. Every feature I built, I tested on my own job hunt. The Resume Reviser exists because my own PDF was image-based and unreadable by parsers. The &lsquo;Why this role for you&rsquo; section exists because I was tired of applying blind. This is what it feels like to build with AI — fast, intentional, and deeply personal.&rdquo;
          </blockquote>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-purple-500 to-pink-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">🎯</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Dogfooding as Design Method
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                The fastest way to know if a product works: use it yourself, on a real problem, under real pressure. Every friction point I hit became a feature. Every workaround I made became a flow.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-orange-500 to-amber-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">⚡</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                Built in 2 Days
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                Figma MCP → Claude Code → Claude API. Design to production in hours, not weeks. The workflow I&apos;ve built means the bottleneck is never the tool — it&apos;s always the idea.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f9fafb] border border-[#f3f4f6] rounded-[16px] p-[28px]">
          <div className="flex items-start gap-[20px]">
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[12px] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[20px]">🤖</span>
            </div>
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-[8px]">
                AI as Teammate
              </h4>
              <p className="text-[16px] text-gray-600 leading-[1.6]">
                Claude doesn&apos;t just power the features — it powered the build. AI as collaborator, AI as product. That loop closes in a way that feels genuinely new.
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
              <p className="text-[16px] font-bold mt-1">2 days<br /><span className="text-[13px] text-gray-400 font-normal">Mar 2026</span></p>
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
              <p className="text-[13px] text-gray-400">Actively used</p>
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
            layoutId="activeGlowJobpilot"
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

export default function JobpilotPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");

  const handleSectionChange = (section: SectionKey) => {
    setActiveSection(section);
    posthog.capture("project_section_navigated", { project_name: "Jobpilot", section });
  };

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

        <motion.img src={imgBofaCloud} alt="" className="absolute left-[10%] top-[14%] w-[192px] h-auto opacity-60" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.img src={imgBofAWorkplace} alt="" className="absolute right-[5%] top-[35%] w-[224px] h-auto opacity-60" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
        <motion.img src={imgPawpawStory} alt="" className="absolute left-[15%] top-[58%] w-[208px] h-auto opacity-60" animate={{ y: [0, -6, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.img src={imgIOnboard} alt="" className="absolute right-[5%] bottom-[10%] w-[192px] h-auto opacity-60" animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />

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
              <p className="text-xs font-bold text-[#6a7282] tracking-[3px] uppercase">Designer & Builder</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-xs text-black/30 tracking-[3.6px] uppercase opacity-60">
            Drag Badge to Switch • Click Background to Enter
          </p>
        </div>
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
              <NavItem stoneImg={stones.overview} label="Overview" isActive={activeSection === "overview"} onClick={() => handleSectionChange("overview")} />
              <NavItem stoneImg={stones.designthinking} label="Design Thinking" isActive={activeSection === "designthinking"} onClick={() => handleSectionChange("designthinking")} />
              <NavItem stoneImg={stones.features} label="Features" isActive={activeSection === "features"} onClick={() => handleSectionChange("features")} />
              <NavItem stoneImg={stones.techstack} label="Tech Stack" isActive={activeSection === "techstack"} onClick={() => handleSectionChange("techstack")} />
              <NavItem stoneImg={stones.insight} label="Insight" isActive={activeSection === "insight"} onClick={() => handleSectionChange("insight")} />
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
                  <p className="text-[8px] text-[#99a1af] uppercase tracking-[1px]">Designer & Builder</p>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-[96px] pt-[64px] pb-[48px]">
              {/* Title Section */}
              <div className="mb-[32px]">
                <h1 className="text-[72px] font-bold text-[#1a1a1a] font-[family-name:var(--font-tinos)] tracking-tight leading-[1]">
                  Jobpilot ✈️
                </h1>
                <p className="text-[16px] text-gray-500 mt-[16px]">
                  AI-powered job hunting. Built for myself first.
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-[8px] mt-[16px]">
                  {["Solo Builder", "AI Product", "Next.js", "Claude API"].map((tag) => (
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
              <p className="text-[8px] text-gray-500 uppercase tracking-wider">Designer & Builder</p>
            </div>
          </div>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-40">
          <div className="bg-white/85 backdrop-blur-lg mx-2 my-4 rounded-xl p-4 min-h-[calc(100vh-180px)]">
            <h1 className="text-[36px] font-bold text-[#1a365d] font-[family-name:var(--font-tinos)] tracking-tight leading-[1.1]">
              Jobpilot ✈️
            </h1>
            <p className="text-[12px] text-gray-500 mt-2">
              AI-powered job hunting. Built for myself first.
            </p>
            <div className="flex flex-wrap gap-[6px] mt-[12px]">
              {["Solo Builder", "AI Product", "Next.js", "Claude API"].map((tag) => (
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
                onClick={() => handleSectionChange(key)}
                className={`flex flex-col items-center p-1 transition-all rounded-lg ${activeSection === key ? "opacity-100 bg-[#00bc7d]/10" : "opacity-60"}`}
              >
                <img src={stones[key]} alt="" className="w-6 h-6 object-contain" />
                <span className={`text-[9px] mt-0.5 font-semibold ${activeSection === key ? "text-[#00bc7d]" : "text-gray-600"}`}>
                  {key === "overview" ? "Overview" : key === "techstack" ? "Stack" : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
