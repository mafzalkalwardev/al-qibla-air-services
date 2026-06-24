"use client";

import { useReducedMotion } from "framer-motion";
import { Cloud, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingAircraftLayerProps {
  className?: string;
  density?: "low" | "medium";
}

const items = [
  { Icon: Plane, top: "12%", left: "8%", delay: "0s", size: 14 },
  { Icon: Cloud, top: "22%", left: "72%", delay: "2s", size: 20 },
  { Icon: Plane, top: "65%", left: "85%", delay: "4s", size: 12 },
  { Icon: Cloud, top: "78%", left: "15%", delay: "1s", size: 18 },
];

export function FloatingAircraftLayer({
  className,
  density = "low",
}: FloatingAircraftLayerProps) {
  const reduced = useReducedMotion();
  const visible = density === "medium" ? items : items.slice(0, 2);

  if (reduced) return null;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {visible.map(({ Icon, top, left, delay, size }, i) => (
        <Icon
          key={i}
          className="absolute text-white/10 animate-float"
          style={{ top, left, width: size, height: size, animationDelay: delay }}
        />
      ))}
    </div>
  );
}
