# Sparsh Goswami Developer Portfolio

Personal developer portfolio inspired by modern Formula 1 telemetry and race engineering control rooms.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Three.js, GSAP, and Lenis.

---

## Technical Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- 3D Graphics: Three.js (dynamic import, hero only, capped DPR 1.5, pauses off-screen)
- Motion: GSAP and Lenis smooth scrolling (disables on prefers-reduced-motion)
- Telemetry Visualizations: Native inline animated SVG curves
- Deployment: Vercel Edge

---

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Start the local development server
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Run production preview
```bash
npm run start
```

---

## Content Architecture

All portfolio content is maintained centrally in the `/src/data` directory:

- `src/data/site.ts`: Personal identity, metadata, status indicators, and navigation.
- `src/data/projects.ts`: Featured case studies (Nivaas, TaskFlow, CustomerPulse) and Garage projects (F1 Telemetry Simulator, MemoryLens, Smart Gas Rover, TenderBlock, etc.).
- `src/data/skills.ts`: Telemetry signal clusters and technical subsystems.
- `src/data/experience.ts`: Work stints (CodeAlpha, Elevate Labs), leadership roles, hackathons, and NCC.
- `src/data/certifications.ts`: Published Indian patents and verified credentials.
- `src/data/links.ts`: External URLs, social profiles, and resume path.

To add or update a project, edit `src/data/projects.ts`. If a project lacks a demo or GitHub link, the corresponding button hides automatically.

---

## Deployment to Vercel

1. Push your latest commits to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete portfolio implementation"
   git push -u origin main
   ```
2. Import the repository `Sparsh566/personal-portfolio` on Vercel.
3. Framework Preset: Next.js.
4. Deploy.
