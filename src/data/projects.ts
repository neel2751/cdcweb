import type { Project } from "@/types";
import handover from "./handover.json";

export const projects: Project[] = [
  {
    slug: "harbour-exchange-square-5th-floor-canary-wharf",
    name: "Harbour Exchange Square, 5th floor",
    location: "Canary Wharf",
    map: { x: 74, y: 82 },
    sector: "commercial",
    type: "Commercial office space",
    services: ["commercial-fit-out"],
    photos: {},
  },
  {
    slug: "harbour-exchange-square-4th-floor-canary-wharf",
    name: "Harbour Exchange Square, 4th floor",
    location: "Canary Wharf",
    map: { x: 71, y: 78 },
    sector: "commercial",
    type: "Commercial office",
    services: ["commercial-fit-out"],
    photos: {},
  },
  {
    slug: "harbour-exchange-square-3rd-floor-canary-wharf",
    name: "Harbour Exchange Square, 3rd floor",
    location: "Canary Wharf",
    map: { x: 68, y: 82 },
    sector: "education",
    type: "University floor",
    services: ["commercial-fit-out"],
    photos: {},
  },
  {
    slug: "bridge-water-house-manchester",
    name: "Bridge Water House",
    location: "Manchester",
    map: { x: 36, y: 38 },
    sector: "commercial",
    type: "Commercial office",
    services: ["commercial-fit-out"],
    photos: {},
  },
  {
    slug: "regent-house-leeds",
    name: "Regent House",
    location: "Leeds",
    map: { x: 46, y: 30 },
    sector: "education",
    type: "Education",
    services: ["commercial-fit-out"],
    photos: {},
  },
  {
    slug: "centro-office-space-guildford",
    name: "Centro Office Space",
    location: "Guildford",
    map: { x: 55, y: 90 },
    sector: "commercial",
    type: "Commercial office space",
    services: ["commercial-fit-out"],
    photos: {},
  },
  {
    slug: "bridge-house-stratford",
    name: "Bridge House",
    location: "Stratford",
    map: { x: 68, y: 71 },
    sector: "commercial",
    type: "Commercial office space",
    services: ["commercial-fit-out"],
    photos: {},
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects: Project[] = (handover as string[])
  .map((slug) => getProject(slug))
  .filter((p): p is Project => Boolean(p));

export const hqPin = { label: "Ilford · HQ", x: 77, y: 67 };