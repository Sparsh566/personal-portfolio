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
      className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center f1-grid-bg border-b border-[#1a1c2e] overflow-hidden bg-[#000000]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="space-y-10">
          {/* 1. Status Pill */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 bg-[#0f101a] border border-[#1a1c2e]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-xs tracking-wider text-[#9496a8] uppercase">
              3RD YEAR B.TECH // COMPUTER SCIENCE (AI & ML) // SIT NAGPUR
            </span>
          </div>

          {/* 2. Main Title & Heading */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#f8fafc] uppercase leading-[0.95]">
              SPARSH{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-indigo-300">
                GOSWAMI
              </span>
            </h1>
            <p className="font-mono text-sm sm:text-base tracking-widest uppercase font-bold pt-1 bg-gradient-to-r from-[#ff003f] via-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
              AI / SOFTWARE / SYSTEMS ENGINEERING
            </p>
          </div>

          {/* 3. Student Engineer Bio */}
          <p className="text-lg sm:text-xl text-[#9496a8] max-w-3xl leading-relaxed font-sans">
            3rd Year Computer Science student building intelligent software, AI-powered systems,
            and experimental technology. Working across full stack web development,
            applied machine learning, hardware telemetry, and distributed architectures.
          </p>

          {/* 4. Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#race-engineering"
              className="px-7 py-3.5 bg-[#ff003f] hover:bg-[#ff2a5b] text-white font-mono text-xs tracking-wider uppercase font-bold transition-all inline-flex items-center space-x-2 border border-[#ff003f] shadow-lg shadow-[#ff003f]/25"
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

            <button
              type="button"
              onClick={() => {
                if (onOpenResume) {
                  onOpenResume();
                } else {
                  window.open(externalLinks.resume, "_blank");
                }
              }}
              className="px-7 py-3.5 border border-[#6366f1]/80 bg-[#6366f1]/10 hover:bg-[#6366f1] text-[#f8fafc] hover:text-white font-mono text-xs tracking-wider uppercase font-bold transition-all duration-200 inline-flex items-center space-x-2 group cursor-pointer shadow-lg shadow-[#6366f1]/15"
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
              className="px-7 py-3.5 border border-[#2b2e4a] hover:border-[#6366f1] text-[#f8fafc] hover:text-[#818cf8] font-mono text-xs tracking-wider uppercase transition-colors inline-flex items-center space-x-2 bg-[#0a0b12]"
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
            <div className="p-5 bg-[#050508] border border-[#1a1c2e] telemetry-bracket hover:border-[#ff003f]/50 transition-colors">
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
            <div className="p-5 bg-[#050508] border border-[#1a1c2e] telemetry-bracket hover:border-[#10b981]/50 transition-colors">
              <span className="font-mono text-[10px] tracking-wider text-[#10b981] font-bold uppercase block">
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
            <div className="p-5 bg-[#050508] border border-[#1a1c2e] telemetry-bracket hover:border-[#6366f1]/50 transition-colors">
              <span className="font-mono text-[10px] tracking-wider text-[#818cf8] font-bold uppercase block">
                ACADEMIC STANDING
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#6366f1] font-mono mt-2">
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
