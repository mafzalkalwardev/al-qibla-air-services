import Link from "next/link";
import {
  Bell,
  CreditCard,
  LifeBuoy,
  Plane,
  Route,
  ShieldCheck,
  TicketCheck,
  UserRound,
  WalletCards,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RouteVisual } from "@/components/flight/RouteVisual";
import { mockFlights } from "@/data/flight-booking";
import { formatCurrency, formatDateTime, findBestValueFlight, findCheapestFlight } from "@/lib/flight-booking";
import { createPageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Flight Dashboard",
  description: "Manage bookings, saved passengers, fare alerts, routes, payment methods, and support.",
  path: "/flight-booking/dashboard/",
});

const dashboardItems = [
  { title: "My Bookings", value: "3 active", icon: TicketCheck, href: "/flight-booking/book/" },
  { title: "Saved Passengers", value: "4 profiles", icon: UserRound, href: "/flight-booking/dashboard/" },
  { title: "Saved Routes", value: "KHI, DXB, JED", icon: Route, href: "/flight-booking/results/" },
  { title: "Fare Alerts", value: "6 watching", icon: Bell, href: "/flight-booking/dashboard/" },
  { title: "Payment Methods", value: "2 cards", icon: WalletCards, href: "/flight-booking/dashboard/" },
  { title: "Support Tickets", value: "1 open", icon: LifeBuoy, href: "/contact/" },
] as const;

export default function FlightCustomerDashboardPage() {
  const nextFlight = findBestValueFlight(mockFlights) || mockFlights[0];
  const cheapest = findCheapestFlight(mockFlights);

  return (
    <main className="bg-slate-50">
      <section className="bg-navy py-10 text-white">
        <div className="container-wide grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge className="bg-sky-400/15 text-sky-100">Traveler portal</Badge>
            <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">Manage every flight in one place</h1>
            <p className="mt-4 max-w-2xl text-white/75">
              Track booking status, saved passengers, payment methods, fare alerts, and support from a single
              automation-ready dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/flight-booking/results/" className={cn(buttonVariants({ variant: "primaryGold" }), "h-11 px-5")}>
                Search flights
              </Link>
              <Link href="/contact/" className={cn(buttonVariants({ variant: "outlineLight" }), "h-11 px-5")}>
                Contact support
              </Link>
            </div>
          </div>
          <RouteVisual fromCity={nextFlight.fromCity} toCity={nextFlight.toCity} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {dashboardItems.map(({ title, value, icon: Icon, href }) => (
                <Link
                  key={title}
                  href={href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-sm text-slate-500">{title}</p>
                  <p className="mt-1 font-heading text-2xl font-bold text-navy">{value}</p>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-navy">Upcoming booking</h2>
                  <p className="text-sm text-slate-500">Live airline records can replace this mock record later.</p>
                </div>
                <Badge variant="outline">Payment pending</Badge>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <div>
                  <p className="text-sm text-slate-500">Departure</p>
                  <p className="font-heading text-3xl font-bold text-navy">{nextFlight.from}</p>
                  <p className="text-sm text-slate-500">{nextFlight.fromCity}</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">{formatDateTime(nextFlight.departureTime)}</p>
                </div>
                <div className="rounded-full bg-sky-50 p-4 text-sky-700">
                  <Plane className="h-6 w-6" />
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-slate-500">Arrival</p>
                  <p className="font-heading text-3xl font-bold text-navy">{nextFlight.to}</p>
                  <p className="text-sm text-slate-500">{nextFlight.toCity}</p>
                  <p className="mt-2 text-sm font-medium text-slate-700">{formatDateTime(nextFlight.arrivalTime)}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-bold text-navy">Smart fare watch</h2>
                  <p className="text-sm text-slate-500">15 minute sync-ready structure</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Current cheapest fare</p>
                <p className="mt-1 text-3xl font-bold text-gold">{cheapest ? formatCurrency(cheapest.price) : "N/A"}</p>
                <p className="mt-2 text-sm text-slate-500">Alerts can be connected to email, SMS, or WhatsApp jobs.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-navy">
                  <CreditCard className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-bold text-navy">Checkout status</h2>
                  <p className="text-sm text-slate-500">Stripe-ready placeholder</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {["Passenger autofill prepared", "Ticket download UI ready", "Confirmation queue shaped"].map((item) => (
                  <div key={item} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                    <span>{item}</span>
                    <span className="text-emerald-700">Ready</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
