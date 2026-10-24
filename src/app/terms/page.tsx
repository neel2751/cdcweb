import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Terms and conditions", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms and conditions" draft>
      <h2>Using this website</h2>
      <p>Information on this website is general guidance. Prices shown by the cost estimator are guide ranges, not quotes. A quote is only binding once issued in writing by CDC.</p>
      <h2>Warranty and insurance</h2>
      <p>Where the site says &ldquo;T&amp;C apply&rdquo; for the structural warranty or insurance, the full terms are set out in your written quote and contract. [CDC to add the warranty terms here.]</p>
      <h2>Contract terms</h2>
      <p>[CDC to add its standard terms of business.]</p>
    </LegalPage>
  );
}
