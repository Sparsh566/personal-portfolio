"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import { externalLinks } from "@/data/links";

export function RadioContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="radio"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-2 h-6 bg-[#e10600]" />
          <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
            TEAM RADIO // DISPATCH
          </span>
          <span className="font-mono text-xs text-[#8f94a0] uppercase">
            [ CONTACT THE ENGINEER ]
          </span>
        </div>

        <div className="border border-[#232730] bg-[#0b0c0e] p-8 sm:p-12 telemetry-bracket">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#f3f4f6] tracking-tight">
                Let&apos;s build something.
              </h2>
              <p className="text-base sm:text-lg text-[#8f94a0] leading-relaxed max-w-xl">
                Have an idea, opportunity, collaboration, or interesting problem?
                Reach out directly via radio dispatch. I am available for software engineering
                internships, AI research roles, and technical collaborations.
              </p>

              {/* Direct Frequency / Email Bar */}
              <div className="p-4 bg-[#14161b] border border-[#232730] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
                <div>
                  <span className="text-[10px] text-[#8f94a0] uppercase block">
                    RADIO FREQUENCY // DIRECT INBOX
                  </span>
                  <span className="text-base font-bold text-[#f3f4f6]">
                    {siteConfig.email}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-2 border border-[#373e4d] hover:border-[#e10600] text-xs text-[#f3f4f6] uppercase tracking-wider transition-colors bg-[#0b0c0e]"
                >
                  {copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={externalLinks.email}
                  className="px-6 py-3 bg-[#e10600] hover:bg-[#b80500] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center space-x-2"
                >
                  <span>SEND MESSAGE</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>

                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[#373e4d] hover:border-[#e10600] text-[#f3f4f6] font-mono text-xs uppercase tracking-wider transition-colors bg-[#121418]"
                >
                  GITHUB PROFILE
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[#373e4d] hover:border-[#e10600] text-[#f3f4f6] font-mono text-xs uppercase tracking-wider transition-colors bg-[#121418]"
                >
                  LINKEDIN
                </a>
              </div>
            </div>

            {/* Right Telemetry Transmission Box */}
            <div className="lg:col-span-5 bg-[#121418] border border-[#232730] p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#232730] pb-3 text-[#8f94a0]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-f1-pulse" />
                  <span className="text-[#f3f4f6] font-semibold">CHANNEL OPEN</span>
                </div>
                <span>FREQ: 142.85 MHZ</span>
              </div>

              <div className="space-y-2 text-[#8f94a0]">
                <div className="flex justify-between">
                  <span>DISPATCH CALLSIGN:</span>
                  <span className="text-[#f3f4f6] font-bold">SPARSH GOSWAMI</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-[#f3f4f6]">NAGPUR, INDIA</span>
                </div>
                <div className="flex justify-between">
                  <span>INSTITUTE:</span>
                  <span className="text-[#f3f4f6]">SIT NAGPUR</span>
                </div>
                <div className="flex justify-between">
                  <span>RESPONSE WINDOW:</span>
                  <span className="text-[#10b981]">WITHIN 24 HOURS</span>
                </div>
                <div className="flex justify-between">
                  <span>ENCRYPTION:</span>
                  <span className="text-[#f3f4f6]">END-TO-END TLS</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#232730] text-[10px] text-[#8f94a0] leading-relaxed">
                TRANSMISSION VERIFIED. READY FOR TECHNICAL INQUIRIES, INTERNSHIP PROPOSALS, AND SYSTEMS DISCUSSIONS.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
