import type { NavItem } from "@/types";

export const site = {
  name: "Creative Design & Construction Ltd",
  shortName: "CDC",
  url: "https://cdc.construction",
  established: 2018,
  phone: "020 8004 3327",
  phoneHref: "tel:+442080043327",
  email: "info@cdc.construction",
  address: {
    street: "595a Cranbrook Road",
    town: "Ilford",
    postcode: "IG2 6JZ",
    country: "GB",
  },
  mapsUrl: "https://maps.app.goo.gl/qbBpiJ11NAzBEQHM9",
  hours: "Mon–Sat 9:00–18:00",
  whatsappHref: "https://wa.me/442080043327",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/cdcconstructionltd" },
    { label: "Instagram", href: "https://instagram.com/cdc.constructionuk" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/creative-design-and-construction-limited/" },
    { label: "YouTube", href: "https://www.youtube.com/@CDCLtd" },
    { label: "TikTok", href: "https://www.tiktok.com/@cdclimited" },
  ],
  googleReviewsUrl: "https://www.google.com/search?q=Creative+Design+%26+Construction+Ltd+Ilford+reviews",
  areasServed: ["London", "Essex", "Surrey", "Greater Manchester", "West Yorkshire"],
} as const;

export const stats = [
  { value: "105+", label: "Projects completed since 2018" },
  { value: "99%", label: "Client satisfaction rate" },
  { value: "100%", label: "Projects handed over on time" },
  { value: "10 yr", label: "Structural warranty, up to (T&C apply)" },
] as const;

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/sectors" },
  { label: "Projects", href: "/projects" },
  { label: "Compliance", href: "/compliance" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Careers", href: "/careers" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ],
  tools: [
    { label: "Cost estimator", href: "/estimator" },
    { label: "Request a quote", href: "/request-a-quote" },
    { label: "Compliance hub", href: "/compliance" },
  ],
  policies: [
    { label: "Carbon Reduction Plan", href: "/carbon-reduction-plan" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export const reviews = [
  {
    quote:
      "Their attention to detail, innovative designs and commitment to client satisfaction make them a top choice for anyone seeking quality work and good service.",
    name: "Ankush Deshbhratar",
  },
  {
    quote: "Their service is very good, staff is very cooperative and they complete their jobs in given time period.",
    name: "Anurag Chopra",
  },
  {
    quote: "The interior designer is really good — they did my living room on a low budget. Thanks so much.",
    name: "Sourav Jassal",
  },
];