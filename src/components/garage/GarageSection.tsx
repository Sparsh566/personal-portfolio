"use client";

import { useState } from "react";
import { garageProjects } from "@/data/projects";
import { GarageProject } from "@/types";
import { ProjectModal } from "./ProjectModal";

export function GarageSection() {
  const [selectedProject, setSelectedProject] = useState<GarageProject | null>(null);

  // Layout classes map to create an asymmetric, varied engineering grid
  const getCardLayoutClass = (index: number) => {
    switch (index % 6) {
      case 0:
        return "md:col-span-7 lg:col-span-8";
      case 1:
        return "md:col-span-5 lg:col-span-4";
      case 2:
        return "md:col-span-6 lg:col-span-6";
      case 3:
        return "md:col-span-6 lg:col-span-6";
      case 4:
        return "md:col-span-6 lg:col-span-4";
      case 5:
        return "md:col-span-6 lg:col-span-8";
      default:
        return "md:col-span-6 lg:col-span-6";
    }
  };

  return (
    <section
      id="garage"
      className="py-24 bg-[#000000] border-b border-[#1a1c2e] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#ff003f] shadow-[0_0_8px_rgba(255,0,63,0.5)]" />
              <span className="font-mono text-xs tracking-widest text-[#ff003f] uppercase font-bold">
                OTHER PROJECTS & PROTOTYPES
              </span>
              <span className="font-mono text-xs text-[#9496a8] uppercase">
                HARDWARE & SOFTWARE REPOSITORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Hardware Systems & Applied Software
            </h2>
          </div>

          <span className="font-mono text-xs text-[#9496a8]">
            SELECT CARD TO INSPECT ARCHITECTURE
          </span>
        </div>

        {/* Varied Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {garageProjects.map((project, index) => {
            const layoutClass = getCardLayoutClass(index);
            const isF1 = project.specialType === "f1-telemetry";
            const isPatent = project.specialType === "patent";

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`${layoutClass} group cursor-pointer bg-[#050508] border border-[#1a1c2e] hover:border-[#6366f1] transition-all p-6 flex flex-col justify-between telemetry-bracket hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]`}
              >
                <div>
                  {/* Category & Status Strip */}
                  <div className="flex items-center justify-between border-b border-[#1a1c2e] pb-3 mb-4 font-mono text-xs">
                    <span className="text-[#9496a8] group-hover:text-[#ff003f] transition-colors uppercase font-bold">
                      {project.category}
                    </span>

                    {isPatent ? (
                      <span className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-[10px]">
                        PATENT {project.patentId}
                      </span>
                    ) : isF1 ? (
                      <span className="px-2 py-0.5 bg-[#ff003f]/10 text-[#ff003f] border border-[#ff003f]/30 text-[10px] animate-pulse">
                        LIVE TELEMETRY
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#9496a8]">
                        PROD BUILD
                      </span>
                    )}
                  </div>

                  {/* Title and Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#9496a8] mt-1.5 line-clamp-2">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-[#9496a8] mt-3 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Card Footer: Tech Chips and Inspect Trigger */}
                <div className="pt-6 mt-4 border-t border-[#1a1c2e] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#0f101a] border border-[#1a1c2e] text-[10px] font-mono text-[#9496a8] group-hover:border-[#6366f1]/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#9496a8]">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs text-[#ff003f] group-hover:text-[#818cf8] group-hover:translate-x-1 transition-all inline-flex items-center space-x-1 font-bold">
                    <span>INSPECT</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
