import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Carbon Reduction Plan", alternates: { canonical: "/carbon-reduction-plan" } };

export default function CarbonPage() {
  return (
    <LegalPage title="Carbon Reduction Plan" draft>
      <p>[CDC to paste the current Carbon Reduction Plan: baseline year, current emissions, reduction targets and measures, and the director sign-off.]</p>
      <p>
        The signed PDF is also listed in the <Link href="/compliance">Compliance hub</Link>.
      </p>
    </LegalPage>
  );
}
