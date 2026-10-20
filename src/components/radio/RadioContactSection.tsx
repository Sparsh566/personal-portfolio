"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/data/site";

export function RadioContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const mailtoSubject = encodeURIComponent(
    formData.subject
      ? `[Portfolio] ${formData.subject}`
      : `[Portfolio] Message from ${formData.name || "Visitor"}`
  );
  const mailtoBody = encodeURIComponent(
    `Name: ${formData.name || "N/A"}\nEmail: ${formData.email || "N/A"}\n\nMessage:\n${formData.message || "(No message entered)"}`
  );

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteConfig.email}&su=${mailtoSubject}&body=${mailtoBody}`;
  const mailtoUrl = `mailto:${siteConfig.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const handleCopyFormattedMessage = () => {
    const text = `To: ${siteConfig.email}\nSubject: ${formData.subject || "Portfolio Inquiry"}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus("success");
        setResponseMessage(
          data.message ||
            `Your message has been dispatched directly to Sparsh's inbox (${siteConfig.email}). Thank you for reaching out!`
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setResponseMessage(
          data?.message ||
            data?.error ||
            "Direct automated dispatch service is currently unavailable. Use the instant 1-click Gmail or Mail App fallback below to send without retyping."
        );
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setResponseMessage(
        "Network connection interrupted. Your message is preserved below — click Open in Gmail or Mail App to transmit directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="radio"
      className="py-24 bg-[#000000] border-b border-[#1a1c2e] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-2 h-6 bg-[#ff003f]" />
          <span className="font-mono text-xs tracking-widest text-[#ff003f] uppercase font-bold">
            CONTACT
          </span>
          <span className="font-mono text-xs text-[#9496a8] uppercase">
            DIRECT INBOX DISPATCH // SPARSH GOSWAMI
          </span>
        </div>

        <div className="border border-[#1a1c2e] bg-[#050508] p-6 sm:p-10 telemetry-bracket">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Direct Message Web Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-[#9496a8] leading-relaxed mt-2">
                  Send a message directly to my email inbox (<span className="text-[#818cf8] font-mono">{siteConfig.email}</span>). Whether it is an internship
                  opportunity, technical collaboration, or project inquiry, I will get back to you promptly.
                </p>
              </div>

              {/* Success Notification Banner */}
              {status === "success" && (
                <div className="p-5 bg-[#0a0b12] border border-[#10b981] space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-[#10b981] font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                    <span>STATUS: MESSAGE DELIVERED TO INBOX</span>
                  </div>
                  <p className="text-sm text-[#f8fafc] leading-relaxed">
                    {responseMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-4 py-2 border border-[#2b2e4a] hover:border-[#10b981] text-xs font-mono text-[#f8fafc] uppercase tracking-wider bg-[#050508] transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              )}

              {/* Smart Fallback & Error Banner */}
              {status === "error" && (
                <div className="p-5 bg-[#19080c] border-2 border-[#ff003f] space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-2 text-[#ff003f] font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#ff003f]" />
                    <span>DIRECT RELAY BACKUP TRIGGERED</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#f8fafc] leading-relaxed font-sans">
                    {responseMessage}
                  </p>

                  <div className="pt-2 border-t border-[#371518] flex flex-wrap gap-2 font-mono text-xs">
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#ff003f] hover:bg-[#ff2a5b] text-white font-bold uppercase transition-colors inline-flex items-center space-x-1.5 shadow-md shadow-[#ff003f]/25"
                    >
                      <span>OPEN IN GMAIL [1-CLICK]</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>

                    <a
                      href={mailtoUrl}
                      className="px-4 py-2 border border-[#2b2e4a] hover:border-white text-[#f8fafc] font-bold uppercase transition-colors bg-[#050508]"
                    >
                      OPEN MAIL APP (MAILTO)
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyFormattedMessage}
                      className="px-3.5 py-2 border border-[#2b2e4a] hover:border-[#9496a8] text-[#9496a8] hover:text-white uppercase transition-colors bg-[#050508]"
                    >
                      {copiedMessage ? "MESSAGE COPIED!" : "COPY MESSAGE"}
                    </button>
                  </div>
                </div>
              )}

              {/* The Web Form */}
              {status !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="contact-name" className="text-[#9496a8] uppercase block mb-1.5 font-bold">
                        YOUR NAME <span className="text-[#ff003f]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-[#0a0b12] border border-[#1a1c2e] text-[#f8fafc] placeholder-[#4a5568] focus:border-[#ff003f] focus:outline-none transition-colors font-sans text-sm"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="contact-email" className="text-[#9496a8] uppercase block mb-1.5 font-bold">
                        YOUR EMAIL <span className="text-[#ff003f]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#0a0b12] border border-[#1a1c2e] text-[#f8fafc] placeholder-[#4a5568] focus:border-[#ff003f] focus:outline-none transition-colors font-sans text-sm"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="contact-subject" className="text-[#9496a8] uppercase block mb-1.5 font-bold">
                      SUBJECT / TOPIC
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship Opportunity / Project Collaboration / Inquiry"
                      className="w-full px-3.5 py-2.5 bg-[#0a0b12] border border-[#1a1c2e] text-[#f8fafc] placeholder-[#4a5568] focus:border-[#ff003f] focus:outline-none transition-colors font-sans text-sm"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="contact-message" className="text-[#9496a8] uppercase block mb-1.5 font-bold">
                      MESSAGE <span className="text-[#ff003f]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Sparsh, I came across your portfolio and would love to connect regarding..."
                      className="w-full px-3.5 py-2.5 bg-[#0a0b12] border border-[#1a1c2e] text-[#f8fafc] placeholder-[#4a5568] focus:border-[#ff003f] focus:outline-none transition-colors font-sans text-sm resize-none"
                    />
                  </div>

                  {/* Submit & 1-Click Action Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-[#ff003f] hover:bg-[#ff2a5b] disabled:bg-[#4a0815] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all inline-flex items-center space-x-2 border border-[#ff003f] shadow-lg shadow-[#ff003f]/25 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>SENDING TO INBOX...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="square"
                              strokeLinejoin="miter"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Pre-filled 1-Click Gmail Action */}
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 border border-[#2b2e4a] hover:border-[#6366f1] text-[#f8fafc] font-mono text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center space-x-2 bg-[#0a0b12]"
                      title="Open message in Gmail compose window directly"
                    >
                      <span>SEND VIA GMAIL</span>
                      <svg className="w-3.5 h-3.5 text-[#9496a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Direct Contact Info & Verification Badge */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Email Quick Box */}
              <div className="p-5 bg-[#0a0b12] border border-[#1a1c2e] space-y-3 font-mono">
                <span className="text-[10px] text-[#9496a8] uppercase block tracking-wider font-bold">
                  DIRECT EMAIL INBOX
                </span>
                <div className="text-base font-bold text-[#818cf8] break-all">
                  {siteConfig.email}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full py-2.5 border border-[#2b2e4a] hover:border-[#6366f1] text-xs text-[#f8fafc] uppercase tracking-wider transition-colors bg-[#050508] font-bold cursor-pointer"
                  >
                    {copiedEmail ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}
                  </button>

                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 border border-[#ff003f]/80 bg-[#ff003f]/10 hover:bg-[#ff003f] text-xs text-center text-white uppercase tracking-wider transition-colors font-bold inline-flex items-center justify-center space-x-1 shadow-sm shadow-[#ff003f]/20"
                  >
                    <span>OPEN GMAIL</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Status / Communication Specs */}
              <div className="p-5 bg-[#0f101a] border border-[#1a1c2e] font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#1a1c2e] pb-2 text-[#9496a8]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-[#f8fafc] font-semibold">INBOX STATUS</span>
                  </div>
                  <span className="text-[#10b981]">ACCEPTING INQUIRIES</span>
                </div>

                <div className="space-y-2 text-[#9496a8]">
                  <div className="flex justify-between">
                    <span>RECIPIENT:</span>
                    <span className="text-[#f8fafc] font-bold">SPARSH GOSWAMI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LOCATION:</span>
                    <span className="text-[#f8fafc]">NAGPUR, INDIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RESPONSE TIME:</span>
                    <span className="text-[#10b981]">WITHIN 24 HOURS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AVAILABILITY:</span>
                    <span className="text-[#818cf8]">OPEN TO OPPORTUNITIES</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#1a1c2e] flex flex-wrap gap-2">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 border border-[#1a1c2e] hover:border-[#6366f1] text-[#9496a8] hover:text-white transition-colors bg-[#050508]"
                  >
                    GITHUB
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 border border-[#1a1c2e] hover:border-[#6366f1] text-[#9496a8] hover:text-white transition-colors bg-[#050508]"
                  >
                    LINKEDIN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { RadioContactSection as ContactSection };
