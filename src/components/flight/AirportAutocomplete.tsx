"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { airports } from "@/data/flight-booking";
import type { Airport } from "@/types/flight-booking";

interface AirportAutocompleteProps {
  label: string;
  value: string;
  onChange: (airport: Airport) => void;
}

export function AirportAutocomplete({ label, value, onChange }: AirportAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.toLowerCase();
    return airports
      .filter((airport) =>
        [airport.code, airport.city, airport.name, airport.country].some((part) =>
          part.toLowerCase().includes(q)
        )
      )
      .slice(0, 6);
  }, [query]);

  return (
    <div className="relative">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <div className="flex h-14 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100">
        <MapPin className="h-4 w-4 text-sky-500" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
          placeholder="City or airport"
          aria-label={label}
        />
      </div>
      {open && matches.length > 0 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
          {matches.map((airport) => (
            <button
              key={airport.code}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                setQuery(`${airport.city} (${airport.code})`);
                setOpen(false);
                onChange(airport);
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-sky-50"
            >
              <span>
                <span className="font-semibold text-slate-900">{airport.city}</span>
                <span className="block text-xs text-slate-500">{airport.name}</span>
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                {airport.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
