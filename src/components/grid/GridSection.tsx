"use client";

import { useState } from "react";
import { patentCatalog, certificationCatalog } from "@/data/certifications";
import { siteConfig } from "@/data/site";
import { CertificationItem } from "@/types";
import { CertificateModal } from "./CertificateModal";

export function GridSection() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section
      id="grid"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-2 h-6 bg-[#e10600]" />
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
                EDUCATION & CREDENTIALS
              </span>
              <span className="font-mono text-xs text-[#8f94a0] uppercase">
                ACADEMICS, PATENTS & CERTIFICATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Patents, Academic Base & Certifications
            </h2>
          </div>

          <div className="font-mono text-xs text-[#10b981]">
            02 PATENTS PUBLISHED // OFFICIALLY REGISTERED
          </div>
        </div>

        {/* 1. Education Banner */}
        <div className="bg-[#0b0c0e] border border-[#232730] p-6 telemetry-bracket mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#232730] pb-4 mb-4 gap-2">
            <div>
              <span className="font-mono text-xs text-[#e10600] font-bold uppercase">
                ACADEMIC FOUNDATION
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#f3f4f6] mt-1">
                {siteConfig.educationInstitute}
              </h3>
            </div>
            <div className="font-mono text-xs text-right">
              <span className="text-[#f3f4f6] font-semibold block">2024 - PRESENT</span>
              <span className="text-[#10b981] block">CURRENT: 2ND YEAR</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div>
              <span className="text-[#8f94a0] uppercase block">DEGREE PROGRAM</span>
              <span className="text-sm text-[#f3f4f6] font-semibold mt-1 block">
                {siteConfig.degree}
              </span>
              <p className="text-xs text-[#8f94a0] mt-2 font-sans leading-relaxed">
                Focused coursework in Data Structures, Object-Oriented Programming,
                Machine Learning, and Embedded Systems.
              </p>
            </div>
            <div>
              <span className="text-[#8f94a0] uppercase block">CORE INTERESTS</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  "AI & Machine Learning",
                  "Software Engineering",
                  "Distributed Systems",
                  "Cybersecurity",
                  "Embedded Systems",
                  "Robotics",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 bg-[#14161b] border border-[#232730] text-[11px] text-[#f3f4f6]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Published Indian Patents Showcase */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#10b981] font-bold tracking-wider uppercase">
              PUBLISHED PATENTS // GOVERNMENT OF INDIA
            </span>
            <span className="text-[#8f94a0]">THE PATENT OFFICE JOURNAL</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {patentCatalog.map((patent) => (
              <div
                key={patent.id}
                className="bg-[#0b0c0e] border border-[#232730] hover:border-[#10b981] transition-colors p-6 telemetry-bracket flex flex-col justify-between"
              >
                <div>
                  {/* Patent Header */}
                  <div className="flex items-center justify-between border-b border-[#232730] pb-3 mb-4 font-mono text-xs">
                    <span className="text-[#10b981] font-bold">
                      APPLICATION NO: {patent.appNo}
                    </span>
                    <span className="px-2 py-0.5 bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-[10px]">
                      {patent.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#f3f4f6] leading-snug">
                    {patent.title}
                  </h3>

                  <div className="mt-3 space-y-1 font-mono text-[11px] text-[#8f94a0]">
                    <div>JOURNAL: {patent.journal}</div>
                    <div>PUBLICATION DATE: {patent.publicationDate}</div>
                    <div>APPLICANT: {patent.applicant}</div>
                    <div>INVENTORS: {patent.inventors.join(", ")}</div>
                  </div>

                  <p className="text-xs text-[#8f94a0] mt-4 leading-relaxed font-sans border-t border-[#232730] pt-3">
                    {patent.abstract}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#232730] flex items-center justify-between font-mono text-[10px] text-[#8f94a0]">
                  <span>JURISDICTION: INDIA</span>
                  <span className="text-[#10b981]">OFFICIALLY PUBLISHED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Verified Certifications Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-[#e10600] font-bold tracking-wider uppercase">
              VERIFIED TECHNICAL CERTIFICATIONS
            </span>
            <span className="text-[#8f94a0]">CREDENTIAL VERIFICATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificationCatalog.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#0b0c0e] border border-[#232730] hover:border-[#373e4d] transition-colors p-5 flex flex-col justify-between font-mono"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#8f94a0] pb-2 border-b border-[#232730]">
                    <span>{cert.issuer}</span>
                    <span>{cert.issueDate}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#f3f4f6] font-sans mt-3">
                    {cert.title}
                  </h4>

                  {cert.hours && (
                    <span className="inline-block mt-1 text-[11px] text-[#e10600] font-semibold">
                      LENGTH: {cert.hours}
                    </span>
                  )}

                  <div className="mt-3 flex flex-wrap gap-1">
                    {cert.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 bg-[#14161b] text-[10px] text-[#8f94a0]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#232730] flex items-center justify-between text-[11px]">
                  {cert.credentialId ? (
                    <span className="text-[#8f94a0] text-[9px] truncate max-w-[120px]">
                      ID: {cert.credentialId}
                    </span>
                  ) : (
                    <span className="text-[#8f94a0] text-[9px]">VERIFIED</span>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="px-2.5 py-1 bg-[#e10600]/10 hover:bg-[#e10600] text-[#e10600] hover:text-white border border-[#e10600]/40 hover:border-[#e10600] transition-colors font-bold text-[10px] inline-flex items-center space-x-1"
                  >
                    <span>VIEW CERTIFICATE</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Direct Certificate Modal Preview */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
