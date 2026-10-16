import type { Metadata, Viewport } from "next";
import "./globals.css";
import { sans, serif } from "@/lib/fonts";
import { site } from "@/data/site";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Loader from "@/components/layout/Loader";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "CDC Construction — Premium Construction & Design in London",
    template: "%s | CDC Construction",
  },
  description:
    "Architectural design, design & build, extensions, loft conversions and commercial fit-outs across London and Manchester. Over 105 projects delivered since 2018.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CDC Construction",
  },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Loader />
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}