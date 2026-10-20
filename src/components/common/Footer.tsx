"use client";

import { externalLinks } from "@/data/links";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#000000] border-t border-[#1a1c2e] py-12 font-mono text-xs text-[#9496a8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Driver and License */}
          <div className="flex items-center space-x-3">
            <div className="w-2 h-4 bg-[#ff003f]" />
            <div>
              <span className="text-[#f8fafc] font-bold block">
                SPARSH GOSWAMI // 2026
              </span>
              <span className="text-[10px] text-[#9496a8] block">
                COMPUTER SCIENCE ENGINEERING (AI & ML)
              </span>
            </div>
          </div>

          {/* Center: System Status */}
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span className="text-[#f8fafc]">SYS: ONLINE</span>
            </span>
            <span className="text-[#1a1c2e]">|</span>
            <span>HOST: VERCEL EDGE</span>
            <span className="text-[#1a1c2e]">|</span>
            <a
              href={externalLinks.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6366f1] transition-colors"
            >
              SOURCE REPO
            </a>
          </div>

          {/* Right: Return to Pit Wall */}
          <button
            type="button"
            onClick={scrollToTop}
            className="px-3 py-1.5 border border-[#1a1c2e] hover:border-[#ff003f] hover:text-[#ff003f] text-[#f8fafc] text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1 cursor-pointer bg-[#050508]"
          >
            <span>PIT WALL TOP</span>
            <span aria-hidden="true">&uarr;</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#0a0b12] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#9496a8] gap-2">
          <span>ORIGINAL DESIGN FOR SPARSH GOSWAMI. ALL RIGHTS RESERVED.</span>
          <span>LATITUDE: 21.1458 N // LONGITUDE: 79.0882 E</span>
        </div>
      </div>
    </footer>
  );
}
