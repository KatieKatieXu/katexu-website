"use client";

import { PresentationDeck } from "@/components/PresentationDeck";

const slides = [
  {
    content: (
      <div className="text-center w-full">
        <h1 className="text-[48px] md:text-[64px] font-bold text-gray-900 font-[family-name:var(--font-tinos)] tracking-tight">
          ionboard
        </h1>
        <p className="text-[20px] md:text-[24px] text-gray-500 mt-4">
          High-performance electric skateboard for under $500
        </p>
        <p className="text-[16px] text-[#00bc7d] font-semibold mt-8">Design Lead · Student Startup</p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full flex justify-center">
        <img src="/ionboard-cover.png" alt="ionboard" className="max-h-[60vh] object-contain rounded-xl shadow-lg" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">The Vision: Disrupting the Commuter Market</h2>
        <p className="text-[20px] text-gray-700 leading-relaxed">
          The electric travel market was polarized: high-end boards cost over $1,000. We positioned ionboard as a <span className="font-bold text-[#00bc7d]">high-performance, customizable solution for under $500</span>, targeting the &quot;last-mile&quot; needs of students and urban commuters.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Kickstarter Success</h2>
        <a
          href="https://www.kickstarter.com/projects/1728725377/ionboard?ref=discovery&term=ionboard"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-xl p-6 hover:border-[#00bc7d]/40 transition-colors"
        >
          <p className="text-[48px] font-bold text-[#00bc7d]">$57,132</p>
          <p className="text-[18px] text-gray-700 mt-2">570% of goal · 34 days</p>
          <p className="text-[14px] text-[#00bc7d] font-semibold mt-4">View Kickstarter Campaign →</p>
        </a>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#f9fafb] rounded-xl p-6 text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">$499</p>
            <p className="text-[14px] text-gray-500 mt-2">Launch Price</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-6 text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">50%</p>
            <p className="text-[14px] text-gray-500 mt-2">Below Market</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-6 text-center">
            <p className="text-[36px] font-bold text-[#00bc7d]">25 mph</p>
            <p className="text-[14px] text-gray-500 mt-2">Model X Spec</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Strategy: User-Centered Design</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-4">
          Bridging the gap between student project and global e-commerce brand.
        </p>
        <ul className="space-y-3 text-[18px] text-gray-700">
          <li>• <span className="font-semibold">User Research:</span> Students, City Walkers, Skateboard Lovers (16–25)</li>
          <li>• <span className="font-semibold">Heuristic Analysis:</span> Portability & DIY potential as differentiators</li>
          <li>• <span className="font-semibold">Performance vs. Price:</span> 100% profit margin at 50% of competitor price</li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-4xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Community-First: Campus at UCSD</h2>
        <img src="/ionboard-campus.png" alt="Campus community" className="w-full rounded-xl border border-gray-200" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-4xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Execution: Full-Stack Brand Ecosystem</h2>
        <img src="/ionboard-timeline.png" alt="Workflow and timeline" className="w-full rounded-xl border border-gray-200" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">End-to-End Ownership</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#f9fafb] rounded-xl p-4">
            <p className="text-[14px] font-semibold text-[#00bc7d] uppercase">Kickstarter</p>
            <p className="text-[16px] text-gray-700">$10k goal in 24 hours</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-4">
            <p className="text-[14px] font-semibold text-[#00bc7d] uppercase">Marketing</p>
            <p className="text-[16px] text-gray-700">Google, Facebook, Instagram Ads</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-4">
            <p className="text-[14px] font-semibold text-[#00bc7d] uppercase">CES 2018</p>
            <p className="text-[16px] text-gray-700">Booth design & media strategy</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-4">
            <p className="text-[14px] font-semibold text-[#00bc7d] uppercase">Funding</p>
            <p className="text-[16px] text-gray-700">UC San Diego The Basement</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Success Metrics</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-[#00bc7d]/10 rounded-xl">
            <span className="text-[32px] font-bold text-[#00bc7d]">570%</span>
            <span className="text-[18px] text-gray-700">Kickstarter goal in 34 days</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-[#00bc7d]/10 rounded-xl">
            <span className="text-[32px] font-bold text-[#00bc7d]">110%</span>
            <span className="text-[18px] text-gray-700">YoY user growth — NA, EU & Asia</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-[#00bc7d]/10 rounded-xl">
            <span className="text-[18px] text-gray-700">KOL partnerships & referral programs</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Reflections</h2>
        <blockquote className="text-[20px] text-gray-700 italic leading-relaxed">
          &quot;From product to platform — leveraging KOL partnerships and referral programs to build a self-sustaining fan base across three continents.&quot;
        </blockquote>
      </div>
    ),
  },
];

export default function IonboardDeckPage() {
  return (
    <PresentationDeck
      title="ionboard"
      slides={slides}
      backHref="/projects/ionboard"
      backLabel="ionboard"
    />
  );
}
