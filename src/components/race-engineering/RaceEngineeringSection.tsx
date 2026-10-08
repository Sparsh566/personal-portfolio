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
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                FEATURED PROJECTS
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                ARCHITECTURE & SYSTEMS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Featured Production Systems
            </h2>
          </div>

          {/* Desktop Sector Selector Switches */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#0b0c0e] border border-[#232730] p-1 font-mono text-xs">
            {featuredProjects.map((p, index) => {
              const isActive = activeSectorIndex === index;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveSectorIndex(index)}
                  className={`px-4 py-2 uppercase tracking-wider transition-colors flex items-center space-x-2 ${
                    isActive
                      ? "bg-[#e10600] text-white font-bold"
                      : "text-[#8f94a0] hover:text-[#f3f4f6] hover:bg-[#14161b]"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>
                    {p.sector} : {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Presentation View (Horizontal Sector Switching) */}
        <div className="hidden lg:block border border-[#232730] bg-[#0b0c0e] p-8 telemetry-bracket">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left: Project Specifications */}
            <div className="col-span-6 space-y-6">
              {/* Category & Callsign Strip */}
              <div className="flex items-center justify-between border-b border-[#232730] pb-3 font-mono text-xs">
                <span className="text-[#e10600] font-bold tracking-wider">
                  {activeProject.callsign} // {activeProject.category}
                </span>
                <span className="text-[#8f94a0]">{activeProject.sector}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-3xl font-extrabold text-[#f3f4f6] tracking-tight">
                  {activeProject.title}
                </h3>
                <p className="text-sm font-mono text-[#8f94a0] mt-1">
                  {activeProject.tagline}
                </p>
              </div>

              {/* Summary Description */}
              <p className="text-sm text-[#8f94a0] leading-relaxed">
                {activeProject.summary}
              </p>

              {/* Key Engineering Features */}
              <div>
                <span className="font-mono text-xs tracking-wider text-[#8f94a0] uppercase block mb-2">
                  ENGINEERING SPECIFICATIONS
                </span>
                <ul className="space-y-1.5">
                  {activeProject.features.map((feat) => (
                    <li
                      key={feat}
                      className="text-xs text-[#f3f4f6] flex items-start space-x-2"
                    >
                      <span className="text-[#e10600] font-mono mt-0.5">/</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack Chips */}
              <div>
                <span className="font-mono text-xs tracking-wider text-[#8f94a0] uppercase block mb-2">
                  TELEMETRY STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#14161b] border border-[#232730] text-[11px] font-mono text-[#8f94a0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Links only shown if URL exists */}
              <div className="flex items-center space-x-4 pt-4 border-t border-[#232730]">
                {activeProject.links.demo && (
                  <a
                    href={activeProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#e10600] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#b80500] transition-colors"
                  >
                    LIVE DEMO
                  </a>
                )}
                {activeProject.links.github && (
                  <a
                    href={activeProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-[#373e4d] text-[#f3f4f6] font-mono text-xs uppercase tracking-wider hover:border-[#e10600] transition-colors bg-[#121418]"
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
                    className="p-3 bg-[#14161b] border border-[#232730] font-mono"
                  >
                    <span className="text-[10px] text-[#8f94a0] uppercase block">
                      {m.label}
                    </span>
                    <span className="text-xs font-bold text-[#f3f4f6] mt-0.5 block">
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
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="border border-[#232730] bg-[#0b0c0e] p-6 telemetry-bracket space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#232730] pb-3 font-mono text-xs">
                <span className="text-[#e10600] font-bold">
                  {project.callsign} // {project.category}
                </span>
                <span className="text-[#8f94a0]">{project.sector}</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#f3f4f6]">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#8f94a0] mt-1">
                  {project.tagline}
                </p>
              </div>

              <p className="text-sm text-[#8f94a0] leading-relaxed">
                {project.summary}
              </p>

              {/* Visual Mockup for Mobile */}
              <div className="border border-[#232730]">
                {renderVisual(project.id)}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-2 bg-[#14161b] border border-[#232730] font-mono"
                  >
                    <span className="text-[9px] text-[#8f94a0] block">{m.label}</span>
                    <span className="text-[11px] font-bold text-[#f3f4f6] block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-[#14161b] border border-[#232730] text-[10px] font-mono text-[#8f94a0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-[#232730]">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#e10600] text-white font-mono text-xs uppercase tracking-wider font-bold"
                  >
                    LIVE DEMO
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#373e4d] text-[#f3f4f6] font-mono text-xs uppercase tracking-wider bg-[#121418]"
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
