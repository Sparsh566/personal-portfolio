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
      className="relative min-h-[94vh] pt-24 pb-8 flex flex-col justify-between border-b border-[#1a1c2e] overflow-hidden bg-[#000000]"
    >
      {/* Background Ambient Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Bioluminescent Indigo Aura behind the plant */}
        <div className="absolute top-1/4 right-[10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4338ca]/30 via-[#312e81]/15 to-transparent blur-[120px]" />
        {/* Subtle Crimson Core Glow */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff2238]/15 via-transparent to-transparent blur-[100px]" />
      </div>

      {/* Main Editorial Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Top Editorial Issue Bar */}
        <div className="flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#ff2238] uppercase border-b border-[#ff2238]/25 pb-2.5 pt-1 select-none">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#ff2238] animate-pulse inline-block" />
            <span className="font-bold">ISSUE 08 — OCTOBER 2026</span>
          </div>
          <span className="font-bold tracking-[0.25em]">
            THE NIGHT EDITION
          </span>
        </div>

        {/* Hero Body Composition */}
        <div className="relative my-auto py-3 sm:py-6">
          
          {/* Giant Nocturne-Style Title */}
          <div className="relative z-10">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.8rem] font-black tracking-tighter text-[#ff2238] uppercase leading-[0.85] select-none drop-shadow-[0_4px_35px_rgba(255,34,56,0.35)]">
              SPARSH<br className="sm:hidden" /> GOSWAMI
            </h1>
          </div>

          {/* Lower Left Content & Subhead */}
          <div className="relative z-30 pt-4 sm:pt-8 max-w-xl space-y-3.5">
            {/* Display Subheading */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#ff2238] leading-[0.92] select-none">
              AFTER DARK /<br />
              CODE IN MOTION
            </h2>

            {/* Description in Nocturne Coral Tone */}
            <p className="text-xs sm:text-sm text-[#ff6b7e] max-w-md leading-relaxed font-sans">
              3rd Year Computer Science student building intelligent software, AI-powered systems,
              and experimental technology. Working across full stack web development,
              applied machine learning, hardware telemetry, and distributed architectures.
            </p>

            {/* Action Links */}
            <div className="pt-2 flex flex-wrap items-center gap-6 font-mono text-xs tracking-wider">
              <a
                href="#race-engineering"
                className="text-[#ff2238] hover:text-white uppercase font-bold inline-flex items-center space-x-2 border-b border-[#ff2238] pb-1 transition-all group shadow-[0_4px_12px_rgba(255,34,56,0.2)]"
              >
                <span>ENTER THE ARCHITECTURE</span>
                <span className="transition-transform group-hover:translate-x-1.5">&rarr;</span>
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
                className="text-[#818cf8] hover:text-white uppercase font-semibold inline-flex items-center space-x-1 border-b border-[#818cf8]/50 pb-1 transition-all hover:border-white cursor-pointer"
              >
                <span>VIEW RESUME</span>
              </button>

              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9496a8] hover:text-white uppercase font-medium inline-flex items-center space-x-1 border-b border-[#9496a8]/30 pb-1 transition-all"
              >
                <span>GITHUB &rarr;</span>
              </a>
            </div>
          </div>

          {/* Exact Nocturne Vertical Plant Intertwined */}
          <div className="absolute -bottom-4 right-[2%] sm:right-[8%] lg:right-[12%] w-[320px] sm:w-[460px] lg:w-[580px] xl:w-[660px] pointer-events-none select-none z-20 mix-blend-screen opacity-95 [mask-image:linear-gradient(to_top,black_85%,transparent_100%)]">
            <img
              src="/nocturne-plant.jpg"
              alt="Nocturne Bioluminescent Plant"
              className="w-full h-auto object-contain filter contrast-125 brightness-110 animate-float-subtle drop-shadow-[0_0_60px_rgba(99,102,241,0.55)]"
              loading="eager"
            />
          </div>

        </div>

        {/* Footer Strip / Technical Credentials Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1a1c2e] relative z-30">
          <div className="flex items-center space-x-3">
            <span className="text-[#ff2238] font-mono text-xs font-bold">01/</span>
            <div>
              <span className="font-mono text-[10px] text-[#ff2238] uppercase tracking-wider block font-semibold">PATENTS</span>
              <span className="text-xs text-[#f8fafc] font-sans font-medium">02 Published Patents (Hardware Interlock & Vision)</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[#818cf8] font-mono text-xs font-bold">02/</span>
            <div>
              <span className="font-mono text-[10px] text-[#818cf8] uppercase tracking-wider block font-semibold">RECOGNITION</span>
              <span className="text-xs text-[#f8fafc] font-sans font-medium">Top 30 National Finalist — UBI IDEA 2.0</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[#818cf8] font-mono text-xs font-bold">03/</span>
            <div>
              <span className="font-mono text-[10px] text-[#818cf8] uppercase tracking-wider block font-semibold">EDUCATION</span>
              <span className="text-xs text-[#f8fafc] font-sans font-medium">3rd Year B.Tech CSE (AI & ML) — SIT Nagpur</span>
            </div>
          </div>
        </div>

      </div>

      {/* Far Right Vertical Margin Editorial Stamp */}
      <div className="hidden lg:flex absolute right-6 bottom-32 flex-col items-center select-none pointer-events-none z-30">
        <div className="w-[1px] h-20 bg-[#ff2238]/30 mb-5" />
        <span className="font-mono text-[10px] tracking-[0.35em] text-[#ff2238]/80 uppercase rotate-90 origin-center whitespace-nowrap">
          INDEPENDENT SYSTEMS JOURNAL
        </span>
      </div>
    </section>
  );
}
