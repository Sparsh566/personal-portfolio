"use client";

import { useState } from "react";
import { skillCategories } from "@/data/skills";

export function TelemetrySection() {
  const [selectedCluster, setSelectedCluster] = useState<string>("ALL");

  const filteredClusters =
    selectedCluster === "ALL"
      ? skillCategories
      : skillCategories.filter((cat) => cat.cluster === selectedCluster);

  return (
    <section
      id="telemetry"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                TELEMETRY // SIGNALS
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                [ SKILLS & CAPABILITIES ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Technical Subsystems & Tooling
            </h2>
          </div>

          <div className="font-mono text-xs text-[#8f94a0]">
            STATUS: ACTIVE SUBSYSTEMS
          </div>
        </div>

        {/* Cluster Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          <button
            type="button"
            onClick={() => setSelectedCluster("ALL")}
            className={`px-3 py-1.5 border transition-colors ${
              selectedCluster === "ALL"
                ? "border-[#e10600] bg-[#e10600] text-white font-bold"
                : "border-[#232730] text-[#8f94a0] hover:text-[#f3f4f6] hover:border-[#373e4d] bg-[#0b0c0e]"
            }`}
          >
            ALL SUBSYSTEMS
          </button>
          {skillCategories.map((cat) => {
            const isSelected = selectedCluster === cat.cluster;
            return (
              <button
                key={cat.cluster}
                type="button"
                onClick={() => setSelectedCluster(cat.cluster)}
                className={`px-3 py-1.5 border transition-colors ${
                  isSelected
                    ? "border-[#e10600] bg-[#e10600] text-white font-bold"
                    : "border-[#232730] text-[#8f94a0] hover:text-[#f3f4f6] hover:border-[#373e4d] bg-[#0b0c0e]"
                }`}
              >
                {cat.cluster}
              </button>
            );
          })}
        </div>

        {/* Telemetry Clusters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClusters.map((category) => (
            <div
              key={category.cluster}
              className="bg-[#0b0c0e] border border-[#232730] p-5 telemetry-bracket flex flex-col justify-between"
            >
              <div>
                {/* Cluster Subsystem Tag */}
                <div className="flex items-center justify-between border-b border-[#232730] pb-2.5 mb-4 font-mono text-[11px]">
                  <span className="text-[#8f94a0] uppercase">
                    {category.subsystem}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                </div>

                {/* Cluster Name */}
                <h3 className="font-mono text-sm font-bold text-[#f3f4f6] tracking-wide mb-4">
                  {category.cluster}
                </h3>

                {/* Signal Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 bg-[#14161b] border border-[#232730] text-xs font-mono text-[#f3f4f6] hover:border-[#e10600] hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cluster Signal Readiness */}
              <div className="pt-4 mt-6 border-t border-[#232730] flex items-center justify-between font-mono text-[10px] text-[#8f94a0]">
                <span>SIGNAL: 100% OK</span>
                <span className="text-[#10b981]">ONLINE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
