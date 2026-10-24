import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Cancellation policy", alternates: { canonical: "/cancellation-policy" } };

export default function CancellationPage() {
  return (
    <LegalPage title="Cancellation policy" draft>
      <p>[CDC to paste the approved cancellation policy. For home improvement contracts agreed away from our office, include the consumer 14-day cancellation right.]</p>
    </LegalPage>
  );
}
