"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Navigation } from "@/components/common/Navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { DriverProfile } from "@/components/profile/DriverProfile";
import { RaceEngineeringSection } from "@/components/race-engineering/RaceEngineeringSection";
import { GarageSection } from "@/components/garage/GarageSection";
import { TelemetrySection } from "@/components/telemetry/TelemetrySection";
import { RaceLogSection } from "@/components/race-log/RaceLogSection";
import { GridSection } from "@/components/grid/GridSection";
import { RadioContactSection } from "@/components/radio/RadioContactSection";
import { Footer } from "@/components/common/Footer";
import { ResumeModal } from "@/components/common/ResumeModal";

export default function Home() {
  // Initialize Lenis smooth scroll once
  useLenis();

  const [activeSection, setActiveSection] = useState("hero");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Track active section for top navigation
  useEffect(() => {
    const sectionIds = [
      "hero",
      "profile",
      "race-engineering",
      "garage",
      "telemetry",
      "race-log",
      "grid",
      "radio",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f8fafc] relative">
      {/* Background Cyber Technical Grid & Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute inset-0 f1-grid-bg opacity-80" />
        <div className="absolute top-[20%] -left-32 w-[650px] h-[650px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08),transparent_70%)] blur-[120px]" />
        <div className="absolute top-[50%] -right-32 w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,0,63,0.06),transparent_70%)] blur-[130px]" />
        <div className="absolute top-[75%] left-1/4 w-[750px] h-[750px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.07),transparent_70%)] blur-[140px]" />
      </div>

      {/* Pit Wall Top Navigation */}
      <Navigation
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Control Room Layout */}
      <main className="relative z-10">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <DriverProfile />
        <RaceEngineeringSection />
        <GarageSection />
        <TelemetrySection />
        <RaceLogSection />
        <GridSection />
        <RadioContactSection />
      </main>

      {/* Engineering Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Interactive Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
