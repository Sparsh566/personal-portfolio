# Project Plan: Sparsh Goswami Engineering Portfolio

A developer portfolio inspired by modern Formula 1 telemetry and engineering race-control interfaces, built for recruiters and software engineering internships.

---

## 1. Architectural Overview

### Core Principles
- Control room visual language: strict technical grid, dark carbon palette, restrained racing red accent (#E10600), monochrome technical telemetry, monospaced data readouts.
- Zero fluff: student engineer tone with direct, concise descriptions of architecture, systems, and benchmarks.
- Clean zero-dependency philosophy where appropriate: SVG-based telemetry charts without heavy charting libraries, self-hosted web fonts, optimized Next.js App Router static build.
- Strict performance budget: 90+ Lighthouse mobile score, zero em dashes, zero emojis, no bloated glow effects or gradient blobs.

### Technology Stack
- Framework: Next.js (App Router, React 19 / 18, TypeScript)
- Styling: Tailwind CSS (tailored tokens for carbon, telemetry gray, racing red, timing green, sector purple, flag amber)
- 3D Graphics: Three.js and React Three Fiber (Hero telemetry geometry only, dynamic import with ssr: false, paused off-screen, disabled on mobile and prefers-reduced-motion)
- Animation: GSAP and Lenis smooth scrolling (single coordinated instance, disabled when prefers-reduced-motion is true)
- Telemetry Visualizations: Native inline SVG with stroke-dashoffset path animations
- Content Architecture: Centralized TypeScript files under `/data` (projects, skills, experience, certifications, links, site)

---

## 2. Information Architecture and Data Design

All user data will be centrally managed in dedicated modules under `src/data/`:
1. `site.ts`: Site metadata, system status, navigation items, telemetry settings.
2. `projects.ts`: Featured projects (NIVAAS, TaskFlow, CustomerPulse) and Garage projects (MemoryLens, F1 Telemetry Simulator, CodeHunt, TenderBlock, Smart Gas Detecting Rover, ESP32 IoT Firewall, Retail Analytics, Linguify, AI Resume Builder).
3. `skills.ts`: Telemetry categorized into signal clusters (Languages, AI / ML, Development, Data, Databases, Tools, Specialized).
4. `experience.ts`: Chronological race log entries covering internships (Elevate Labs, CodeAlpha), student leadership (IEEE Student Branch Event Manager, SmarTech Club Co-Coordinator), hackathons, and NCC Naval Unit.
5. `certifications.ts`: Formal credentials (Mastering Agentic AI, Red Hat Python AD141, Infosys DSA Python, Infosys Intro to AI, Red Hat RH124).
6. `links.ts`: External URLs, GitHub repository links, LinkedIn, mailto triggers.

---

## 3. Section Blueprint

### 1. Navigation (Pit Wall Header)
- Sticky top interface with system status indicator (ONLINE / LOW LATENCY).
- Section jump links: Profile, Projects, Telemetry, Race Log, Certifications, Contact.
- Direct links for Resume download and GitHub.
- Mobile drawer navigation with high-contrast accessibility.

### 2. Hero Section (Telemetry Command Center)
- Headline: SPARSH GOSWAMI | AI - SOFTWARE - SYSTEMS.
- Sub-headline: Computer Science student building intelligent software, AI-powered systems, and experimental technology.
- Status HUD readout: System Status (ONLINE), Mode (BUILDING), Focus (AI / SYSTEMS), Location (NAGPUR, INDIA).
- Abstract 3D telemetry wireframe / geometric coordinate grid (R3F, responsive fallback, viewport culling).
- Primary actions: VIEW RACE ENGINEERING, VIEW GITHUB, RESUME.

### 3. Driver Profile (About Section)
- Engineering statement: "Building systems, not just projects."
- Technical bio emphasizing full-stack development, agentic workflows, embedded IoT, and data engineering.
- Live telemetry counters:
  - 10+ Systems and Projects
  - 02 Patents Published (Autonomous Hazard Detection Rover and Blockchain Tender Management)
  - 02 Industry Internships (Elevate Labs and CodeAlpha)
  - Top 30 National Hackathon Finalist (Union Bank of India IDEA 2.0)

### 4. Race Engineering (Featured Case Studies)
Desktop: Horizontal pinning layout with smooth transitions between three primary systems. Mobile: Vertical responsive stack.
- Case Study 01: NIVAAS (Agentic AI / Property Recommendation System)
  - Stack: FastAPI, Python, Groq, Tavily, PostgreSQL, Scikit-learn, RapidFuzz.
  - Interactive diagram: Natural language intent parsing, vector retrieval, multi-criteria property scoring.
- Case Study 02: TASKFLOW (Engineering Intelligence / Git Diff Work Verification)
  - Stack: React, FastAPI, Python, SQLAlchemy, Git.
  - Interactive UI: Git commit analyzer, diff inspector, acceptance criteria verification badge.
- Case Study 03: CUSTOMERPULSE (Enterprise AI Complaint Intelligence Platform)
  - Stack: Amazon Bedrock, GenAI, RAG, Next.js, FastAPI.
  - Badge: Top 30 Finalist, Union Bank of India IDEA 2.0 National Hackathon.
  - Interactive UI: Triage stream, SLA alert monitor, similar-case RAG vector retrieval.

### 5. The Garage (Secondary Projects & Hardware Systems)
Modular asymmetric grid with detail expansion drawers/modals:
- MemoryLens: Multimodal AI semantic search for local documents and facial indexing.
- F1 Telemetry Simulator: Python FastF1 race data simulation with interactive SVG speed, throttle, brake, and tyre degradation graph.
- Smart Gas Detecting Rover: ESP32 hardware rover with hazardous gas sensors and published patent.
- CodeHunt: Maritime simulation and deterministic training engine.
- TenderBlock: Decentralized public tendering on Flow Blockchain.
- ESP32-Based IoT Firewall: Anomaly monitoring and network packet filtering.
- Retail Analytics System: YOLOv8 and DeepSORT tracking dashboard.

### 6. Telemetry (Skills & Capabilities)
- Signal chip matrix organized by subsystem:
  - Languages, AI/ML, Development, Data & Simulation, Databases, Tools, Specialized.
- Interactive category filtering with clean telemetry badges. No arbitrary percentage sliders.

### 7. Race Log (Experience & Field Operations)
- Elevate Labs: Web Development Intern.
- CodeAlpha: Artificial Intelligence Intern (YOLOv8 retail tracking and Linguify translation).
- IEEE Student Branch: Event Manager.
- SmarTech Robotics Club: Co-Coordinator (Robotics & IoT workshops).
- Hackathons & Events: Union Bank of India IDEA 2.0, CodeHunt, HackAShastra, Hack4Brahma.
- NCC (Naval Unit): Discipline, operations, and field training.

### 8. Grid (Education, Patents, and Certifications)
- Education: B.Tech in CSE (AI and ML), Symbiosis Institute of Technology, Nagpur (2024 - Present).
- Patent Publication 01: "System and Method for Autonomous Hazard Detection and Safety Automation Using Mobile Robotic Platform" (Patent Application No. 202521125538 A, The Patent Office Journal No. 1/2026, Published: 02/01/2026).
- Patent Publication 02: "Blockchain-Based Government Tender Management System Using Smart Contracts and NFT Award Certificates" (Patent Application No. 202621072831 A, The Patent Office Journal No. 31/2026, Published: 31/07/2026).
- Verified Certifications:
  - Mastering Agentic AI: From Prompt to Protocols to Production (Udemy, 38 hours, Certificate ID: UC-ef227aeb-f858-4f69-a28e-50cf39ba95b5)
  - Red Hat Training: Introduction to Python Programming (AD141)
  - Infosys Springboard: Data Structures and Algorithms using Python (Part 1)
  - Infosys Springboard: Introduction to Artificial Intelligence
  - Red Hat System Administration I (RH124 - RHA) Ver. 10

### 9. Pit Wall Activity (GitHub & Build Telemetry)
- Static telemetry snapshot of repository activity, commit frequency, and build status without client-side API rate limits.

### 10. Radio (Contact Interface)
- Clean, high-impact dispatch panel.
- Direct mailto link (1774.sparsh@gmail.com).
- Direct GitHub and LinkedIn links.
- Copy email to clipboard utility.

---

## 4. Execution Phases

- Phase 1: Project setup, package configuration, strict Tailwind typography and carbon color palette.
- Phase 2: Centralized data layer creation (`/src/data/*.ts`).
- Phase 3: Core components (Navigation, Footer, UI controls, Telemetry meters).
- Phase 4: Hero 3D telemetry canvas with fallback, viewport observer, and performance caps.
- Phase 5: Featured project showcase with GSAP pinning for desktop and vertical stacking for mobile.
- Phase 6: Garage projects with interactive SVG telemetry viewer (F1 simulator data curves).
- Phase 7: Skills telemetry, Experience log, Education, Patent display, and Certifications grid.
- Phase 8: Contact dispatch panel, SEO meta, sitemap, robots.txt, performance validation, and rule compliance audit (zero em dashes, zero emojis).
