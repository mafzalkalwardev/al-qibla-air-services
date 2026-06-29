import Link from "next/link";
import { Activity, AlertTriangle, BarChart3, Bell, MailCheck, Plane, RefreshCw, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { mockFlights } from "@/data/flight-booking";
import {
  findBestValueFlight,
  findCheapestFlight,
  findFastestFlight,
  formatCurrency,
  formatDuration,
} from "@/lib/flight-booking";
import { cn } from "@/lib/utils";
import { getFlightAutomationReadiness } from "@/services/flight-integrations";

export default function AdminFlightAnalyticsPage() {
  const cheapest = findCheapestFlight(mockFlights);
  const fastest = findFastestFlight(mockFlights);
  const bestValue = findBestValueFlight(mockFlights);
  const directFlights = mockFlights.filter((flight) => flight.stops === 0).length;
  const revenuePipeline = mockFlights.reduce((sum, flight) => sum + flight.price, 0);
  const maxPrice = Math.max(...mockFlights.map((flight) => flight.price));
  const readiness = getFlightAutomationReadiness();

  const stats = [
    { label: "Mock results", value: mockFlights.length, icon: Plane, detail: "API adapter ready" },
    { label: "Revenue pipeline", value: formatCurrency(revenuePipeline), icon: BarChart3, detail: "From available fare catalog" },
    { label: "Direct flights", value: directFlights, icon: Activity, detail: "Direct route inventory" },
    { label: "Pending payments", value: 2, icon: AlertTriangle, detail: "Demo checkout queue" },
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Flight Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor flight search quality, booking automation, fare labels, and API readiness.
          </p>
        </div>
        <Link href="/flight-booking/results/" className={cn(buttonVariants({ variant: "navy" }), "h-10 px-4")}>
          View flight results
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, detail }) => (
          <div key={label} className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-4 text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-bold text-navy">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-xl border border-border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-xl font-bold text-navy">Popular routes and prices</h2>
              <p className="text-sm text-muted-foreground">Replace mock data with provider responses when live APIs are connected.</p>
            </div>
            <Badge variant="outline">Mock data</Badge>
          </div>
          <div className="mt-5 space-y-4">
            {mockFlights.map((flight) => (
              <div key={flight.id} className="rounded-lg border border-slate-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-navy">{flight.fromCity} to {flight.toCity}</p>
                    <p className="text-xs text-muted-foreground">{flight.airline} {flight.flightNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gold">{formatCurrency(flight.price)}</p>
                    <p className="text-xs text-muted-foreground">{formatDuration(flight.durationMinutes)}</p>
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${Math.max(18, Math.round((flight.price / maxPrice) * 100))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy">Auto labels</h2>
            <div className="mt-4 space-y-3 text-sm">
              <MetricLine label="Cheapest" value={cheapest ? `${cheapest.airline} ${formatCurrency(cheapest.price)}` : "N/A"} />
              <MetricLine label="Fastest" value={fastest ? `${fastest.airline} ${formatDuration(fastest.durationMinutes)}` : "N/A"} />
              <MetricLine label="Best value" value={bestValue ? `${bestValue.airline} ${formatCurrency(bestValue.price)}` : "N/A"} />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy">Automation readiness</h2>
            <div className="mt-4 space-y-3">
              {readiness.map((item) => (
                <div key={item.label} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-navy">{item.label}</p>
                    <Badge className="bg-emerald-100 text-emerald-700">{item.status}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {[
              { label: "Fare alerts", icon: Bell, value: "15 min ready" },
              { label: "Confirmations", icon: MailCheck, value: "Queue shaped" },
              { label: "Status sync", icon: RefreshCw, value: "Provider-ready" },
              { label: "User profiles", icon: Users, value: "Autofill ready" },
            ].map(({ label, icon: Icon, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 text-navy">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-navy">{label}</p>
                  <p className="text-xs text-muted-foreground">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <strong className="text-right text-navy">{value}</strong>
    </div>
  );
}
