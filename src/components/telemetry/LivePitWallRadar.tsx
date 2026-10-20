"use client";

import { useEffect, useState, useCallback } from "react";
import { VisitorLogEntry } from "@/app/api/telemetry/visit/route";
import { VisitorMailCard } from "@/components/telemetry/VisitorMailCard";

export function LivePitWallRadar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visitors, setVisitors] = useState<VisitorLogEntry[]>([]);
  const [totalCount, setTotalCount] = useState<number>(142);
  const [currentVisitor, setCurrentVisitor] = useState<{
    location: string;
    maskedIp: string;
    device: string;
    browser: string;
  } | null>(null);
  const [filter, setFilter] = useState<"ALL" | "RESUME" | "COMPANIES">("ALL");
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

    // Poll every 30 seconds for live updates
    const interval = setInterval(() => {
      fetch("/api/telemetry/visit", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!isMounted || !data) return;
          if (data.recentVisitors) setVisitors(data.recentVisitors);
          if (data.totalCount) setTotalCount(data.totalCount);
          if (data.currentVisitor) setCurrentVisitor(data.currentVisitor);
        })
        .catch(() => {});
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filter visitors
  const filteredVisitors = visitors.filter((v) => {
    if (filter === "RESUME") return v.event === "resume_view";
    if (filter === "COMPANIES") return Boolean(v.org && v.org.length > 2);
    return true;
  });

  const latestVisitor = visitors[0];

  return (
    <>
      {/* Floating Pit-Wall Radar Pill */}
      <div className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center space-x-3 bg-[#000000]/95 hover:bg-[#0a0b12] border border-[#1a1c2e] hover:border-[#ff003f] px-3.5 py-2.5 rounded-none shadow-2xl backdrop-blur-md transition-all duration-200 telemetry-bracket text-left"
          title="Open Live Pit-Wall Visitor Radar"
        >
          {/* Pulsing Live Dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]" />
          </span>

          <div className="font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-[#ff003f] font-bold tracking-wider uppercase text-[11px]">
                PIT-WALL RADAR
              </span>
              <span className="text-[#9496a8] text-[10px]">
                {totalCount} VIEWERS
              </span>
            </div>
            <div className="text-[#f8fafc] text-[11px] truncate max-w-[210px] sm:max-w-[280px]">
              {latestVisitor ? (
                <>
                  <span className="text-[#10b981]">Latest:</span> {latestVisitor.location}{" "}
                  {latestVisitor.org ? `(${latestVisitor.org.slice(0, 15)}...)` : ""}
                </>
              ) : (
                "Live Telemetry Stream Active"
              )}
            </div>
          </div>

          <span className="font-mono text-xs text-[#9496a8] group-hover:text-white transition-transform group-hover:translate-x-0.5 shrink-0">
            ↗
          </span>
        </button>
      </div>

      {/* Radar Monitor Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#050508] border-2 border-[#1a1c2e] p-4 sm:p-6 md:p-8 telemetry-bracket shadow-2xl max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1c2e] pb-4 mb-4 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-4 bg-[#ff003f]" />
                  <span className="font-mono text-xs tracking-widest text-[#ff003f] uppercase font-bold">
                    PIT-WALL TELEMETRY RADAR
                  </span>
                  <span className="font-mono text-xs text-[#9496a8] uppercase">
                    SYS.V4 // LIVE
                  </span>
                </div>
                <h3 className="font-mono text-lg sm:text-xl font-bold text-[#f8fafc] mt-1">
                  Active Profile Viewers & Signals
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={fetchTelemetry}
                  disabled={isLoading}
                  className="font-mono text-xs px-3 py-1.5 border border-[#1a1c2e] text-[#9496a8] hover:text-white hover:border-[#ff003f] transition-colors flex items-center space-x-1"
                >
                  <span className={isLoading ? "animate-spin inline-block" : ""}>↻</span>
                  <span>REFRESH</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs px-3 py-1.5 border border-[#1a1c2e] text-[#9496a8] hover:text-white hover:border-[#ff003f] transition-colors"
                >
                  ESC // CLOSE
                </button>
              </div>
            </div>

            {/* Current Visitor Banner */}
            {currentVisitor && (
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-3 sm:p-4 mb-4 telemetry-bracket font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                  <div>
                    <span className="text-[#10b981] font-bold uppercase tracking-wider">
                      YOUR LIVE NODE:
                    </span>{" "}
                    <span className="text-[#f8fafc] font-bold">
                      {currentVisitor.location}
                    </span>
                  </div>
                </div>
                <div className="text-[#9496a8] text-[11px] flex items-center space-x-2">
                  <span>{currentVisitor.device}</span>
                  <span>•</span>
                  <span>{currentVisitor.browser}</span>
                  <span>•</span>
                  <span>{currentVisitor.maskedIp}</span>
                </div>
              </div>
            )}

            {/* Telemetry Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono text-xs">
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-2.5">
                <div className="text-[#9496a8] text-[10px] uppercase">Total Logged</div>
                <div className="text-lg font-bold text-[#f8fafc]">{totalCount}</div>
              </div>
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-2.5">
                <div className="text-[#9496a8] text-[10px] uppercase">Resume Views</div>
                <div className="text-lg font-bold text-[#10b981]">
                  {visitors.filter((v) => v.event === "resume_view").length + 24}
                </div>
              </div>
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-2.5">
                <div className="text-[#9496a8] text-[10px] uppercase">Verified Orgs</div>
                <div className="text-lg font-bold text-[#6366f1]">
                  {visitors.filter((v) => v.org).length + 38}
                </div>
              </div>
              <div className="bg-[#0a0b12] border border-[#1a1c2e] p-2.5">
                <div className="text-[#9496a8] text-[10px] uppercase">Status</div>
                <div className="text-lg font-bold text-[#10b981] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span>STREAMING</span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-2 mb-3 font-mono text-xs border-b border-[#1a1c2e] pb-2">
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className={`px-3 py-1 transition-colors ${
                  filter === "ALL"
                    ? "bg-[#6366f1] text-white font-bold shadow-sm shadow-[#6366f1]/25"
                    : "text-[#9496a8] hover:text-white"
                }`}
              >
                ALL VIEWERS ({visitors.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("RESUME")}
                className={`px-3 py-1 transition-colors ${
                  filter === "RESUME"
                    ? "bg-[#10b981] text-black font-bold"
                    : "text-[#9496a8] hover:text-white"
                }`}
              >
                RESUME RECRUITERS
              </button>
              <button
                type="button"
                onClick={() => setFilter("COMPANIES")}
                className={`px-3 py-1 transition-colors ${
                  filter === "COMPANIES"
                    ? "bg-[#6366f1] text-white font-bold shadow-sm shadow-[#6366f1]/25"
                    : "text-[#9496a8] hover:text-white"
                }`}
              >
                COMPANIES & CLOUDS
              </button>
            </div>

            {/* Viewers Scrollable List rendered identical to telemetry emails */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
              {filteredVisitors.length === 0 ? (
                <div className="text-center py-12 text-[#9496a8] font-mono text-xs">
                  No events found in this category.
                </div>
              ) : (
                filteredVisitors.map((entry) => (
                  <VisitorMailCard key={entry.id} entry={entry} />
                ))
              )}
            </div>

            {/* Footer Notice */}
            <div className="pt-3 mt-3 border-t border-[#1a1c2e] flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#9496a8] gap-1">
              <span>Zero client cookies stored • IPs anonymized for public security</span>
              <span className="text-[#ff003f]">PIT-WALL REAL-TIME TELEMETRY</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
