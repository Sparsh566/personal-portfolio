export function HeroFallback() {
  return (
    <div className="w-full h-full min-h-[360px] flex items-center justify-center p-6">
      <svg
        className="w-full max-w-[380px] h-auto text-[#232730]"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer Circular Telemetry Reticle */}
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="#232730"
          strokeWidth="1.5"
          strokeDasharray="4 8"
        />
        <circle cx="200" cy="200" r="120" stroke="#373e4d" strokeWidth="1" />
        <circle
          cx="200"
          cy="200"
          r="70"
          stroke="#e10600"
          strokeWidth="1.5"
          opacity="0.8"
        />

        {/* Coordinate Crosshairs */}
        <line x1="20" y1="200" x2="380" y2="200" stroke="#232730" strokeWidth="1" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="#232730" strokeWidth="1" />

        {/* Telemetry Corner Ticks */}
        <path d="M 80 80 L 100 80 M 80 80 L 80 100" stroke="#e10600" strokeWidth="2" />
        <path d="M 320 80 L 300 80 M 320 80 L 320 100" stroke="#373e4d" strokeWidth="2" />
        <path d="M 80 320 L 100 320 M 80 320 L 80 300" stroke="#373e4d" strokeWidth="2" />
        <path d="M 320 320 L 300 320 M 320 320 L 320 300" stroke="#e10600" strokeWidth="2" />

        {/* Abstract Aerodynamic Flow Lines */}
        <path
          d="M 60 180 Q 200 120 340 180"
          stroke="#e10600"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 60 220 Q 200 280 340 220"
          stroke="#373e4d"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Technical Data Labels */}
        <text
          x="200"
          y="195"
          textAnchor="middle"
          fill="#f3f4f6"
          fontFamily="monospace"
          fontSize="11"
          letterSpacing="2"
        >
          TELEMETRY // VECTOR 01
        </text>
        <text
          x="200"
          y="215"
          textAnchor="middle"
          fill="#8f94a0"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="1"
        >
          COORD: 21.1458 N, 79.0882 E
        </text>
      </svg>
    </div>
  );
}
