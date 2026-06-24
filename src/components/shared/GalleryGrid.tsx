"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { assetPath } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";

const filters: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "umrah", label: "Umrah" },
  { id: "tickets", label: "Tickets" },
  { id: "visa", label: "Visa" },
  { id: "tours", label: "Tours" },
  { id: "announcement", label: "Announcements" },
];

interface GalleryGridProps {
  images: GalleryItem[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const filtered = filter === "all" ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f.id ? "bg-navy text-white" : "bg-light-bg text-navy hover:bg-gold/20"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {filtered.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setSelected(img)}
            className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Image src={assetPath(img.src)} alt={img.alt} fill className="object-cover transition-transform group-hover:scale-110" unoptimized />
          </button>
        ))}
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 p-4" onClick={() => setSelected(null)} role="dialog" aria-modal="true">
          <button type="button" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white" onClick={() => setSelected(null)} aria-label="Close">
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-4xl w-full aspect-[3/4] md:aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image src={assetPath(selected.src)} alt={selected.alt} fill className="object-contain" unoptimized />
          </div>
        </div>
      )}
    </>
  );
}
