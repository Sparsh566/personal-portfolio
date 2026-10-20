export function NivaasVisual() {
  return (
    <div className="bg-[#050508] border border-[#1a1c2e] p-4 text-xs font-mono rounded-none">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1a1c2e] text-[#9496a8]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          <span className="text-[#f8fafc] font-semibold">AGENT REASONING PIPELINE</span>
        </div>
        <span>QUERY: &quot;3BHK near IT park under 85L&quot;</span>
      </div>

      {/* Interactive Step Decomposition */}
      <div className="py-4 space-y-3">
        {/* Step 1: Query Extraction */}
        <div className="p-2.5 bg-[#0f101a] border-l-2 border-[#ff003f]">
          <div className="flex justify-between text-[11px] text-[#9496a8]">
            <span className="text-[#ff003f] font-bold">STAGE 01: INTENT EXTRACTION</span>
            <span>GROQ LLM</span>
          </div>
          <div className="text-[11px] text-[#f8fafc] mt-1">
            Bedrooms: 3 | MaxPrice: 8,500,000 INR | Anchor: &quot;IT Park&quot; | Radius: 5km
          </div>
        </div>

        {/* Step 2: Scoring & Search */}
        <div className="p-2.5 bg-[#0f101a] border-l-2 border-[#6366f1]">
          <div className="flex justify-between text-[11px] text-[#9496a8]">
            <span className="text-[#818cf8] font-bold">STAGE 02: SCORING & RETRIEVAL</span>
            <span>RAPIDFUZZ + SCIKIT-LEARN</span>
          </div>
          <div className="text-[11px] text-[#9496a8] mt-1">
            Ranked 42 candidates using weighted locality and amenity vectors.
          </div>
        </div>

        {/* Step 3: Top Ranked Result Card */}
        <div className="p-3 bg-[#0a0b12] border border-[#2b2e4a]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm font-bold text-[#f8fafc]">Skyline Horizon Unit 402</span>
              <span className="text-[10px] text-[#9496a8] block">Nagpur IT Corridor // 1.2km to Campus</span>
            </div>
            <span className="text-xs font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 border border-[#10b981]/30">
              MATCH: 96.8%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-[#1a1c2e] text-[10px]">
            <div>
              <span className="text-[#9496a8] block">VALUATION</span>
              <span className="text-[#f8fafc] font-semibold">INR 78.5 L</span>
            </div>
            <div>
              <span className="text-[#9496a8] block">EST. EMI (20Y)</span>
              <span className="text-[#f8fafc] font-semibold">INR 62,400/MO</span>
            </div>
            <div>
              <span className="text-[#9496a8] block">TRANSIT TIME</span>
              <span className="text-[#f8fafc] font-semibold">06 MIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-2 border-t border-[#1a1c2e] flex justify-between text-[10px] text-[#9496a8]">
        <span>POSTGRESQL + TAVILY WEB SEARCH</span>
        <span className="text-[#10b981]">PIPELINE LATENCY: 298MS</span>
      </div>
    </div>
  );
}
