import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { sectors } from "@/data/sectors";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    "/sectors",
    "/projects",
    "/estimator",
    "/compliance",
    "/about",
    "/team",
    "/careers",
    "/faqs",
    "/contact",
    "/request-a-quote",
    "/privacy",
    "/terms",
    "/cookies",
    "/cancellation-policy",
    "/carbon-reduction-plan",
    ...services.map((s) => `/services/${s.slug}`),
    ...sectors.map((s) => `/sectors/${s.id}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return pages.map((p) => ({ url: `${site.url}${p}` }));
}
