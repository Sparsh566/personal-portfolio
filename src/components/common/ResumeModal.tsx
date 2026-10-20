"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { externalLinks } from "@/data/links";
import { trackEvent } from "@/components/telemetry/VisitorTracker";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"viewer" | "highlights">("viewer");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      trackEvent("resume_view");
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${externalLinks.resume}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#050508] border-2 border-[#1a1c2e] p-4 sm:p-6 md:p-8 telemetry-bracket shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1c2e] pb-4 mb-4 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-4 bg-[#ff003f]" />
              <span className="font-mono text-[11px] sm:text-xs text-[#ff003f] font-bold uppercase tracking-widest">
                CURRICULUM VITAE // OFFICIAL RESUME
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-[10px] text-[#10b981] uppercase hidden sm:inline">
                VERIFIED
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] mt-1 font-sans">
              Sparsh Goswami — Resume
            </h3>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Direct Download Button */}
            <a
              href={externalLinks.resume}
              download="Sparsh_Goswami_Resume.pdf"
              className="px-3.5 py-1.5 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold transition-colors inline-flex items-center space-x-1.5 border border-[#6366f1] shadow-md shadow-[#6366f1]/25"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>DOWNLOAD PDF</span>
            </a>

            {/* Open in New Tab Button */}
            <a
              href={externalLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-[#1a1c2e] hover:border-[#6366f1] text-[#f8fafc] hover:text-white transition-colors bg-[#0f101a] inline-flex items-center space-x-1.5"
            >
              <span>OPEN TAB</span>
              <svg className="w-3 h-3 text-[#9496a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 border border-[#1a1c2e] hover:border-[#9496a8] text-[#9496a8] hover:text-[#f8fafc] transition-colors bg-[#0a0b12]"
            >
              {copiedLink ? "LINK COPIED!" : "COPY LINK"}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border border-[#1a1c2e] hover:border-[#6366f1] text-[#9496a8] hover:text-white transition-colors bg-[#0a0b12]"
              aria-label="Close modal"
            >
              ESC &times;
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-[#1a1c2e] mb-3 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("viewer")}
            className={`px-4 py-2 font-bold transition-colors border-b-2 -mb-[1px] ${
              activeTab === "viewer"
                ? "border-[#6366f1] text-white bg-[#0a0b12]"
                : "border-transparent text-[#9496a8] hover:text-[#f8fafc]"
            }`}
          >
            DOCUMENT VIEWER (PDF)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("highlights")}
            className={`px-4 py-2 font-bold transition-colors border-b-2 -mb-[1px] ${
              activeTab === "highlights"
                ? "border-[#6366f1] text-white bg-[#0a0b12]"
                : "border-transparent text-[#9496a8] hover:text-[#f8fafc]"
            }`}
          >
            EXECUTIVE HIGHLIGHTS
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto min-h-0 bg-[#000000] border border-[#1a1c2e]">
          {activeTab === "viewer" ? (
            <div className="w-full h-full min-h-[500px] flex flex-col">
              <object
                data="/resume.pdf#view=FitH"
                type="application/pdf"
                className="w-full flex-1 min-h-[550px] bg-[#0a0b12]"
              >
                {/* Fallback if browser PDF plugin is blocked or absent */}
                <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[#ff003f] flex items-center justify-center text-[#ff003f]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-[#f8fafc]">
                    Direct PDF Document Access
                  </h4>
                  <p className="text-sm text-[#9496a8] max-w-md">
                    Your browser does not render inline PDF documents, but the file is fully ready for direct download or new-tab view.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center pt-2 font-mono text-xs">
                    <a
                      href={externalLinks.resume}
                      download="Sparsh_Goswami_Resume.pdf"
                      className="px-5 py-2.5 bg-[#ff003f] hover:bg-[#ff2a5b] text-white font-bold uppercase transition-colors shadow-md shadow-[#ff003f]/25"
                    >
                      DOWNLOAD RESUME (PDF)
                    </a>
                    <a
                      href={externalLinks.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-[#2b2e4a] hover:border-[#6366f1] text-[#f8fafc] font-bold uppercase transition-colors bg-[#0a0b12]"
                    >
                      OPEN IN FULLSCREEN TAB
                    </a>
                  </div>
                </div>
              </object>
            </div>
          ) : (
            <div className="p-6 sm:p-8 space-y-6 text-sm text-[#9496a8] font-sans leading-relaxed">
              {/* Executive Summary */}
              <div className="border-b border-[#1a1c2e] pb-5">
                <span className="font-mono text-xs text-[#ff003f] uppercase font-bold tracking-wider block mb-1">
                  CANDIDATE SUMMARY
                </span>
                <p className="text-base text-[#f8fafc]">
                  {siteConfig.degree} student at {siteConfig.educationInstitute} with demonstrated expertise in AI/ML engineering, high-performance software systems, IoT security architectures, and 2 published Indian patents.
                </p>
              </div>

              {/* Grid of Key Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {/* Academic Base */}
                <div className="p-4 bg-[#050508] border border-[#1a1c2e] space-y-2">
                  <span className="text-[#818cf8] font-bold uppercase block">
                    ACADEMIC QUALIFICATION
                  </span>
                  <div className="text-sm font-bold text-[#f8fafc]">
                    Symbiosis Institute of Technology
                  </div>
                  <div className="text-[#9496a8]">
                    B.Tech CSE (Artificial Intelligence & Machine Learning)
                  </div>
                  <div className="text-[11px] text-[#9496a8]">
                    Current Standing: 3rd Year (Class of 2026) // Nagpur, India
                  </div>
                </div>

                {/* Published Patents */}
                <div className="p-4 bg-[#050508] border border-[#1a1c2e] space-y-2">
                  <span className="text-[#818cf8] font-bold uppercase block">
                    OFFICIAL PATENTS
                  </span>
                  <div className="text-sm font-bold text-[#f8fafc]">
                    02 Published Indian Patents
                  </div>
                  <div className="text-[#9496a8]">
                    • Smart Gas Detecting Exploration Rover
                  </div>
                  <div className="text-[#9496a8]">
                    • ESP32-Based Hardware Firewall & Network Defense
                  </div>
                </div>
              </div>

              {/* Core Skillset Matrix */}
              <div className="space-y-3 font-mono text-xs">
                <span className="text-[#ff003f] font-bold uppercase tracking-wider block">
                  TECHNICAL SKILL MATRIX
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#0f101a] border border-[#1a1c2e]">
                    <span className="text-[#f8fafc] font-bold block mb-1">LANGUAGES</span>
                    <span className="text-[#9496a8] text-[11px] leading-relaxed">
                      Python, TypeScript, JavaScript, C++, SQL, Go
                    </span>
                  </div>
                  <div className="p-3 bg-[#0f101a] border border-[#1a1c2e]">
                    <span className="text-[#f8fafc] font-bold block mb-1">AI / ML & SYSTEMS</span>
                    <span className="text-[#9496a8] text-[11px] leading-relaxed">
                      PyTorch, TensorFlow, Scikit-learn, LangChain, OpenCV
                    </span>
                  </div>
                  <div className="p-3 bg-[#0f101a] border border-[#1a1c2e]">
                    <span className="text-[#f8fafc] font-bold block mb-1">WEB & CLOUD</span>
                    <span className="text-[#9496a8] text-[11px] leading-relaxed">
                      Next.js, React, Node.js, Fastify, Docker, PostgreSQL, Redis
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#1a1c2e] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <span className="text-[#9496a8]">
                  Full detailed career timeline and internship references available in PDF.
                </span>
                <a
                  href={externalLinks.resume}
                  download="Sparsh_Goswami_Resume.pdf"
                  className="px-4 py-2 bg-[#ff003f] hover:bg-[#ff2a5b] text-white font-bold transition-colors shadow-md shadow-[#ff003f]/25"
                >
                  DOWNLOAD COMPLETE PDF
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 font-mono text-[10px] sm:text-xs text-[#9496a8]">
          <span>
            SPARSH GOSWAMI // {siteConfig.email}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#ff003f] hover:underline uppercase font-bold"
          >
            CLOSE PREVIEW
          </button>
        </div>
      </div>
    </div>
  );
}
