import type { Metadata, Viewport } from "next";
import "./globals.css";
import { sans, serif } from "@/lib/fonts";
import { site } from "@/data/site";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import MobileQuoteBar from "@/components/layout/MobileQuoteBar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SourceTracker from "@/components/layout/SourceTracker";
import JsonLd from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "CDC Construction — Design and build contractor, London",
    template: "%s | CDC Construction",
  },
  description:
    "Design and build contractor in Ilford, East London. Office fit-outs, education projects, extensions, lofts, basements and new builds across London, Manchester and Leeds since 2018.",
  applicationName: "Creative Design & Construction",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Creative Design & Construction",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE8",
  viewportFit: "cover",
};

const organisation = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  url: site.url,
  telephone: "+44 20 8004 3327",
  email: site.email,
  foundingDate: String(site.established),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.town,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: site.areasServed,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-ground font-sans text-ink antialiased">
        <JsonLd data={organisation} />
        <SourceTracker />
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
        <MobileQuoteBar />
        <WhatsAppButton />
      </body>
    </html>
  );
}