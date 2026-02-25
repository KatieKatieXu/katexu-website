"use client";

import { PresentationDeck } from "@/components/PresentationDeck";

const slides = [
  {
    content: (
      <div className="text-center w-full">
        <h1 className="text-[48px] md:text-[64px] font-bold text-gray-900 font-[family-name:var(--font-tinos)] tracking-tight">
          WorkIT
        </h1>
        <p className="text-[20px] md:text-[24px] text-gray-500 mt-4">
          Unified Command Center for BofA Technicians & Managers
        </p>
        <p className="text-[16px] text-[#00bc7d] font-semibold mt-8">Design Lead · 1.5 years</p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full flex justify-center">
        <img src="/workit-cover.png" alt="WorkIT" className="max-h-[60vh] object-contain rounded-xl shadow-lg" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">The Challenge: Context-Switching Tax</h2>
        <p className="text-[20px] text-gray-700 leading-relaxed mb-6">
          91% of users had to navigate over <span className="font-bold text-[#00bc7d]">three different websites</span> (Jira, ARM, EMS, Wiki) to track a single day of work.
        </p>
        <blockquote className="text-[18px] text-gray-600 italic border-l-4 border-[#00bc7d] pl-6">
          &quot;I have to open up over 3 websites to catch up with what&apos;s going on at my workplace to track all my related work.&quot; — Field Technician
        </blockquote>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Key Stats</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#f9fafb] rounded-xl p-6 text-center">
            <p className="text-[48px] font-bold text-[#00bc7d]">91%</p>
            <p className="text-[14px] text-gray-500 mt-2">Users on 3+ websites daily</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-6 text-center">
            <p className="text-[48px] font-bold text-[#00bc7d]">3+</p>
            <p className="text-[14px] text-gray-500 mt-2">Platforms per workflow</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-6 text-center">
            <p className="text-[48px] font-bold text-[#00bc7d]">NPS 36</p>
            <p className="text-[14px] text-gray-500 mt-2">Final achievement</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Research: Finding the Scenario</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-4">
          Qualitative interviews with <span className="font-bold text-[#00bc7d]">20 existing users</span> revealed a critical gap.
        </p>
        <div className="bg-[#f0fdf4] border border-[#00bc7d]/20 rounded-xl p-6">
          <h4 className="text-[20px] font-semibold text-gray-900 mb-2">&quot;Between Office and Home&quot;</h4>
          <p className="text-[16px] text-gray-700">
            On public transit, users have the motivation to preview their day but lack the mobile tools to do so effectively without a laptop and VPN.
          </p>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-4xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Dashboard Transformation: Old vs New</h2>
        <p className="text-[18px] text-gray-700 mb-4">
          Evolved from excessive scrolling into a <span className="font-semibold">card-based UI</span> with a 360° view of all tickets in a single screen.
        </p>
        <img src="/workit-old-vs-new.gif" alt="Old vs New Dashboard" className="w-full rounded-xl border border-gray-200" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-4xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Quick Action Section</h2>
        <p className="text-[18px] text-gray-700 mb-4">
          Color-coded categories for &quot;Permit or Reject&quot; — instant decisions without accidental slips. Added &quot;Plan for Day-Off&quot; after detecting frequent leave-management needs.
        </p>
        <img src="/workit-quick-action.gif" alt="Quick Action" className="w-full rounded-xl border border-gray-200" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">The 80/20 Rule</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-4">
          Mapped the 20% of vital features that drove 80% of user returns. Data showed &quot;My Approval&quot; and &quot;Assigned to me&quot; were primary drivers — Version 3 with Quick Action reached <span className="font-bold text-[#00bc7d]">NPS 36</span>.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Measuring Success</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-6">
          Testing integrated into every release. <span className="font-semibold">Qualtrics + Matomo</span> for NPS and Conversion Rate (daily logins).
        </p>
        <div className="bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] border border-[#00bc7d]/20 rounded-xl p-8 text-center">
          <p className="text-[64px] font-bold text-[#00bc7d]">NPS 36</p>
          <p className="text-[18px] text-gray-700 mt-4">Unified fragmented workflows into a high-performance Command Center</p>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Reflections</h2>
        <blockquote className="text-[20px] text-gray-700 italic leading-relaxed">
          &quot;A designer&apos;s most powerful tools aren&apos;t just pixels, but observation, empathy, and data. Building effective IA takes deep immersion in the user&apos;s daily life.&quot;
        </blockquote>
      </div>
    ),
  },
];

export default function WorkITDeckPage() {
  return (
    <PresentationDeck
      title="WorkIT"
      slides={slides}
      backHref="/projects/bofa-workplace"
      backLabel="WorkIT"
    />
  );
}
