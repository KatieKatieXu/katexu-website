"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import papersData from "@/data/papers.json";
import posthog from "posthog-js";

const papers = [...papersData].reverse();

const tabs = ["AI Workflow", "Research"] as const;
type Tab = (typeof tabs)[number];

export default function HowIThinkPage() {
  const [activeTab, setActiveTab] = useState<Tab>("AI Workflow");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    posthog.capture("how_i_think_tab_switched", { tab });
  };

  return (
    <div className="h-screen overflow-y-auto w-full bg-[#fdfbf7] flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 flex flex-col bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="flex items-center justify-between p-4 md:p-6">
          <Link href="/">
            <motion.button
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:border-[#00bc7d] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go back to home"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00bc7d"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 14L4 9l5-5" />
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
              </svg>
            </motion.button>
          </Link>

          <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-wide font-[family-name:var(--font-tinos)]">
            How I Think
          </h1>

          <div className="w-10 md:w-12" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 px-4 md:px-6 pb-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`relative px-4 py-1.5 text-[12px] font-semibold rounded-full transition-all ${
                activeTab === tab
                  ? "text-white bg-[#00915f]"
                  : "text-[#888] bg-transparent hover:text-[#444]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-[#00915f] rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 max-w-2xl mx-auto w-full px-6 py-12 md:py-16"
        >
          {/* ── TAB 1: RESEARCH ── */}
          {activeTab === "Research" && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-[10px] font-bold text-[#00915f] tracking-[3px] uppercase">
                  Where it started
                </span>
                <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-snug font-[family-name:var(--font-tinos)]">
                  Everyone pointed somewhere different — and they were all right.
                </h2>
                <p className="mt-4 text-[15px] md:text-base text-[#444] leading-relaxed">
                  In a cognitive science class at UCSD, we were asked to point to{" "}
                  <em>yesterday</em>. Some people pointed behind them. Some to the
                  left. Some — like the Aymara people of the Andes — point forward,
                  because the past is what you can see. Every answer was internally
                  consistent. Every answer was built from a different mental model of
                  time and space.
                </p>
                <p className="mt-3 text-[15px] md:text-base text-[#444] leading-relaxed">
                  That question pulled me into neuroscience — and into the{" "}
                  <strong>left brain / right brain</strong> research I keep coming
                  back to. The left brain learns logic after birth: language, rules,
                  the cultural direction time is supposed to flow. The right brain
                  operates more like a first instinct — spatial, intuitive, already
                  wired to the body and the world before any classroom got involved.
                  When my classmates pointed in different directions, they weren&apos;t
                  wrong or right. They were just running different software. Some were
                  following logic they had learned; others were following a feeling
                  they couldn&apos;t fully explain. A product that only works for one
                  of those people isn&apos;t finished yet.
                </p>

                <motion.figure
                  className="mt-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <img
                    src="/ucsd-design-competition-2018.jpg"
                    alt="Kate Xu in conversation at the UCSD design competition"
                    className="w-full h-auto rounded-2xl border border-[#e8e4db]"
                  />
                  <figcaption className="mt-2 text-center text-[11px] text-[#999] italic">
                    2018 at UCSD design competition
                  </figcaption>
                </motion.figure>
              </motion.section>

              <motion.div
                className="my-12 h-px bg-gradient-to-r from-transparent via-[#00bc7d]/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-[10px] font-bold text-[#00915f] tracking-[3px] uppercase">
                  Latest thinking
                </span>
                <p className="mt-2 text-[13px] text-[#888]">
                  Papers I&apos;m reading, filtered through a design lens.
                </p>

                <div className="mt-8 flex flex-col gap-8">
                  {papers.map((paper, i) => (
                    <motion.article
                      key={i}
                      className="rounded-2xl border border-[#e8e4db] bg-white/60 p-6 hover:border-[#00bc7d]/40 transition-colors"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-white bg-[#00915f] px-2 py-0.5 rounded-full tracking-wider">
                          {paper.year}
                        </span>
                        <span className="text-[11px] text-[#999] italic">{paper.journal}</span>
                      </div>

                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[15px] font-bold text-[#1a1a1a] leading-snug hover:text-[#00915f] transition-colors font-[family-name:var(--font-tinos)]"
                        onClick={() => posthog.capture("research_paper_clicked", { paper_year: paper.year, paper_journal: paper.journal })}
                      >
                        {paper.title} ↗
                      </a>

                      <p className="mt-3 text-[13px] text-[#555] leading-relaxed">
                        {paper.summary}
                      </p>

                      <div className="mt-4 pt-4 border-t border-[#f0ece4]">
                        <span className="text-[10px] font-bold text-[#00915f] tracking-[2px] uppercase">
                          Kate&apos;s takeaway
                        </span>
                        <p className="mt-1.5 text-[13px] text-[#444] leading-relaxed italic">
                          {paper.takeaway}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.p
                className="mt-16 text-center text-[11px] text-[#bbb] tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Updated regularly — one paper at a time.
              </motion.p>
            </>
          )}

          {/* ── TAB 2: AI WORKFLOW ── */}
          {activeTab === "AI Workflow" && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[10px] font-bold text-[#00915f] tracking-[3px] uppercase">
                In practice
              </span>
              <p className="mt-3 text-[14px] text-[#555] leading-relaxed max-w-lg">
                These are workflows I&apos;ve built, tested, and refined — each shaped for a different kind of problem. They&apos;re always evolving.{" "}
                <a
                  href="mailto:katherinexu09@gmail.com"
                  className="text-[#00915f] hover:underline"
                  onClick={() => posthog.capture("contact_email_clicked", { source: "how_i_think_ai_workflow" })}
                >
                  Get in touch
                </a>{" "}
                if you&apos;d like to know more.
              </p>

              <div className="mt-10 flex flex-col gap-6">
                {[
                  {
                    purpose: "Designer → Engineer: The AI-Verifiable Handoff",
                    steps: ["Figma", "Package: TSX + CSS + DS Spec", "Reference Demo Image", "Engineer's Agent Validates", "PR"],
                    detail:
                      "Instead of static mocks, engineers receive a package of TSX, CSS, and design-system spec alongside reference demo images. Their coding agent checks the implementation against my design — verification by agent, not by someone squinting at Figma.",
                  },
                  {
                    purpose: "Designer → Engineer: The Living Screen Registry",
                    steps: ["Coding Agent", "Capture Key Flow Screens", "Registry Table", "Auto-Update on Every Push"],
                    detail:
                      "A coding agent records the key screens of every core flow into a registry table that updates whenever code is pushed — design documentation that can never drift from what's actually in production.",
                  },
                  {
                    purpose: "Ship a product with UI",
                    steps: ["Hand Sketch", "Figma Make", "Google Stitch", "Figma → Cursor MCP", "Cursor", "Vercel"],
                    detail: "",
                  },
                  {
                    purpose: "Ship a Design System",
                    steps: ["Claude → Figma MCP", "Figma Design System"],
                    detail: "",
                  },
                  {
                    purpose: "Build & deploy AI agents",
                    steps: ["Claude Code", "Create Skills", "Upload & apply to agents"],
                    detail: "",
                  },
                ].map((workflow, i) => (
                  <motion.div
                    key={i}
                    className="rounded-2xl border border-[#e8e4db] bg-white/60 p-6 hover:border-[#00bc7d]/40 transition-colors"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <span className="text-[10px] font-bold text-[#00915f] tracking-[2px] uppercase">
                      {workflow.purpose}
                    </span>

                    <div className="mt-4 flex flex-wrap items-center gap-y-3 gap-x-2">
                      {workflow.steps.map((step, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="text-[12px] font-medium text-[#333] bg-[#f4f1eb] border border-[#e8e4db] px-3 py-1.5 rounded-full">
                            {step}
                          </span>
                          {j < workflow.steps.length - 1 && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                    {workflow.detail && (
                      <p className="mt-4 pt-4 border-t border-[#f0ece4] text-[13px] text-[#555] leading-relaxed">
                        {workflow.detail}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Locked teaser section */}
              <motion.div
                className="relative mt-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {/* Fake cards underneath */}
                <div className="flex flex-col gap-4 select-none pointer-events-none">
                  {[
                    {
                      purpose: "Automate a content pipeline",
                      steps: ["Source", "Agent Layer", "Transform", "Distribute", "Loop"],
                    },
                    {
                      purpose: "Ship a mobile app solo",
                      steps: ["Brief", "Module Map", "Design Tokens", "AI Build", "TestFlight", "App Store"],
                    },
                    {
                      purpose: "Run a nightly QA system",
                      steps: ["Codebase Scan", "Cross-check", "Flag", "Report", "Fix Loop"],
                    },
                  ].map((fake, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-[#e8e4db] bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <span className="w-7 h-7 rounded-full bg-[#f0fdf8] border border-[#00bc7d]/30 flex items-center justify-center text-[10px] font-bold text-[#00915f]">
                          {String(i + 4).padStart(2, "0")}
                        </span>
                        <span className="text-[11px] font-bold text-[#00915f] tracking-[2px] uppercase">
                          {fake.purpose}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-y-3 gap-x-2">
                        {fake.steps.map((step, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <span className="text-[12px] font-medium text-[#333] bg-[#f7f5f0] border border-[#e8e4db] px-3 py-1.5 rounded-full shadow-sm">
                              {step}
                            </span>
                            {j < fake.steps.length - 1 && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Uniform matte glass over all cards */}
                <div className="absolute inset-0 rounded-2xl backdrop-blur-[4px] bg-[#fdfbf7]/60 flex items-center justify-center">
                  <a
                    href="mailto:katherinexu09@gmail.com"
                    className="text-[12px] font-semibold text-[#00915f] tracking-[2px] uppercase hover:underline"
                    onClick={() => posthog.capture("contact_email_clicked", { source: "how_i_think_ai_workflow_locked" })}
                  >
                    Contact to know more
                  </a>
                </div>
              </motion.div>

            </motion.section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
