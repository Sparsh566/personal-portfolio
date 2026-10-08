# Portfolio Redesign & Simplification Plan
**Project:** Sparsh Goswami Engineering Portfolio  
**Target:** Recruiter-Friendly F1 Engineering Aesthetic  
**Date:** October 8, 2026  

---

## 1. Overview & Objectives

Based on your review and feedback, we are refining the portfolio to make it clearer for recruiters and visitors while maintaining the sleek, dark, high-performance Formula 1 engineering control-room aesthetic.

### Key Goals
1. **Show direct certificate images** instead of external URL redirects.
2. **Remove the Repository Activity & Pipeline Health section** to eliminate clutter.
3. **Remove the Status panel** (`STATUS: ONLINE / MODE / FOCUS / LOCATION`) from the Hero section.
4. **Upgrade the Resume component** into a prominent boxed button with direct working access.
5. **Strip away unnecessary micro-readouts and clutter** across sections.
6. **Simplify complex F1 jargon headings** so non-F1 recruiters instantly understand every 
section.
7. **Restructure Experience & Internships**:
   - Separate **Internships** (CodeAlpha, Elevate Labs).
   - Separate **Leadership & Volunteer** (IEEE Event Manager, SmarTech Co-Coordinator, NCC Member).
   - Create a dedicated **Achievements section** featuring the **Top 30 National Hackathon Finalist** and **Published Patents**.
   - Style these cards using the **subsystem card design from your reference image** (red corner brackets, status dot, category pills, dark carbon frame).
8. **Replace the 3D abstract knot with a recognizable 3D Formula 1 car** with aerodynamic chassis, front/rear wings, halo, sidepods, and wheels.

---

## 2. Detailed Task Breakdown

### Task 1: Certifications - Direct Certificate Image Display
- **Current State:** Each certificate card has an external `VERIFY ->` link redirecting off-site (`https://ude.my/...`, `https://verify.onwingspan.com`).
- **New Implementation:**
  - Build a direct **Certificate Preview Modal / Lightbox** in `src/components/grid/GridSection.tsx`.
  - When clicking on any certificate card or "View Certificate" button:
    - Opens a high-resolution certificate card preview modal right on the page without redirecting away.
    - Displays certificate title, issuing organization (Udemy, Red Hat, Infosys), credential ID, date of issuance, verified topics, and visual credential badge.
  - Cards in the grid will feature a thumbnail preview card with a clean "VIEW CERTIFICATE" button.

### Task 2: Remove Repository Activity & Pipeline Health Section
- **Current State:** `PitWallActivity` component renders commit activity, a 52-week heatmap, and pipeline checks.
- **New Implementation:**
  - Remove `<PitWallActivity />` completely from `src/app/page.tsx`.
  - Remove `pit-wall` section from the scroll-spy observer in `src/app/page.tsx` and top navigation links in `src/components/common/Navigation.tsx`.
  - Remove or archive `src/components/activity/PitWallActivity.tsx`.

### Task 3: Hero Section - Remove Status Block
- **Current State:** A 4-column HUD panel (`STATUS: ONLINE`, `CURRENT MODE: BUILDING`, `FOCUS: AI / SYSTEMS`, `LOCATION: NAGPUR, IN`) sits between the bio text and action buttons.
- **New Implementation:**
  - Remove the status panel markup completely from `src/components/hero/HeroSection.tsx`.
  - Streamline the vertical spacing so the headline, bio, and buttons flow together smoothly.

### Task 4: Resume Button - Prominent Box & Functional Action
- **Current State:** The resume link is a faint, unboxed text link (`text-[#8f94a0]`) pointing to `/resume.pdf` without a container box, which fails to open.
- **New Implementation:**
  - Upgrade the Resume CTA to a prominent button with:
    - High-contrast boxed styling matching the primary buttons (`border border-[#e10600] bg-[#1a1415] hover:bg-[#e10600] text-white`).
    - Document / download icon next to the text.
    - Clear label: `RESUME (PDF)` or `VIEW RESUME`.
  - Place a valid resume file in `/public/resume.pdf` or link to your verified resume URL (e.g. Google Drive / LinkedIn document) so clicking it immediately opens the document in a new tab without errors.

### Task 5: Remove Unnecessary Extra Text & Clutter
- **Current State:** Micro-text readouts like `SESSION: PROD_01`, `LATENCY: 0.4MS`, `AERODYNAMIC VECTOR VIEW`, `FPS: 60`, `SCALE: 1:1 DYNAMICS`, and repetitive tags clutter the UI.
- **New Implementation:**
  - Remove redundant sector labels and fake telemetry readouts.
  - Keep only essential, clean headings and descriptions so the content remains punchy and readable.

### Task 6: Simplify Complex Headings for Non-F1 Recruiters
Replace cryptic racing terminology with clear, professional titles while preserving the sleek dark styling:

| Current Section Heading | Simplified Professional Heading | Navigation Label |
| :--- | :--- | :--- |
| `RACE ENGINEERING // CASE STUDIES` | **Featured Projects** | Projects |
| `THE GARAGE // EXPERIMENTAL SYSTEMS` | **Other Projects & Prototypes** | Garage / Prototypes |
| `TELEMETRY // TECHNICAL SUBSYSTEMS & TOOLING` | **Skills & Technologies** | Skills |
| `RACE LOG // STINTS` | **Experience & Leadership** | Experience |
| *(New Segment)* | **Achievements & Accolades** | Achievements |
| `STARTING GRID // CREDENTIALS` | **Education, Patents & Certifications** | Education & Credentials |
| `PIT WALL // REPOSITORY ACTIVITY` | *(Removed)* | *(Removed)* |
| `RADIO CONTACT // DISPATCH` | **Get In Touch / Contact** | Contact |

