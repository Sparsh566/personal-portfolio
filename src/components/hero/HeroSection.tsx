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
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center border-b border-[#1a1c2e] overflow-hidden bg-[#000000]"
    >
      {/* Nocturne-Inspired Bioluminescent Electric Indigo Atmospheric Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {/* Primary Bioluminescent Indigo Vapor Nebula */}
        <div className="absolute top-1/4 -right-20 sm:right-10 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4338ca]/35 via-[#312e81]/20 to-transparent blur-[100px]" />
        
        {/* Secondary Cobalt Blue Mist Core */}
        <div className="absolute top-1/3 right-1/4 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#6366f1]/25 via-[#2e1065]/20 to-transparent blur-[80px]" />

        {/* Ambient Dark Undercurrent */}
        <div className="absolute -bottom-10 left-10 w-[450px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e1b4b]/40 via-transparent to-transparent blur-[90px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="space-y-8">
          {/* Top Editorial Bar (like Nocturne top micro-labels) */}
          <div className="flex items-center justify-between font-mono text-[11px] tracking-widest text-[#ff2238]/90 uppercase border-b border-[#ff2238]/20 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#ff2238] animate-pulse inline-block" />
              <span className="font-bold">ISSUE 03 // CLASS OF 2026</span>
              <span className="text-[#818cf8] hidden sm:inline">• SYMBIOSIS NAGPUR</span>
            </div>
            <span className="text-[#818cf8] tracking-widest font-semibold">
              THE NIGHT EDITION
            </span>
          </div>

          {/* Main Nocturne Bold Headline */}
          <div className="space-y-3 pt-2">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-[#ff2238] uppercase leading-[0.88] drop-shadow-[0_4px_30px_rgba(255,34,56,0.35)] select-none">
              SPARSH<br className="hidden sm:inline" /> GOSWAMI
            </h1>
            <div className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#ff2238] uppercase leading-tight font-sans">
              AFTER DARK / <span className="text-[#818cf8]">CODE IN MOTION</span>
            </div>
          </div>

          {/* Student Engineer Bio */}
          <p className="text-base sm:text-lg text-[#9496a8] max-w-2xl leading-relaxed font-sans font-normal pt-1">
            3rd Year Computer Science student building intelligent software, AI-powered systems,
            and experimental technology. Working across full stack web development,
            applied machine learning, hardware telemetry, and distributed architectures.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#race-engineering"
              className="px-7 py-3.5 bg-[#ff2238] hover:bg-[#ff3d52] text-white font-mono text-xs tracking-wider uppercase font-extrabold transition-all inline-flex items-center space-x-2 border border-[#ff2238] shadow-[0_0_24px_rgba(255,34,56,0.4)] hover:-translate-y-0.5"
            >
              <span>ENTER THE ARCHITECTURE &rarr;</span>
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
              className="px-7 py-3.5 border border-[#4338ca] hover:border-[#6366f1] text-[#f8fafc] hover:text-white font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 inline-flex items-center space-x-2 group cursor-pointer bg-[#0a0b18]/80 hover:bg-[#4338ca] shadow-md shadow-[#4338ca]/20 hover:-translate-y-0.5"
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
              className="px-7 py-3.5 border border-[#1a1c2e] hover:border-[#6366f1] text-[#f8fafc] hover:text-[#818cf8] font-mono text-xs tracking-wider uppercase transition-all inline-flex items-center space-x-2 bg-[#080910] hover:bg-[#0d0f1a] shadow-sm hover:-translate-y-0.5"
            >
              <span>VIEW GITHUB</span>
              <svg
                className="w-4 h-4 text-[#9496a8]"
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

          {/* 5. Clean Key Credentials & Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-[#1a1c2e]">
            {/* Card 1: Patents */}
            <div className="p-5 bg-[#050508] border border-[#1a1c2e] telemetry-bracket hover:border-[#ff003f] transition-colors shadow-sm">
              <span className="font-mono text-[10px] tracking-wider text-[#ff003f] font-bold uppercase block">
                INTELLECTUAL PROPERTY
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] font-mono mt-2">
                02
              </div>
              <div className="text-xs font-bold font-mono text-[#f8fafc] uppercase mt-1">
                PATENTS PUBLISHED
              </div>
              <p className="text-xs text-[#9496a8] mt-2 font-sans leading-relaxed">
                Officially registered hardware safety interlock and spatial vision analytics.
              </p>
            </div>

            {/* Card 2: Hackathon Finalist */}
            <div className="p-5 bg-[#050508] border border-[#1a1c2e] telemetry-bracket hover:border-[#6366f1] transition-colors shadow-sm">
              <span className="font-mono text-[10px] tracking-wider text-[#818cf8] font-bold uppercase block">
                NATIONAL RECOGNITION
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] font-mono mt-2">
                TOP 30
              </div>
              <div className="text-xs font-bold font-mono text-[#f8fafc] uppercase mt-1">
                NATIONAL FINALIST
              </div>
              <p className="text-xs text-[#9496a8] mt-2 font-sans leading-relaxed">
                Union Bank of India IDEA 2.0 National Hackathon finalist team.
              </p>
            </div>

            {/* Card 3: Academic Standing */}
            <div className="p-5 bg-[#050508] border border-[#1a1c2e] telemetry-bracket hover:border-[#6366f1] transition-colors shadow-sm">
              <span className="font-mono text-[10px] tracking-wider text-[#818cf8] font-bold uppercase block">
                ACADEMIC STANDING
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] font-mono mt-2">
                3RD YEAR
              </div>
              <div className="text-xs font-bold font-mono text-[#f8fafc] uppercase mt-1">
                B.TECH CSE (AI & ML)
              </div>
              <p className="text-xs text-[#9496a8] mt-2 font-sans leading-relaxed">
                Symbiosis Institute of Technology, Nagpur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
