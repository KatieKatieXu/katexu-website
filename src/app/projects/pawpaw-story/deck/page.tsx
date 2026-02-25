"use client";

import { PresentationDeck } from "@/components/PresentationDeck";
import Link from "next/link";

const slides = [
  {
    content: (
      <div className="text-center w-full">
        <h1 className="text-[48px] md:text-[64px] font-bold text-gray-900 font-[family-name:var(--font-tinos)] tracking-tight">
          PawpawStory
        </h1>
        <p className="text-[20px] md:text-[24px] text-gray-500 mt-4">
          Zero to App Store in 4 Weeks
        </p>
        <p className="text-[16px] text-[#00bc7d] font-semibold mt-8">Solo AI Product Builder</p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">The Problem</h2>
        <p className="text-[20px] text-gray-700 leading-relaxed mb-4">
          <strong>Fading Memories at 8:00 PM</strong> — Parents want to share classic tales but exhaustion leaves them scrolling or repeating the same books.
        </p>
        <ul className="space-y-3 text-[18px] text-gray-600">
          <li>• YouTube & EdTech: High engagement, blue light disrupts sleep</li>
          <li>• Audiobooks: Screen-free but passive, generic voices lack resonance</li>
          <li>• Standard AI: Robotic output, lacks the &quot;magic&quot; of a human storyteller</li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">The Insight: Stanford Research</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed">
          A parent&apos;s voice activates a child&apos;s reward, emotion, and face-processing neural networks in a way unfamiliar voices cannot. Familiar voices trigger oxytocin and lower cortisol — the exact biological soothing mechanism for sleep.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">The Product Thesis</h2>
        <p className="text-[24px] text-gray-800 leading-relaxed">
          AI-reconstructed classic tales + voice-cloning in parent&apos;s voice = <span className="text-[#00bc7d] font-semibold">screen-free, soothing, personalized</span> bedtime experience.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full flex justify-center">
        <img src="/pawpaw-cover.png" alt="PawpawStory" className="max-h-[60vh] object-contain rounded-xl shadow-lg" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Multi-Agent Workflow</h2>
        <p className="text-[18px] text-gray-700 mb-4">Human-in-the-loop orchestration:</p>
        <div className="grid gap-4">
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
            <span className="text-2xl">🧠</span>
            <div>
              <p className="font-semibold text-gray-900">Gemini</p>
              <p className="text-sm text-gray-500">Planner Agent — Logic & Architecture</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-semibold text-gray-900">Cursor</p>
              <p className="text-sm text-gray-500">Execution Agent — Code Generation</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
            <span className="text-2xl">🎨</span>
            <div>
              <p className="font-semibold text-gray-900">Figma + MCP</p>
              <p className="text-sm text-gray-500">Context Agent — Design Tokens</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Design-to-Code via MCP</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-4">
          Figma MCP connects Cursor directly to design. The AI reads colors, spacing, typography from the canvas. Change in Figma = code updates in minutes.
        </p>
        <img src="/pawpaw-storycard-demo.gif" alt="StoryCard Design System" className="w-full max-w-md rounded-xl border border-gray-200 mt-4" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {["React Native (Expo)", "Supabase", "ElevenLabs API", "Figma", "Cursor", "Gemini"].map((t) => (
            <span key={t} className="px-4 py-2 bg-[#00bc7d]/10 text-[#00bc7d] rounded-full font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl text-center">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Outcomes</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-[#00bc7d]/10 rounded-2xl">
            <p className="text-[36px] font-bold text-[#00bc7d]">4 weeks</p>
            <p className="text-gray-600">Zero to App Store</p>
          </div>
          <div className="p-6 bg-[#00bc7d]/10 rounded-2xl">
            <p className="text-[36px] font-bold text-[#00bc7d]">~70%</p>
            <p className="text-gray-600">Dev time reduction</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Key Learnings</h2>
        <ul className="space-y-4 text-[18px] text-gray-700">
          <li>• AI literacy: MCP, agentic workflows</li>
          <li>• Design systems bridge Figma → production</li>
          <li>• Solo builder = AI as force multiplier</li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div className="text-center w-full">
        <p className="text-[24px] text-gray-600 mb-4">Download the app</p>
        <a
          href="https://apps.apple.com/us/app/pawpawstory/id6757112694"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#00bc7d] text-white rounded-full font-semibold hover:bg-[#00a86b] transition-colors"
        >
          App Store
        </a>
      </div>
    ),
  },
];

export default function PawpawStoryDeckPage() {
  return (
    <PresentationDeck
      title="PawpawStory"
      slides={slides}
      backHref="/projects/pawpaw-story"
      backLabel="PawpawStory"
    />
  );
}
