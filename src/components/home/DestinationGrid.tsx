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
        <MotionStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((dest) => (
            <MotionStaggerItem key={dest.id}>
            <Link
              href={dest.href}
              className="destination-card group"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={assetPath(dest.image)}
                  alt={dest.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-navy/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-heading text-lg font-bold drop-shadow-sm">{dest.label}</h3>
                <p className="flex items-center gap-1 text-xs text-gold-light">
                  <MapPin className="h-3 w-3 shrink-0" /> {dest.country}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                  {dest.availableCount !== undefined && dest.availableCount > 0 && (
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 backdrop-blur-sm">{dest.availableCount} available</span>
                  )}
                  {dest.startingPrice && (
                    <span className="rounded-full bg-gold px-2.5 py-0.5 font-semibold text-navy shadow-sm">
                      From {formatPrice(dest.startingPrice, dest.currency || "PKR")}
                    </span>
                  )}
                </div>
                <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-gold-light opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                  View details <ArrowRight className="h-3 w-3" />
                </span>
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
