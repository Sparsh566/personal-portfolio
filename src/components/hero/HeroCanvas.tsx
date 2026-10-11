"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import Image from "next/image";

interface HeroCanvasProps {
  isVisible: boolean;
}

export default function HeroCanvas({ isVisible }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [speed, setSpeed] = useState(328);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Interactive mouse parallax tilt
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      rotateY: x * 8,
      rotateX: -y * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  // Subtle speed fluctuation to feel dynamic (326 - 334 km/h)
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setSpeed(Math.floor(328 + Math.random() * 6));
    }, 450);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-2 select-none overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Parallax & Aerodynamic Vehicle Canvas */}
      <div
        className="relative w-full max-w-[480px] aspect-[1024/917] transition-transform duration-150 ease-out flex items-center justify-center animate-[chassisVibe_0.12s_infinite]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Ambient Red Glow in Background */}
        <div className="absolute inset-8 -z-10 bg-gradient-to-tr from-[#ff002b]/20 via-transparent to-[#ff002b]/10 blur-3xl opacity-60" />

        {/* The Authentic F1 Aerodynamic Wireframe Car Visual */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src="/f1-aero.webp"
            alt="Formula 1 Aerodynamic Wind Tunnel Telemetry"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-contain object-center pointer-events-none"
          />

          {/* Animated Flowing Aerodynamic Streamlines Overlay (SVG) */}
          {isVisible && (
            <svg
              viewBox="0 0 1024 917"
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glowing Red Flow Gradient */}
                <linearGradient id="streamPulse" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff002b" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#ff1744" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#ff5252" stopOpacity="0.3" />
                </linearGradient>

                {/* Filter for subtle laser glow */}
                <filter id="aeroGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Streamline 1: Left Outer Front Wing to Floor */}
              <path
                d="M 0 790 Q 140 680 280 560 T 630 380 T 820 340"
                stroke="url(#streamPulse)"
                strokeWidth="2.5"
                filter="url(#aeroGlow)"
                className="animate-[flowDash_1.2s_linear_infinite]"
                strokeDasharray="40 120"
              />

              {/* Streamline 2: Left Wing Blade across Nosecone to Cockpit */}
              <path
                d="M 30 880 Q 160 740 320 620 T 550 390 T 850 220"
                stroke="url(#streamPulse)"
                strokeWidth="3.2"
                filter="url(#aeroGlow)"
                className="animate-[flowDash_0.9s_linear_infinite]"
                strokeDasharray="60 140"
              />

              {/* Streamline 3: Center Front Wing over Nose and through Halo */}
              <path
                d="M 180 920 Q 350 780 450 640 T 550 410 T 750 220 T 910 180"
                stroke="#ff002b"
                strokeWidth="3.5"
                filter="url(#aeroGlow)"
                className="animate-[flowDash_0.8s_linear_infinite]"
                strokeDasharray="70 150"
              />

              {/* Streamline 4: Right Wing Blade across Suspension and Sidepod */}
              <path
                d="M 390 930 Q 580 830 610 650 T 690 470 T 820 290 T 940 230"
                stroke="url(#streamPulse)"
                strokeWidth="2.8"
                filter="url(#aeroGlow)"
                className="animate-[flowDash_1.1s_linear_infinite]"
                strokeDasharray="50 130"
              />

              {/* Streamline 5: High Rear Wing Wake Discharge */}
              <path
                d="M 450 560 Q 580 390 680 230 T 920 200 T 980 210"
                stroke="url(#streamPulse)"
                strokeWidth="3"
                filter="url(#aeroGlow)"
                className="animate-[flowDash_0.85s_linear_infinite]"
                strokeDasharray="55 135"
              />

              {/* Streamline 6: Underfloor Venturi Tunnel Ground Effect */}
              <path
                d="M 110 910 Q 370 760 550 590 T 770 450 T 900 390"
                stroke="url(#streamPulse)"
                strokeWidth="2.2"
                filter="url(#aeroGlow)"
                className="animate-[flowDash_1.3s_linear_infinite]"
                strokeDasharray="45 125"
              />

              {/* High-speed velocity wind streaks */}
              <line
                x1="-50"
                y1="820"
                x2="350"
                y2="540"
                stroke="#ff002b"
                strokeWidth="1.5"
                strokeOpacity="0.7"
                strokeDasharray="25 180"
                className="animate-[flowDash_0.65s_linear_infinite]"
              />
              <line
                x1="220"
                y1="940"
                x2="720"
                y2="560"
                stroke="#ff002b"
                strokeWidth="1.8"
                strokeOpacity="0.8"
                strokeDasharray="35 200"
                className="animate-[flowDash_0.75s_linear_infinite]"
              />
              <line
                x1="520"
                y1="640"
                x2="1020"
                y2="280"
                stroke="#ff002b"
                strokeWidth="1.5"
                strokeOpacity="0.7"
                strokeDasharray="30 190"
                className="animate-[flowDash_0.6s_linear_infinite]"
              />
            </svg>
          )}

          {/* High-Tech Telemetry HUD Overlays */}
          <div className="absolute top-2 left-2 font-mono text-[9px] tracking-wider text-[#8f94a0] bg-[#07080a]/85 border border-[#232730] px-2 py-1 flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>WIND TUNNEL // ACTIVE FLOW</span>
          </div>

          <div className="absolute top-2 right-2 font-mono text-[9px] tracking-wider text-[#8f94a0] bg-[#07080a]/85 border border-[#232730] px-2 py-1 text-right">
            <span className="text-[#ff002b] font-bold">{speed} KM/H</span>
            <span className="text-[#8f94a0] ml-1.5">// 332 L/S</span>
          </div>

          <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#8f94a0] bg-[#07080a]/85 border border-[#232730] px-2 py-1">
            <span>AERO BALANCE: </span>
            <span className="text-[#10b981]">41.5% FRONT / 58.5% REAR</span>
          </div>

          <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#8f94a0] bg-[#07080a]/85 border border-[#232730] px-2 py-1">
            <span>DRS: </span>
            <span className="text-[#ff002b] font-bold">ARMED</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes flowDash {
          0% {
            stroke-dashoffset: 200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes chassisVibe {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-0.8px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
