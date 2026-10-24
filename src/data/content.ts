import type { Faq } from "@/types";

export const faqs: Faq[] = [
  { category: "General", q: "Which areas do you cover?", a: "Homes across East London and Essex from our Ilford office, and commercial and education projects across London, the South East, Manchester and Leeds." },
  { category: "General", q: "How long have you been trading?", a: "Creative Design & Construction was established in 2018 and has completed more than 105 projects." },
  { category: "General", q: "What are your opening hours?", a: "Monday to Saturday, 9:00 to 18:00. Enquiries sent outside these hours are answered the next working day." },
  { category: "Costs and quotes", q: "How do I get a price?", a: "Use the cost estimator for a guide, then book a free site survey. After the survey we send a written, itemised quote." },
  { category: "Costs and quotes", q: "Is the site survey free?", a: "Yes. We visit, measure and discuss the project before quoting." },
  { category: "Costs and quotes", q: "Do your prices include VAT?", a: "Guide ranges on the website exclude VAT. Your written quote states VAT clearly." },
  { category: "Planning and approvals", q: "Do you handle planning permission?", a: "Yes. We prepare and submit planning or lawful development applications and deal with the council's questions." },
  { category: "Planning and approvals", q: "Do you arrange building control?", a: "Yes. Building regulations approval and the final completion certificate are part of our design and build service." },
  { category: "Planning and approvals", q: "What is a Party Wall notice?", a: "A legal notice to neighbours when you build on or near a shared wall. We tell you at the survey if you need one and can arrange it." },
  { category: "Insurance and warranty", q: "Are you insured?", a: "Yes. We hold comprehensive insurance (terms and conditions apply). Procurement teams can request the schedule through the Compliance Hub." },
  { category: "Insurance and warranty", q: "Do you offer a warranty?", a: "Yes, a structural warranty of up to 10 years is available (terms and conditions apply). We explain the cover in your quote." },
  { category: "Commercial and tenders", q: "Which accreditations do you hold?", a: "CHAS, SafeContractor, SSIP, FMB membership and Disability Confident. Current certificates are in the Compliance Hub." },
  { category: "Commercial and tenders", q: "Can you work in an occupied building?", a: "Yes. We phase the works, separate the site safely and schedule noisy tasks out of hours where needed." },
];

export const openRoles: { title: string; location: string; type: string; summary: string }[] = [];

export const team: { name: string; role: string; quals?: string; photo?: string }[] = [];
