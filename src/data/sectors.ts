import type { Sector } from "@/types";

export const sectors: Sector[] = [
  {
    id: "commercial",
    name: "Office fit-out",
    tag: "Commercial",
    short: "Cat A and Cat B floors in Canary Wharf, Stratford, Guildford and Manchester.",
    intro:
      "We fit out offices for landlords, occupiers and serviced-office operators, including floors at Harbour Exchange Square in Canary Wharf and Bridge Water House in Manchester.",
    forWho: ["Landlords preparing floors to let", "Businesses moving or expanding", "Serviced and flexible office operators"],
    whatMatters: ["Lease dates and a fixed programme", "Working around occupied floors", "Landlord and building control approvals"],
  },
  {
    id: "education",
    name: "Schools & universities",
    tag: "Education",
    short: "Teaching floors at Harbour Exchange and Regent House, Leeds, built around term dates.",
    intro:
      "We deliver teaching and student spaces for universities and colleges, planned around term dates and the safety of students and staff.",
    forWho: ["Universities and colleges", "Private education providers", "Training centres"],
    whatMatters: ["Finishing before term starts", "Safeguarding and site separation", "Durable, easy-to-maintain finishes"],
  },
  {
    id: "residential",
    name: "Homes",
    tag: "Residential",
    short: "Extensions, lofts, basements and new builds across East London and Essex.",
    intro:
      "CDC started with homes in East London. We still design and build extensions, lofts, basements, renovations and new homes from our Ilford office.",
    forWho: ["Homeowners adding space", "Families renovating a new home", "Self-builders and small developers"],
    whatMatters: ["A clear price before work starts", "Planning and Party Wall handled for you", "Living at home safely during the build"],
  },
  {
    id: "public-sector",
    name: "Frameworks & tenders",
    tag: "Public sector",
    short: "CHAS, SafeContractor and SSIP accredited, with a full policy pack for PSQs.",
    intro:
      "We bid for public-sector design and build work. Our accreditations, insurance and policies are kept current in the Compliance Hub for procurement teams.",
    forWho: ["Councils and housing associations", "NHS and public estates teams", "Main contractors seeking accredited partners"],
    whatMatters: ["Accreditations and insurance in date", "Evidence of similar projects", "Health, safety and carbon reduction policies"],
  },
];

export const getSector = (id: string) => sectors.find((s) => s.id === id);
