import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { assetPath } from "@/lib/base-path";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Destination } from "@/types";

interface DestinationGridProps {
  destinations: Destination[];
}

export function DestinationGrid({ destinations }: DestinationGridProps) {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Explore by Destination"
          subtitle="Popular destinations for Umrah, business travel and holidays"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href="/available-tickets/"
              className="group relative aspect-[4/5] overflow-hidden rounded-xl"
            >
              <Image
                src={assetPath(dest.image)}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-xl font-bold text-white">{dest.name}</h3>
                <p className="text-sm text-gold-light">{dest.country}</p>
                <span className="mt-2 inline-flex items-center text-xs text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                  View tickets <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
