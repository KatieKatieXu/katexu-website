"use client";

import { PresentationDeck } from "@/components/PresentationDeck";

const slides = [
  {
    content: (
      <div className="text-center w-full">
        <h1 className="text-[48px] md:text-[64px] font-bold text-gray-900 font-[family-name:var(--font-tinos)] tracking-tight">
          BofA Cloud
        </h1>
        <p className="text-[20px] md:text-[24px] text-gray-500 mt-4">
          Cloud infrastructure platform supporting over 1K internal applications
        </p>
        <p className="text-[16px] text-[#00bc7d] font-semibold mt-8">Design Lead in Team of 35</p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">The Mission</h2>
        <p className="text-[20px] text-gray-700 leading-relaxed">
          Transforming BofA&apos;s hosting infrastructure from fragmented public cloud dependencies to a robust, cost-effective private solution. Bridging complex backend engineering with a seamless, user-centered management experience.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Key Outcomes</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-[#00bc7d]/10 rounded-xl">
            <span className="text-[32px] font-bold text-[#00bc7d]">20%</span>
            <span className="text-[18px] text-gray-700">decrease in support tickets</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-[#00bc7d]/10 rounded-xl">
            <span className="text-[32px] font-bold text-[#00bc7d]">40%</span>
            <span className="text-[18px] text-gray-700">reduction in task completion time</span>
          </div>
          <div className="flex items-center gap-4 p-4 bg-[#00bc7d]/10 rounded-xl">
            <span className="text-[18px] text-gray-700">Unified design system adoption</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full flex justify-center">
        <img src="/cloud-cover.png" alt="BofA Cloud" className="max-h-[60vh] object-contain rounded-xl shadow-lg" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Product Intelligence Framework</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-4">
          Moving the design team from &quot;reactive&quot; to &quot;proactive&quot; through daily automated intelligence reports.
        </p>
        <ul className="space-y-3 text-[18px] text-gray-600">
          <li>• Operational Vitality: Unique Logins, Session Counts, Build Failure Rates</li>
          <li>• Feature Impact Analysis: baseline before release → post-launch click rates</li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-4xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Design System Adoption</h2>
        <img src="/cloud-solution1.png" alt="BofA Cloud Platform" className="w-full rounded-xl border border-gray-200 mb-4" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-4xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Component Library</h2>
        <img src="/cloud-solution2.png" alt="Design System Components" className="w-full rounded-xl border border-gray-200" />
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">User-Centered Research</h2>
        <ul className="space-y-4 text-[18px] text-gray-700">
          <li>• &quot;Think Aloud&quot; interviews with 15 internal stakeholders</li>
          <li>• Persona mapping: System Architects, Software Engineers, Product Managers</li>
          <li>• Living design library (Sketch, InVision, Git)</li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Measuring Success with Glassbox</h2>
        <p className="text-[18px] text-gray-700 leading-relaxed mb-4">
          Session analytics for granular user journey visibility. Identified &quot;Day-2&quot; request friction. Led discussions during Quarterly PI Planning.
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="w-full max-w-3xl">
        <h2 className="text-[32px] font-bold text-gray-900 mb-6">Reflections</h2>
        <blockquote className="text-[20px] text-gray-700 italic leading-relaxed">
          &quot;In an enterprise as massive as Bank of America, the designer&apos;s role isn&apos;t just to simplify the user&apos;s path, but to clarify the product&apos;s value to the business through data.&quot;
        </blockquote>
      </div>
    ),
  },
];

export default function BofaCloudDeckPage() {
  return (
    <PresentationDeck
      title="BofA Cloud"
      slides={slides}
      backHref="/projects/bofa-cloud"
      backLabel="BofA Cloud"
    />
  );
}
