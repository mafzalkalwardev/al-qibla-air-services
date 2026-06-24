import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { assetPath } from "@/lib/base-path";
import { formatPrice } from "@/lib/ticket-filters";
import { dataProvider } from "@/lib/data-provider";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Explore by Destination",
  description: `Explore Umrah, group tickets, visas and tours by destination with ${SITE.name}.`,
  path: "/destinations/",
});

export default async function DestinationsPage() {
  const destinations = await dataProvider.getDestinations();

  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Explore by Destination</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Umrah packages, KSA & UAE group tickets, visas, tours and corporate travel worldwide.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title="Popular Destinations & Services" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest) => (
              <Link key={dest.id} href={dest.href} className="card-premium group overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={assetPath(dest.image)} alt={dest.label} fill className="object-cover transition-transform group-hover:scale-105" unoptimized />
                </div>
                <div className="p-5">
                  <h2 className="font-heading text-xl font-semibold text-navy">{dest.label}</h2>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{dest.country}</p>
                  {dest.startingPrice && (
                    <p className="mt-2 text-lg font-bold text-gold">From {formatPrice(dest.startingPrice, dest.currency || "PKR")}</p>
                  )}
                  <span className="mt-3 inline-flex items-center text-sm font-medium text-royal group-hover:text-gold">
                    Explore <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
