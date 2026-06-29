"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export interface FlightFilterState {
  maxPrice: number;
  stops: "all" | "direct" | "one-stop";
  refundable: boolean;
  baggage: boolean;
  sortBy: "recommended" | "cheapest" | "fastest";
}

interface FlightFiltersProps {
  filters: FlightFilterState;
  onChange: (filters: FlightFilterState) => void;
  airlines: string[];
  selectedAirlines: string[];
  onAirlinesChange: (airlines: string[]) => void;
}

export function FlightFilters({
  filters,
  onChange,
  airlines,
  selectedAirlines,
  onAirlinesChange,
}: FlightFiltersProps) {
  function toggleAirline(airline: string) {
    onAirlinesChange(
      selectedAirlines.includes(airline)
        ? selectedAirlines.filter((item) => item !== airline)
        : [...selectedAirlines, airline]
    );
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold text-navy">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onChange({ maxPrice: 900, stops: "all", refundable: false, baggage: false, sortBy: "recommended" });
            onAirlinesChange([]);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="mt-6 space-y-6 text-sm">
        <div>
          <label className="font-semibold text-slate-800">Max price: ${filters.maxPrice}</label>
          <input
            type="range"
            min={250}
            max={900}
            step={25}
            value={filters.maxPrice}
            onChange={(event) => onChange({ ...filters, maxPrice: Number(event.target.value) })}
            className="mt-3 w-full accent-sky-500"
          />
        </div>

        <div>
          <p className="font-semibold text-slate-800">Stops</p>
          <div className="mt-3 grid gap-2">
            {[
              ["all", "Any route"],
              ["direct", "Direct only"],
              ["one-stop", "One stop"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => onChange({ ...filters, stops: value as FlightFilterState["stops"] })}
                className={`rounded-xl border px-3 py-2 text-left transition ${
                  filters.stops === value ? "border-sky-300 bg-sky-50 text-sky-800" : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-800">Airlines</p>
          <div className="mt-3 space-y-2">
            {airlines.map((airline) => (
              <label key={airline} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => toggleAirline(airline)}
                  className="accent-sky-500"
                />
                {airline}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.refundable}
              onChange={(event) => onChange({ ...filters, refundable: event.target.checked })}
              className="accent-sky-500"
            />
            Refundable only
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.baggage}
              onChange={(event) => onChange({ ...filters, baggage: event.target.checked })}
              className="accent-sky-500"
            />
            Baggage included
          </label>
        </div>
      </div>
    </motion.aside>
  );
}
