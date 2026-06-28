"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRightLeft, CalendarDays, Loader2, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AirportAutocomplete } from "@/components/flight/AirportAutocomplete";
import type { CabinClass, TripType } from "@/types/flight-booking";

const cabins: CabinClass[] = ["Economy", "Premium Economy", "Business", "First"];
const tripTypes: { label: string; value: TripType }[] = [
  { label: "One-way", value: "oneway" },
  { label: "Round trip", value: "roundtrip" },
  { label: "Multi-city", value: "multicity" },
];

export function FlightSearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState({ code: "ISB", city: "Islamabad" });
  const [to, setTo] = useState({ code: "DXB", city: "Dubai" });
  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [departureDate, setDepartureDate] = useState("2026-07-10");
  const [returnDate, setReturnDate] = useState("2026-07-17");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<CabinClass>("Economy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSearch = useMemo(
    () => from.code && to.code && from.code !== to.code && departureDate && passengers > 0,
    [departureDate, from.code, passengers, to.code]
  );

  function submit() {
    if (!canSearch) {
      setError("Choose different departure and arrival airports.");
      return;
    }
    setError("");
    setLoading(true);
    const params = new URLSearchParams({
      from: from.code,
      to: to.code,
      departureDate,
      returnDate,
      tripType,
      passengers: String(passengers),
      cabinClass,
    });
    setTimeout(() => router.push(`/flight-booking/results/?${params.toString()}`), 650);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-3xl border border-white/20 bg-white/95 p-4 shadow-2xl shadow-navy/20 backdrop-blur-xl md:p-6"
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {tripTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => setTripType(type.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              tripType === type.value ? "bg-navy text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <AirportAutocomplete label="From" value={`${from.city} (${from.code})`} onChange={(airport) => setFrom(airport)} />
        <button
          type="button"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          className="mx-auto mt-7 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:rotate-180 hover:border-sky-300 hover:text-sky-600"
          aria-label="Swap departure and arrival"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <AirportAutocomplete label="To" value={`${to.city} (${to.code})`} onChange={(airport) => setTo(airport)} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" /> Departure
          </span>
          <input
            type="date"
            value={departureDate}
            onChange={(event) => setDepartureDate(event.target.value)}
            className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" /> Return
          </span>
          <input
            type="date"
            value={returnDate}
            disabled={tripType === "oneway"}
            onChange={(event) => setReturnDate(event.target.value)}
            className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition disabled:bg-slate-100 disabled:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Users className="h-3.5 w-3.5" /> Passengers
          </span>
          <div className="flex h-14 items-center justify-between rounded-xl border border-slate-200 bg-white px-3">
            <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} className="rounded-lg px-3 py-2 text-lg font-bold text-slate-500 hover:bg-slate-100">-</button>
            <span className="font-semibold text-slate-900">{passengers}</span>
            <button type="button" onClick={() => setPassengers(Math.min(9, passengers + 1))} className="rounded-lg px-3 py-2 text-lg font-bold text-slate-500 hover:bg-slate-100">+</button>
          </div>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Cabin class
          </span>
          <select
            value={cabinClass}
            onChange={(event) => setCabinClass(event.target.value as CabinClass)}
            className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            {cabins.map((cabin) => (
              <option key={cabin}>{cabin}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">Smart labels, fare comparison, and payment-ready booking flow.</p>
        <Button onClick={submit} disabled={loading} variant="navy" size="lg" className="min-w-44">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
          {loading ? "Searching" : "Search Flights"}
        </Button>
      </div>
    </motion.div>
  );
}
