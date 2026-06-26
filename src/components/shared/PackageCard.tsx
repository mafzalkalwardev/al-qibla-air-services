import Link from "next/link";
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/base-path";
import { formatPrice } from "@/lib/ticket-filters";
import { SITE } from "@/lib/constants";
import type { TravelPackage } from "@/types";

interface PackageCardProps {
  pkg: TravelPackage;
  bookLabel?: string;
}

export function PackageCard({ pkg, bookLabel = "Inquire Now" }: PackageCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hello ${SITE.name}, I am interested in the ${pkg.title} package. Please share details.`
  );

  return (
    <Card className="group overflow-hidden border border-border/60 transition-all hover:border-gold/50 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-light">
        <Image
          src={assetPath(pkg.image)}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        {pkg.featured && (
          <Badge className="absolute left-3 top-3 bg-gold text-navy">Featured</Badge>
        )}
        {pkg.hotelStars && (
          <div className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-navy/80 px-2 py-1 text-xs text-gold">
            <Star className="h-3 w-3 fill-gold" />
            {pkg.hotelStars} Star
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-heading text-lg font-semibold leading-snug text-navy">{pkg.title}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {pkg.duration}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-2xl font-bold text-gold">
          {formatPrice(pkg.price, pkg.currency)}
        </p>
        <ul className="space-y-1">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {h}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="gap-2">
        <Link
          href={pkg.type === "umrah" ? "/umrah-packages/" : "/tour-packages/"}
          className={cn(buttonVariants({ variant: "outlineDark" }), "flex-1")}
        >
          Details
        </Link>
        <a
          href={`${SITE.whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "primaryGold" }), "flex-1")}
        >
          {bookLabel}
        </a>
      </CardFooter>
    </Card>
  );
}
