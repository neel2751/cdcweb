import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types";

/** Photo zooms, a gold bar grows and the arrow moves on hover. */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block border border-line bg-paper">
      <div className="relative aspect-16/7.5 overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-1200 ease-lux group-hover:scale-[1.08]"
        />
      </div>
      <div className="h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-lux group-hover:scale-x-100" />
      <div className="flex items-center justify-between px-4.5 pt-4.5 pb-5 text-sm font-medium">
        <span>{service.name}</span>
        <span className="text-gold-dark transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}