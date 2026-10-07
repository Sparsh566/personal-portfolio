"use client";

import { experienceLog } from "@/data/experience";

export function RaceLogSection() {
  return (
    <section
      id="race-log"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                RACE LOG // STINTS
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                [ EXPERIENCE & LEADERSHIP ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Field Operations & Internships
            </h2>
          </div>

          <div className="font-mono text-xs text-[#8f94a0]">
            TRACK RECORD: VERIFIED
          </div>
        </div>

        {/* Chronological Telemetry Timeline */}
        <div className="space-y-6">
          {experienceLog.map((exp, index) => (
            <div
              key={exp.id}
              className="bg-[#0b0c0e] border border-[#232730] hover:border-[#373e4d] transition-colors p-6 telemetry-bracket"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Meta: Type, Period, Location */}
                <div className="lg:col-span-4 space-y-2 font-mono text-xs border-b lg:border-b-0 lg:border-r border-[#232730] pb-4 lg:pb-0 lg:pr-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#e10600] font-bold">
                      ENTRY {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="px-2 py-0.5 bg-[#14161b] border border-[#232730] text-[10px] text-[#8f94a0]">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#f3f4f6] font-sans pt-1">
                    {exp.role}
                  </h3>
                  <div className="text-xs text-[#8f94a0] font-mono">
                    {exp.organization}
                  </div>

                  <div className="pt-2 text-[11px] text-[#8f94a0] space-y-0.5">
                    <div>PERIOD: {exp.period}</div>
                    <div>LOCATION: {exp.location}</div>
                  </div>
                </div>

                {/* Right Content: Summary and Bullets */}
                <div className="lg:col-span-8 space-y-4">
                  <p className="text-sm text-[#f3f4f6]">
                    {exp.summary}
                  </p>

                  <ul className="space-y-2">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-xs text-[#8f94a0] flex items-start space-x-2"
                      >
                        <span className="text-[#e10600] font-mono mt-0.5">/</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#232730]">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[#14161b] border border-[#232730] text-[10px] font-mono text-[#8f94a0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
