export function HeroFallback() {
  return (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center p-6">
      <svg
        className="w-full max-w-[360px] h-auto text-[#232730]"
        viewBox="0 0 320 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background Grid & Reticle */}
        <line x1="160" y1="20" x2="160" y2="380" stroke="#232730" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="20" y1="200" x2="300" y2="200" stroke="#232730" strokeWidth="1" strokeDasharray="3 3" />

        {/* Aerodynamic Wind Tunnel Flow Streamlines */}
        <path d="M 60 40 Q 80 180 50 360" stroke="#373e4d" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <path d="M 100 30 Q 120 180 90 370" stroke="#e10600" strokeWidth="1" opacity="0.6" />
        <path d="M 220 30 Q 200 180 230 370" stroke="#e10600" strokeWidth="1" opacity="0.6" />
        <path d="M 260 40 Q 240 180 270 360" stroke="#373e4d" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        {/* 1. Front Wing */}
        <rect x="70" y="45" width="180" height="18" rx="2" stroke="#e10600" strokeWidth="2" fill="#14161b" />
        <line x1="70" y1="54" x2="250" y2="54" stroke="#e10600" strokeWidth="1" />
        {/* Front Endplates */}
        <rect x="66" y="38" width="6" height="32" rx="1" fill="#e10600" />
        <rect x="248" y="38" width="6" height="32" rx="1" fill="#e10600" />

        {/* 2. Front Nosecone */}
        <path
          d="M 150 55 L 140 140 L 180 140 L 170 55 Z"
          stroke="#f3f4f6"
          strokeWidth="1.5"
          fill="#0b0c0e"
        />

        {/* Front Wheels (Open Wheel) */}
        <rect x="52" y="85" width="24" height="60" rx="3" stroke="#373e4d" strokeWidth="1.5" fill="#14161b" />
        <rect x="244" y="85" width="24" height="60" rx="3" stroke="#373e4d" strokeWidth="1.5" fill="#14161b" />
        {/* Front Suspension Wishbones */}
        <line x1="76" y1="115" x2="142" y2="105" stroke="#8f94a0" strokeWidth="1.5" />
        <line x1="76" y1="125" x2="142" y2="125" stroke="#8f94a0" strokeWidth="1.5" />
        <line x1="244" y1="115" x2="178" y2="105" stroke="#8f94a0" strokeWidth="1.5" />
        <line x1="244" y1="125" x2="178" y2="125" stroke="#8f94a0" strokeWidth="1.5" />

        {/* 3. Cockpit & Halo Arch */}
        <ellipse cx="160" cy="180" rx="18" ry="32" stroke="#e10600" strokeWidth="2" fill="#14161b" />
        {/* Driver Helmet */}
        <circle cx="160" cy="190" r="10" fill="#e10600" />
        {/* Halo Strut */}
        <line x1="160" y1="150" x2="160" y2="178" stroke="#f3f4f6" strokeWidth="2.5" />

        {/* 4. Sidepods & Bodywork */}
        <path
          d="M 136 145 C 105 160 100 230 120 270 L 140 270 L 140 145 Z"
          stroke="#373e4d"
          strokeWidth="1.5"
          fill="#0b0c0e"
        />
        <path
          d="M 184 145 C 215 160 220 230 200 270 L 180 270 L 180 145 Z"
          stroke="#373e4d"
          strokeWidth="1.5"
          fill="#0b0c0e"
        />
        {/* Radiator Cooling Louvers */}
        <line x1="114" y1="195" x2="134" y2="195" stroke="#232730" strokeWidth="1" />
        <line x1="114" y1="205" x2="134" y2="205" stroke="#232730" strokeWidth="1" />
        <line x1="114" y1="215" x2="134" y2="215" stroke="#232730" strokeWidth="1" />
        <line x1="186" y1="195" x2="206" y2="195" stroke="#232730" strokeWidth="1" />
        <line x1="186" y1="205" x2="206" y2="205" stroke="#232730" strokeWidth="1" />
        <line x1="186" y1="215" x2="206" y2="215" stroke="#232730" strokeWidth="1" />

        {/* Engine Cowl & Shark Fin */}
        <rect x="156" y="210" width="8" height="90" fill="#e10600" />

        {/* Rear Wheels */}
        <rect x="46" y="270" width="28" height="70" rx="3" stroke="#373e4d" strokeWidth="1.5" fill="#14161b" />
        <rect x="246" y="270" width="28" height="70" rx="3" stroke="#373e4d" strokeWidth="1.5" fill="#14161b" />
        {/* Rear Suspension Wishbones */}
        <line x1="74" y1="300" x2="135" y2="285" stroke="#8f94a0" strokeWidth="1.5" />
        <line x1="74" y1="315" x2="135" y2="305" stroke="#8f94a0" strokeWidth="1.5" />
        <line x1="246" y1="300" x2="185" y2="285" stroke="#8f94a0" strokeWidth="1.5" />
        <line x1="246" y1="315" x2="185" y2="305" stroke="#8f94a0" strokeWidth="1.5" />

        {/* 5. Rear Wing */}
        <rect x="80" y="340" width="160" height="20" rx="2" stroke="#e10600" strokeWidth="2" fill="#14161b" />
        {/* Rear Endplates */}
        <rect x="76" y="332" width="6" height="36" rx="1" fill="#e10600" />
        <rect x="238" y="332" width="6" height="36" rx="1" fill="#e10600" />

        {/* Telemetry Annotations */}
        <text x="160" y="385" textAnchor="middle" fill="#8f94a0" fontFamily="monospace" fontSize="9" letterSpacing="2">
          F1 BLUEPRINT // AERODYNAMIC MAPPING
        </text>
      </svg>
    </div>
  );
}
