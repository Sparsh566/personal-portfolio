"use client";

import { siteConfig } from "@/data/site";

export function PitWallActivity() {
  // Static telemetry representation of recent engineering activity
  const telemetryCommits = [
    { repo: "nivaas", message: "optimize groq prompt intent extraction parser", time: "2D AGO", branch: "main", status: "PASS" },
    { repo: "personal-portfolio", message: "configure telemetry design tokens and r3f fallback", time: "TODAY", branch: "main", status: "PASS" },
    { repo: "f1-telemetry-simulator", message: "tune fastf1 tyre wear exponential decay curve", time: "5D AGO", branch: "main", status: "PASS" },
    { repo: "retail_analytics_system", message: "add deepsort tracking bounding box smoothing", time: "1W AGO", branch: "main", status: "PASS" },
    { repo: "tenderblock", message: "refactor flow cadence reverse auction conditions", time: "2W AGO", branch: "main", status: "PASS" },
  ];

  return (
    <section
      id="pit-wall"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                PIT WALL // TELEMETRY ACTIVITY
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                [ GITHUB & CODE DEPLOYMENTS ]
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Repository Activity & Pipeline Health
            </h2>
          </div>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#e10600] hover:underline flex items-center space-x-1"
          >
            <span>GITHUB.COM/SPARSH566</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Telemetry Console Frame */}
        <div className="bg-[#0b0c0e] border border-[#232730] p-6 telemetry-bracket space-y-6">
          {/* Top Bar Readouts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs border-b border-[#232730] pb-4">
            <div>
              <span className="text-[10px] text-[#8f94a0] uppercase block">TOTAL COMMITS (2026)</span>
              <span className="text-sm font-bold text-[#f3f4f6]">520+ COMMITS</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8f94a0] uppercase block">BUILD PIPELINE</span>
              <span className="text-sm font-bold text-[#10b981] flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block" />
                <span>ALL CHECKS GREEN</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#8f94a0] uppercase block">PRIMARY STACK</span>
              <span className="text-sm font-bold text-[#f3f4f6]">PYTHON / TYPESCRIPT</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8f94a0] uppercase block">DEPLOYMENT TARGET</span>
              <span className="text-sm font-bold text-[#e10600]">VERCEL PRODUCTION</span>
            </div>
          </div>

          {/* Activity Matrix (Simulated Telemetry Heatmap) */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8f94a0] mb-2">
              <span>FREQUENCY SPECTRUM // 52 WEEKS</span>
              <span>DENSITY: HIGH VELOCITY</span>
            </div>
            <div className="grid grid-cols-26 sm:grid-cols-52 gap-1 overflow-x-auto py-2">
              {Array.from({ length: 52 }).map((_, i) => {
                const activityLevel = (i * 7 + 13) % 4;
                const colors = [
                  "bg-[#14161b]",
                  "bg-[#1c222b]",
                  "bg-[#e10600]/40",
                  "bg-[#e10600]",
                ];
                return (
                  <div
                    key={i}
                    className={`h-4 w-full rounded-none ${colors[activityLevel]}`}
                    title={`Week ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Recent Commits Telemetry Table */}
          <div>
            <span className="font-mono text-xs text-[#8f94a0] uppercase block mb-3">
              RECENT REPOSITORY DISPATCHES
            </span>
            <div className="space-y-2">
              {telemetryCommits.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#14161b] border border-[#232730] flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs gap-2"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[#e10600] font-bold min-w-[120px]">
                      {item.repo}
                    </span>
                    <span className="text-[#f3f4f6] truncate max-w-md">
                      {item.message}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-[10px] text-[#8f94a0]">
                    <span>BRANCH: {item.branch}</span>
                    <span>{item.time}</span>
                    <span className="px-1.5 py-0.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 font-bold">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
