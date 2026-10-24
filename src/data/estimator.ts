/**
 * Cost estimator configuration.
 *
 * IMPORTANT: CDC has not yet signed off real £/m² rates.
 * - `published` stays `null` until CDC supplies verified rates. While it is null the
 *   estimator collects the answers, shows the Budget Confidence meter and sends the
 *   visitor to book a survey — it never shows a price.
 * - `preview` holds SAMPLE rates for design reviews only. They are used only when
 *   NEXT_PUBLIC_ESTIMATOR_PREVIEW=true, and the page then shows a "sample rates" warning.
 *   Never deploy the live site with that flag on.
 */

export type RateBand = { lo: number; hi: number }; // £ per m², ex. VAT, London & South East, Standard finish

export type OptionChoice = { id: string; label: string; factor: number };

export type ProjectTypeConfig = {
  id: string;
  name: string;
  serviceSlug: string;
  minSize: number;
  maxSize: number;
  defaultSize: number;
  /** A project-specific question that materially changes cost. */
  option?: { label: string; choices: OptionChoice[] };
  included: string[];
  excluded: string[];
};

export type RatesConfig = {
  reviewedOn: string | null; // ISO date CDC last reviewed the rates
  reviewedBy: string | null;
  rates: Record<string, RateBand> | null;
};

export const projectTypes: ProjectTypeConfig[] = [
  {
    id: "extension",
    name: "Extension",
    serviceSlug: "extension",
    minSize: 10,
    maxSize: 120,
    defaultSize: 30,
    option: {
      label: "Storeys",
      choices: [
        { id: "single", label: "Single storey", factor: 1 },
        { id: "double", label: "Two storey", factor: 0.9 },
      ],
    },
    included: ["Foundations, structure and roof", "Steelwork for new openings", "Windows, doors and roof glazing", "Plastering, flooring and decoration"],
    excluded: ["Kitchen units and appliances", "Planning and Party Wall fees", "Landscaping"],
  },
  {
    id: "loft",
    name: "Loft conversion",
    serviceSlug: "loft-conversion",
    minSize: 15,
    maxSize: 80,
    defaultSize: 30,
    option: {
      label: "Loft type",
      choices: [
        { id: "dormer", label: "Rear dormer", factor: 1 },
        { id: "hip", label: "Hip-to-gable", factor: 1.1 },
        { id: "mansard", label: "Mansard", factor: 1.25 },
      ],
    },
    included: ["Structural steel and floor", "Dormer or roof works", "New staircase", "Insulation and fire safety", "Plastering and decoration"],
    excluded: ["Bathroom sanitaryware choice above standard", "Planning and Party Wall fees", "Furniture and built-in wardrobes"],
  },
  {
    id: "basement",
    name: "Basement",
    serviceSlug: "basement-conversion",
    minSize: 15,
    maxSize: 150,
    defaultSize: 40,
    option: {
      label: "Starting point",
      choices: [
        { id: "cellar", label: "Convert an existing cellar", factor: 0.75 },
        { id: "new", label: "Dig a new basement", factor: 1 },
      ],
    },
    included: ["Underpinning and structure", "Waterproofing and pump", "Lightwells", "Ventilation and services", "Finishes"],
    excluded: ["Party Wall surveyor fees", "Planning fees", "Specialist AV or home cinema"],
  },
  {
    id: "renovation",
    name: "Renovation",
    serviceSlug: "renovation-and-refurbishment",
    minSize: 20,
    maxSize: 300,
    defaultSize: 90,
    option: {
      label: "Depth of work",
      choices: [
        { id: "cosmetic", label: "Cosmetic refresh", factor: 0.6 },
        { id: "full", label: "Full renovation", factor: 1 },
      ],
    },
    included: ["Strip-out and repairs", "Electrics and plumbing", "Plastering and flooring", "Decoration"],
    excluded: ["Kitchen and bathroom fittings above standard", "Furniture", "Structural changes unless selected"],
  },
  {
    id: "newbuild",
    name: "New build",
    serviceSlug: "new-build",
    minSize: 60,
    maxSize: 400,
    defaultSize: 140,
    included: ["Groundworks and foundations", "Frame, roof and envelope", "Services and insulation", "Internal finishes"],
    excluded: ["Land purchase", "Utility connections charges", "Planning, CIL and design fees", "Landscaping"],
  },
  {
    id: "fitout",
    name: "Office fit-out",
    serviceSlug: "commercial-fit-out",
    minSize: 100,
    maxSize: 3000,
    defaultSize: 600,
    option: {
      label: "Fit-out level",
      choices: [
        { id: "cat-a", label: "Cat A", factor: 0.6 },
        { id: "cat-b", label: "Cat B", factor: 1 },
      ],
    },
    included: ["Partitions and ceilings", "Flooring", "Lighting and small power", "Mechanical and electrical coordination", "Joinery and tea points"],
    excluded: ["Furniture and IT", "Landlord's works", "Out-of-hours premiums unless agreed"],
  },
];

export const finishes: OptionChoice[] = [
  { id: "standard", label: "Standard", factor: 1 },
  { id: "premium", label: "Premium", factor: 1.2 },
  { id: "luxury", label: "Luxury", factor: 1.45 },
];

export const finishHints: Record<string, string> = {
  standard: "Good-quality, practical specification",
  premium: "Upgraded glazing, flooring and joinery",
  luxury: "Bespoke finishes throughout",
};

export const regions: OptionChoice[] = [
  { id: "london", label: "London & South East", factor: 1 },
  { id: "north", label: "North of England", factor: 0.88 },
];

/** Live, CDC-approved rates. Keep `rates: null` until signed off. */
export const published: RatesConfig = {
  reviewedOn: null,
  reviewedBy: null,
  rates: null,
};

/** SAMPLE rates for design previews only (NEXT_PUBLIC_ESTIMATOR_PREVIEW=true). Not CDC pricing. */
export const preview: RatesConfig = {
  reviewedOn: null,
  reviewedBy: "Sample data — not CDC pricing",
  rates: {
    extension: { lo: 1800, hi: 2600 },
    loft: { lo: 1500, hi: 2200 },
    basement: { lo: 3000, hi: 4500 },
    renovation: { lo: 800, hi: 1500 },
    newbuild: { lo: 2200, hi: 3200 },
    fitout: { lo: 600, hi: 1200 },
  },
};

export const isPreview = process.env.NEXT_PUBLIC_ESTIMATOR_PREVIEW === "true";
export const activeRates: RatesConfig = isPreview ? preview : published;
