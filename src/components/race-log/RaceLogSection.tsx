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
      className="py-24 bg-[#000000] border-b border-[#1a1c2e] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#ff003f] shadow-[0_0_8px_rgba(255,0,63,0.5)]" />
              <span className="font-mono text-xs tracking-widest text-[#ff003f] uppercase font-bold">
                EXPERIENCE & ACHIEVEMENTS
              </span>
              <span className="font-mono text-xs text-[#9496a8] uppercase">
                CAREER & FIELD OPERATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
              Work Experience, Leadership & Achievements
            </h2>
          </div>

          <div className="font-mono text-xs text-[#10b981]">
            STATUS: VERIFIED TRACK RECORD
          </div>
        </div>

        {/* Filter Category Switches */}
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
                    ? "border-[#ff003f] bg-[#ff003f] text-white font-bold shadow-md shadow-[#ff003f]/25"
                    : "border-[#1a1c2e] text-[#9496a8] hover:text-[#f8fafc] hover:border-[#6366f1]/60 bg-[#050508]"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Structured Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#050508] border border-[#1a1c2e] hover:border-[#6366f1]/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)] transition-all duration-200 p-6 telemetry-bracket flex flex-col justify-between"
            >
              <div>
                {/* Top Readout Bar */}
                <div className="flex items-center justify-between border-b border-[#1a1c2e] pb-3 mb-4 font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-[#9496a8] uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-[#9496a8] font-sans">
                      {item.period}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block" />
                  </div>
                </div>

                {/* Role Title and Organization */}
                <h3 className="text-xl font-bold text-[#f8fafc] leading-snug">
                  {item.role}
                </h3>
                <div className="font-mono text-xs text-[#818cf8] font-semibold mt-1">
                  {item.organization}
                  {item.location && (
                    <span className="text-[#9496a8] font-normal ml-2">
                      ({item.location})
                    </span>
                  )}
                </div>

                {/* Summary */}
                <p className="text-sm text-[#9496a8] mt-3 leading-relaxed">
                  {item.summary}
                </p>

                {/* Bullets */}
                <ul className="mt-4 space-y-2 border-t border-[#1a1c2e] pt-3">
                  {item.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[#9496a8] flex items-start space-x-2 leading-relaxed"
                    >
                      <span className="text-[#ff003f] font-mono mt-0.5">/</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tag Chips matching the screenshot design */}
              <div className="mt-6 pt-4 border-t border-[#1a1c2e] flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#0f101a] border border-[#1a1c2e] text-[11px] font-mono text-[#f8fafc] hover:border-[#6366f1]/50"
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
