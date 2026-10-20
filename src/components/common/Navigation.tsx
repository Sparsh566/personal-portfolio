"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { externalLinks } from "@/data/links";

interface NavigationProps {
  activeSection: string;
  onOpenResume?: () => void;
}

export function Navigation({ activeSection, onOpenResume }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#000000]/90 backdrop-blur-md border-b border-[#1a1c2e] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Driver Identity and Telemetry Status */}
            <a
              href="#"
              className="flex items-center space-x-3 group focus:outline-none focus:ring-1 focus:ring-[#ff003f]"
            >
              <div className="w-2.5 h-7 bg-[#ff003f] transition-transform duration-200 group-hover:scale-y-110 shadow-[0_0_8px_rgba(255,0,63,0.5)]" />
              <div>
                <span className="font-mono text-xs tracking-widest text-[#818cf8] font-bold block uppercase">
                  SG // DEV CONTROL
                </span>
                <span className="font-mono text-sm tracking-tight text-[#f8fafc] font-semibold block">
                  SPARSH GOSWAMI
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-1.5 ml-4 pl-4 border-l border-[#1a1c2e]">
                <span className="w-2 h-2 rounded-full bg-[#ff003f] animate-pulse inline-block" />
                <span className="font-mono text-[10px] tracking-wider text-[#9496a8] uppercase font-semibold">
                  SYS: ONLINE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs tracking-wider">
              {siteConfig.navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 transition-colors duration-150 border-b-2 ${
                      isActive
                        ? "border-[#6366f1] text-[#f8fafc] bg-[#0f101a] shadow-[0_2px_10px_rgba(99,102,241,0.2)]"
                        : "border-transparent text-[#9496a8] hover:text-[#f8fafc] hover:border-[#6366f1]/60"
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Quick Telemetry Actions */}
            <div className="hidden sm:flex items-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  if (onOpenResume) {
                    onOpenResume();
                  } else {
                    window.open(externalLinks.resume, "_blank");
                  }
                }}
                className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 border border-[#1a1c2e] text-[#9496a8] hover:text-[#f8fafc] hover:border-[#6366f1] transition-colors cursor-pointer bg-[#050508]"
              >
                RESUME
              </button>
              <a
                href="#radio"
                className="font-mono text-xs tracking-wider uppercase px-4 py-1.5 bg-[#6366f1] text-white font-bold hover:bg-[#4f46e5] transition-all flex items-center space-x-1.5 shadow-md shadow-[#6366f1]/25 border border-[#6366f1]"
              >
                <span>CONTACT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff003f] animate-pulse" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#9496a8] hover:text-[#f8fafc] border border-[#1a1c2e] focus:outline-none focus:ring-1 focus:ring-[#ff003f]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#000000] pt-20 px-6 pb-8 lg:hidden flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="border-b border-[#1a1c2e] pb-4 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-[#ff003f] uppercase font-bold">
                NAVIGATION MENU
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-f1-pulse" />
                <span className="font-mono text-[10px] text-[#9496a8]">ONLINE</span>
              </div>
            </div>

            <nav className="flex flex-col space-y-2">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-base tracking-wider py-3 border-b border-[#0f101a] flex items-center justify-between text-[#f8fafc] hover:text-[#ff003f] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#9496a8] font-sans">{item.hint}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#1a1c2e] space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenResume) {
                  onOpenResume();
                } else {
                  window.open(externalLinks.resume, "_blank");
                }
              }}
              className="w-full block text-center font-mono text-xs tracking-wider uppercase py-3 border border-[#6366f1]/80 bg-[#6366f1]/10 text-white font-bold cursor-pointer"
            >
              VIEW RESUME (PDF)
            </button>
            <a
              href="#radio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center font-mono text-xs tracking-wider uppercase py-3 bg-[#ff003f] text-white font-semibold shadow-lg shadow-[#ff003f]/25"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      )}
    </>
  );
}
