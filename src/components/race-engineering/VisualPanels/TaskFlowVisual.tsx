export function TaskFlowVisual() {
  return (
    <div className="bg-[#0b0c0e] border border-[#232730] p-4 text-xs font-mono rounded-none">
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#232730] text-[#8f94a0]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#e5a93c]" />
          <span className="text-[#f3f4f6] font-semibold">GIT WORK VERIFICATION ENGINE</span>
        </div>
        <span>PR #418 // COMMIT: a89d2f1</span>
      </div>

      {/* Diff Inspector Simulation */}
      <div className="py-4 space-y-3">
        {/* Verification Status Banner */}
        <div className="flex items-center justify-between p-2.5 bg-[#14161b] border border-[#232730]">
          <div>
            <span className="text-[10px] text-[#8f94a0] uppercase block">CRITERIA EVALUATION</span>
            <span className="text-xs font-bold text-[#10b981]">
              ACCEPTANCE CRITERIA VERIFIED (4/4 CRITERIA PASSED)
            </span>
          </div>
          <span className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-[10px] font-bold">
            PROGRESS VALIDATED
          </span>
        </div>

        {/* Git Diff Hunk Box */}
        <div className="bg-[#121418] border border-[#232730] p-3 text-[11px] font-mono leading-relaxed overflow-x-auto">
          <div className="text-[#8f94a0] border-b border-[#232730] pb-1 mb-2">
            diff --git a/services/worker.py b/services/worker.py
          </div>
          <div className="text-[#8f94a0]">@@ -42,6 +42,8 @@ def process_job(job_id):</div>
          <div className="text-[#e10600]">-    legacy_sync_dispatch(job_id)</div>
          <div className="text-[#10b981]">+    verified_payload = parse_criteria(job_id)</div>
          <div className="text-[#10b981]">+    queue.enqueue(verified_payload, timeout=30)</div>
          <div className="text-[#8f94a0]">     return {`{"status": "queued"}`}</div>
        </div>

        {/* Semantic Analysis Badges */}
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          <div className="p-2 bg-[#14161b] border border-[#232730]">
            <span className="text-[#8f94a0] block">DIFF SIZE</span>
            <span className="text-[#f3f4f6] font-semibold">+184 / -32</span>
          </div>
          <div className="p-2 bg-[#14161b] border border-[#232730]">
            <span className="text-[#8f94a0] block">CODE IMPACT</span>
            <span className="text-[#10b981] font-semibold">HIGH VALUE</span>
          </div>
          <div className="p-2 bg-[#14161b] border border-[#232730]">
            <span className="text-[#8f94a0] block">NO-OP COMMITS</span>
            <span className="text-[#10b981] font-semibold">0 DETECTED</span>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-2 border-t border-[#232730] flex justify-between text-[10px] text-[#8f94a0]">
        <span>FASTAPI + SQLALCHEMY REVISION LOG</span>
        <span className="text-[#10b981]">AUDIT TIME: 140MS</span>
      </div>
    </div>
  );
}
