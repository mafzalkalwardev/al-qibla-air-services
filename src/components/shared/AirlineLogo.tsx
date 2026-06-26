"use client";

import { useState } from "react";
import Image from "next/image";
import { Plane } from "lucide-react";
import { assetPath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

interface AirlineLogoProps {
  code: string;
  name: string;
  logo?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { box: "h-12 w-12", img: 40, pad: "p-1" },
  md: { box: "h-16 w-16", img: 52, pad: "p-1.5" },
  lg: { box: "h-20 w-20", img: 64, pad: "p-2" },
};

export function AirlineLogo({ code, name, logo, size = "md", className }: AirlineLogoProps) {
  const [failed, setFailed] = useState(false);
  const lower = code.toLowerCase();
  const logoPath = logo || `/assets/airlines/${lower}.png`;
  const s = sizes[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm transition-shadow hover:shadow-md",
        s.box,
        className
      )}
      title={name}
    >
      {!failed ? (
        <Image
          src={assetPath(logoPath)}
          alt={`${name} logo`}
          width={s.img}
          height={s.img}
          className={cn("h-full w-full object-contain", s.pad)}
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-navy/5 to-royal/10 p-1">
          <Plane className="h-4 w-4 text-royal/50" />
          <span className="text-[10px] font-bold text-navy/80">{code}</span>
        </div>
      )}
    </div>
  );
}
