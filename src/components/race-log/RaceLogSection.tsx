"use client";

import { useState } from "react";
import { internshipsData, leadershipData, achievementsData } from "@/data/experience";

export function RaceLogSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const filterOptions = [
    { id: "ALL", label: "ALL RECORDS" },
    { id: "INTERNSHIP", label: "INTERNSHIPS" },
    { id: "LEADERSHIP", label: "LEADERSHIP & VOLUNTEER" },
    { id: "ACHIEVEMENT", label: "ACHIEVEMENTS" },
  ];

  const getFilteredItems = () => {
    switch (selectedFilter) {
      case "INTERNSHIP":
        return internshipsData;
      case "LEADERSHIP":
        return leadershipData;
      case "ACHIEVEMENT":
        return achievementsData;
      default:
        return [
          ...achievementsData,
          ...internshipsData,
          ...leadershipData,
        ];
    }
  };

  const currentItems = getFilteredItems();

  return (
    <section
      id="race-log"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                EXPERIENCE & ACHIEVEMENTS
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                CAREER & FIELD OPERATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Work Experience, Leadership & Achievements
            </h2>
          </div>

          <div className="font-mono text-xs text-[#10b981]">
            STATUS: VERIFIED TRACK RECORD
          </div>
        </div>

        {/* Filter Category Switches (Matching Reference Card Interface) */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          {filterOptions.map((opt) => {
            const isSelected = selectedFilter === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3 py-1.5 border transition-colors ${
                  isSelected
                    ? "border-[#e10600] bg-[#e10600] text-white font-bold"
                    : "border-[#232730] text-[#8f94a0] hover:text-[#f3f4f6] hover:border-[#373e4d] bg-[#0b0c0e]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Structured Card Grid (Using Subsystem Red Bracket Card Design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#0b0c0e] border border-[#232730] hover:border-[#373e4d] transition-all duration-200 p-6 telemetry-bracket flex flex-col justify-between"
            >
              <div>
                {/* Top Readout Bar */}
                <div className="flex items-center justify-between border-b border-[#232730] pb-3 mb-4 font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-[#8f94a0] uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-[#8f94a0] font-sans">
                      {item.period}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block" />
                  </div>
                </div>

                {/* Role Title and Organization */}
                <h3 className="text-xl font-bold text-[#f3f4f6] leading-snug">
                  {item.role}
                </h3>
                <div className="font-mono text-xs text-[#e10600] font-semibold mt-1">
                  {item.organization}
                  {item.location && (
                    <span className="text-[#8f94a0] font-normal ml-2">
                      ({item.location})
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="text-sm text-[#8f94a0] mt-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Bullets */}
                <ul className="mt-4 space-y-2 border-t border-[#232730] pt-3">
                  {item.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[#8f94a0] flex items-start space-x-2 leading-relaxed"
                    >
                      <span className="text-[#e10600] font-mono mt-0.5">/</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tag Chips matching the screenshot design */}
              <div className="mt-6 pt-4 border-t border-[#232730] flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#14161b] border border-[#232730] text-[11px] font-mono text-[#f3f4f6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
