import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PackageCard } from "@/components/shared/PackageCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { TravelPackage } from "@/types";

interface FeaturedUmrahPackagesProps {
  packages: TravelPackage[];
}

export function FeaturedUmrahPackages({ packages }: FeaturedUmrahPackagesProps) {
  return (
    <section className="section-padding bg-navy">
      <div className="container-wide">
        <SectionHeading
          title="Featured Umrah Packages"
          subtitle="Complete packages with flights, hotels, visa and ground transport"
          light
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/umrah-packages/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-gold text-gold hover:bg-gold hover:text-navy")}
          >
            View All Umrah Packages
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
