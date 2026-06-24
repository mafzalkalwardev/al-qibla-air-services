"use client";

import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { assetPath } from "@/lib/base-path";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Flyer } from "@/types";

interface FlyersCarouselProps {
  flyers: Flyer[];
}

export function FlyersCarousel({ flyers }: FlyersCarouselProps) {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide">
        <SectionHeading title="Latest Offers & Flyers" subtitle="Exclusive deals on Umrah, group tickets and tour packages" />
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {flyers.map((flyer) => (
              <CarouselItem key={flyer.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link
                  href={flyer.link || "#"}
                  className="group block overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={assetPath(flyer.image)}
                      alt={flyer.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-navy group-hover:text-gold">
                      {flyer.title}
                    </h3>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
