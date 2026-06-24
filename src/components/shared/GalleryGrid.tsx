"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { assetPath } from "@/lib/base-path";

interface GalleryGridProps {
  images: { id: string; src: string; alt: string }[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedImg = images.find((i) => i.id === selected);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setSelected(img.id)}
            className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Image
              src={assetPath(img.src)}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            <div className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/30" />
          </button>
        ))}
      </div>

      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-4xl w-full aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={assetPath(selectedImg.src)}
              alt={selectedImg.alt}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
