"use client";

import { useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

interface AirlineLogoProps {
  code: string;
  name: string;
  logo?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-base",
};

export function AirlineLogo({ code, name, logo, size = "md", className }: AirlineLogoProps) {
  const [error, setError] = useState(false);
  const src = logo ? assetPath(logo) : "";

  if (!logo || error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-navy font-bold text-gold",
          sizeMap[size],
          className
        )}
        title={name}
      >
        {code.slice(0, 2)}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-white p-1", sizeMap[size], className)}>
      <Image
        src={src}
        alt={name}
        fill
        className="object-contain p-0.5"
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
}
