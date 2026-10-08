"use client";

import { useEffect } from "react";
import { CertificationItem } from "@/types";

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0b0c0e] border-2 border-[#232730] p-6 sm:p-8 telemetry-bracket shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8f94a0] hover:text-[#f3f4f6] font-mono text-xs border border-[#232730] hover:border-[#e10600] px-3 py-1 bg-[#14161b] transition-colors"
          aria-label="Close modal"
        >
          CLOSE [ESC]
        </button>

        {/* Certificate Display Canvas */}
        <div className="relative border-4 border double border-[#232730] bg-gradient-to-b from-[#121418] via-[#0d0f12] to-[#070809] p-6 sm:p-10 text-center my-4 overflow-hidden">
          {/* Subtle Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <span className="font-mono text-7xl font-extrabold text-white">
              VERIFIED
            </span>
          </div>

          {/* Top Seal / Header */}
          <div className="flex items-center justify-between border-b border-[#232730] pb-4 mb-6">
            <div className="text-left font-mono text-[10px] sm:text-xs text-[#8f94a0]">
              <span className="text-[#e10600] font-bold block">OFFICIAL CERTIFICATE</span>
              <span>ISSUER: {certificate.issuer.toUpperCase()}</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#e10600] flex items-center justify-center text-[#e10600] font-mono font-bold text-xs">
              SG
            </div>
            <div className="text-right font-mono text-[10px] sm:text-xs text-[#8f94a0]">
              <span className="text-[#10b981] font-bold block">STATUS: VERIFIED</span>
              <span>DATE: {certificate.issueDate}</span>
            </div>
          </div>

          {/* Recipient */}
          <div className="space-y-1 mb-6">
            <p className="font-mono text-xs text-[#8f94a0] uppercase tracking-widest">
              THIS IS PROUDLY CONFERRED UPON
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f3f4f6] tracking-wide uppercase">
              Sparsh Goswami
            </h3>
            <p className="text-xs text-[#8f94a0] max-w-md mx-auto">
              for successfully completing verified technical curriculum and demonstrative competency
            </p>
          </div>

          {/* Course / Certification Title */}
          <div className="py-4 px-6 bg-[#14161b] border border-[#232730] my-6">
            <h4 className="text-lg sm:text-xl font-bold text-[#f3f4f6]">
              {certificate.title}
            </h4>
            {certificate.hours && (
              <span className="inline-block mt-1 font-mono text-xs text-[#e10600] font-semibold">
                CURRICULUM DURATION: {certificate.hours}
              </span>
            )}
          </div>

          {/* Topics Covered */}
          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase text-[#8f94a0] block mb-2 tracking-wider">
              VERIFIED SYLLABUS & CORE DOMAINS
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto">
              {certificate.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2.5 py-0.5 bg-[#0b0c0e] border border-[#232730] font-mono text-[10px] text-[#f3f4f6]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Credentials */}
          <div className="border-t border-[#232730] pt-4 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-[#8f94a0] gap-2">
            <div>
              {certificate.credentialId && (
                <span>CREDENTIAL ID: {certificate.credentialId}</span>
              )}
            </div>
            <div className="text-[#10b981] font-semibold">
              AUTHENTICATED RECORD // 2026
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 font-mono text-xs">
          <span className="text-[#8f94a0] text-[11px]">
            DIRECT VERIFIED PREVIEW
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#e10600] text-white hover:bg-[#b80500] font-bold uppercase transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
