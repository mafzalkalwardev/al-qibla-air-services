import { Suspense } from "react";
import { createPageMetadata } from "@/lib/metadata";
import { TicketsPageClient } from "@/components/tickets/TicketsPageClient";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Available Tickets",
  description: `Browse group flight tickets and fares from ${SITE.name} — PIA, Saudia, Emirates, Airblue and more.`,
  path: "/available-tickets/",
});

export default function AvailableTicketsPage() {
  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Available Airlines & Group Tickets</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Browse available group tickets, Umrah flights and international routes. Prices and availability are updated regularly.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <Suspense fallback={<div className="text-center text-muted-foreground">Loading tickets...</div>}>
            <TicketsPageClient />
          </Suspense>
        </div>
      </section>
    </>
  );
}
