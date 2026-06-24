import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { assetPath } from "@/lib/base-path";
import { formatPrice } from "@/lib/ticket-filters";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Destination } from "@/types";

interface DestinationGridProps {
  destinations: Destination[];
}

export function DestinationGrid({ destinations }: DestinationGridProps) {
  return (
    <section className="section-padding bg-light-bg">
      <div className="container-wide">
        <SectionHeading
          title="Explore by Destination"
          subtitle="Umrah, group tickets, visas, tours and corporate travel — all in one place"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={dest.href}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={assetPath(dest.image)}
                  alt={dest.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-heading text-lg font-bold">{dest.label}</h3>
                <p className="flex items-center gap-1 text-xs text-gold-light">
                  <MapPin className="h-3 w-3" /> {dest.country}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  {dest.availableCount !== undefined && dest.availableCount > 0 && (
                    <span className="rounded-full bg-white/15 px-2 py-0.5">{dest.availableCount} available</span>
                  )}
                  {dest.startingPrice && (
                    <span className="rounded-full bg-gold/90 px-2 py-0.5 font-medium text-navy">
                      From {formatPrice(dest.startingPrice, dest.currency || "PKR")}
                    </span>
                  )}
                </div>
                <span className="mt-2 inline-flex items-center text-xs opacity-0 transition-opacity group-hover:opacity-100">
                  View details <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/destinations/" className="text-sm font-medium text-royal hover:text-gold">
            View all destinations →
          </Link>
        </div>
      </div>
    </section>
  );
}
