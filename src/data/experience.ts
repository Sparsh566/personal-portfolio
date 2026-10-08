import { ExperienceItem } from "@/types";

export const internshipsData: ExperienceItem[] = [
  {
    id: "codealpha-ai",
    role: "Artificial Intelligence Intern",
    organization: "CodeAlpha",
    period: "May 2026 - Jun 2026",
    type: "INTERNSHIP",
    location: "Remote",
    summary: "Engineered applied computer vision and natural language systems in Python.",
    bullets: [
      "Engineered a retail analytics system using YOLOv8, SORT, and DeepSORT for real-time person detection, tracking, dwell time, and footfall counting.",
      "Built a desktop GUI in Tkinter with live counts and an automated video simulator mode for zero-hardware evaluation.",
      "Developed Linguify, a Streamlit translation web application supporting 90+ languages with automatic source detection, speech synthesis, and session history restores.",
    ],
    tags: ["Python", "YOLOv8", "DeepSORT", "OpenCV", "Streamlit", "gTTS"],
  },
  {
    id: "elevate-labs",
    role: "Web Development Intern",
    organization: "Elevate Labs",
    period: "Completed",
    type: "INTERNSHIP",
    location: "Remote",
    summary: "Contributed to responsive web interfaces and front-end component engineering.",
    bullets: [
      "Built responsive, mobile-first web interfaces using modern HTML5, CSS3, and JavaScript.",
      "Integrated Git and GitHub collaboration practices including branch reviews and pull requests.",
      "Refactored layout components for cross-browser stability and accessibility standards.",
    ],
    tags: ["JavaScript", "HTML5", "CSS3", "Git", "GitHub"],
  },
];

export const leadershipData: ExperienceItem[] = [
  {
    id: "ieee-event-manager",
    role: "Event Manager",
    organization: "IEEE Student Branch",
    period: "Jul 2026 - Present",
    type: "LEADERSHIP & VOLUNTEER",
    location: "SIT Nagpur",
    summary: "Organizing technical seminars, hackathons, and engineering events for the student chapter.",
    bullets: [
      "Coordinate technical workshops and expert sessions across software and electronics domains.",
      "Manage logistics, attendee engagement, and schedules for college-wide tech symposiums.",
    ],
    tags: ["Technical Leadership", "Event Architecture", "Community Building"],
  },
  {
    id: "smartech-club",
    role: "Co-Coordinator",
    organization: "SMARTECH (Robotics) Club",
    period: "Aug 2025 - Aug 2026",
    type: "ROBOTICS & IOT",
    location: "SIT Nagpur",
    summary: "Guided robotics and Internet of Things initiatives, workshops, and prototype developments.",
    bullets: [
      "Designed and delivered hands-on technical workshops on embedded systems, microcontrollers, and IoT protocols.",
      "Mentored student teams in assembling competition-ready hardware prototypes and sensor networks.",
      "Collaborated across departments on inter-college robotics competitions and research projects.",
    ],
    tags: ["Robotics", "IoT", "ESP32", "Hardware Prototyping", "Mentorship"],
  },
  {
    id: "ncc-naval",
    role: "Member",
    organization: "National Cadet Corps (Naval Unit)",
    period: "Active",
    type: "DEFENSE & DISCIPLINE",
    location: "SIT Nagpur",
    summary: "Trained under Naval Unit protocols covering discipline, field training, and operational coordination.",
    bullets: [
      "Participated in rigorous physical drills, seamanship lessons, and naval technical briefings.",
      "Developed high-pressure decision making, team coordination, and structured field discipline.",
    ],
    tags: ["Discipline", "Leadership", "Team Operations"],
  },
];

export const achievementsData: ExperienceItem[] = [
  {
    id: "hackathon-idea-2",
    role: "Top 30 Finalist",
    organization: "Union Bank of India IDEA 2.0 National Hackathon",
    period: "2025 - 2026",
    type: "NATIONAL HACKATHON",
    location: "National",
    summary: "Competed nationwide to develop CustomerPulse, an enterprise complaint intelligence platform.",
    bullets: [
      "Built an AI-driven complaint intake, triage, and RAG retrieval pipeline with Amazon Bedrock.",
      "Ranked in the top 30 finalists out of thousands of nationwide engineering team entries.",
    ],
    tags: ["Amazon Bedrock", "RAG", "Enterprise AI", "Top 30 Nationwide"],
  },
  {
    id: "patent-recognition",
    role: "Inventor & Researcher",
    organization: "The Patent Office Journal (Government of India)",
    period: "2025 - 2026",
    type: "INTELLECTUAL PROPERTY",
    location: "India",
    summary: "Published two official patents in mobile robotics and decentralized systems.",
    bullets: [
      "Patent App 202521125538 A: Autonomous Hazard Detection and Safety Automation Rover.",
      "Patent App 202621072831 A: Blockchain-Based Tender Management System with Smart Contracts.",
    ],
    tags: ["Autonomous Robotics", "Smart Contracts", "Flow Blockchain", "Government Patent"],
  },
];

export const experienceLog: ExperienceItem[] = [
  ...internshipsData,
  ...leadershipData,
  ...achievementsData,
];
