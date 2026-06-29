"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { FlightCard } from "@/components/flight/FlightCard";
import { FlightFilters, type FlightFilterState } from "@/components/flight/FlightFilters";
import { LoadingPlane } from "@/components/flight/LoadingPlane";
import { RouteVisual } from "@/components/flight/RouteVisual";
import { Button } from "@/components/ui/button";
import { mockFlights } from "@/data/flight-booking";
import { filterFlights } from "@/lib/flight-booking";
import type { CabinClass, TripType } from "@/types/flight-booking";

interface FlightResultsClientProps {
  criteria: {
    from?: string;
    to?: string;
    departureDate?: string;
    returnDate?: string;
    tripType?: TripType;
    passengers?: number;
    cabinClass?: CabinClass;
  };
}

export function FlightResultsClient({ criteria }: FlightResultsClientProps) {
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [filters, setFilters] = useState<FlightFilterState>({
    maxPrice: 900,
    stops: "all",
    refundable: false,
    baggage: false,
    sortBy: "recommended",
  });

  const airlines = useMemo(() => Array.from(new Set(mockFlights.map((flight) => flight.airline))), []);

  const flights = useMemo(() => {
    let result = filterFlights(mockFlights, {
      from: criteria.from,
      to: criteria.to,
      departureDate: criteria.departureDate || "",
      tripType: criteria.tripType || "roundtrip",
      passengers: criteria.passengers || 1,
      cabinClass: criteria.cabinClass || "Economy",
    });

    if (!result.length) result = mockFlights;
    result = result.filter((flight) => flight.price <= filters.maxPrice);
    if (filters.stops === "direct") result = result.filter((flight) => flight.stops === 0);
    if (filters.stops === "one-stop") result = result.filter((flight) => flight.stops === 1);
    if (filters.refundable) result = result.filter((flight) => flight.refundable);
    if (filters.baggage) result = result.filter((flight) => flight.baggage !== "0kg");
    if (selectedAirlines.length) {
      result = result.filter((flight) => selectedAirlines.includes(flight.airline));
    }

    return [...result].sort((a, b) => {
      if (filters.sortBy === "cheapest") return a.price - b.price;
      if (filters.sortBy === "fastest") return a.durationMinutes - b.durationMinutes;
      return a.price + a.durationMinutes * 0.18 + a.stops * 60 - (b.price + b.durationMinutes * 0.18 + b.stops * 60);
    });
  }, [criteria, filters, selectedAirlines]);

  function updateSort(sortBy: FlightFilterState["sortBy"]) {
    setLoading(true);
    setTimeout(() => {
      setFilters({ ...filters, sortBy });
      setLoading(false);
    }, 350);
  }

  const fromCity = mockFlights.find((flight) => flight.from === criteria.from)?.fromCity || "Islamabad";
  const toCity = mockFlights.find((flight) => flight.to === criteria.to)?.toCity || "Dubai";

  return (
    <div className="bg-slate-50">
      <section className="bg-navy py-10 text-white">
        <div className="container-wide grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-wider text-sky-200">Flight results</p>
            <h1 className="mt-2 font-heading text-4xl font-bold md:text-5xl">
              {criteria.from || "ISB"} to {criteria.to || "DXB"}
            </h1>
            <p className="mt-3 text-white/70">
              {flights.length} curated options / {criteria.passengers || 1} traveler / {criteria.cabinClass || "Economy"}
            </p>
          </div>
          <RouteVisual fromCity={fromCity} toCity={toCity} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="outline" className="lg:hidden" onClick={() => setFiltersOpen((value) => !value)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </Button>
            <div className="flex flex-wrap gap-2">
              {[
                ["recommended", "Recommended"],
                ["cheapest", "Cheapest"],
                ["fastest", "Fastest"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateSort(value as FlightFilterState["sortBy"])}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filters.sortBy === value ? "bg-navy text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className={filtersOpen ? "block" : "hidden lg:block"}>
              <FlightFilters
                filters={filters}
                onChange={setFilters}
                airlines={airlines}
                selectedAirlines={selectedAirlines}
                onAirlinesChange={setSelectedAirlines}
              />
            </div>
            <div className="space-y-4">
              {loading ? (
                <LoadingPlane />
              ) : flights.length ? (
                <AnimatePresence mode="popLayout">
                  {flights.map((flight, index) => (
                    <FlightCard key={flight.id} flight={flight} index={index} />
                  ))}
                </AnimatePresence>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <p className="font-heading text-2xl font-bold text-navy">No flights found</p>
                  <p className="mt-2 text-slate-500">Try resetting filters or searching a different route.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
