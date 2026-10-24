export type SectorId = "commercial" | "education" | "residential" | "public-sector";

export type NavItem = { label: string; href: string };

export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  sectors: SectorId[];
  included: string[];
  planningNote: string;
  faqs: { q: string; a: string }[];
  estimatorType?: string;
};

export type Sector = {
  id: SectorId;
  name: string;
  tag: string;
  short: string;
  intro: string;
  forWho: string[];
  whatMatters: string[];
};

export type Project = {
  slug: string;
  name: string;
  location: string;
  map: { x: number; y: number };
  sector: SectorId;
  type: string;
  services: string[];
  challenge?: string;
  scope?: string[];
  approach?: string;
  facts?: {
    floorAreaM2?: number;
    weeksOnSite?: number;
    handover?: string;
    budgetBand?: string;
  };
  photos: {
    cover?: string;
    gallery?: string[];
    beforeAfter?: { before: string; after: string; caption: string }[];
  };
  clientQuote?: { text: string; by: string };
  proof?: { checkedOn: string; checkedBy: string };
  featured?: boolean;
};

export type ComplianceDoc = {
  id: string;
  name: string;
  category: "Accreditation" | "Insurance" | "Health & Safety" | "Environment" | "Equality" | "Governance";
  issuer?: string;
  version?: string;
  issued?: string; 
  expires?: string; 
  access: "public" | "on-request";
  file?: string;
  note?: string;
};

export type Faq = { q: string; a: string; category: string };