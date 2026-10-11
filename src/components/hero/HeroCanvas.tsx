"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";

interface HeroCanvasProps {
  isVisible: boolean;
}

export default function HeroCanvas({ isVisible }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Smooth interactive mouse parallax tilt
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateY: x * 6,
      rotateX: -y * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-2 select-none overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Parallax & Aerodynamic Vehicle Display */}
      <div
        className="relative w-full max-w-[480px] aspect-[1024/917] transition-transform duration-200 ease-out flex items-center justify-center animate-[aeroFloat_4s_ease-in-out_infinite]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Subtle Ambient Red Glow */}
        <div className="absolute inset-6 -z-10 bg-gradient-to-tr from-[#ff002b]/15 via-transparent to-[#ff002b]/10 blur-3xl opacity-50 pointer-events-none" />

        {/* The Authentic F1 Aerodynamic Wireframe Car Visual */}
        <div className="relative w-full h-full overflow-hidden rounded">
          <Image
            src="/f1-aero.webp"
            alt="Formula 1 Aerodynamic Wind Tunnel Telemetry"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-contain object-center pointer-events-none"
          />

          {/* Smooth, Fluid Aerodynamic Airflow Wave (No Noise, Pure Flow) */}
          {isVisible && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Primary Aerodynamic Flow Wave */}
              <div className="absolute -inset-[50%] bg-gradient-to-r from-transparent via-[#ff002b]/20 to-transparent blur-xl animate-[aeroWave_2.4s_cubic-bezier(0.4,0,0.2,1)_infinite]" />

              {/* Secondary Delicate Air Velocity Shimmer */}
              <div className="absolute -inset-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm animate-[aeroWave_2.4s_cubic-bezier(0.4,0,0.2,1)_infinite_0.3s]" />
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        /* Smooth aerodynamic wave passing from front wing (bottom-left) to rear wing (top-right) */
        @keyframes aeroWave {
          0% {
            transform: translate(-55%, 55%) rotate(-36deg);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          60% {
            opacity: 0.6;
          }
          100% {
            transform: translate(55%, -55%) rotate(-36deg);
            opacity: 0;
          }
        }

        /* Gentle suspension float at high speed, zero jitter */
        @keyframes aeroFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
