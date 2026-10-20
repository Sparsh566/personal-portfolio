"use client";

import { useState } from "react";
import { featuredProjects } from "@/data/projects";
import { NivaasVisual } from "./VisualPanels/NivaasVisual";
import { TaskFlowVisual } from "./VisualPanels/TaskFlowVisual";
import { CustomerPulseVisual } from "./VisualPanels/CustomerPulseVisual";

export function RaceEngineeringSection() {
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const activeProject = featuredProjects[activeSectorIndex];

  const renderVisual = (id: string) => {
    switch (id) {
      case "nivaas":
        return <NivaasVisual />;
      case "taskflow":
        return <TaskFlowVisual />;
      case "customerpulse":
        return <CustomerPulseVisual />;
      default:
        return null;
    }
  };

  return (
    <section
      id="race-engineering"
      className="py-24 bg-[#000000] border-b border-[#1a1c2e] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#ff003f] shadow-[0_0_8px_rgba(255,0,63,0.5)]" />
              <span className="font-mono text-xs tracking-widest text-[#ff003f] uppercase font-bold">
                TOP 3 PROJECTS
              </span>
              <span className="font-mono text-xs text-[#9496a8] uppercase">
                FEATURED PRODUCTION SYSTEMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Featured Projects
            </h2>
          </div>

          {/* Desktop Project Selector Switches */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#050508] border border-[#1a1c2e] p-1 font-mono text-xs">
            {featuredProjects.map((p, index) => {
              const isActive = activeSectorIndex === index;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveSectorIndex(index)}
                  className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center space-x-2 ${
                    isActive
                      ? "bg-[#6366f1] text-white font-bold shadow-md shadow-[#6366f1]/25"
                      : "text-[#9496a8] hover:text-[#f8fafc] hover:bg-[#0f101a]"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>
                    TOP {index + 1} : {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Presentation View */}
        <div className="hidden lg:block border border-[#1a1c2e] bg-[#050508] p-8 telemetry-bracket">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left: Project Specifications */}
            <div className="col-span-6 space-y-6">
              {/* Category Strip */}
              <div className="flex items-center justify-between border-b border-[#1a1c2e] pb-3 font-mono text-xs">
                <span className="text-[#818cf8] font-bold tracking-wider">
                  TOP 0{activeSectorIndex + 1} {"//"} {activeProject.category}
                </span>
                <span className="text-[#9496a8]">PROJECT 0{activeSectorIndex + 1} OF 03</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-3xl font-extrabold text-[#f8fafc] tracking-tight">
                  {activeProject.title}
                </h3>
                <p className="text-sm font-mono text-[#9496a8] mt-1">
                  {activeProject.tagline}
                </p>
              </div>

              {/* Summary Description */}
              <p className="text-sm text-[#9496a8] leading-relaxed">
                {activeProject.summary}
              </p>

              {/* Key Engineering Features */}
              <div>
                <span className="font-mono text-xs tracking-wider text-[#818cf8] uppercase block mb-2 font-bold">
                  ENGINEERING SPECIFICATIONS
                </span>
                <ul className="space-y-1.5">
                  {activeProject.features.map((feat) => (
                    <li
                      key={feat}
                      className="text-xs text-[#f8fafc] flex items-start space-x-2"
                    >
                      <span className="text-[#6366f1] font-mono mt-0.5">/</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack Chips */}
              <div>
                <span className="font-mono text-xs tracking-wider text-[#9496a8] uppercase block mb-2">
                  TELEMETRY STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#0f101a] border border-[#1a1c2e] text-[11px] font-mono text-[#9496a8] hover:border-[#6366f1]/50 hover:text-[#818cf8] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Links only shown if URL exists */}
              <div className="flex items-center space-x-4 pt-4 border-t border-[#1a1c2e]">
                {activeProject.links.demo && (
                  <a
                    href={activeProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#6366f1] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#4f46e5] transition-all shadow-md shadow-[#6366f1]/25 border border-[#6366f1]"
                  >
                    LIVE DEMO
                  </a>
                )}
                {activeProject.links.github && (
                  <a
                    href={activeProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-[#1a1c2e] text-[#f8fafc] font-mono text-xs uppercase tracking-wider hover:border-[#6366f1] hover:text-[#818cf8] transition-colors bg-[#0a0b12]"
                  >
                    VIEW CODE
                  </a>
                )}
              </div>
            </div>

            {/* Right: Telemetry Visual & Live Metrics */}
            <div className="col-span-6 space-y-4">
              {/* Telemetry Metrics Header */}
              <div className="grid grid-cols-3 gap-2">
                {activeProject.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-3 bg-[#0f101a] border border-[#1a1c2e] font-mono hover:border-[#6366f1]/40 transition-colors"
                  >
                    <span className="text-[10px] text-[#9496a8] uppercase block">
                      {m.label}
                    </span>
                    <span className="text-xs font-bold text-[#f8fafc] mt-0.5 block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Main Interactive Visual Mockup */}
              {renderVisual(activeProject.id)}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Presentation View (Vertical Stack) */}
        <div className="lg:hidden space-y-12">
          {featuredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="border border-[#1a1c2e] bg-[#050508] p-6 telemetry-bracket space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#1a1c2e] pb-3 font-mono text-xs">
                <span className="text-[#ff003f] font-bold">
                  TOP 0{idx + 1} {"//"} {project.category}
                </span>
                <span className="text-[#9496a8]">PROJECT 0{idx + 1} OF 03</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#f8fafc]">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#9496a8] mt-1">
                  {project.tagline}
                </p>
              </div>

              <p className="text-sm text-[#9496a8] leading-relaxed">
                {project.summary}
              </p>

              {/* Visual Mockup for Mobile */}
              <div className="border border-[#1a1c2e]">
                {renderVisual(project.id)}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-2 bg-[#0f101a] border border-[#1a1c2e] font-mono"
                  >
                    <span className="text-[9px] text-[#9496a8] block">{m.label}</span>
                    <span className="text-[11px] font-bold text-[#f8fafc] block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#0f101a] border border-[#1a1c2e] text-[10px] font-mono text-[#9496a8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-[#1a1c2e]">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-mono text-xs uppercase tracking-wider font-bold shadow-md shadow-[#6366f1]/25 border border-[#6366f1]"
                  >
                    LIVE DEMO
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#1a1c2e] text-[#f8fafc] font-mono text-xs uppercase tracking-wider bg-[#0a0b12] hover:border-[#6366f1] hover:text-[#818cf8] transition-colors"
                  >
                    VIEW CODE
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