#### Subsystem Category Renaming (Skills Section):
- `CHASSIS / CORE` &rarr; **Programming Languages**
- `POWERTRAIN / INTELLIGENCE` &rarr; **AI & Machine Learning**
- `AERODYNAMICS / INTERFACES` &rarr; **Web & Backend Development**
- `TELEMETRY / ANALYTICS` &rarr; **Data & Simulation**
- `FUEL SYSTEM / PERSISTENCE` &rarr; **Databases & Storage**
- `ELECTRONICS / SENSORS` &rarr; **Embedded Systems & Hardware**
- `PIT WALL / WORKFLOW` &rarr; **Tools & Infrastructure**
- `HYBRID SYSTEM / PROTOCOLS` &rarr; **Specialized & Web3**

### Task 7: Experience, Leadership & Achievements Restructuring (Image Card Design)
- **Current State:** Internships, student clubs (Event Manager, Co-Coordinator), NCC, and the Top 30 Hackathon result are combined in one generic timeline.
- **New Structure:**
  1. **Work Experience & Internships:**
     - CodeAlpha: Artificial Intelligence Intern
     - Elevate Labs: Web Development Intern
  2. **Leadership & Volunteering:**
     - IEEE Student Branch: Event Manager
     - SMARTECH Robotics Club: Co-Coordinator
     - NCC (Naval Unit): Member / Cadet
  3. **Achievements & Accolades (Moved Top 30 Finalist here):**
     - **Top 30 National Finalist** - Union Bank of India IDEA 2.0 National Hackathon
     - **02 Published Indian Patents** - Government of India Patent Journal
  4. **Visual Design (Matching User's Reference Image):**
     - Distinct dark carbon cards (`#0b0c0e`) with refined borders (`#232730`).
     - Signature red corner brackets `┌ ┐` at top-left and top-right.
     - Top metadata bar with category identifier and green/red status dot (`•`).
     - Bold titles with clear role/organization hierarchy.
     - Individual skill/technology badges with dark borders (`#14161b`).
     - Interactive filter tabs (e.g. `ALL`, `INTERNSHIPS`, `LEADERSHIP`, `ACHIEVEMENTS`) matching the red accent filter button in the image.

### Task 8: 3D Visualization - Replace Abstract Torus Knot with F1 Car
- **Current State:** `HeroCanvas.tsx` displays a `TorusKnotGeometry` (an abstract knotted ring), which looks confusing and unclear.
- **New Implementation:**
  - Build a sleek, recognizable **3D Formula 1 Car chassis** inside `HeroCanvas.tsx` using Three.js composite geometries:
    - **Aerodynamic Nosecone & Front Wing** with multi-tier wing elements and endplates.
    - **Cockpit with Halo Protection Arch**.
    - **Sculpted Sidepods & Engine Airbox**.
    - **Rear Wing with DRS Mainplane & Endplates**.
    - **4 Detailed F1 Wheels** with tire tread width, rim centers, and suspension wishbones.
    - **Dynamic Wheel Rotation & Aerodynamic Streamlines** (red and subtle cyan/green telemetry flow lines).
    - Responsive mouse parallax and automatic viewport culling (pauses when off-screen for 60 FPS performance).
  - Update `HeroFallback.tsx` to display an F1 car blueprint line-art silhouette for mobile devices and reduced-motion mode.

---

## 3. Files to be Modified / Created

1. `src/app/page.tsx`:
   - Remove `PitWallActivity` import and component call.
   - Update scroll-spy navigation section IDs.
2. `src/components/common/Navigation.tsx`:
   - Update section links and simplified titles.
3. `src/components/hero/HeroSection.tsx`:
   - Remove status HUD box.
   - Upgrade Resume CTA to a prominent boxed button.
   - Remove unnecessary sector labels.
4. `src/components/hero/HeroCanvas.tsx`:
   - Replace Torus Knot with 3D Formula 1 car geometry and telemetry wheels.
5. `src/components/hero/HeroFallback.tsx`:
   - Update SVG fallback to an F1 car wireframe/blueprint.
6. `src/components/race-engineering/RaceEngineeringSection.tsx`:
   - Change heading to "Featured Projects".
7. `src/components/garage/GarageSection.tsx`:
   - Change heading to "Other Projects & Prototypes".
8. `src/components/telemetry/TelemetrySection.tsx`:
   - Change heading to "Skills & Technologies" and simplify subsystem labels.
9. `src/components/race-log/RaceLogSection.tsx`:
   - Implement card layout from reference image.
   - Separate Internships, Leadership, and Achievements sections.
10. `src/components/grid/GridSection.tsx`:
    - Add direct Certificate image preview modal / lightbox.
    - Change heading to "Education, Patents & Certifications".
11. `src/data/skills.ts`:
    - Simplify category subsystem naming.
12. `src/data/experience.ts`:
    - Restructure into `internships`, `leadership`, and `achievements` data sets.
13. `src/data/links.ts`:
    - Ensure resume link points to working resource.
14. `public/resume.pdf`:
    - Place valid resume document file.

---

## 4. Next Step
This markdown file has been generated for your review. Please confirm if this plan aligns with your expectations, and let me know when you are ready to proceed with implementation!
