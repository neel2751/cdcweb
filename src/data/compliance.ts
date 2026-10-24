import type { ComplianceDoc } from "@/types";

export const complianceDocs: ComplianceDoc[] = [
  { id: "chas", name: "CHAS accreditation", category: "Accreditation", issuer: "CHAS", access: "public" },
  { id: "safecontractor", name: "SafeContractor accreditation", category: "Accreditation", issuer: "Alcumus SafeContractor", access: "public" },
  { id: "ssip", name: "SSIP membership", category: "Accreditation", issuer: "Safety Schemes in Procurement", access: "public" },
  { id: "fmb", name: "Federation of Master Builders membership", category: "Accreditation", issuer: "FMB", access: "public" },
  { id: "disability-confident", name: "Disability Confident employer", category: "Accreditation", issuer: "Department for Work and Pensions", access: "public" },
  { id: "insurance-summary", name: "Insurance summary (employer's, public and contract works)", category: "Insurance", access: "on-request", note: "Full schedules sent on request." },
  { id: "warranty", name: "Structural warranty terms (up to 10 years)", category: "Insurance", access: "on-request" },
  { id: "hs-policy", name: "Health and Safety Policy", category: "Health & Safety", access: "public" },
  { id: "rams", name: "Sample risk assessment and method statement", category: "Health & Safety", access: "on-request" },
  { id: "carbon", name: "Carbon Reduction Plan", category: "Environment", access: "public", note: "Also published as a web page." },
  { id: "environmental", name: "Environmental Policy", category: "Environment", access: "public" },
  { id: "equality", name: "Equality, Diversity and Inclusion Policy", category: "Equality", access: "public" },
  { id: "infosec", name: "Information Security Policy", category: "Governance", access: "on-request" },
  { id: "gdpr", name: "Data Protection Policy", category: "Governance", access: "public" },
  { id: "abc", name: "Anti-Bribery, Corruption and Money Laundering Policy", category: "Governance", access: "public" },
];

export const accreditations = ["CHAS", "SafeContractor", "SSIP", "FMB", "Disability Confident"];
