"use client";

import { useState, FormEvent } from "react";
import { siteConfig } from "@/data/site";

export function RadioContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyMessageDraft = () => {
    const draftText = `From: ${formData.name} (${formData.email})\nSubject: ${formData.subject || "Portfolio Inquiry"}\n\n${formData.message}`;
    navigator.clipboard.writeText(draftText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      // 1. Post to internal Next.js API endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // 2. Prepare mailto URL with formatted body
      const mailtoSubject = encodeURIComponent(
        formData.subject ? `[Portfolio] ${formData.subject}` : `[Portfolio Inquiry] From ${formData.name}`
      );
      const mailtoBody = encodeURIComponent(
        `Hi Sparsh,\n\n${formData.message}\n\n---\nBest regards,\n${formData.name}\nEmail: ${formData.email}`
      );
      const mailtoUrl = `mailto:${siteConfig.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Open user's email client
      window.location.href = mailtoUrl;

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      // Fallback direct mailto trigger
      const fallbackUrl = `mailto:${siteConfig.email}?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = fallbackUrl;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
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
            CONTACT
          </span>
          <span className="font-mono text-xs text-[#8f94a0] uppercase">
            DIRECT MAIL SERVICE
          </span>
        </div>

        <div className="border border-[#232730] bg-[#0b0c0e] p-6 sm:p-10 telemetry-bracket">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Direct Message Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f3f4f6] tracking-tight">
                  Send a Direct Message
                </h2>
                <p className="text-sm sm:text-base text-[#8f94a0] leading-relaxed mt-2">
                  Have an opportunity, internship inquiry, or technical collaboration?
                  Fill out the form below to send an email directly to my inbox.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-[#14161b] border border-[#10b981] space-y-4">
                  <div className="flex items-center space-x-2 text-[#10b981] font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span>STATUS: EMAIL CLIENT OPENED & READY TO TRANSMIT</span>
                  </div>
                  <p className="text-sm text-[#f3f4f6]">
                    Your message has been prepared for <span className="text-[#10b981] font-mono">{siteConfig.email}</span>. If your mail client didn&apos;t open automatically, you can copy the formatted draft below.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopyMessageDraft}
                      className="px-4 py-2 border border-[#373e4d] hover:border-[#e10600] text-xs font-mono text-[#f3f4f6] uppercase tracking-wider bg-[#0b0c0e] transition-colors"
                    >
                      {copiedMessage ? "DRAFT COPIED" : "COPY MESSAGE DRAFT"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2 border border-[#373e4d] hover:border-[#8f94a0] text-xs font-mono text-[#8f94a0] hover:text-white uppercase tracking-wider bg-[#0b0c0e] transition-colors"
                    >
                      WRITE ANOTHER MESSAGE
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="contact-name" className="text-[#8f94a0] uppercase block mb-1.5">
                        YOUR NAME <span className="text-[#e10600]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 bg-[#121418] border border-[#232730] text-[#f3f4f6] placeholder-[#4a5568] focus:border-[#e10600] focus:outline-none transition-colors font-sans text-sm"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label htmlFor="contact-email" className="text-[#8f94a0] uppercase block mb-1.5">
                        YOUR EMAIL <span className="text-[#e10600]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#121418] border border-[#232730] text-[#f3f4f6] placeholder-[#4a5568] focus:border-[#e10600] focus:outline-none transition-colors font-sans text-sm"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="contact-subject" className="text-[#8f94a0] uppercase block mb-1.5">
                      SUBJECT / TOPIC
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Internship Opportunity / Project Collaboration / Inquiry"
                      className="w-full px-3.5 py-2.5 bg-[#121418] border border-[#232730] text-[#f3f4f6] placeholder-[#4a5568] focus:border-[#e10600] focus:outline-none transition-colors font-sans text-sm"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label htmlFor="contact-message" className="text-[#8f94a0] uppercase block mb-1.5">
                      MESSAGE <span className="text-[#e10600]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Sparsh, I came across your portfolio and wanted to reach out regarding..."
                      className="w-full px-3.5 py-2.5 bg-[#121418] border border-[#232730] text-[#f3f4f6] placeholder-[#4a5568] focus:border-[#e10600] focus:outline-none transition-colors font-sans text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 bg-[#e10600] hover:bg-[#b80500] disabled:bg-[#551010] text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center space-x-2 border border-[#e10600]"
                    >
                      <span>{isSubmitting ? "PREPARING DISPATCH..." : "TRANSMIT MESSAGE"}</span>
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
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Direct Contact Info & Verification Badge */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Email Quick Box */}
              <div className="p-5 bg-[#14161b] border border-[#232730] space-y-3 font-mono">
                <span className="text-[10px] text-[#8f94a0] uppercase block tracking-wider">
                  DIRECT EMAIL INBOX
                </span>
                <div className="text-base font-bold text-[#f3f4f6] break-all">
                  {siteConfig.email}
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full py-2 border border-[#373e4d] hover:border-[#e10600] text-xs text-[#f3f4f6] uppercase tracking-wider transition-colors bg-[#0b0c0e]"
                >
                  {copiedEmail ? "COPIED TO CLIPBOARD" : "COPY EMAIL ADDRESS"}
                </button>
              </div>

              {/* Status / Communication Specs */}
              <div className="p-5 bg-[#121418] border border-[#232730] font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#232730] pb-2 text-[#8f94a0]">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-[#f3f4f6] font-semibold">INBOX STATUS</span>
                  </div>
                  <span className="text-[#10b981]">ACTIVE</span>
                </div>

                <div className="space-y-2 text-[#8f94a0]">
                  <div className="flex justify-between">
                    <span>NAME:</span>
                    <span className="text-[#f3f4f6] font-bold">SPARSH GOSWAMI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LOCATION:</span>
                    <span className="text-[#f3f4f6]">NAGPUR, INDIA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RESPONSE:</span>
                    <span className="text-[#10b981]">WITHIN 24 HOURS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>OPPORTUNITIES:</span>
                    <span className="text-[#f3f4f6]">INTERNSHIPS & RESEARCH</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232730] flex flex-wrap gap-2">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 border border-[#232730] hover:border-[#8f94a0] text-[#8f94a0] hover:text-white transition-colors bg-[#0b0c0e]"
                  >
                    GITHUB
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 border border-[#232730] hover:border-[#8f94a0] text-[#8f94a0] hover:text-white transition-colors bg-[#0b0c0e]"
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
