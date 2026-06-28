import { FlightBookingHero } from "@/components/flight/FlightBookingHero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Flight Booking",
  description: "Search, compare, and book flights with a premium Al Qibla booking experience.",
  path: "/flight-booking/",
});

export default function FlightBookingPage() {
  return <FlightBookingHero />;
}
