"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import papersData from "@/data/papers.json";
import thoughtsData from "@/data/thoughts.json";

const papers = [...papersData].reverse();
const thoughts = [...thoughtsData].reverse();

const tabs = ["Research", "Thoughts", "AI Workflow"] as const;
type Tab = (typeof tabs)[number];

export default function HowIThinkPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Research");

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
              onClick={() => setActiveTab(tab)}
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

          {/* ── TAB 2: THOUGHTS ── */}
          {activeTab === "Thoughts" && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[10px] font-bold text-[#00915f] tracking-[3px] uppercase">
                  Day to day
                </span>
                <p className="mt-2 text-[13px] text-[#888]">
                  Things I&apos;m noticing, reacting to, thinking out loud.
                </p>

                {thoughts.length === 0 ? (
                  <div className="mt-16 text-center">
                    <p className="text-[14px] text-[#bbb]">Nothing here yet — check back soon.</p>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col gap-4">
                    {thoughts.map((thought, i) => (
                      <motion.article
                        key={i}
                        className="rounded-2xl border border-[#e8e4db] bg-white/60 p-5 hover:border-[#00bc7d]/40 transition-colors"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                      >
                        {/* Profile row */}
                        <div className="flex items-center gap-3 mb-3">
                          <Image
                            src="/kate-xu.png"
                            alt="Kate Xu"
                            width={36}
                            height={36}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="text-[13px] font-bold text-[#1a1a1a]">Kate Xu</p>
                            <p className="text-[11px] text-[#aaa]">{thought.date}</p>
                          </div>
                        </div>

                        {/* Content */}
                        <p className="text-[14px] text-[#333] leading-relaxed whitespace-pre-wrap">
                          {thought.content}
                        </p>
                      </motion.article>
                    ))}
                  </div>
                )}
              </motion.section>
            </>
          )}

          {/* ── TAB 3: AI WORKFLOW ── */}
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
                >
                  Get in touch
                </a>{" "}
                if you&apos;d like to know more.
              </p>

              <div className="mt-10 flex flex-col gap-6">
                {[
                  {
                    purpose: "Ship a product with UI",
                    steps: ["Hand Sketch", "Figma Make", "Google Stitch", "Figma → Cursor MCP", "Cursor", "Vercel"],
                  },
                  {
                    purpose: "Ship a Design System",
                    steps: ["Claude → Figma MCP", "Figma Design System"],
                  },
                  {
                    purpose: "Build & deploy AI agents",
                    steps: ["Claude Code", "Create Skills", "Upload & apply to agents"],
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

                    <div className="mt-4 flex flex-wrap items-center gap-2">
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
                  </motion.div>
                ))}
              </div>

              {/* Locked teaser card */}
              <motion.div
                className="relative mt-6 rounded-2xl border border-[#e8e4db] bg-white/60 p-6 overflow-hidden"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                {/* Fake content underneath */}
                <div className="opacity-40 select-none pointer-events-none">
                  <span className="text-[10px] font-bold text-[#00915f] tracking-[2px] uppercase">
                    Automate content pipeline
                  </span>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {["Source", "Agent Layer", "Transform", "Distribute", "Loop"].map((step, j, arr) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-[12px] font-medium text-[#333] bg-[#f4f1eb] border border-[#e8e4db] px-3 py-1.5 rounded-full">
                          {step}
                        </span>
                        {j < arr.length - 1 && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Matte glass overlay */}
                <div className="absolute inset-0 rounded-2xl backdrop-blur-[6px] bg-[#fdfbf7]/70 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-[#aaa] tracking-[2px] uppercase">More coming</span>
                </div>
              </motion.div>

            </motion.section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
