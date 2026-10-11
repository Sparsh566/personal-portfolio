"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";

export default function RaceControlHub() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "telemetry" | "credentials">("pipeline");
  const [latency, setLatency] = useState(14.2);
  const [fps, setFps] = useState(120);

  // Subtle live telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Number((14.0 + Math.random() * 0.8).toFixed(1)));
      setFps(Math.floor(118 + Math.random() * 5));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0b0c0e] border border-[#232730] telemetry-bracket p-4 sm:p-5 flex flex-col justify-between min-h-[440px]">
      {/* 1. Top Header */}
      <div>
        <div className="flex items-center justify-between border-b border-[#232730] pb-3 mb-4 font-mono text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-bold text-[#f3f4f6] tracking-wider uppercase">
              RACE CONTROL // SYSTEM MONITOR
            </span>
          </div>
          <span className="text-[#10b981] font-semibold tracking-wider">
            LIVE TELEMETRY
          </span>
        </div>

        {/* 2. Interactive Navigation Tabs */}
        <div className="flex items-center space-x-2 mb-5 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("pipeline")}
            className={`px-3 py-1.5 border transition-all text-[11px] font-bold uppercase tracking-wider ${
              activeTab === "pipeline"
                ? "border-[#e10600] bg-[#e10600]/15 text-[#f3f4f6]"
                : "border-[#232730] bg-[#14161b] text-[#8f94a0] hover:text-white hover:border-[#373e4d]"
            }`}
          >
            AI PIPELINE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("telemetry")}
            className={`px-3 py-1.5 border transition-all text-[11px] font-bold uppercase tracking-wider ${
              activeTab === "telemetry"
                ? "border-[#e10600] bg-[#e10600]/15 text-[#f3f4f6]"
                : "border-[#232730] bg-[#14161b] text-[#8f94a0] hover:text-white hover:border-[#373e4d]"
            }`}
          >
            METRICS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("credentials")}
            className={`px-3 py-1.5 border transition-all text-[11px] font-bold uppercase tracking-wider ${
              activeTab === "credentials"
                ? "border-[#e10600] bg-[#e10600]/15 text-[#f3f4f6]"
                : "border-[#232730] bg-[#14161b] text-[#8f94a0] hover:text-white hover:border-[#373e4d]"
            }`}
          >
            PATENTS & CREDS
          </button>
        </div>

        {/* 3. Tab Contents */}
        {activeTab === "pipeline" && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#8f94a0] uppercase tracking-wider flex items-center justify-between">
              <span>SYSTEM ARCHITECTURE</span>
              <span className="text-[#10b981]">INT8 // REAL-TIME</span>
            </div>

            {/* Architecture Pipeline Stages */}
            <div className="space-y-2 font-mono">
              {[
                {
                  step: "01",
                  title: "MULTIMODAL SENSORS",
                  desc: "Video streams, camera frames, and hardware telemetry ingest",
                  tech: "OPENCV // WEBRTC",
                },
                {
                  step: "02",
                  title: "DETECTION & TRACKING",
                  desc: "Spatial bounding box regression and multi-target tracking",
                  tech: "YOLOV8 + DEEPSORT",
                },
                {
                  step: "03",
                  title: "INTELLIGENT REASONING",
                  desc: "Agentic classification, contextual vector embeddings, LLMs",
                  tech: "PYTORCH // PYTHON",
                },
                {
                  step: "04",
                  title: "REAL-TIME EXECUTION",
                  desc: "Sub-1.5s emergency circuit cutoff & automated telemetry alerts",
                  tech: "ESP32 // DUAL-VOLTAGE",
                },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="p-2.5 bg-[#121418] border border-[#232730] hover:border-[#e10600]/50 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="flex items-start space-x-2.5">
                    <span className="text-[#e10600] font-bold text-xs mt-0.5">
                      [{item.step}]
                    </span>
                    <div>
                      <h4 className="text-[#f3f4f6] text-xs font-bold leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#8f94a0] font-sans mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <span className="text-[9px] text-[#8f94a0] border border-[#232730] px-1.5 py-0.5 whitespace-nowrap bg-[#0b0c0e]">
                    {item.tech}
                  </span>
                </div>
              ))}
            </div>

            {/* Live Pipeline Telemetry Gauges */}
            <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
              <div className="p-2 bg-[#121418] border border-[#232730]">
                <span className="text-[10px] text-[#8f94a0] block">THROUGHPUT</span>
                <span className="text-sm font-bold text-[#f3f4f6]">{fps} FPS</span>
              </div>
              <div className="p-2 bg-[#121418] border border-[#232730]">
                <span className="text-[10px] text-[#8f94a0] block">LATENCY</span>
                <span className="text-sm font-bold text-[#10b981]">{latency} MS</span>
              </div>
              <div className="p-2 bg-[#121418] border border-[#232730]">
                <span className="text-[10px] text-[#8f94a0] block">PRECISION</span>
                <span className="text-sm font-bold text-[#f3f4f6]">INT8 / FP16</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "telemetry" && (
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#8f94a0] uppercase tracking-wider flex items-center justify-between">
              <span>SYSTEM DIAGNOSTICS</span>
              <span className="text-[#10b981]">ALL SYSTEMS NORMAL</span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 bg-[#121418] border border-[#232730]">
                <span className="text-[10px] text-[#8f94a0] block uppercase">SAFETY RESPONSE</span>
                <span className="text-xl font-bold text-[#f3f4f6] mt-1 block">&lt; 1.50 SEC</span>
                <span className="text-[10px] text-[#10b981] block mt-0.5">Dual-Voltage Interlock</span>
              </div>

              <div className="p-3 bg-[#121418] border border-[#232730]">
                <span className="text-[10px] text-[#8f94a0] block uppercase">SYSTEM UPTIME</span>
                <span className="text-xl font-bold text-[#f3f4f6] mt-1 block">99.98%</span>
                <span className="text-[10px] text-[#10b981] block mt-0.5">High Availability</span>
              </div>

              <div className="p-3 bg-[#121418] border border-[#232730]">
                <span className="text-[10px] text-[#8f94a0] block uppercase">DISTRIBUTED NODES</span>
                <span className="text-xl font-bold text-[#f3f4f6] mt-1 block">16 THREADS</span>
                <span className="text-[10px] text-[#8f94a0] block mt-0.5">Parallel Processing</span>
              </div>

              <div className="p-3 bg-[#121418] border border-[#232730]">
                <span className="text-[10px] text-[#8f94a0] block uppercase">CACHE EFFICIENCY</span>
                <span className="text-xl font-bold text-[#f3f4f6] mt-1 block">94.6%</span>
                <span className="text-[10px] text-[#10b981] block mt-0.5">Redis / Edge CDN</span>
              </div>
            </div>

            {/* Live Simulated Telemetry Wave */}
            <div className="p-3 bg-[#121418] border border-[#232730]">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8f94a0] mb-2">
                <span>SIGNAL CARRIER // FREQUENCY DENSITY</span>
                <span className="text-[#e10600]">2.4 GHz CARRIER</span>
              </div>
              <svg viewBox="0 0 300 40" className="w-full h-10 text-[#e10600]">
                <path
                  d="M 0 20 Q 25 5 50 20 T 100 20 T 150 20 T 200 20 T 250 20 T 300 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-90"
                />
                <path
                  d="M 0 20 Q 25 35 50 20 T 100 20 T 150 20 T 200 20 T 250 20 T 300 20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-60"
                />
              </svg>
            </div>
          </div>
        )}

        {activeTab === "credentials" && (
          <div className="space-y-3 font-mono">
            <div className="text-xs text-[#8f94a0] uppercase tracking-wider flex items-center justify-between">
              <span>REGISTERED IP & ACADEMICS</span>
              <span className="text-[#10b981]">VERIFIED</span>
            </div>

            {/* Patent 01 */}
            <div className="p-3 bg-[#121418] border border-[#232730]">
              <div className="flex items-center justify-between">
                <span className="text-[#e10600] font-bold text-xs">[PATENT 01] PUBLISHED</span>
                <span className="text-[10px] text-[#10b981]">OFFICIAL REGISTRATION</span>
              </div>
              <h4 className="text-xs font-bold text-[#f3f4f6] mt-1 font-sans">
                Dual-Voltage Safety Interlock & Motor Cutoff System
              </h4>
              <p className="text-[11px] text-[#8f94a0] font-sans mt-0.5 leading-snug">
                Sub-1.5s hardware level emergency circuit disconnect architecture.
              </p>
            </div>

            {/* Patent 02 */}
            <div className="p-3 bg-[#121418] border border-[#232730]">
              <div className="flex items-center justify-between">
                <span className="text-[#e10600] font-bold text-xs">[PATENT 02] PUBLISHED</span>
                <span className="text-[10px] text-[#10b981]">OFFICIAL REGISTRATION</span>
              </div>
              <h4 className="text-xs font-bold text-[#f3f4f6] mt-1 font-sans">
                Real-Time Spatial Vision Tracking & Dwell Time Analytics
              </h4>
              <p className="text-[11px] text-[#8f94a0] font-sans mt-0.5 leading-snug">
                Computer vision methodology for zero-sensor spatial crowd telemetry.
              </p>
            </div>

            {/* Hackathon Achievement & Education */}
            <div className="p-3 bg-[#121418] border border-[#232730] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8f94a0] block uppercase">NATIONAL RECOGNITION</span>
                <span className="text-xs font-bold text-[#f3f4f6]">TOP 30 FINALIST</span>
                <span className="text-[10px] text-[#8f94a0] block mt-0.5">Union Bank IDEA 2.0 Hackathon</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#8f94a0] block uppercase">ACADEMIC STANDING</span>
                <span className="text-xs font-bold text-[#10b981]">3RD YEAR B.TECH</span>
                <span className="text-[10px] text-[#8f94a0] block mt-0.5">SIT Nagpur (AI & ML)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Footer Strip */}
      <div className="border-t border-[#232730] pt-3 mt-4 flex items-center justify-between font-mono text-[10px] text-[#8f94a0]">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 bg-[#e10600] inline-block" />
          <span>SYS ARCHITECTURE: FULL-STACK / AI / SYSTEMS</span>
        </div>
        <span className="text-[#10b981] font-semibold">ALL NODES ONLINE</span>
      </div>
    </div>
  );
}
