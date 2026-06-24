"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { assetPath } from "@/lib/base-path";
import { SITE } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import type { Flyer } from "@/types";

const categoryColors: Record<string, string> = {
  umrah: "bg-gold text-navy",
  visa: "bg-royal text-white",
  tickets: "bg-navy text-white",
  tours: "bg-brand-red text-white",
  announcement: "bg-navy-light text-gold",
};

interface FlyersCarouselProps {
  flyers: Flyer[];
}

export function FlyersCarousel({ flyers }: FlyersCarouselProps) {
  const [preview, setPreview] = useState<Flyer | null>(null);

  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading title="Latest Offers & Flyers" subtitle="Umrah, visas, group tickets and tour promotions" />
        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4500 })]} className="w-full">
          <CarouselContent className="-ml-4">
            {flyers.map((flyer) => (
              <CarouselItem key={flyer.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="group overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setPreview(flyer)}
                    className="relative block aspect-[3/4] w-full overflow-hidden"
                    aria-label={`Preview ${flyer.title}`}
                  >
                    <Image
                      src={assetPath(flyer.image)}
                      alt={flyer.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                    <Badge className={cn("absolute left-3 top-3 capitalize", categoryColors[flyer.category])}>
                      {flyer.category}
                    </Badge>
                  </button>
                  <div className="flex items-center justify-between gap-2 p-4">
                    <h3 className="font-heading text-sm font-semibold text-navy">{flyer.title}</h3>
                    <a
                      href={SITE.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ size: "sm" }), "shrink-0 bg-gold text-navy hover:bg-gold-light")}
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>

      {preview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-4" onClick={() => setPreview(null)} role="dialog" aria-modal="true">
          <button type="button" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white" onClick={() => setPreview(null)} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <Image src={assetPath(preview.image)} alt={preview.title} width={600} height={800} className="mx-auto max-h-[75vh] w-auto rounded-xl object-contain" unoptimized />
            <div className="mt-4 flex justify-center gap-3">
              {preview.link && (
                <Link href={preview.link} className={cn(buttonVariants({ variant: "outline" }), "border-white text-white")}>
                  Learn More
                </Link>
              )}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants(), "bg-gold text-navy")}>
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
