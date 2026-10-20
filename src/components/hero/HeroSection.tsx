"use client";

import { useRef } from "react";
import { siteConfig } from "@/data/site";
import { externalLinks } from "@/data/links";

interface HeroSectionProps {
  onOpenResume?: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-14 flex flex-col justify-between border-b border-[#1a1c2e] overflow-hidden bg-[#000000]"
    >
      {/* Background Ambient Depth & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Bioluminescent Indigo Aura concentrated behind the right flank plant */}
        <div className="absolute top-1/4 right-[2%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4338ca]/30 via-[#312e81]/15 to-transparent blur-[120px]" />
        {/* Subtle Crimson Ambient Core */}
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff2238]/15 via-transparent to-transparent blur-[110px]" />
      </div>

      {/* Main Editorial Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Clean Editorial Status Bar */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#ff2238]/90 uppercase border-b border-[#ff2238]/20 pb-3 select-none">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2238] animate-pulse inline-block" />
            <span className="font-bold">CLASS OF 2026</span>
            <span className="text-[#818cf8] hidden sm:inline">• SYMBIOSIS INSTITUTE OF TECHNOLOGY</span>
          </div>
          <span className="text-[#9496a8] tracking-widest font-mono text-[10px]">
            21.1458° N, 79.0882° E
          </span>
        </div>

        {/* Hero Body Composition */}
        <div className="relative my-auto py-6 sm:py-10">
          
          {/* Giant Display Title */}
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[7.8rem] xl:text-[9.5rem] font-black tracking-tighter text-[#ff2238] uppercase leading-[0.84] select-none drop-shadow-[0_4px_35px_rgba(255,34,56,0.35)]">
              SPARSH<br className="sm:hidden" /> GOSWAMI
            </h1>
            
            {/* Direct Engineering Domain Subtitle */}
            <div className="pt-3 flex items-center space-x-2 font-mono text-xs sm:text-sm tracking-widest text-[#818cf8] uppercase font-bold">
              <span className="w-2 h-2 bg-[#ff2238] inline-block" />
              <span>AI // SOFTWARE // SYSTEMS ENGINEERING</span>
            </div>
          </div>

          {/* Lower Left Content & Actions */}
          <div className="relative z-30 pt-6 sm:pt-8 max-w-xl space-y-4">
            {/* Student Engineer Bio */}
            <p className="text-sm sm:text-base text-[#cbd5e1] max-w-lg leading-relaxed font-sans font-normal">
              3rd Year Computer Science student building intelligent software, AI-powered systems,
              and experimental technology. Working across full stack web development,
              applied machine learning, hardware telemetry, and distributed architectures.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs tracking-wider">
              <a
                href="#race-engineering"
                className="px-6 py-3 bg-[#ff2238] hover:bg-[#ff3d52] text-white font-mono text-xs tracking-wider uppercase font-extrabold transition-all inline-flex items-center space-x-2 border border-[#ff2238] shadow-[0_0_24px_rgba(255,34,56,0.4)] hover:-translate-y-0.5"
              >
                <span>ENTER ARCHITECTURE</span>
                <span>&rarr;</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onOpenResume) {
                    onOpenResume();
                  } else {
                    window.open(externalLinks.resume, "_blank");
                  }
                }}
                className="px-6 py-3 border border-[#4338ca] hover:border-[#6366f1] text-[#f8fafc] hover:text-white font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 inline-flex items-center space-x-2 group cursor-pointer bg-[#0a0b18]/80 hover:bg-[#4338ca] shadow-md shadow-[#4338ca]/20 hover:-translate-y-0.5"
              >
                <svg
                  className="w-4 h-4 text-[#818cf8] group-hover:text-white transition-colors"
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
              </button>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 border border-[#1a1c2e] hover:border-[#6366f1] text-[#9496a8] hover:text-white font-mono text-xs tracking-wider uppercase transition-all inline-flex items-center space-x-2 bg-[#080910] hover:bg-[#0d0f1a] hover:-translate-y-0.5"
              >
                <span>GITHUB</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          {/* Plant Shifted to Right Flank (Clean, Uncluttered, Non-overlapping) */}
          <div className="absolute -bottom-6 -right-6 sm:right-0 lg:right-4 xl:right-10 w-[280px] sm:w-[420px] lg:w-[540px] xl:w-[620px] pointer-events-none select-none z-10 mix-blend-screen opacity-90 [mask-image:radial-gradient(circle_at_center,black_65%,transparent_96%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_65%,transparent_96%)]">
            <img
              src="/nocturne-plant.jpg"
              alt="Nocturne Bioluminescent Plant"
              className="w-full h-auto object-contain filter contrast-125 brightness-110 animate-float-subtle drop-shadow-[0_0_60px_rgba(99,102,241,0.5)]"
              loading="eager"
            />
          </div>

        </div>

        {/* Footer Technical Credentials Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1a1c2e] relative z-30">
          <div className="p-3.5 bg-[#050508]/80 border border-[#1a1c2e] telemetry-bracket">
            <span className="font-mono text-[10px] text-[#ff2238] uppercase tracking-wider block font-bold">INTELLECTUAL PROPERTY</span>
            <div className="text-xl font-bold font-mono text-white mt-1">02 PATENTS PUBLISHED</div>
            <p className="text-xs text-[#9496a8] mt-1 font-sans">Hardware safety interlock & spatial vision analytics.</p>
          </div>

          <div className="p-3.5 bg-[#050508]/80 border border-[#1a1c2e] telemetry-bracket">
            <span className="font-mono text-[10px] text-[#818cf8] uppercase tracking-wider block font-bold">NATIONAL RECOGNITION</span>
            <div className="text-xl font-bold font-mono text-white mt-1">TOP 30 FINALIST</div>
            <p className="text-xs text-[#9496a8] mt-1 font-sans">Union Bank of India IDEA 2.0 National Hackathon.</p>
          </div>

          <div className="p-3.5 bg-[#050508]/80 border border-[#1a1c2e] telemetry-bracket">
            <span className="font-mono text-[10px] text-[#818cf8] uppercase tracking-wider block font-bold">ACADEMIC STANDING</span>
            <div className="text-xl font-bold font-mono text-white mt-1">3RD YEAR B.TECH</div>
            <p className="text-xs text-[#9496a8] mt-1 font-sans">CSE (AI & ML) — Symbiosis Institute of Technology.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
