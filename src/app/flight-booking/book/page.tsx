import { BookingFlowClient } from "@/components/flight/BookingFlowClient";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Complete Booking",
  description: "Review flight details, add passenger information, choose seats, and confirm booking.",
  path: "/flight-booking/book/",
});

export default async function FlightBookingCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const flightId = Array.isArray(params.flightId) ? params.flightId[0] : params.flightId;

  return <BookingFlowClient flightId={flightId} />;
}
