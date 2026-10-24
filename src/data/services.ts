import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "architectural-design",
    name: "Architectural Design",
    short: "Drawings, 3D visuals and planning applications.",
    intro:
      "Measured surveys, concept and technical drawings, 3D visuals and the planning application, prepared by the same team that will build the project.",
    sectors: ["residential", "commercial", "education"],
    included: [
      "Measured site survey",
      "Concept options and 3D visualisations",
      "Planning or permitted development drawings",
      "Building regulations drawings",
      "Liaison with structural engineers",
    ],
    planningNote:
      "Most extensions and many lofts need either planning permission or a lawful development certificate. We confirm which applies at the first visit.",
    faqs: [
      { q: "Can I use my own architect's drawings?", a: "Yes. We can build from drawings you already have, or take over the design from planning stage onwards." },
      { q: "Do you submit the planning application?", a: "Yes. We prepare and submit the application and handle questions from the council." },
    ],
  },
  {
    slug: "design-and-build",
    name: "Design and Build",
    short: "One contract from first drawing to handover.",
    intro:
      "One contract and one point of contact for design, approvals, construction and handover, so nothing falls between an architect and a builder.",
    sectors: ["residential", "commercial", "education", "public-sector"],
    included: ["Design and approvals", "Programme and cost plan", "Construction and site management", "Building control sign-off", "Handover pack and aftercare"],
    planningNote: "Approvals are part of the contract, so the programme accounts for planning and building control from day one.",
    faqs: [
      { q: "Why choose design and build?", a: "You deal with one company for the whole project, which keeps responsibility for cost and programme in one place." },
    ],
  },
  {
    slug: "commercial-fit-out",
    name: "Commercial Fit-Out",
    short: "Offices and education floors, Cat A and Cat B.",
    intro:
      "Cat A and Cat B fit-outs for offices and education spaces, including work in occupied buildings, from Canary Wharf to Manchester and Leeds.",
    sectors: ["commercial", "education"],
    included: [
      "Space planning and design",
      "Partitions, ceilings and floors",
      "Mechanical and electrical coordination",
      "Joinery, kitchens and breakout areas",
      "Out-of-hours and phased working where needed",
    ],
    planningNote: "Landlord approval and building control are usually needed for fit-out work. We prepare the submissions.",
    faqs: [
      { q: "Can you work while our office is occupied?", a: "Yes. We can phase the work and schedule noisy tasks out of hours to keep your team working." },
      { q: "What is the difference between Cat A and Cat B?", a: "Cat A gives a finished shell with ceilings, floors and services. Cat B adds your layout, meeting rooms, kitchens and finishes." },
    ],
    estimatorType: "fitout",
  },
  {
    slug: "new-build",
    name: "New Build",
    short: "Homes built from the ground up.",
    intro: "New homes built from the ground up, from groundworks and frame to finishes and handover.",
    sectors: ["residential"],
    included: ["Groundworks and foundations", "Structure and roof", "Services and insulation", "Internal finishes", "Landscaping and drainage"],
    planningNote: "A new build needs full planning permission and building regulations approval.",
    faqs: [
      { q: "Do you help find or assess a plot?", a: "We can visit a plot with you and advise on access, ground conditions and what is likely to get planning." },
    ],
    estimatorType: "newbuild",
  },
  {
    slug: "extension",
    name: "Extension",
    short: "Rear, side and wraparound extensions.",
    intro: "Rear, side and wraparound extensions designed to join cleanly to your existing home.",
    sectors: ["residential"],
    included: ["Design and approvals", "Foundations and structure", "Steelwork and openings", "Roofing and glazing", "Kitchen and finishes"],
    planningNote:
      "Many single-storey rear extensions fall under permitted development. Larger or side extensions usually need planning permission. Party Wall notices may be needed.",
    faqs: [
      { q: "Will I need a Party Wall agreement?", a: "If you build on or near a shared wall, usually yes. We tell you at the survey and can arrange the notices." },
    ],
    estimatorType: "extension",
  },
  {
    slug: "loft-conversion",
    name: "Loft Conversion",
    short: "Dormer, hip-to-gable and mansard lofts.",
    intro: "Dormer, hip-to-gable and mansard loft conversions that add a bedroom, bathroom or office without losing garden space.",
    sectors: ["residential"],
    included: ["Structural design", "Dormer or roof alterations", "New staircase", "Insulation and fire safety", "Bathroom and finishes"],
    planningNote: "Many dormer lofts are permitted development. Mansards and lofts in conservation areas usually need planning permission.",
    faqs: [
      { q: "Is my loft tall enough?", a: "We measure the head height at the survey. As a guide, around 2.2 m at the highest point usually works." },
    ],
    estimatorType: "loft",
  },
  {
    slug: "basement-conversion",
    name: "Basement Conversion",
    short: "Underpinning, waterproofing and fit-out.",
    intro: "Basement conversions and new basements, from underpinning and waterproofing to a finished living space.",
    sectors: ["residential"],
    included: ["Structural design and underpinning", "Waterproofing and drainage", "Lightwells and glazing", "Ventilation and services", "Finishes"],
    planningNote: "Converting an existing cellar may not need planning. A new or deeper basement usually does, plus Party Wall agreements.",
    faqs: [
      { q: "How do you keep a basement dry?", a: "With a waterproofing system designed for your ground conditions, usually a cavity drain membrane with a pump." },
    ],
    estimatorType: "basement",
  },
  {
    slug: "renovation-and-refurbishment",
    name: "Renovation & Refurbishment",
    short: "Retrofit and full refurbishment.",
    intro: "Full renovations and refurbishments of homes and workplaces, including retrofit work to improve energy performance.",
    sectors: ["residential", "commercial"],
    included: ["Strip-out and repairs", "Rewiring and replumbing", "Insulation and retrofit", "Kitchens and bathrooms", "Decoration and finishes"],
    planningNote: "Most internal refurbishment needs no planning, but listed buildings and structural changes do need approvals.",
    faqs: [
      { q: "Can we live in the house during the work?", a: "Often yes, by working in phases. We agree a plan for access, dust and services before starting." },
    ],
    estimatorType: "renovation",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);