import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { assetPath } from "@/lib/base-path";
import { formatPrice } from "@/lib/ticket-filters";
import { MotionSection } from "@/components/motion/MotionSection";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Destination } from "@/types";

interface DestinationGridProps {
  destinations: Destination[];
}

export function DestinationGrid({ destinations }: DestinationGridProps) {
  return (
    <section className="section-padding bg-light-bg">
      <div className="container-wide">
        <MotionSection>
          <SectionHeading
            title="Explore by Destination"
            subtitle="Umrah, group tickets, visas, tours and corporate travel — all in one place"
          />
        </MotionSection>
        <MotionStagger className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <MotionStaggerItem key={dest.id} className="h-full">
              <Link href={dest.href} className="destination-card group block h-full">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={assetPath(dest.image)}
                    alt={dest.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/45 to-navy/5" />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 pb-5 pt-16">
                    <h3 className="font-heading text-lg font-bold leading-tight text-white drop-shadow-md">
                      {dest.label}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-gold-light">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                      {dest.country}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {dest.availableCount !== undefined && dest.availableCount > 0 && (
                        <span className="inline-flex shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {dest.availableCount} available
                        </span>
                      )}
                      {dest.availableCount === 0 && dest.slug.includes("visa") && (
                        <span className="inline-flex shrink-0 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          E-Visa service
                        </span>
                      )}
                      {dest.startingPrice && (
                        <span className="inline-flex shrink-0 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-navy shadow-sm">
                          From {formatPrice(dest.startingPrice, dest.currency || "PKR")}
                        </span>
                      )}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View details <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
        <div className="mt-8 text-center">
          <Link href="/destinations/" className="text-sm font-medium text-royal hover:text-gold">
            View all destinations →
          </Link>
        </div>
      </div>
    </section>
  );
}
