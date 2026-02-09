"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="h-screen w-screen bg-[#fdfbf7] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
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
      
      {/* PDF Viewer */}
      <div className="flex-1 w-full">
        <iframe
          src="/resume.pdf"
          className="w-full h-full border-0"
          title="Kate Xu Resume"
        />
      </div>
    </div>
  );
}
