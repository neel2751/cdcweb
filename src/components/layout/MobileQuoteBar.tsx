"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

export default function MobileQuoteBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/request-a-quote") || pathname.startsWith("/estimator") || pathname.startsWith("/enquiry-received")) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-paper lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a href={site.phoneHref} className="flex min-h-14 items-center justify-center font-semibold text-navy">
        Call {site.phone}
      </a>
      <Link href="/request-a-quote" className="flex min-h-14 items-center justify-center bg-red font-semibold text-white">
        Get a quote
      </Link>
    </div>
  );
}