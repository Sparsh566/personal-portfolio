"use client";

import { useEffect } from "react";
import { GarageProject } from "@/types";
import { F1TelemetryViewer } from "./F1TelemetryViewer";

interface ProjectModalProps {
  project: GarageProject | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#050508] border border-[#1a1c2e] p-6 max-h-[90vh] overflow-y-auto telemetry-bracket shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#1a1c2e] pb-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs">
              <span className="text-[#ff003f] font-bold uppercase">
                {project.category}
              </span>
              {project.patentId && (
                <span className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-[10px]">
                  PATENT NO: {project.patentId}
                </span>
              )}
            </div>
            <h3
              id="modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] mt-1"
            >
              {project.title}
            </h3>
            <p className="text-xs font-mono text-[#9496a8] mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#9496a8] hover:text-[#f8fafc] border border-[#1a1c2e] hover:border-[#6366f1] transition-colors"
            aria-label="Close project modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="py-6 space-y-6">
          {/* Summary Narrative */}
          <div>
            <span className="font-mono text-xs tracking-wider text-[#9496a8] uppercase block mb-2 font-bold">
              SYSTEM OVERVIEW
            </span>
            <p className="text-sm text-[#f8fafc] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Interactive F1 Telemetry Component */}
          {project.specialType === "f1-telemetry" && (
            <div>
              <span className="font-mono text-xs tracking-wider text-[#ff003f] uppercase block mb-2 font-bold">
                LIVE TELEMETRY TRACES
              </span>
              <F1TelemetryViewer />
            </div>
          )}

          {/* Engineering Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <span className="font-mono text-xs tracking-wider text-[#818cf8] uppercase block mb-2 font-bold">
                KEY ARCHITECTURAL HIGHLIGHTS
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="p-2.5 bg-[#0f101a] border border-[#1a1c2e] text-xs text-[#9496a8] flex items-start space-x-2"
                  >
                    <span className="text-[#ff003f] font-mono mt-0.5">/</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <span className="font-mono text-xs tracking-wider text-[#9496a8] uppercase block mb-2 font-bold">
              ENGINEERING STACK
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-[#0f101a] border border-[#1a1c2e] text-[11px] font-mono text-[#9496a8] hover:border-[#6366f1]/50 hover:text-[#818cf8] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Links */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1a1c2e]">
          <span className="font-mono text-[11px] text-[#9496a8]">
            STATUS: PRODUCTION ARCHIVE
          </span>

          <div className="flex items-center space-x-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#ff003f] hover:bg-[#ff2a5b] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-[#ff003f]/25 border border-[#ff003f]"
              >
                LIVE DEMO
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#2b2e4a] hover:border-[#6366f1] text-[#f8fafc] hover:text-[#818cf8] font-mono text-xs uppercase tracking-wider transition-colors bg-[#0a0b12]"
              >
                VIEW CODE
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
