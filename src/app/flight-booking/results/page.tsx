import { FlightResultsClient } from "@/components/flight/FlightResultsClient";
import { createPageMetadata } from "@/lib/metadata";
import type { CabinClass, TripType } from "@/types/flight-booking";

export const metadata = createPageMetadata({
  title: "Flight Results",
  description: "Compare flight fares, routes, baggage, and cabin options.",
  path: "/flight-booking/results/",
});

export default async function FlightResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const pick = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return (
    <FlightResultsClient
      criteria={{
        from: pick("from"),
        to: pick("to"),
        departureDate: pick("departureDate"),
        returnDate: pick("returnDate"),
        tripType: (pick("tripType") as TripType) || "roundtrip",
        passengers: Number(pick("passengers") || 1),
        cabinClass: (pick("cabinClass") as CabinClass) || "Economy",
      }}
    />
  );
}
