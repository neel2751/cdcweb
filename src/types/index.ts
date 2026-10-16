export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  name: string;
  image: string;
};

export type HeroSlide = {
  image: string;
  alt: string;
  title: string;
  category: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  text: string;
};

export type Review = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};