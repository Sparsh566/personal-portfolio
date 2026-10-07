import { CertificationItem, PatentItem } from "@/types";

export const patentCatalog: PatentItem[] = [
  {
    id: "patent-gas-rover",
    appNo: "202521125538 A",
    title: "System and Method for Autonomous Hazard Detection and Safety Automation Using Mobile Robotic Platform",
    filingDate: "11/12/2025",
    publicationDate: "02/01/2026",
    journal: "The Patent Office Journal No. 1/2026 (Government of India)",
    applicant: "Symbiosis International (Deemed University)",
    inventors: ["Ankita Avthankar", "Harsh Kumar", "Sparsh Goswami", "Aditya Khiratkar"],
    abstract: "A mobile robotic safety system combining analog multi-sensor acquisition for combustible gases and flame signatures, sub-1.5s emergency shutdown and alert latency, dual-voltage isolated circuitry, and autonomous obstacle navigation for industrial safety environments.",
    status: "PUBLISHED",
  },
  {
    id: "patent-tenderblock",
    appNo: "202621072831 A",
    title: "Blockchain-Based Government Tender Management System Using Smart Contracts and NFT Award Certificates",
    filingDate: "11/06/2026",
    publicationDate: "31/07/2026",
    journal: "The Patent Office Journal No. 31/2026 (Government of India)",
    applicant: "Symbiosis International (Deemed University)",
    inventors: ["Harsh Kumar", "Sparsh Goswami", "Aditya Khiratkar", "Ankita Avthankar"],
    abstract: "A decentralized procurement platform comprising Flow blockchain smart contracts, an on-chain reverse auction engine, non-transferable NFT award certificates, IPFS document anchoring, and an event-driven relational indexer enabling sub-second web application response times.",
    status: "PUBLISHED",
  },
];

export const certificationCatalog: CertificationItem[] = [
  {
    id: "agentic-ai",
    title: "Mastering Agentic AI: From Prompt to Protocols to Production",
    issuer: "Udemy (Instructor: Vinit Singh)",
    issueDate: "Aug 22, 2026",
    credentialId: "UC-ef227aeb-f858-4f69-a28e-50cf39ba95b5",
    verifyUrl: "https://ude.my/UC-ef227aeb-f858-4f69-a28e-50cf39ba95b5",
    hours: "38 Hours",
    topics: [
      "Agentic AI Architecture",
      "Multi-Agent Systems",
      "Tool Calling & Protocols",
      "Production LLM Pipelines",
    ],
  },
  {
    id: "redhat-python",
    title: "Introduction to Python Programming (AD141)",
    issuer: "Red Hat Training & Certification",
    issueDate: "March 22, 2025",
    topics: [
      "Python Scripting",
      "Object-Oriented Programming",
      "File I/O & Error Handling",
      "Standard Libraries",
    ],
  },
  {
    id: "infosys-dsa",
    title: "Data Structures and Algorithms using Python - Part 1",
    issuer: "Infosys Springboard",
    issueDate: "October 13, 2025",
    verifyUrl: "https://verify.onwingspan.com",
    topics: [
      "Algorithmic Complexity",
      "Linear & Non-Linear Structures",
      "Recursion & Sorting",
      "Search Algorithms",
    ],
  },
  {
    id: "infosys-ai",
    title: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    issueDate: "June 6, 2025",
    verifyUrl: "https://verify.onwingspan.com",
    topics: [
      "Core AI Principles",
      "State Space Search",
      "Heuristic Methods",
      "Machine Learning Foundations",
    ],
  },
  {
    id: "redhat-rh124",
    title: "Red Hat System Administration I (RH124 - RHA) Ver. 10",
    issuer: "Red Hat Academy",
    issueDate: "Completed",
    topics: [
      "Linux Command Line",
      "Shell Workflows",
      "User & Group Management",
      "Storage & File Systems",
    ],
  },
];
