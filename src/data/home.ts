import type { HeroSlide, ProcessStep, Review, Service } from "../types";

export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero/living-room.jpg",
    alt: "Double-height living room with a stone fireplace",
    title: "Modern Living Room",
    category: "Residential Project",
  },
  {
    image: "/images/projects/modern-family-home.jpg",
    alt: "Contemporary family home lit up at dusk",
    title: "Modern Family Home",
    category: "Residential Project",
  },
  {
    image: "/images/projects/bridge-water-house.jpg",
    alt: "College reception fit-out at Bridge Water House, Manchester",
    title: "Bridge Water House",
    category: "Commercial Project",
  },
  {
    image: "/images/projects/breakout-lounge.jpg",
    alt: "Breakout lounge with black ceiling and linear lighting",
    title: "Breakout Lounge",
    category: "Commercial Project",
  },
];

export const services: Service[] = [
  { slug: "architectural-design", name: "Architectural Design", image: "/images/services/architectural-design.jpg" },
  { slug: "design-and-build", name: "Design & Build", image: "/images/services/design-and-build.jpg" },
  { slug: "loft-conversion", name: "Loft Conversion", image: "/images/services/loft-conversion.jpg" },
  { slug: "renovation", name: "Renovation", image: "/images/services/renovation.jpg" },
  { slug: "new-build", name: "New Build", image: "/images/services/new-build.jpg" },
  { slug: "extension", name: "Extension", image: "/images/services/extension.jpg" },
  { slug: "basement-conversion", name: "Basement Conversion", image: "/images/services/basement-conversion.jpg" },
  { slug: "commercial-fit-out", name: "Commercial Fit-Out", image: "/images/services/commercial-fit-out.jpg" },
];

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Consultation", text: "Discuss your needs" },
  { number: "02", title: "Design", text: "Bring ideas to life" },
  { number: "03", title: "Construction", text: "Build with precision" },
  { number: "04", title: "Handover", text: "Your space, our priority" },
];

// TODO: replace with real Google reviews before launch — never publish invented reviews.
export const reviews: Review[] = [
  { name: "[Client name]", role: "Homeowner", quote: "[Paste a real Google review here.]", rating: 5 },
  { name: "[Client name]", role: "Business owner", quote: "[Paste a real Google review here.]", rating: 5 },
  { name: "[Client name]", role: "Homeowner", quote: "[Paste a real Google review here.]", rating: 5 },
];

export const stats = {
  projects: 105,
  since: 2018,
};