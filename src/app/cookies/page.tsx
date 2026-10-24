import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";

export const metadata: Metadata = { title: "Cookies", alternates: { canonical: "/cookies" } };

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" draft>
      <p>This website does not use advertising or analytics cookies.</p>
      <h2>What the site stores</h2>
      <ul>
        <li>
          <strong>Session storage</strong> in your browser keeps your cost estimator answers and the page you first arrived on, so the quote form can be
          pre-filled. It is deleted when you close the tab.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> may set a strictly necessary cookie when you submit a form, to check you are not a bot.
        </li>
      </ul>
      <h2>Links to other sites</h2>
      <p>Links to Google Maps, Google reviews, WhatsApp and social networks take you to those sites, which have their own cookie policies.</p>
    </LegalPage>
  );
}
