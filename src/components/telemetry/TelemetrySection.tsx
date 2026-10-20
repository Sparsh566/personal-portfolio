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
      className="py-24 bg-[#000000] border-b border-[#1a1c2e] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#ff003f] shadow-[0_0_8px_rgba(255,0,63,0.5)]" />
              <span className="font-mono text-xs tracking-widest text-[#ff003f] uppercase font-bold">
                TELEMETRY & CAPABILITIES
              </span>
              <span className="font-mono text-xs text-[#9496a8] uppercase">
                PIT-WALL DATA HUB
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8fafc]">
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
                  ? "border-[#6366f1] bg-[#6366f1] text-white font-bold shadow-md shadow-[#6366f1]/25"
                  : "border-[#1a1c2e] bg-[#050508] text-[#9496a8] hover:text-[#f8fafc]"
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
                  : "border-[#1a1c2e] bg-[#050508] text-[#10b981] hover:border-[#10b981]"
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
                    ? "border-[#6366f1] bg-[#6366f1] text-white font-bold shadow-sm shadow-[#6366f1]/25"
                    : "border-[#1a1c2e] text-[#9496a8] hover:text-[#f8fafc] hover:border-[#6366f1]/60 bg-[#050508]"
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
                        ? "border-[#6366f1] bg-[#6366f1] text-white font-bold shadow-sm shadow-[#6366f1]/25"
                        : "border-[#1a1c2e] text-[#9496a8] hover:text-[#f8fafc] hover:border-[#6366f1]/60 bg-[#050508]"
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
                  className="bg-[#050508] border border-[#1a1c2e] p-5 telemetry-bracket flex flex-col justify-between hover:border-[#6366f1]/50 transition-colors"
                >
                  <div>
                    {/* Cluster Subsystem Tag */}
                    <div className="flex items-center justify-between border-b border-[#1a1c2e] pb-2.5 mb-4 font-mono text-[11px]">
                      <span className="text-[#9496a8] uppercase">
                        {category.subsystem}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    </div>

                    {/* Cluster Name */}
                    <h3 className="font-mono text-sm font-bold text-[#f8fafc] tracking-wide mb-4">
                      {category.cluster}
                    </h3>

                    {/* Signal Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {category.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-[#0f101a] border border-[#1a1c2e] text-xs font-mono text-[#f8fafc] hover:border-[#6366f1] hover:text-[#818cf8] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cluster Signal Readiness */}
                  <div className="pt-4 mt-6 border-t border-[#1a1c2e] flex items-center justify-between font-mono text-[10px] text-[#9496a8]">
                    <span>SIGNAL: 100% OK</span>
                    <span className="text-[#10b981]">ONLINE</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Radar Teaser Banner */}
            <div className="mt-8 bg-[#050508] border border-[#1a1c2e] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
                </span>
                <span className="text-[#9496a8]">
                  <strong className="text-[#f8fafc]">{totalCount} Viewers</strong> tracked on
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
                className="text-[#ff003f] hover:text-[#818cf8] underline uppercase text-[11px] font-bold transition-colors"
              >
                Inspect Live Viewers Feed ↗
              </button>
            </div>
          </>
        )}

        {/* View Mode: LIVE PIT-WALL RADAR */}
        {activeView === "radar" && (
          <div className="bg-[#050508] border-2 border-[#1a1c2e] p-4 sm:p-6 md:p-8 telemetry-bracket">
            {/* Radar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1c2e] pb-4 mb-6 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-4 bg-[#10b981]" />
                  <span className="font-mono text-xs tracking-widest text-[#10b981] uppercase font-bold">
                    LIVE STREAM // RECENT PROFILE VIEWERS
                  </span>
                </div>
                <p className="text-xs text-[#9496a8] font-mono mt-1">
                  Real-time telemetry of visitors, company networks, traffic sources, and resume downloads.
                </p>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={fetchTelemetry}
                  disabled={isLoading}
                  className="px-3 py-1.5 border border-[#1a1c2e] text-[#9496a8] hover:text-white hover:border-[#10b981] transition-colors flex items-center space-x-1"
                >
                  <span className={isLoading ? "animate-spin inline-block" : ""}>↻</span>
                  <span>REFRESH FEED</span>
                </button>
              </div>
            </div>

            {/* Current Viewer Live Node (matches email layout) */}
            {currentVisitor && (
              <div className="mb-6">
                <div className="text-[11px] font-mono text-[#9496a8] uppercase mb-2 flex items-center space-x-2">
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
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-3">
                <div className="text-[#9496a8] text-[10px] uppercase">Total Tracked</div>
                <div className="text-xl font-bold text-[#f8fafc]">{totalCount}</div>
              </div>
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-3">
                <div className="text-[#9496a8] text-[10px] uppercase">Resume Views</div>
                <div className="text-xl font-bold text-[#10b981]">
                  {visitors.filter((v) => v.event === "resume_view").length + 24}
                </div>
              </div>
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-3">
                <div className="text-[#9496a8] text-[10px] uppercase">Corporate Clouds</div>
                <div className="text-xl font-bold text-[#6366f1]">
                  {visitors.filter((v) => v.org).length + 38}
                </div>
              </div>
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-3">
                <div className="text-[#9496a8] text-[10px] uppercase">Radar Status</div>
                <div className="text-xl font-bold text-[#10b981] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>STREAMING</span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs border-b border-[#1a1c2e] pb-3">
              <button
                type="button"
                onClick={() => setRadarFilter("ALL")}
                className={`px-3.5 py-1.5 transition-colors border ${
                  radarFilter === "ALL"
                    ? "bg-[#ff003f] border-[#ff003f] text-white font-bold shadow-sm shadow-[#ff003f]/25"
                    : "border-[#1a1c2e] bg-[#050508] text-[#9496a8] hover:text-white hover:border-[#6366f1]"
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
                    : "border-[#1a1c2e] bg-[#050508] text-[#9496a8] hover:text-white hover:border-[#10b981]"
                }`}
              >
                RESUME RECRUITERS
              </button>
              <button
                type="button"
                onClick={() => setRadarFilter("COMPANIES")}
                className={`px-3.5 py-1.5 transition-colors border ${
                  radarFilter === "COMPANIES"
                    ? "bg-[#6366f1] border-[#6366f1] text-white font-bold shadow-sm shadow-[#6366f1]/25"
                    : "border-[#1a1c2e] bg-[#050508] text-[#9496a8] hover:text-white hover:border-[#6366f1]"
                }`}
              >
                COMPANIES & CLOUDS
              </button>
            </div>

            {/* Viewers Stream (Identical to Email Notifications) */}
            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredVisitors.length === 0 ? (
                <div className="text-center py-12 text-[#9496a8] font-mono text-xs border border-[#1a1c2e] bg-[#050508]">
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


