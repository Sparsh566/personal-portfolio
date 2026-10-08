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
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                OTHER PROJECTS & PROTOTYPES
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                HARDWARE & SOFTWARE REPOSITORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Hardware Systems & Applied Software
            </h2>
          </div>

          <span className="font-mono text-xs text-[#8f94a0]">
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
                className={`${layoutClass} group cursor-pointer bg-[#0b0c0e] border border-[#232730] hover:border-[#e10600] transition-colors p-6 flex flex-col justify-between telemetry-bracket`}
              >
                <div>
                  {/* Category & Status Strip */}
                  <div className="flex items-center justify-between border-b border-[#232730] pb-3 mb-4 font-mono text-xs">
                    <span className="text-[#8f94a0] group-hover:text-[#e10600] transition-colors uppercase font-bold">
                      {project.category}
                    </span>

                    {isPatent ? (
                      <span className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-[10px]">
                        PATENT {project.patentId}
                      </span>
                    ) : isF1 ? (
                      <span className="px-2 py-0.5 bg-[#e10600]/10 text-[#e10600] border border-[#e10600]/30 text-[10px] animate-pulse">
                        LIVE TELEMETRY
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#8f94a0]">
                        PROD BUILD
                      </span>
                    )}
                  </div>

                  {/* Title and Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#f3f4f6] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8f94a0] mt-1.5 line-clamp-2">
                    {project.tagline}
                  </p>

                  <p className="text-sm text-[#8f94a0] mt-3 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Card Footer: Tech Chips and Inspect Trigger */}
                <div className="pt-6 mt-4 border-t border-[#232730] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#14161b] border border-[#232730] text-[10px] font-mono text-[#8f94a0]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#8f94a0]">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs text-[#e10600] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1 font-bold">
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
