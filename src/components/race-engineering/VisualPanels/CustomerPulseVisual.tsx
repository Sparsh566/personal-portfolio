export function CustomerPulseVisual() {
  return (
    <div className="bg-[#0b0c0e] border border-[#232730] p-4 text-xs font-mono rounded-none">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#232730] text-[#8f94a0]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
          <span className="text-[#f3f4f6] font-semibold">ENTERPRISE COMPLAINT CONTROL</span>
        </div>
        <span className="text-[#e5a93c] font-bold">SLA ACTIVE // 02:45 REMAINING</span>
      </div>

      {/* Main Command Center Stream */}
      <div className="py-4 space-y-3">
        {/* National Hackathon Badge */}
        <div className="p-2.5 bg-[#8b5cf6]/10 border border-[#8b5cf6]/40 flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#8b5cf6]">
            TOP 30 FINALIST // NATIONAL HACKATHON
          </span>
          <span className="text-[10px] text-[#f3f4f6]">
            UNION BANK OF INDIA IDEA 2.0
          </span>
        </div>

        {/* Complaint Intake Card */}
        <div className="p-3 bg-[#14161b] border border-[#232730]">
          <div className="flex justify-between items-start text-[11px]">
            <div>
              <span className="text-[#8f94a0] block text-[10px]">TICKET #UBI-89421</span>
              <span className="font-semibold text-[#f3f4f6]">Unauthorized UPI Debit Dispute</span>
            </div>
            <span className="px-2 py-0.5 bg-[#e10600]/10 text-[#e10600] border border-[#e10600]/30 font-bold text-[10px]">
              CRITICAL SEVERITY
            </span>
          </div>

          {/* RAG Vector Precedent Match */}
          <div className="mt-3 p-2 bg-[#121418] border border-[#232730]">
            <span className="text-[10px] text-[#8f94a0] uppercase block">
              AMAZON BEDROCK RAG RETRIEVAL
            </span>
            <div className="flex justify-between items-center text-[11px] text-[#f3f4f6] mt-0.5">
              <span>Precedent Case #UBI-71109 matched</span>
              <span className="text-[#10b981] font-bold">94.2% SIMILARITY</span>
            </div>
            <p className="text-[10px] text-[#8f94a0] mt-1 font-sans">
              Resolution policy: Automated immediate provisional credit, NPCI network trace initiated.
            </p>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          <div className="p-2 bg-[#14161b] border border-[#232730]">
            <span className="text-[#8f94a0] block">TRIAGE SPEED</span>
            <span className="text-[#10b981] font-semibold">1.8 SECONDS</span>
          </div>
          <div className="p-2 bg-[#14161b] border border-[#232730]">
            <span className="text-[#8f94a0] block">ESCALATION</span>
            <span className="text-[#f3f4f6] font-semibold">PAYMENTS TIER-2</span>
          </div>
          <div className="p-2 bg-[#14161b] border border-[#232730]">
            <span className="text-[#8f94a0] block">SLA DEFENSE</span>
            <span className="text-[#10b981] font-semibold">99.1% COMPLIANT</span>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-2 border-t border-[#232730] flex justify-between text-[10px] text-[#8f94a0]">
        <span>AMAZON BEDROCK + NEXT.JS + FASTAPI</span>
        <span className="text-[#10b981]">SYSTEM DISPATCHED</span>
      </div>
    </div>
  );
}
