"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useState } from "react";

function ThemeToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="mb-4 flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white/80 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
      aria-label={checked ? "Switch to day mode" : "Switch to night mode"}
    >
      {checked ? (
        <>
          <span className="text-lg">🌙</span>
          <span>Night</span>
        </>
      ) : (
        <>
          <span className="text-lg">☀️</span>
          <span>Day</span>
        </>
      )}
    </button>
  );
}

export function PawpawCardShowcase() {
  const [isNightMode, setIsNightMode] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <ThemeToggle checked={isNightMode} onChange={setIsNightMode} />

      <CardContainer className="inter-var w-full max-w-[320px]">
        <CardBody
          className={`relative rounded-xl p-6 border w-full ${
            isNightMode ? "bg-[#1e2749] border-[#7b8fb8]" : "bg-[#fdfbf8] border-[#e3d9cf]"
          }`}
        >
          <CardItem translateZ="50" className="w-full mt-4">
            <img
              src="/pawpaw-cover.png"
              alt="PawpawStory"
              className="h-40 w-full object-cover rounded-xl"
            />
          </CardItem>

          <CardItem translateZ="60" className="flex justify-between items-center mt-6">
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isNightMode ? "text-white" : "text-gray-900"}`}>
                Little Red Riding Hood
              </p>
              <p className={`text-xs mt-0.5 ${isNightMode ? "text-gray-400" : "text-gray-500"}`}>
                Bedtime Story
              </p>
            </div>
            <button
              type="button"
              className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00bc7d] flex items-center justify-center text-white hover:bg-[#00a86b] transition-colors shadow-lg"
              aria-label="Play story"
            >
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
}
