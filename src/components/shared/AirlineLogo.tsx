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
  sm: { box: "h-10 w-10", img: 32 },
  md: { box: "h-14 w-14", img: 44 },
  lg: { box: "h-16 w-16", img: 52 },
};

export function AirlineLogo({ code, name, logo, size = "md", className }: AirlineLogoProps) {
  const [failed, setFailed] = useState(false);
  const logoPath = logo || `/assets/airlines/${code.toLowerCase()}.svg`;
  const s = sizes[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm",
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
          className="object-contain p-1.5"
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
