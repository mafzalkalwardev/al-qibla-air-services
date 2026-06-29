import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { FlightSearchForm } from "@/components/flight/FlightSearchForm";
import { RouteVisual } from "@/components/flight/RouteVisual";

export function FlightBookingHero() {
  return (
    <section className="relative overflow-hidden bg-[#071B3A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.25),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.18),transparent_28%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      <div className="container-wide relative grid min-h-[calc(100vh-88px)] gap-10 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-sky-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-gold" />
            Premium flight booking experience
          </div>
          <h1 className="font-heading text-[clamp(2.4rem,6vw,5.25rem)] font-bold leading-[1.02] tracking-normal">
            Book Your Next Flight Smarter
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
            Compare trusted fares, visualize your route, choose seats, add baggage, and finish with a smooth booking confirmation flow built for real travel operations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#flight-search" className="inline-flex items-center rounded-xl bg-gold px-5 py-3 font-semibold text-navy transition hover:bg-gold-light">
              Search Flights <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/destinations/" className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              Explore Destinations
            </Link>
            <Link href="/flight-booking/dashboard/" className="inline-flex items-center rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
              Traveler Dashboard
            </Link>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["Fast search", Zap],
              ["Secure booking", ShieldCheck],
              ["Smart labels", Sparkles],
            ].map(([label, Icon]) => (
              <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <Icon className="h-5 w-5 text-sky-300" />
                <p className="mt-3 text-sm font-semibold">{String(label)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <RouteVisual />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-white/50">Trending route</p>
              <p className="mt-2 font-heading text-xl font-bold">Islamabad to Dubai</p>
              <p className="mt-1 text-sm text-white/60">from $345 / direct</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-wider text-white/50">Umrah flights</p>
              <p className="mt-2 font-heading text-xl font-bold">Karachi to Jeddah</p>
              <p className="mt-1 text-sm text-white/60">from $318 / 40kg baggage</p>
            </div>
          </div>
        </div>
      </div>
      <div id="flight-search" className="container-wide relative -mt-10 pb-16">
        <FlightSearchForm />
      </div>
    </section>
  );
}
