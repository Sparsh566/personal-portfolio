"use client";

import { siteConfig } from "@/data/site";

export function DriverProfile() {
  return (
    <section
      id="profile"
      className="py-24 bg-[#070809] border-b border-[#232730] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Identifier */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-2 h-6 bg-[#e10600]" />
          <span className="font-mono text-xs tracking-widest text-[#e10600] uppercase font-bold">
            ABOUT ME
          </span>
          <span className="font-mono text-xs text-[#8f94a0] uppercase">
            ENGINEERING PROFILE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Statement & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f3f4f6]">
              Building systems, not just projects.
            </h2>

            <div className="space-y-4 text-[#8f94a0] text-base sm:text-lg leading-relaxed">
              <p>
                I am a Computer Science student focused on AI, software development, and
                intelligent systems. I like working across the stack, from designing
                interfaces and backend systems to integrating AI models, APIs, data
                pipelines, and real-world technologies.
              </p>
              <p>
                My projects span agentic AI, multimodal search, enterprise complaint
                intelligence, engineering productivity, F1 telemetry simulation,
                blockchain, and interactive learning systems.
              </p>
              <p>
                Whether designing reverse auction smart contracts on Flow blockchain or
                calibrating dual-voltage hardware circuits on ESP32 rovers with sub-1.5s
                safety response times, my focus is building resilient software that solves
                tangible operational problems.
              </p>
            </div>

            {/* Academic Specs Box */}
            <div className="p-4 bg-[#0b0c0e] border border-[#232730] flex flex-col sm:flex-row justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-[#8f94a0] block uppercase">INSTITUTION</span>
                <span className="text-[#f3f4f6] font-semibold block mt-0.5">
                  {siteConfig.educationInstitute}
                </span>
              </div>
              <div>
                <span className="text-[#8f94a0] block uppercase">DEGREE & SPECIALIZATION</span>
                <span className="text-[#f3f4f6] font-semibold block mt-0.5">
                  {siteConfig.degree}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Telemetry Performance Readout */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[#232730] bg-[#0b0c0e] p-6 telemetry-bracket">
              <div className="flex items-center justify-between border-b border-[#232730] pb-3 mb-6 font-mono text-xs text-[#8f94a0]">
                <span className="text-[#e10600] font-bold">HIGHLIGHTS & METRICS</span>
                <span>STATUS: ACTIVE</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Metric 1 */}
                <div className="p-4 bg-[#14161b] border border-[#232730]">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#f3f4f6] block">
                    {siteConfig.stats.projectsCount}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-[#e10600] uppercase font-bold mt-1 block">
                    PROJECTS & SYSTEMS
                  </span>
                  <span className="text-[11px] text-[#8f94a0] block mt-1">
                    AI, Full Stack, Simulation
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="p-4 bg-[#14161b] border border-[#232730]">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#10b981] block">
                    {siteConfig.stats.patentsCount}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-[#10b981] uppercase font-bold mt-1 block">
                    PUBLISHED PATENTS
                  </span>
                  <span className="text-[11px] text-[#8f94a0] block mt-1">
                    Indian Patent Journal
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="p-4 bg-[#14161b] border border-[#232730]">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#e5a93c] block">
                    {siteConfig.stats.internshipsCount}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-[#e5a93c] uppercase font-bold mt-1 block">
                    INTERNSHIPS
                  </span>
                  <span className="text-[11px] text-[#8f94a0] block mt-1">
                    CodeAlpha & Elevate Labs
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="p-4 bg-[#14161b] border border-[#232730]">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#8b5cf6] block">
                    {siteConfig.stats.hackathonFinalist}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-[#8b5cf6] uppercase font-bold mt-1 block">
                    NATIONAL FINALIST
                  </span>
                  <span className="text-[11px] text-[#8f94a0] block mt-1">
                    Union Bank IDEA 2.0
                  </span>
                </div>
              </div>

              {/* Subsystem Readiness Indicators */}
              <div className="mt-6 pt-4 border-t border-[#232730] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-[#8f94a0]">
                  <span>AGENTIC AI ARCHITECTURE</span>
                  <span className="text-[#10b981]">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between text-[#8f94a0]">
                  <span>FULL STACK & APIS</span>
                  <span className="text-[#10b981]">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between text-[#8f94a0]">
                  <span>HARDWARE & EMBEDDED IOT</span>
                  <span className="text-[#10b981]">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between text-[#8f94a0]">
                  <span>DATA & ML PIPELINES</span>
                  <span className="text-[#10b981]">OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
