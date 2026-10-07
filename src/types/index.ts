export interface ProjectLink {
  label: string;
  url: string;
}

export interface FeaturedProject {
  id: string;
  callsign: string;
  title: string;
  category: string;
  sector: string;
  tagline: string;
  summary: string;
  techStack: string[];
  features: string[];
  achievement?: string;
  links: {
    demo?: string;
    github?: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface GarageProject {
  id: string;
  title: string;
  category: string;
  tagline: string;
  summary: string;
  techStack: string[];
  features?: string[];
  patentId?: string;
  links: {
    demo?: string;
    github?: string;
  };
  specialType?: "f1-telemetry" | "patent" | "standard";
}

export interface SkillCategory {
  cluster: string;
  subsystem: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export interface PatentItem {
  id: string;
  appNo: string;
  title: string;
  filingDate: string;
  publicationDate: string;
  journal: string;
  applicant: string;
  inventors: string[];
  abstract: string;
  status: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  hours?: string;
  topics: string[];
}
