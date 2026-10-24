import { site } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message CDC on WhatsApp"
      className="fixed right-6 bottom-6 z-30 hidden size-14 place-items-center rounded-full bg-navy text-white shadow-[0_10px_24px_rgb(16_41_74/0.3)] transition-transform hover:scale-105 lg:grid"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z" />
      </svg>
    </a>
  );
}
