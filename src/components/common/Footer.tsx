"use client";

import { siteConfig } from "@/data/site";
import { externalLinks } from "@/data/links";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070809] border-t border-[#232730] py-12 font-mono text-xs text-[#8f94a0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Driver and License */}
          <div className="flex items-center space-x-3">
            <div className="w-2 h-4 bg-[#e10600]" />
            <div>
              <span className="text-[#f3f4f6] font-bold block">
                SPARSH GOSWAMI // 2026
              </span>
              <span className="text-[10px] text-[#8f94a0] block">
                COMPUTER SCIENCE ENGINEERING (AI & ML)
              </span>
            </div>
          </div>

          {/* Center: System Status */}
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span className="text-[#f3f4f6]">SYS: ONLINE</span>
            </span>
            <span className="text-[#232730]">|</span>
            <span>HOST: VERCEL EDGE</span>
            <span className="text-[#232730]">|</span>
            <a
              href={externalLinks.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f3f4f6] transition-colors"
            >
              SOURCE REPO
            </a>
          </div>

          {/* Right: Return to Pit Wall */}
          <button
            type="button"
            onClick={scrollToTop}
            className="px-3 py-1.5 border border-[#232730] hover:border-[#e10600] text-[#f3f4f6] text-[10px] uppercase tracking-wider transition-colors flex items-center space-x-1"
          >
            <span>PIT WALL TOP</span>
            <span aria-hidden="true">&uarr;</span>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#14161b] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#8f94a0] gap-2">
          <span>ORIGINAL DESIGN FOR SPARSH GOSWAMI. ALL RIGHTS RESERVED.</span>
          <span>LATITUDE: 21.1458 N // LONGITUDE: 79.0882 E</span>
        </div>
      </div>
    </footer>
  );
}
