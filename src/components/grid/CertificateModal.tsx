"use client";

import { useEffect, useState } from "react";
import { CertificationItem } from "@/types";
import { trackEvent } from "@/components/telemetry/VisitorTracker";

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const [activeTab, setActiveTab] = useState<"certificate" | "syllabus">("certificate");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (certificate) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      trackEvent("cert_view", `${certificate.issuer}: ${certificate.title}`);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#050508] border-2 border-[#1a1c2e] p-4 sm:p-6 md:p-8 telemetry-bracket shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1c2e] pb-4 mb-4 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-4 bg-[#ff003f]" />
              <span className="font-mono text-[10px] sm:text-xs text-[#ff003f] font-bold uppercase tracking-widest">
                VERIFIED CREDENTIAL // {certificate.issuer.toUpperCase()}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-[10px] text-[#10b981] uppercase">
                AUTHENTICATED
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc] mt-1 font-sans">
              {certificate.title}
            </h3>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {certificate.verifyUrl && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#ff003f] hover:bg-[#ff2a5b] text-white font-bold transition-colors inline-flex items-center space-x-1 border border-[#ff003f] shadow-md shadow-[#ff003f]/20"
              >
                <span>VERIFY ONLINE</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border border-[#1a1c2e] hover:border-[#ff003f] text-[#9496a8] hover:text-white transition-colors bg-[#0a0b12]"
              aria-label="Close modal"
            >
              ESC &times;
            </button>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex border-b border-[#1a1c2e] mb-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("certificate")}
            className={`px-4 py-2 font-bold transition-colors border-b-2 -mb-[1px] ${
              activeTab === "certificate"
                ? "border-[#ff003f] text-white bg-[#0a0b12]"
                : "border-transparent text-[#9496a8] hover:text-[#f8fafc]"
            }`}
          >
            OFFICIAL CERTIFICATE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("syllabus")}
            className={`px-4 py-2 font-bold transition-colors border-b-2 -mb-[1px] ${
              activeTab === "syllabus"
                ? "border-[#ff003f] text-white bg-[#0a0b12]"
                : "border-transparent text-[#9496a8] hover:text-[#f8fafc]"
            }`}
          >
            VERIFIED DOMAINS & SYLLABUS
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto min-h-0 bg-[#000000] border border-[#1a1c2e] p-3 sm:p-5">
          {activeTab === "certificate" ? (
            <div className="w-full flex justify-center">
              {/* 1. UDEMY CERTIFICATE LAYOUT */}
              {certificate.type === "udemy" && (
                <div className="w-full max-w-3xl bg-white text-[#1c1d1f] p-6 sm:p-10 border border-neutral-300 shadow-2xl relative select-none font-sans">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between border-b border-neutral-200 pb-5 mb-8">
                    {/* Udemy Logo */}
                    <div className="flex items-center space-x-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#a435f0] font-serif leading-none">
                        û
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1c1d1f] font-sans">
                        demy
                      </span>
                    </div>

                    {/* Metadata Box */}
                    <div className="text-right text-[10px] sm:text-xs text-neutral-500 font-mono space-y-0.5">
                      <div>Certificate no: <span className="text-neutral-800">{certificate.credentialId}</span></div>
                      <div>Certificate url: <span className="text-[#a435f0]">{certificate.verifyUrl?.replace("https://", "")}</span></div>
                      <div>Reference Number: 0004</div>
                    </div>
                  </div>

                  {/* Certificate Content */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-[11px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                        CERTIFICATE OF COMPLETION
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c1d1f] leading-tight font-serif">
                        {certificate.title}
                      </h2>
                    </div>

                    {certificate.instructor && (
                      <div className="text-sm sm:text-base text-neutral-700 font-sans">
                        <span className="text-neutral-500">Instructors</span> <span className="font-semibold text-neutral-900">{certificate.instructor}</span>
                      </div>
                    )}

                    <div className="pt-6 border-t border-neutral-200">
                      <div className="text-2xl sm:text-4xl font-extrabold text-[#1c1d1f] tracking-tight font-sans">
                        Sparsh Goswami
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-600 font-sans">
                        <div>
                          <span className="text-neutral-500">Date</span> <span className="font-semibold text-neutral-900">{certificate.issueDate}</span>
                        </div>
                        {certificate.hours && (
                          <div>
                            <span className="text-neutral-500">Length</span> <span className="font-semibold text-neutral-900">{certificate.hours}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. INFOSYS SPRINGBOARD CERTIFICATE LAYOUT */}
              {certificate.type === "infosys" && (
                <div className="w-full max-w-3xl bg-white text-[#1c1d1f] p-6 sm:p-10 border border-neutral-300 shadow-2xl relative select-none font-sans">
                  {/* Top Infosys Header */}
                  <div className="text-center mb-6">
                    <div className="inline-block">
                      <div className="text-3xl sm:text-4xl font-extrabold text-[#007cc3] tracking-tight">
                        Infosys<sup className="text-xs font-normal">&reg;</sup>
                      </div>
                      <div className="text-[10px] text-neutral-500 tracking-wider">
                        Navigate your next
                      </div>
                    </div>
                  </div>

                  {/* Course Completion Banner with Dashed Lines */}
                  <div className="flex items-center justify-center space-x-3 text-[#007cc3] font-mono text-xs sm:text-sm font-bold tracking-wider uppercase mb-8">
                    <span className="tracking-tighter opacity-70">|||||||||||||</span>
                    <span>COURSE COMPLETION CERTIFICATE</span>
                    <span className="tracking-tighter opacity-70">|||||||||||||</span>
                  </div>

                  {/* Recipient Award Body */}
                  <div className="text-center space-y-3 mb-8">
                    <p className="text-xs sm:text-sm text-neutral-600">
                      The certificate is awarded to
                    </p>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-[#007cc3] tracking-wide">
                      Sparsh Goswami
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600">
                      for successfully completing the course
                    </p>
                    <h4 className="text-lg sm:text-2xl font-bold text-neutral-900 max-w-xl mx-auto pt-1">
                      {certificate.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 pt-1">
                      on {certificate.issueDate}
                    </p>
                  </div>

                  {/* Springboard Ribbon & Congratulations */}
                  <div className="text-center space-y-2 mb-8 border-y border-neutral-200 py-4 bg-neutral-50/50">
                    <div className="text-xl sm:text-2xl font-bold text-neutral-800 flex items-center justify-center space-x-2">
                      <span className="text-[#007cc3]">Infosys</span>
                      <span className="text-neutral-400">|</span>
                      <span className="bg-gradient-to-r from-cyan-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
                        Springboard
                      </span>
                    </div>
                    <div className="text-sm sm:text-base font-serif italic text-[#eb4d2e]">
                      Congratulations! You make us proud!
                    </div>
                  </div>

                  {/* Verification QR and Official Signatory Footer */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                    {/* Left QR Code Box */}
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-16 h-16 border-2 border-neutral-400 p-1 bg-white flex items-center justify-center">
                        <svg className="w-full h-full text-neutral-900" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-5 0h3v3h-3v-3zm3 3h2v2h-2v-2zm3 0h2v5h-5v-2h3v-3zm-6 2h3v3h-3v-3zm0 3h3v2h-3v-2z" />
                        </svg>
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-600 font-mono space-y-0.5">
                        <div className="font-semibold text-neutral-800">Issued on: {certificate.issuedOnDetailed || certificate.issueDate}</div>
                        <div>To verify, scan the QR code at</div>
                        <a href="https://verify.onwingspan.com" target="_blank" rel="noopener noreferrer" className="text-[#007cc3] underline">
                          https://verify.onwingspan.com
                        </a>
                      </div>
                    </div>

                    {/* Right Signatory Signature */}
                    {certificate.signatory && (
                      <div className="text-center sm:text-right font-sans text-xs text-neutral-600 space-y-0.5">
                        <div className="font-serif italic text-lg text-neutral-800 font-bold border-b border-neutral-400 pb-1 mb-1 inline-block">
                          {certificate.signatory.name}
                        </div>
                        <div className="font-bold text-neutral-900">{certificate.signatory.name}</div>
                        <div className="text-[11px] text-neutral-500 max-w-xs">{certificate.signatory.title}</div>
                        <div className="text-[11px] text-neutral-500">{certificate.signatory.organization}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. RED HAT ACADEMY CERTIFICATE LAYOUT */}
              {certificate.type === "redhat" && (
                <div className="w-full max-w-3xl bg-[#f8f9fa] text-[#111827] border border-neutral-300 shadow-2xl relative select-none font-sans overflow-hidden">
                  {/* Top Red Hat Crimson Header Banner */}
                  <div className="bg-gradient-to-r from-[#cc0000] via-[#ee0000] to-[#800000] py-3.5 px-6 text-center text-white shadow-md">
                    <h2 className="font-mono text-sm sm:text-base font-bold tracking-widest uppercase">
                      CERTIFICATE OF ATTENDANCE
                    </h2>
                  </div>

                  <div className="p-6 sm:p-10 space-y-6">
                    {/* Recipient Award Section */}
                    <div className="text-center space-y-2">
                      <p className="text-[11px] sm:text-xs text-neutral-500 uppercase tracking-widest font-mono">
                        THIS IS TO CERTIFY THAT
                      </p>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                        Sparsh Goswami
                      </h3>
                      {certificate.institution && (
                        <p className="text-xs sm:text-sm font-semibold text-neutral-700">
                          {certificate.institution}
                        </p>
                      )}
                    </div>

                    {/* Course Announcement */}
                    <div className="text-center space-y-2 pt-2 border-t border-neutral-200">
                      <p className="text-[11px] sm:text-xs text-neutral-500 uppercase tracking-widest font-mono">
                        HAS SUCCESSFULLY ATTENDED THE COURSE
                      </p>
                      <h4 className="text-lg sm:text-2xl font-bold text-[#cc0000] max-w-xl mx-auto">
                        {certificate.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-600 font-mono pt-1">
                        {certificate.issueDate}
                      </p>
                    </div>

                    {/* Footer Row: Red Hat Logo & Karl Reynolds Signature */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-300">
                      {/* Left: Red Hat Brand */}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#cc0000] rounded-full flex items-center justify-center text-white">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                          </svg>
                        </div>
                        <div className="text-left font-sans">
                          <div className="font-extrabold text-neutral-900 leading-tight">Red Hat</div>
                          <div className="text-[10px] sm:text-[11px] text-neutral-600">Training and Certification</div>
                        </div>
                      </div>

                      {/* Right: Signature & Red Hat Academy */}
                      <div className="flex items-center space-x-6">
                        {certificate.signatory && (
                          <div className="text-center sm:text-right font-sans text-xs text-neutral-700">
                            <div className="font-serif italic text-lg sm:text-xl font-bold text-neutral-900 border-b border-neutral-400 pb-1 mb-1 inline-block">
                              {certificate.signatory.name}
                            </div>
                            <div className="font-bold uppercase text-[10px] text-neutral-900">
                              {certificate.signatory.name}
                            </div>
                            <div className="text-[10px] text-neutral-500 max-w-xs">
                              {certificate.signatory.title}
                            </div>
                          </div>
                        )}

                        <div className="px-2.5 py-1 bg-[#cc0000] text-white text-[10px] font-bold font-mono uppercase tracking-wider rounded-none">
                          Red Hat Academy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Syllabus / Topics Tab */
            <div className="p-6 space-y-6 text-xs sm:text-sm font-mono text-[#9496a8]">
              <div className="p-4 bg-[#0a0b12] border border-[#1a1c2e] space-y-2">
                <span className="text-[#ff003f] font-bold uppercase block">
                  CURRICULUM SPECIFICATION
                </span>
                <h4 className="text-base font-bold text-[#f8fafc]">
                  {certificate.title}
                </h4>
                <div className="text-xs text-[#9496a8]">
                  Issued by: <span className="text-[#f8fafc]">{certificate.issuer}</span> {"//"} Date: <span className="text-[#10b981]">{certificate.issueDate}</span>
                </div>
                {certificate.hours && (
                  <div className="text-xs text-[#818cf8]">
                    Verified Hours: {certificate.hours}
                  </div>
                )}
              </div>

              <div>
                <span className="text-[#f8fafc] font-bold uppercase block mb-3">
                  VERIFIED TOPICS & DEMONSTRATED COMPETENCIES:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certificate.topics.map((topic, i) => (
                    <div
                      key={topic}
                      className="p-3 bg-[#0f101a] border border-[#1a1c2e] flex items-center space-x-2"
                    >
                      <span className="text-[#818cf8] font-bold">0{i + 1}.</span>
                      <span className="text-[#f8fafc] font-sans">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {certificate.verifyUrl && (
                <div className="pt-4 border-t border-[#1a1c2e] flex items-center justify-between">
                  <span>Third-party institutional verification available.</span>
                  <a
                    href={certificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#ff003f] hover:bg-[#ff2a5b] text-white font-bold uppercase transition-colors shadow-md shadow-[#ff003f]/20"
                  >
                    OPEN VERIFICATION URL &rarr;
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="flex items-center justify-between pt-3 font-mono text-[10px] sm:text-xs text-[#9496a8]">
          <span>
            SPARSH GOSWAMI // {certificate.credentialId || "VERIFIED"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#ff003f] hover:underline uppercase font-bold"
          >
            CLOSE PREVIEW
          </button>
        </div>
      </div>
    </div>
  );
}
