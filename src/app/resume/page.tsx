"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ResumePage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#fdfbf7] flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 md:p-6 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <Link href="/">
          <motion.button
            className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 hover:border-[#00bc7d] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go back to home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00bc7d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 14L4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
          </motion.button>
        </Link>
        
        <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-wide">
          Kate Xu — Resume
        </h1>
        
        <a 
          href="/resume.pdf" 
          download="KateXu_Resume.pdf"
          className="px-4 py-2 bg-[#00bc7d] text-white text-sm font-semibold rounded-full hover:bg-[#00a86b] transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="hidden md:inline">Download</span>
        </a>
      </div>
      
      {/* Desktop: iframe PDF viewer fills remaining space */}
      <div className="hidden md:flex flex-1 w-full">
        <iframe
          src="/resume.pdf"
          className="w-full h-full border-0"
          style={{ minHeight: "calc(100vh - 80px)" }}
          title="Kate Xu Resume"
        />
      </div>

      {/* Mobile: paper sheet view that fits width and scrolls naturally */}
      <div className="md:hidden flex-1 flex flex-col items-center px-3 py-4">
        {/* Paper sheet container */}
        <div
          className="w-full bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden"
          style={{
            /* US Letter aspect ratio: 8.5 x 11 = 1:1.294 */
            aspectRatio: "8.5 / 11",
            maxWidth: "100%",
          }}
        >
          {/* Loading indicator */}
          {!iframeLoaded && (
            <div className="w-full h-full flex items-center justify-center bg-white">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#00bc7d] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading resume...</p>
              </div>
            </div>
          )}
          <iframe
            src="/resume.pdf#view=FitH"
            className="w-full h-full border-0"
            title="Kate Xu Resume"
            onLoad={() => setIframeLoaded(true)}
            style={{ display: iframeLoaded ? "block" : "none" }}
          />
        </div>

        {/* Tap to open full PDF — fallback for mobile browsers that don't render iframe PDFs well */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 mb-6 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:text-[#00bc7d] hover:border-[#00bc7d] transition-colors shadow-sm flex items-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Open full PDF
        </a>
      </div>
    </div>
  );
}
