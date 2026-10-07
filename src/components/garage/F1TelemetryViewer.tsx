"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function F1TelemetryViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(containerRef, { threshold: 0.2 });

  return (
    <div
      ref={containerRef}
      className="p-4 bg-[#070809] border border-[#232730] font-mono text-xs space-y-4"
    >
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#232730] gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#e10600]" />
          <span className="text-[#f3f4f6] font-bold">
            FASTF1 TELEMETRY ACQUISITION // LAP 44
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[10px] text-[#8f94a0]">
          <span>CIRCUIT: SPA-FRANCORCHAMPS</span>
          <span className="text-[#10b981]">SAMPLING: 200HZ</span>
        </div>
      </div>

      {/* Primary Timing & Dynamic HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">SECTOR 1 (PURPLE)</span>
          <span className="text-xs font-bold text-[#8b5cf6] block mt-0.5">
            28.412s
          </span>
          <span className="text-[9px] text-[#8f94a0]">-0.118s DELTA</span>
        </div>

        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">SECTOR 2 (GREEN)</span>
          <span className="text-xs font-bold text-[#10b981] block mt-0.5">
            39.814s
          </span>
          <span className="text-[9px] text-[#8f94a0]">-0.024s DELTA</span>
        </div>

        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">SECTOR 3 (YELLOW)</span>
          <span className="text-xs font-bold text-[#e5a93c] block mt-0.5">
            23.902s
          </span>
          <span className="text-[9px] text-[#8f94a0]">+0.042s DELTA</span>
        </div>

        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">LAP TIME</span>
          <span className="text-xs font-bold text-[#f3f4f6] block mt-0.5">
            1:32.128
          </span>
          <span className="text-[9px] text-[#10b981]">PERSONAL BEST</span>
        </div>
      </div>

      {/* Dynamic Telemetry SVG Graph: Speed, Throttle, Brake */}
      <div className="p-3 bg-[#0b0c0e] border border-[#232730]">
        <div className="flex items-center justify-between text-[10px] text-[#8f94a0] mb-2">
          <span>CHANNEL OVERLAY: SPEED (KM/H) & THROTTLE (%)</span>
          <div className="flex items-center space-x-3">
            <span className="text-[#e10600] font-semibold">-- SPEED</span>
            <span className="text-[#10b981] font-semibold">-- THROTTLE</span>
            <span className="text-[#e5a93c] font-semibold">-- BRAKE</span>
          </div>
        </div>

        <div className="relative w-full h-36">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Grid Reference Lines */}
            <line x1="0" y1="20" x2="500" y2="20" stroke="#1c1e25" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="0" y1="60" x2="500" y2="60" stroke="#1c1e25" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="0" y1="100" x2="500" y2="100" stroke="#1c1e25" strokeWidth="1" strokeDasharray="2 4" />

            {/* Brake Pressure Spikes (Amber) */}
            <path
              d="M 0 115 L 120 115 L 130 30 L 160 40 L 175 115 L 310 115 L 320 20 L 350 45 L 365 115 L 500 115"
              fill="none"
              stroke="#e5a93c"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />

            {/* Throttle Pedal Trace (Green) */}
            <path
              d="M 0 30 L 120 30 L 130 115 L 165 115 L 195 40 L 310 30 L 320 115 L 355 115 L 385 30 L 500 30"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
            />

            {/* Speed Telemetry Curve (Racing Red) */}
            <path
              d="M 0 25 Q 70 20 125 35 Q 145 105 170 100 Q 220 50 315 28 Q 335 110 360 105 Q 410 40 500 30"
              fill="none"
              stroke="#e10600"
              strokeWidth="2.5"
              strokeDasharray="600"
              strokeDashoffset={isVisible ? "0" : "600"}
              style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
          </svg>
        </div>

        <div className="flex justify-between text-[9px] text-[#8f94a0] pt-1">
          <span>0M (TURN 1 ENTRY)</span>
          <span>1200M (HAIRPIN APEX)</span>
          <span>2400M (STRAIGHT 2)</span>
          <span>3600M (CHICANE)</span>
          <span>4800M (FINISH)</span>
        </div>
      </div>

      {/* Vehicle Dynamics Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">TYRE COMPOUND</span>
          <span className="text-[#f3f4f6] font-bold block mt-0.5">MEDIUM (C3)</span>
          <span className="text-[#10b981]">78% REMAINING LIFE</span>
        </div>

        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">FUEL LOAD</span>
          <span className="text-[#f3f4f6] font-bold block mt-0.5">38.4 KG</span>
          <span className="text-[#8f94a0]">-0.8 LAPS DEFICIT</span>
        </div>

        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">BRAKE TEMP</span>
          <span className="text-[#f3f4f6] font-bold block mt-0.5">580 DEG C</span>
          <span className="text-[#10b981]">OPTIMAL WINDOW</span>
        </div>

        <div className="p-2 bg-[#121418] border border-[#232730]">
          <span className="text-[#8f94a0] block uppercase">DRS STATUS</span>
          <span className="text-[#10b981] font-bold block mt-0.5">ACTIVE</span>
          <span className="text-[#8f94a0]">ZONE 2 ENGAGED</span>
        </div>
      </div>
    </div>
  );
}
