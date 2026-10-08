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

export default function Home() {
  // Initialize Lenis smooth scroll once
  useLenis();

  const [activeSection, setActiveSection] = useState("hero");

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
    <div className="min-h-screen bg-[#070809] text-[#f3f4f6]">
      {/* Pit Wall Top Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Main Control Room Layout */}
      <main>
        <HeroSection />
        <DriverProfile />
        <RaceEngineeringSection />
        <GarageSection />
        <TelemetrySection />
        <RaceLogSection />
        <GridSection />
        <RadioContactSection />
      </main>

      {/* Engineering Footer */}
      <Footer />
    </div>
  );
}
