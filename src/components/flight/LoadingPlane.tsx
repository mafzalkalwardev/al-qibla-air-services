"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export function LoadingPlane() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="relative mx-auto h-24 max-w-xl overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2"
          animate={{ x: ["0%", "760%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plane className="h-7 w-7 text-sky-500" />
        </motion.div>
        <div className="absolute left-8 right-8 top-1/2 h-px border-t border-dashed border-sky-300" />
      </div>
      <p className="mt-5 text-center text-sm font-medium text-slate-500">
        Comparing fares, routes, baggage, and flight value...
      </p>
    </div>
  );
}
