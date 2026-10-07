"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { externalLinks } from "@/data/links";

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
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
            ? "bg-[#070809]/90 backdrop-blur-md border-b border-[#232730] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Driver Identity and Telemetry Status */}
            <a
              href="#"
              className="flex items-center space-x-3 group focus:outline-none focus:ring-1 focus:ring-[#e10600]"
            >
              <div className="w-2.5 h-7 bg-[#e10600] transition-transform duration-200 group-hover:scale-y-110" />
              <div>
                <span className="font-mono text-xs tracking-widest text-[#e10600] font-bold block uppercase">
                  SG // DEV CONTROL
                </span>
                <span className="font-mono text-sm tracking-tight text-[#f3f4f6] font-semibold block">
                  SPARSH GOSWAMI
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-1.5 ml-4 pl-4 border-l border-[#232730]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-f1-pulse inline-block" />
                <span className="font-mono text-[10px] tracking-wider text-[#8f94a0] uppercase">
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
                        ? "border-[#e10600] text-[#f3f4f6] bg-[#14161b]"
                        : "border-transparent text-[#8f94a0] hover:text-[#f3f4f6] hover:border-[#373e4d]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Quick Telemetry Actions */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href={externalLinks.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 border border-[#373e4d] text-[#8f94a0] hover:text-[#f3f4f6] hover:border-[#e10600] transition-colors"
              >
                RESUME
              </a>
              <a
                href="#radio"
                className="font-mono text-xs tracking-wider uppercase px-4 py-1.5 bg-[#e10600] text-[#f3f4f6] font-semibold hover:bg-[#b80500] transition-colors flex items-center space-x-1.5"
              >
                <span>RADIO</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#8f94a0] hover:text-[#f3f4f6] border border-[#232730] focus:outline-none focus:ring-1 focus:ring-[#e10600]"
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
        <div className="fixed inset-0 z-40 bg-[#070809] pt-20 px-6 pb-8 lg:hidden flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="border-b border-[#232730] pb-4 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase">
                RACE CONTROL MENU
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-f1-pulse" />
                <span className="font-mono text-[10px] text-[#8f94a0]">ONLINE</span>
              </div>
            </div>

            <nav className="flex flex-col space-y-2">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-base tracking-wider py-3 border-b border-[#14161b] flex items-center justify-between text-[#f3f4f6] hover:text-[#e10600] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#8f94a0] font-sans">{item.hint}</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#232730] space-y-3">
            <a
              href={externalLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center font-mono text-xs tracking-wider uppercase py-3 border border-[#373e4d] text-[#f3f4f6]"
            >
              DOWNLOAD RESUME (PDF)
            </a>
            <a
              href="#radio"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block text-center font-mono text-xs tracking-wider uppercase py-3 bg-[#e10600] text-white font-semibold"
            >
              CONTACT RADIO
            </a>
          </div>
        </div>
      )}
    </>
  );
}
