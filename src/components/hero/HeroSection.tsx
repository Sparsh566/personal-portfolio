"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import { externalLinks } from "@/data/links";
import { HeroFallback } from "./HeroFallback";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// Dynamically import Three.js canvas with ssr: false
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center f1-grid-bg border-b border-[#232730] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Technical Identification and Bio */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#14161b] border border-[#232730]">
              <span className="w-2 h-2 rounded-full bg-[#e10600]" />
              <span className="font-mono text-xs tracking-wider text-[#8f94a0] uppercase">
                PORTFOLIO // 2026
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <p className="font-mono text-xs sm:text-sm tracking-widest text-[#e10600] uppercase font-bold mb-2">
                COMPUTER SCIENCE ENGINEERING (AI & ML)
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f3f4f6] uppercase leading-none">
                SPARSH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                  GOSWAMI
                </span>
              </h1>
              <p className="font-mono text-xs sm:text-sm tracking-widest text-[#8f94a0] uppercase mt-3">
                AI / SOFTWARE / SYSTEMS
              </p>
            </div>

            {/* Student Engineer Bio */}
            <p className="text-base sm:text-lg text-[#8f94a0] max-w-xl leading-relaxed">
              Computer Science student building intelligent software, AI-powered systems,
              and experimental technology. Working across full stack web development,
              applied machine learning, hardware telemetry, and distributed architectures.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#race-engineering"
                className="px-6 py-3 bg-[#e10600] hover:bg-[#b80500] text-white font-mono text-xs tracking-wider uppercase font-bold transition-colors inline-flex items-center space-x-2 border border-[#e10600]"
              >
                <span>VIEW PROJECTS</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>

              <a
                href={externalLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#e10600]/80 bg-[#e10600]/10 hover:bg-[#e10600] text-[#f3f4f6] hover:text-white font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 inline-flex items-center space-x-2 group"
              >
                <svg
                  className="w-4 h-4 text-[#e10600] group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>VIEW RESUME</span>
              </a>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#373e4d] hover:border-[#8f94a0] text-[#f3f4f6] hover:text-white font-mono text-xs tracking-wider uppercase transition-colors inline-flex items-center space-x-2 bg-[#121418]"
              >
                <span>VIEW GITHUB</span>
                <svg
                  className="w-4 h-4 text-[#8f94a0]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Telemetry Simulation or SVG Fallback */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#232730] bg-[#0b0c0e]/80 p-2 telemetry-bracket">
              {/* Header Strip */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#232730] font-mono text-[10px] tracking-wider text-[#8f94a0]">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-[#e10600]" />
                  <span>3D VEHICLE DYNAMICS</span>
                </div>
                <span className="text-[#10b981]">F1 AERODYNAMICS</span>
              </div>

              {/* Canvas Container */}
              <div className="relative h-[360px] sm:h-[420px] w-full flex items-center justify-center">
                {isMobile || prefersReducedMotion ? (
                  <HeroFallback />
                ) : (
                  <HeroCanvas isVisible={isVisible} />
                )}
              </div>

              {/* Footer Readout */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-[#232730] font-mono text-[10px] text-[#8f94a0]">
                <span>DRAG COEFFICIENT & DOWNFORCE</span>
                <span className="text-[#10b981]">SYSTEM ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
