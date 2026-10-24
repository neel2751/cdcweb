import type { Metadata } from "next";
import { CareersAndEstimate, ComplianceStrip, Hero, MapTeaser, Process, Reviews, Sectors, Services, Stats } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Sectors />
      <Services />
      <MapTeaser />
      <Process />
      <ComplianceStrip />
      <Reviews />
      <CareersAndEstimate />
    </>
  );
}