"use client";

import { motion } from "framer-motion";
import { seatMap } from "@/data/flight-booking";
import { cn } from "@/lib/utils";
import type { Seat } from "@/types/flight-booking";

interface SeatMapProps {
  selectedSeat?: Seat;
  onSelect: (seat: Seat) => void;
}

export function SeatMap({ selectedSeat, onSelect }: SeatMapProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-5">
      <div className="mx-auto w-[360px]">
        <div className="mb-5 rounded-t-full bg-slate-100 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          Front cabin
        </div>
        <div className="grid grid-cols-[repeat(3,44px)_32px_repeat(3,44px)] gap-2">
          {seatMap.map((seat, index) => {
            const aisle = index % 6 === 3;
            return (
              <div key={seat.id} className={aisle ? "col-start-5" : undefined}>
                <motion.button
                  type="button"
                  whileTap={{ scale: seat.status === "available" ? 0.9 : 1 }}
                  disabled={seat.status === "occupied"}
                  onClick={() => onSelect(seat)}
                  className={cn(
                    "h-11 w-11 rounded-xl border text-xs font-bold transition focus:outline-none focus:ring-4 focus:ring-sky-100",
                    seat.status === "occupied" && "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400",
                    seat.status === "available" && seat.type === "standard" && "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100",
                    seat.status === "available" && seat.type === "premium" && "border-gold/40 bg-gold/15 text-navy hover:bg-gold/25",
                    selectedSeat?.id === seat.id && "border-emerald-400 bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                  )}
                  aria-label={`Seat ${seat.id}`}
                >
                  {seat.id}
                </motion.button>
              </div>
            );
          })}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-slate-500">
          <span><span className="mr-1 inline-block h-3 w-3 rounded bg-sky-100" /> Standard</span>
          <span><span className="mr-1 inline-block h-3 w-3 rounded bg-gold/30" /> Premium</span>
          <span><span className="mr-1 inline-block h-3 w-3 rounded bg-slate-200" /> Occupied</span>
        </div>
      </div>
    </div>
  );
}
