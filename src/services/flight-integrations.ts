import { mockFlights } from "@/data/flight-booking";
import type { FlightOption, FlightSearchCriteria, PassengerDetails } from "@/types/flight-booking";

export type FlightProvider = "amadeus" | "duffel" | "sabre" | "mock";

export interface FlightSearchProviderResponse {
  provider: FlightProvider;
  flights: FlightOption[];
  isLive: boolean;
  checkedAt: string;
}

export interface BookingConfirmationJob {
  bookingReference: string;
  passenger: Pick<PassengerDetails, "firstName" | "lastName" | "email" | "phone">;
  channel: "email" | "sms" | "whatsapp";
  status: "queued" | "sent" | "failed";
}

export async function searchFlightProvider(
  criteria: FlightSearchCriteria,
  provider: FlightProvider = "mock"
): Promise<FlightSearchProviderResponse> {
  if (provider === "mock") {
    return {
      provider,
      flights: mockFlights.filter((flight) => {
        const fromMatch = !criteria.from || flight.from === criteria.from;
        const toMatch = !criteria.to || flight.to === criteria.to;
        return fromMatch && toMatch;
      }),
      isLive: false,
      checkedAt: new Date().toISOString(),
    };
  }

  return {
    provider,
    flights: [],
    isLive: false,
    checkedAt: new Date().toISOString(),
  };
}

export function createFareAlertPayload(criteria: FlightSearchCriteria, targetPrice: number) {
  return {
    criteria,
    targetPrice,
    status: "ready",
    nextCheckMinutes: 15,
  };
}

export function queueBookingConfirmation(job: Omit<BookingConfirmationJob, "status">): BookingConfirmationJob {
  return {
    ...job,
    status: "queued",
  };
}

export function getFlightAutomationReadiness() {
  return [
    { label: "Flight API adapter", status: "prepared", detail: "Mock provider active; Amadeus, Duffel, and Sabre hooks reserved." },
    { label: "Fare comparison", status: "prepared", detail: "Cheapest, fastest, and best-value utilities are available." },
    { label: "Confirmation jobs", status: "prepared", detail: "Email, SMS, and WhatsApp queue shape is defined." },
    { label: "Payment gateway", status: "prepared", detail: "Stripe-ready UI exists; live payment intent API is not connected." },
    { label: "Admin analytics", status: "prepared", detail: "Dashboard reads the shared booking catalog and automation status." },
  ] as const;
}
