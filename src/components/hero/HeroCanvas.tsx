"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";

interface TelemetryHotspot {
  id: string;
  label: string;
  code: string;
  spec: string;
  x: number; // percentage
  y: number; // percentage
}

const hotspots: TelemetryHotspot[] = [
  {
    id: "front-wing",
    code: "01",
    label: "AERO FRONT WING",
    spec: "Multi-tier vortex generator // 38% front downforce balance",
    x: 32,
    y: 84,
  },
  {
    id: "cockpit-halo",
    code: "02",
    label: "TITANIUM HALO CELL",
    spec: "Grade-5 titanium driver safety cage // 125 kN load tolerance",
    x: 48,
    y: 50,
  },
  {
    id: "hybrid-unit",
    code: "03",
    label: "MGU-K HYBRID DRIVE",
    spec: "120 kW kinetic energy recovery unit // 800V bus architecture",
    x: 34,
    y: 60,
  },
  {
    id: "rear-wing-drs",
    code: "04",
    label: "DRS REAR WING",
    spec: "Hydraulic drag reduction flap // 18 km/h delta down straight",
    x: 48,
    y: 12,
  },
  {
    id: "dither-matrix",
    code: "05",
    label: "TELEMETRY DITHER STREAM",
    spec: "58% live data integrity // lossy aerodynamic packet buffer",
    x: 68,
    y: 65,
  },
];

interface HeroCanvasProps {
  isVisible: boolean;
}

export default function HeroCanvas({ isVisible }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<TelemetryHotspot>(hotspots[0]);
  const [transformStyle, setTransformStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  // Smooth cursor tilt parallax
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTransformStyle({
      rotateY: x * 12,
      rotateX: -y * 12,
      scale: 1.02,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] flex flex-col items-center justify-center p-2 select-none overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Tilted Interactive Artwork Card */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] transition-transform duration-200 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${transformStyle.rotateX}deg) rotateY(${transformStyle.rotateY}deg) scale(${transformStyle.scale})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute inset-4 -z-10 bg-gradient-to-tr from-[#e10600]/15 via-transparent to-amber-500/10 blur-2xl opacity-75" />

        {/* F1 Livery Graphic Art Image */}
        <div className="relative w-full h-full rounded border border-[#232730] bg-[#08080a] overflow-hidden shadow-2xl">
          <Image
            src="/f1-livery.jpg"
            alt="Formula 1 Telemetry & Livery Disintegration Artwork"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-contain object-center pointer-events-none"
          />

          {/* Animated Scanning Laser Line */}
          {isVisible && (
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#e10600] to-transparent shadow-[0_0_8px_#e10600] animate-[scan_4s_ease-in-out_infinite] opacity-60 pointer-events-none" />
          )}

          {/* Interactive Telemetry Hotspot Nodes */}
          {hotspots.map((node) => {
            const isSelected = activeHotspot.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveHotspot(node)}
                onMouseEnter={() => setActiveHotspot(node)}
                aria-label={node.label}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute z-20 group p-1.5 focus:outline-none"
              >
                <div className="relative flex items-center justify-center">
                  {/* Pulsing ring on selected node */}
                  {isSelected && (
                    <span className="absolute w-6 h-6 rounded-full border border-[#e10600] animate-ping opacity-75 pointer-events-none" />
                  )}
                  {/* Hotspot core icon */}
                  <span
                    className={`w-3 h-3 rounded-full border text-[8px] font-mono font-bold flex items-center justify-center transition-all duration-150 ${
                      isSelected
                        ? "bg-[#e10600] border-white text-white scale-125 shadow-[0_0_10px_#e10600]"
                        : "bg-[#0b0c0e]/90 border-[#8f94a0] text-[#f3f4f6] group-hover:border-[#e10600] group-hover:scale-110"
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Telemetry Inspector Readout Strip */}
      <div className="w-full max-w-[380px] mt-3 p-2.5 bg-[#08080a] border border-[#232730] font-mono text-xs flex flex-col gap-1 transition-all">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#e10600] font-bold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-[#e10600] inline-block mr-1" />
            [{activeHotspot.code}] {activeHotspot.label}
          </span>
          <span className="text-[#10b981]">SYSTEM OK</span>
        </div>
        <p className="text-[11px] text-[#8f94a0] font-sans leading-tight">
          {activeHotspot.spec}
        </p>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 2%;
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            top: 96%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
