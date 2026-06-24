import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { assetPath } from "@/lib/base-path";
import { formatPrice } from "@/lib/ticket-filters";
import { SITE } from "@/lib/constants";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { TravelPackage } from "@/types";

interface UmrahPackageCardProps {
  pkg: TravelPackage;
}

export function UmrahPackageCard({ pkg }: UmrahPackageCardProps) {
  const msg = bookingMessage(`Umrah package ${pkg.packageCode || pkg.title}`, `Duration: ${pkg.duration}\nPrice: ${formatPrice(pkg.price, pkg.currency)}`);

  return (
    <Card className="card-premium overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-light">
        <Image src={assetPath(pkg.image)} alt={pkg.title} fill className="object-cover" unoptimized />
        {pkg.packageCode && (
          <Badge className="absolute left-3 top-3 bg-navy/90 text-gold">{pkg.packageCode}</Badge>
        )}
        {pkg.category && (
          <Badge className="absolute right-3 top-3 bg-gold text-navy capitalize">{pkg.category}</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-heading text-lg font-semibold text-navy">{pkg.title}</h3>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{pkg.duration}</span>
          {pkg.departureCity && <span>From {pkg.departureCity}</span>}
          {pkg.seatsLeft !== undefined && (
            <span className="flex items-center gap-1 text-brand-red"><Users className="h-3 w-3" />{pkg.seatsLeft} seats left</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-2xl font-bold text-gold">{formatPrice(pkg.price, pkg.currency)}</p>
        <div className="grid gap-1 text-muted-foreground">
          {pkg.airline && <p><strong className="text-navy">Airline:</strong> {pkg.airline}</p>}
          {pkg.hotelMakkah && <p><strong className="text-navy">Makkah:</strong> {pkg.hotelMakkah}</p>}
          {pkg.hotelMadinah && <p><strong className="text-navy">Madinah:</strong> {pkg.hotelMadinah}</p>}
          {pkg.distanceFromHaram && <p><strong className="text-navy">Haram:</strong> {pkg.distanceFromHaram}</p>}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {pkg.visa && <Badge variant="outline" className="text-xs">Visa</Badge>}
          {pkg.transport && <Badge variant="outline" className="text-xs">Transport</Badge>}
          {pkg.ziyarat && <Badge variant="outline" className="text-xs">Ziyarat</Badge>}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Link href="/umrah-packages/" className={cn(buttonVariants({ variant: "outline" }), "flex-1")}>Details</Link>
        <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "flex-1 bg-gold text-navy hover:bg-gold-light")}>
          Book Now
        </a>
      </CardFooter>
    </Card>
  );
}
