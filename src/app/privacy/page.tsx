import type { Metadata } from "next";
import { site } from "@/data/site";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" draft>
      <h2>Who we are</h2>
      <p>
        {site.name}, {site.address.street}, {site.address.town}, {site.address.postcode}, is the controller of personal data collected through this
        website. Contact us at {site.email}.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Quote and contact forms: name, email, phone, postcode, project details, and any photos or drawings you upload.</li>
        <li>Cost estimator: your answers, if you choose to email them or carry them into a quote request.</li>
        <li>Careers: your CV, contact details and qualifications.</li>
        <li>Compliance document requests: name, organisation, work email and tender reference.</li>
        <li>Newsletter: your email address.</li>
        <li>The page you first arrived on and any campaign tags in the link, so we know which pages bring enquiries.</li>
      </ul>
      <h2>Why we use it</h2>
      <p>To reply to your enquiry, arrange a survey, prepare a quote, assess job applications and send documents you request. The lawful basis is taking steps at your request before entering a contract, or our legitimate interest in responding to business enquiries. Newsletter emails are sent only with your consent, and you can unsubscribe at any time.</p>
      <h2>Who we share it with</h2>
      <p>
        Our email delivery provider, our spam-protection provider (Cloudflare Turnstile) and the spreadsheet service we use to track enquiries. We do
        not sell your data.
      </p>
      <h2>How long we keep it</h2>
      <p>Enquiries that don't become projects: 24 months. CVs: 12 months. Project records: as long as needed for contracts, warranties and the law.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete your data, or object to how we use it, by emailing {site.email}. You can also complain to the Information Commissioner's Office (ico.org.uk).</p>
    </LegalPage>
  );
}
