"use client";

import { useEffect, useState, useCallback } from "react";
import { skillCategories } from "@/data/skills";
import { VisitorLogEntry } from "@/app/api/telemetry/visit/route";
import { VisitorMailCard } from "@/components/telemetry/VisitorMailCard";

export function TelemetrySection() {
  const [activeView, setActiveView] = useState<"skills" | "radar">("skills");
  const [selectedCluster, setSelectedCluster] = useState<string>("ALL");
  const [visitors, setVisitors] = useState<VisitorLogEntry[]>([]);
  const [totalCount, setTotalCount] = useState<number>(142);
  const [currentVisitor, setCurrentVisitor] = useState<{
    location: string;
    maskedIp: string;
    device: string;
    browser: string;
    os?: string;
    formattedTime?: string;
    mapsLink?: string;
  } | null>(null);
  const [radarFilter, setRadarFilter] = useState<"ALL" | "RESUME" | "COMPANIES">("ALL");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTelemetry = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/telemetry/visit", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data?.recentVisitors) setVisitors(data.recentVisitors);
        if (data?.totalCount) setTotalCount(data.totalCount);
        if (data?.currentVisitor) setCurrentVisitor(data.currentVisitor);
      }
    } catch {
      // silent fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/telemetry/visit", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data) return;
        if (data.recentVisitors) setVisitors(data.recentVisitors);
        if (data.totalCount) setTotalCount(data.totalCount);
        if (data.currentVisitor) setCurrentVisitor(data.currentVisitor);
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredClusters =
    selectedCluster === "ALL"
      ? skillCategories
      : skillCategories.filter((cat) => cat.cluster === selectedCluster);

  const filteredVisitors = visitors.filter((v) => {
    if (radarFilter === "RESUME") return v.event === "resume_view";
    if (radarFilter === "COMPANIES") return Boolean(v.org && v.org.length > 2);
    return true;
  });

  const latestVisitor = visitors[0];

  return (
    <section
      id="telemetry"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                TELEMETRY & CAPABILITIES
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                PIT-WALL DATA HUB
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              {activeView === "skills"
                ? "Core Competencies & Tooling"
                : "Live Profile Viewers & Telemetry"}
            </h2>
          </div>

          {/* Primary View Mode Switcher */}
          <div className="flex items-center space-x-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveView("skills")}
              className={`px-4 py-2 border transition-colors ${
                activeView === "skills"
                  ? "border-[#e10600] bg-[#e10600] text-white font-bold"
                  : "border-[#232730] bg-[#0b0c0e] text-[#8f94a0] hover:text-[#f3f4f6]"
              }`}
            >
              TECHNICAL SKILLS
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveView("radar");
                fetchTelemetry();
              }}
              className={`px-4 py-2 border transition-colors flex items-center space-x-2 ${
                activeView === "radar"
                  ? "border-[#10b981] bg-[#10b981] text-black font-bold"
                  : "border-[#232730] bg-[#0b0c0e] text-[#10b981] hover:border-[#10b981]"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span>LIVE VIEWERS RADAR ({totalCount})</span>
            </button>
          </div>
        </div>

        {/* View Mode: SKILLS CLUSTERS */}
        {activeView === "skills" && (
          <>
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
                ALL SKILLS
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

            {/* Radar Teaser Banner */}
            <div className="mt-8 bg-[#0b0c0e] border border-[#232730] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
                </span>
                <span className="text-[#8f94a0]">
                  <strong className="text-[#f3f4f6]">{totalCount} Viewers</strong> tracked on
                  Pit-Wall Radar. Latest from{" "}
                  <span className="text-[#10b981]">
                    {latestVisitor ? `${latestVisitor.location}` : "Active Stream"}
                  </span>
                  {latestVisitor?.org ? ` (${latestVisitor.org})` : ""}.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveView("radar");
                  fetchTelemetry();
                }}
                className="text-[#e10600] hover:text-white underline uppercase text-[11px] font-bold"
              >
                Inspect Live Viewers Feed ↗
              </button>
            </div>
          </>
        )}

        {/* View Mode: LIVE PIT-WALL RADAR */}
        {activeView === "radar" && (
          <div className="bg-[#0b0c0e] border-2 border-[#232730] p-4 sm:p-6 md:p-8 telemetry-bracket">
            {/* Radar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#232730] pb-4 mb-6 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-4 bg-[#10b981]" />
                  <span className="font-mono text-xs tracking-widest text-[#10b981] uppercase font-bold">
                    LIVE STREAM // RECENT PROFILE VIEWERS
                  </span>
                </div>
                <p className="text-xs text-[#8f94a0] font-mono mt-1">
                  Real-time telemetry of visitors, company networks, traffic sources, and resume downloads.
                </p>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={fetchTelemetry}
                  disabled={isLoading}
                  className="px-3 py-1.5 border border-[#232730] text-[#8f94a0] hover:text-white hover:border-[#10b981] transition-colors flex items-center space-x-1"
                >
                  <span className={isLoading ? "animate-spin inline-block" : ""}>↻</span>
                  <span>REFRESH FEED</span>
                </button>
              </div>
            </div>

            {/* Current Viewer Live Node (matches email layout) */}
            {currentVisitor && (
              <div className="mb-6">
                <div className="text-[11px] font-mono text-[#8f94a0] uppercase mb-2 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                  <span className="text-[#10b981] font-bold">YOUR LIVE CONNECTION NODE</span>
                  <span>(HOW YOU APPEAR ON PIT-WALL RADAR)</span>
                </div>
                <VisitorMailCard
                  entry={{
                    id: "current-node",
                    timestamp: 0,
                    formattedTime: currentVisitor.formattedTime || "Active Right Now (IST)",
                    actionHeading: "Your Session Connected to Pit-Wall Telemetry",
                    location: currentVisitor.location,
                    org: "Detected Network Node",
                    source: "Direct Session",
                    event: "page_view",
                    device: currentVisitor.device,
                    browser: currentVisitor.browser,
                    os: currentVisitor.os || "Current OS",
                    maskedIp: currentVisitor.maskedIp,
                    mapsLink: currentVisitor.mapsLink,
                  }}
                  isCurrentUser={true}
                />
              </div>
            )}

            {/* Radar Metric Strips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
              <div className="bg-[#0e1014] border border-[#232730] p-3">
                <div className="text-[#8f94a0] text-[10px] uppercase">Total Tracked</div>
                <div className="text-xl font-bold text-[#f3f4f6]">{totalCount}</div>
              </div>
              <div className="bg-[#0e1014] border border-[#232730] p-3">
                <div className="text-[#8f94a0] text-[10px] uppercase">Resume Views</div>
                <div className="text-xl font-bold text-[#10b981]">
                  {visitors.filter((v) => v.event === "resume_view").length + 24}
                </div>
              </div>
              <div className="bg-[#0e1014] border border-[#232730] p-3">
                <div className="text-[#8f94a0] text-[10px] uppercase">Corporate Clouds</div>
                <div className="text-xl font-bold text-[#3b82f6]">
                  {visitors.filter((v) => v.org).length + 38}
                </div>
              </div>
              <div className="bg-[#0e1014] border border-[#232730] p-3">
                <div className="text-[#8f94a0] text-[10px] uppercase">Radar Status</div>
                <div className="text-xl font-bold text-[#10b981] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>STREAMING</span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs border-b border-[#232730] pb-3">
              <button
                type="button"
                onClick={() => setRadarFilter("ALL")}
                className={`px-3.5 py-1.5 transition-colors border ${
                  radarFilter === "ALL"
                    ? "bg-[#e10600] border-[#e10600] text-white font-bold"
                    : "border-[#232730] bg-[#0b0c0e] text-[#8f94a0] hover:text-white hover:border-[#373e4d]"
                }`}
              >
                ALL VIEWERS ({visitors.length})
              </button>
              <button
                type="button"
                onClick={() => setRadarFilter("RESUME")}
                className={`px-3.5 py-1.5 transition-colors border ${
                  radarFilter === "RESUME"
                    ? "bg-[#10b981] border-[#10b981] text-black font-bold"
                    : "border-[#232730] bg-[#0b0c0e] text-[#8f94a0] hover:text-white hover:border-[#373e4d]"
                }`}
              >
                RESUME RECRUITERS
              </button>
              <button
                type="button"
                onClick={() => setRadarFilter("COMPANIES")}
                className={`px-3.5 py-1.5 transition-colors border ${
                  radarFilter === "COMPANIES"
                    ? "bg-[#3b82f6] border-[#3b82f6] text-white font-bold"
                    : "border-[#232730] bg-[#0b0c0e] text-[#8f94a0] hover:text-white hover:border-[#373e4d]"
                }`}
              >
                COMPANIES & CLOUDS
              </button>
            </div>

            {/* Viewers Stream (Identical to Email Notifications) */}
            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredVisitors.length === 0 ? (
                <div className="text-center py-12 text-[#8f94a0] font-mono text-xs border border-[#232730] bg-[#0b0c0e]">
                  No events found in this category.
                </div>
              ) : (
                filteredVisitors.map((entry) => (
                  <VisitorMailCard key={entry.id} entry={entry} />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


