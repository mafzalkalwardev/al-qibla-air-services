"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Plane } from "lucide-react";

interface RouteVisualProps {
  fromCity?: string;
  toCity?: string;
}

export function RouteVisual({ fromCity = "Islamabad", toCity = "Dubai" }: RouteVisualProps) {
  const reduced = useReducedMotion();

  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(72,187,255,0.22),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(214,168,79,0.18),transparent_28%)]" />
      <div className="relative flex h-full min-h-[240px] items-center justify-center">
        <svg viewBox="0 0 420 220" className="h-full w-full" role="img" aria-label={`${fromCity} to ${toCity} route`}>
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#d6a84f" />
            </linearGradient>
          </defs>
          <motion.path
            d="M55 160 C150 25 270 25 365 160"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="3"
            strokeDasharray="10 10"
            initial={reduced ? false : { pathLength: 0, opacity: 0.4 }}
            animate={reduced ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {[55, 365].map((x, i) => (
            <g key={x}>
              <motion.circle
                cx={x}
                cy="160"
                r="10"
                fill={i === 0 ? "#38bdf8" : "#d6a84f"}
                animate={reduced ? undefined : { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
              />
              <circle cx={x} cy="160" r="4" fill="white" />
            </g>
          ))}
        </svg>

        <motion.div
          className="absolute left-[10%] top-[58%] text-white"
          animate={
            reduced
              ? undefined
              : {
                  offsetDistance: ["0%", "100%"],
                }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            offsetPath: "path('M 55 160 C 150 25 270 25 365 160')",
            offsetRotate: "auto",
          }}
        >
          <Plane className="h-7 w-7 fill-white/20 text-white drop-shadow-lg" />
        </motion.div>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-sm text-white">
          <div>
            <p className="font-semibold">{fromCity}</p>
            <p className="text-white/55">Departure</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{toCity}</p>
            <p className="text-white/55">Arrival</p>
          </div>
        </div>
      </div>
    </div>
  );
}
