# Implementation Specification: Sparsh Goswami Engineering Portfolio

---

## 1. Directory and File Structure

```
d:\personal projects\portfolio\
├── plan.md
├── implementation.md
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.ts
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── resume.pdf (placeholder link)
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    │   ├── common/
    │   │   ├── Navigation.tsx
    │   │   ├── Footer.tsx
    │   │   ├── MobileMenu.tsx
    │   │   └── StatusBadge.tsx
    │   ├── hero/
    │   │   ├── HeroSection.tsx
    │   │   ├── HeroCanvas.tsx (Three.js/R3F, ssr: false)
    │   │   └── HeroFallback.tsx
    │   ├── profile/
    │   │   └── DriverProfile.tsx
    │   ├── race-engineering/
    │   │   ├── RaceEngineeringSection.tsx
    │   │   ├── ProjectCaseStudy.tsx
    │   │   └── VisualPanels/
    │   │       ├── NivaasVisual.tsx
    │   │       ├── TaskFlowVisual.tsx
    │   │       └── CustomerPulseVisual.tsx
    │   ├── garage/
    │   │   ├── GarageSection.tsx
    │   │   ├── GarageCard.tsx
    │   │   ├── ProjectModal.tsx
    │   │   └── F1TelemetryViewer.tsx (Animated SVG telemetry chart)
    │   ├── telemetry/
    │   │   ├── TelemetrySection.tsx
    │   │   └── SkillCluster.tsx
    │   ├── race-log/
    │   │   ├── RaceLogSection.tsx
    │   │   └── ExperienceItem.tsx
    │   ├── grid/
    │   │   ├── GridSection.tsx
    │   │   ├── EducationCard.tsx
    │   │   ├── PatentCard.tsx
    │   │   └── CertificationList.tsx
    │   ├── activity/
    │   │   └── PitWallActivity.tsx
    │   └── radio/
    │       └── RadioContactSection.tsx
    ├── data/
    │   ├── site.ts
    │   ├── projects.ts
    │   ├── skills.ts
    │   ├── experience.ts
    │   ├── certifications.ts
    │   └── links.ts
    ├── hooks/
    │   ├── useLenis.ts
    │   ├── useReducedMotion.ts
    │   └── useIntersectionObserver.ts
    └── types/
        └── index.ts
```

---

## 2. Design Tokens and Theme Specifications

### Color Palette (F1 Race Control Theme)
- Carbon Void (Background): `#090A0C`
- Graphite Surface (Cards & Panels): `#111317`
- Graphite Elevated: `#181B20`
- Border Subtle: `#22262E`
- Border Active: `#383E4A`
- Primary Accent (F1 Racing Red): `#E10600`
- Racing Red Subtle: `rgba(225, 6, 0, 0.12)`
- Racing Amber (Warnings / Highlights): `#E5A93C`
- Timing Green (Online / Optimal Status): `#10B981`
- Sector Purple (Fastest Sector indicator): `#8B5CF6`
- Text Dominant: `#F3F4F6`
- Text Muted: `#9CA3AF`
- Text Technical: `#6B7280`

### Typography Hierarchy
- Sans-serif Primary: `Geist Sans` or `Inter` (neutral, crisp, highly legible)
- Monospace Data Font: `Geist Mono` or `JetBrains Mono` (for telemetry, timings, IDs, metadata labels)
- Strict tracking and uppercase transformations for technical telemetry tags (`tracking-wider`, `text-[11px]`, `font-mono`, `uppercase`).

---

## 3. Strict Compliance Checks

1. Zero Em Dashes:
   - Automated grep pattern check across all `.ts`, `.tsx`, `.md`, `.json`, and `.css` files.
   - Any dashes must be single standard hyphens (-), colons, or commas.
2. Zero Emojis:
   - All status indicators use clean geometric SVGs, status dots, or monospaced telemetry symbols.
3. Natural Student-Engineer Tone:
   - Direct active voice: "Built", "Engineered", "Designed", "Implemented", "Evaluated".
   - No fluff or buzzwords ("seamless", "cutting-edge", "game-changing", etc.).
4. Lighthouse Mobile 90+ Budget:
   - R3F Canvas dynamically loaded with fallback for touch devices and `prefers-reduced-motion`.
   - Hardware-accelerated transitions (transform and opacity only).
   - Zero heavyweight charting packages: pure SVG paths with `stroke-dasharray` and `stroke-dashoffset`.
   - Static asset pre-optimization and zero unnecessary client-side dependencies.

---

## 4. Feature Details

### Hero Section 3D Scene
- Lightweight Three.js wireframe object representing telemetry data lines / aerodynamic flow contours.
- Managed by React Three Fiber with `frameloop="demand"` or paused when scrolling outside viewport.
- Maximum device pixel ratio capped at 1.5.
- Screen sizes under 768px render an elegant SVG telemetry vector wireframe to guarantee zero mobile scroll lag.

### Featured Projects Pinning
- Desktop: Uses GSAP ScrollTrigger to horizontally slide between NIVAAS, TASKFLOW, and CUSTOMERPULSE.
- Mobile: Flattens cleanly to vertical stack with no horizontal scroll trap.

### F1 Telemetry Simulator Interactive Modal
- Speed curve: Animated path showcasing throttle trace, braking spikes, and gear shifts through a simulated corner.
- Sector times: Real-time telemetry indicators with Delta sector delta (+0.042s / -0.118s).
- Live parameters: Tyre degradation gauge (Medium compound, 82%), Brake temps (580 deg C), DRS status (ACTIVE).

### Certifications and Patents Module
- Showcases Patent Application No. 202521125538 A: "System and Method for Autonomous Hazard Detection and Safety Automation Using Mobile Robotic Platform" (Published 02/01/2026).
- Showcases Patent Application No. 202621072831 A: "Blockchain-Based Government Tender Management System Using Smart Contracts and NFT Award Certificates" (Published 31/07/2026).
- Direct credential verification links for Udemy (Mastering Agentic AI), Red Hat (Python AD141), and Infosys Springboard.

---

## 5. Execution Steps Once Approved

1. Initialize Next.js project with App Router, TypeScript, and Tailwind CSS.
2. Configure Tailwind config, typography, color tokens, and base CSS.
3. Build the data layer in `src/data/`.
4. Implement animation hooks (Lenis and GSAP wrapper).
5. Implement Hero, Profile, Projects, Garage, Skills, Log, Education, and Contact sections.
6. Verify responsive performance on mobile and desktop viewports.
7. Perform automated sweep for em dashes, emojis, and marketing filler text.
8. Validate production build (`npm run build`).
