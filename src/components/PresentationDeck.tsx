"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface Slide {
  content: React.ReactNode;
  background?: string;
}

interface PresentationDeckProps {
  title: string;
  slides: Slide[];
  backHref: string;
  backLabel: string;
}

export function PresentationDeck({ title, slides, backHref, backLabel }: PresentationDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, totalSlides - 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-[100]">
      {/* 16:9 slide container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div
          className="relative w-full max-w-[1600px] mx-auto overflow-hidden rounded-lg shadow-2xl"
          style={{ aspectRatio: "16/9" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center p-8 md:p-16"
              style={{
                background: slides[currentIndex]?.background ?? "linear-gradient(135deg, #fdfbf7 0%, #f8fafc 100%)",
              }}
            >
              {slides[currentIndex]?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/90 text-white">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to {backLabel}
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="text-sm font-medium min-w-[60px] text-center">
            {currentIndex + 1} / {totalSlides}
          </span>
          <button
            onClick={goNext}
            disabled={currentIndex === totalSlides - 1}
            className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="w-[120px]" />
      </div>
    </div>
  );
}
