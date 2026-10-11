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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatus("idle");
    setResponseMessage("");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      let delivered = false;

      // 1. Submit directly via Web3Forms API if access key is available in environment
      if (accessKey) {
        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: accessKey,
              name: formData.name,
              email: formData.email,
              subject: formData.subject || `Portfolio Inquiry from ${formData.name}`,
              message: formData.message,
              from_name: `${formData.name} (Portfolio Inquiry)`,
            }),
          });

          const data = await response.json();
          if (response.ok && data.success) {
            delivered = true;
          }
        } catch (web3Err) {
          console.warn("Direct Web3Forms submission failed, using server fallback:", web3Err);
        }
      }

      // 2. Fallback to internal API route if direct transmission did not succeed
      if (!delivered) {
        const fallbackRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && fallbackData.success) {
          delivered = true;
        } else {
          throw new Error(fallbackData.error || "Failed to deliver message");
        }
      }

      if (delivered) {
        setStatus("success");
        setResponseMessage(
          "Your message has been sent directly to Sparsh's inbox (1774.sparsh@gmail.com). Thank you for reaching out!"
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setResponseMessage("Network connection error. Please try again.");
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
            DIRECT INBOX DISPATCH
          </span>
        </div>

        <div className="border border-[#232730] bg-[#0b0c0e] p-6 sm:p-10 telemetry-bracket">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Direct Message Web Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f3f4f6] tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-sm sm:text-base text-[#8f94a0] leading-relaxed mt-2">
                  Send a message directly to my email inbox. Whether it is an internship
                  opportunity, technical collaboration, or project inquiry, I will get back to you promptly.
                </p>
              </div>

              {/* Success Notification Banner */}
              {status === "success" && (
                <div className="p-5 bg-[#14161b] border border-[#10b981] space-y-3">
                  <div className="flex items-center space-x-2 text-[#10b981] font-mono text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                    <span>STATUS: MESSAGE DELIVERED TO INBOX</span>
                  </div>
                  <p className="text-sm text-[#f3f4f6] leading-relaxed">
                    {responseMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="px-4 py-2 border border-[#373e4d] hover:border-[#10b981] text-xs font-mono text-[#f3f4f6] uppercase tracking-wider bg-[#0b0c0e] transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              )}

              {/* Error Notification Banner */}
              {status === "error" && (
                <div className="p-4 bg-[#1e1012] border border-[#e10600] text-xs font-mono text-[#f3f4f6] flex items-center justify-between">
                  <span>{responseMessage}</span>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="underline text-[#e10600] ml-2"
                  >
                    DISMISS
                  </button>
                </div>
              )}

              {/* The Web Form */}
              {status !== "success" && (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="contact-name" className="text-[#8f94a0] uppercase block mb-1.5 font-bold">
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
                      <label htmlFor="contact-email" className="text-[#8f94a0] uppercase block mb-1.5 font-bold">
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
                    <label htmlFor="contact-subject" className="text-[#8f94a0] uppercase block mb-1.5 font-bold">
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
                    <label htmlFor="contact-message" className="text-[#8f94a0] uppercase block mb-1.5 font-bold">
                      MESSAGE <span className="text-[#e10600]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Sparsh, I came across your portfolio and would love to connect regarding..."
                      className="w-full px-3.5 py-2.5 bg-[#121418] border border-[#232730] text-[#f3f4f6] placeholder-[#4a5568] focus:border-[#e10600] focus:outline-none transition-colors font-sans text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-[#e10600] hover:bg-[#b80500] disabled:bg-[#551010] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all inline-flex items-center space-x-2 border border-[#e10600] shadow-lg shadow-[#e10600]/20 cursor-pointer"
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
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Direct Contact Info & Verification Badge */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Email Quick Box */}
              <div className="p-5 bg-[#14161b] border border-[#232730] space-y-3 font-mono">
                <span className="text-[10px] text-[#8f94a0] uppercase block tracking-wider font-bold">
                  DIRECT EMAIL INBOX
                </span>
                <div className="text-base font-bold text-[#f3f4f6] break-all">
                  {siteConfig.email}
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="w-full py-2.5 border border-[#373e4d] hover:border-[#e10600] text-xs text-[#f3f4f6] uppercase tracking-wider transition-colors bg-[#0b0c0e] font-bold"
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
                  <span className="text-[#10b981]">ACCEPTING MESSAGES</span>
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
                    <span>RESPONSE TIME:</span>
                    <span className="text-[#10b981]">WITHIN 24 HOURS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-[#f3f4f6]">OPEN TO OPPORTUNITIES</span>
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

// Named export for compatibility
export { RadioContactSection as ContactSection };
