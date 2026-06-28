import type {
  FlightOption,
  FlightSearchCriteria,
  PassengerDetails,
} from "@/types/flight-booking";

export function calculateFlightDuration(departureTime: string, arrivalTime: string) {
  const minutes = Math.max(
    0,
    Math.round((new Date(arrivalTime).getTime() - new Date(departureTime).getTime()) / 60000)
  );
  return formatDuration(minutes);
}

export function calculateLayoverTime(flight: FlightOption) {
  if (!flight.layovers.length) return "Direct";
  return flight.layovers.length === 1 ? `1 stop via ${flight.layovers[0]}` : `${flight.layovers.length} stops`;
}

export function findCheapestFlight(flights: FlightOption[]) {
  return [...flights].sort((a, b) => a.price - b.price)[0];
}

export function findFastestFlight(flights: FlightOption[]) {
  return [...flights].sort((a, b) => a.durationMinutes - b.durationMinutes)[0];
}

export function findBestValueFlight(flights: FlightOption[]) {
  return [...flights].sort(
    (a, b) => a.price + a.durationMinutes * 0.22 + a.stops * 75 - (b.price + b.durationMinutes * 0.22 + b.stops * 75)
  )[0];
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export function generateBookingReference() {
  return `AQ${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function validatePassengerDetails(passenger: PassengerDetails) {
  const errors: Partial<Record<keyof PassengerDetails, string>> = {};
  if (!passenger.firstName.trim()) errors.firstName = "First name is required";
  if (!passenger.lastName.trim()) errors.lastName = "Last name is required";
  if (!passenger.gender) errors.gender = "Gender is required";
  if (!passenger.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passenger.email)) errors.email = "Valid email is required";
  if (passenger.phone.trim().length < 7) errors.phone = "Phone number is required";
  return errors;
}

export function filterFlights(flights: FlightOption[], criteria: Partial<FlightSearchCriteria>) {
  return flights.filter((flight) => {
    const fromOk = !criteria.from || flight.from === criteria.from || flight.fromCity === criteria.from;
    const toOk = !criteria.to || flight.to === criteria.to || flight.toCity === criteria.to;
    const cabinOk = !criteria.cabinClass || flight.cabinClass === criteria.cabinClass || criteria.cabinClass === "Economy";
    return fromOk && toOk && cabinOk;
  });
}
