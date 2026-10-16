"use client";

import { VisitorLogEntry } from "@/app/api/telemetry/visit/route";

interface VisitorMailCardProps {
  entry: VisitorLogEntry;
  isCurrentUser?: boolean;
}

export function VisitorMailCard({ entry, isCurrentUser = false }: VisitorMailCardProps) {
  const isResume = entry.event === "resume_view";
  const isCert = entry.event === "cert_view";

  const themeColor = isResume ? "#10b981" : isCert ? "#3b82f6" : "#e10600";
  const badgeText = isCurrentUser
    ? "CURRENT ACTIVE SESSION"
    : isResume
    ? "RESUME DOCUMENT INTERACTION"
    : isCert
    ? "CREDENTIAL AUDIT"
    : "PAGE_VIEW EVENT";

  const title =
    entry.actionHeading ||
    (isResume
      ? "Candidate Resume Accessed"
      : isCert
      ? `Certificate Inspected: ${entry.detail || "Credential"}`
      : "New Portfolio Visit Detected");

  const mapsLink =
    entry.mapsLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      entry.location || "Earth"
    )}`;

  return (
    <div className="w-full bg-[#0b0c0e] border border-[#232730] hover:border-[#373e4d] p-5 sm:p-6 transition-all shadow-xl font-mono text-xs telemetry-bracket">
      {/* Top Header matching email */}
      <div
        className="pb-3 mb-4"
        style={{ borderBottom: `2px solid ${themeColor}` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span
            className="text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider border rounded-none"
            style={{
              backgroundColor: `${themeColor}22`,
              color: themeColor,
              borderColor: `${themeColor}66`,
            }}
          >
            {badgeText}
          </span>

          {isCurrentUser && (
            <span className="flex items-center space-x-1.5 text-[#10b981] text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span>CONNECTED NOW</span>
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#f3f4f6] tracking-tight">
          {title}
        </h3>

        <p className="text-[#8f94a0] text-[11px] mt-1">
          {entry.formattedTime ||
            new Date(entry.timestamp).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "full",
              timeStyle: "medium",
            }) + " (IST)"}
        </p>
      </div>

      {/* Telemetry Key-Value Table matching email screenshot */}
      <div className="space-y-0 text-xs">
        {/* Location Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-[#1a1d24]">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            LOCATION:
          </span>
          <span className="font-bold text-[#10b981] text-sm mt-0.5 sm:mt-0">
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center space-x-1"
            >
              <span>{entry.location}</span>
              <span className="text-[10px] opacity-80">(MAP)</span>
            </a>
          </span>
        </div>

        {/* Network / Org Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-[#1a1d24]">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            NETWORK / ORG:
          </span>
          <span className="font-bold text-[#f3f4f6] mt-0.5 sm:mt-0">
            {entry.org || "Public Telemetry Node"}
          </span>
        </div>

        {/* Traffic Source Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-[#1a1d24]">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            TRAFFIC SOURCE:
          </span>
          <span className="font-bold text-[#f3f4f6] mt-0.5 sm:mt-0">
            {entry.source}
          </span>
        </div>

        {/* Device & OS Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-[#1a1d24]">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            DEVICE & OS:
          </span>
          <span className="text-[#f3f4f6] mt-0.5 sm:mt-0">
            {entry.device} • {entry.os || "OS"} • {entry.browser}
          </span>
        </div>

        {/* Screen & Zone Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-[#1a1d24]">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            SCREEN & ZONE:
          </span>
          <span className="text-[#8f94a0] mt-0.5 sm:mt-0">
            {entry.screen || "1920x1080"} • {entry.timezone || "Asia/Kolkata (en-IN)"}
          </span>
        </div>

        {/* Page Path Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-[#1a1d24]">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            PAGE PATH:
          </span>
          <span className="text-[#3b82f6] break-all mt-0.5 sm:mt-0">
            {entry.pageUrl || "https://sparsh-portfolio-coral.vercel.app/"}
          </span>
        </div>

        {/* Referrer URL Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-[#1a1d24]">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            REFERRER URL:
          </span>
          <span className="text-[#3b82f6] break-all mt-0.5 sm:mt-0">
            {entry.referrerUrl || "Direct / Direct Portfolio Link"}
          </span>
        </div>

        {/* Client IP Row */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2">
          <span className="w-36 text-[#8f94a0] uppercase shrink-0 font-medium">
            CLIENT IP:
          </span>
          <span className="text-[#8f94a0] mt-0.5 sm:mt-0">
            {entry.maskedIp}
          </span>
        </div>
      </div>

      {/* Footer matching email */}
      <div className="pt-3 mt-3 border-t border-[#1a1d24] text-[10px] text-[#8f94a0] text-center flex flex-col sm:flex-row items-center justify-between gap-1">
        <span>Automated Pit-Wall Telemetry System // sparshgoswami.dev</span>
        <span className="text-[#e10600]">STATUS: VERIFIED RECORD</span>
      </div>
    </div>
  );
}
