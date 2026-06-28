export type TripType = "oneway" | "roundtrip" | "multicity";
export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First";
export type FlightTag = "Cheapest" | "Fastest" | "Best Value" | "Recommended";

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  flightNumber: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  stops: number;
  layovers: string[];
  price: number;
  currency: string;
  baggage: string;
  cabinClass: CabinClass;
  refundable: boolean;
  tags: FlightTag[];
  aircraft: string;
  carbonKg: number;
}

export interface FlightSearchCriteria {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  tripType: TripType;
  passengers: number;
  cabinClass: CabinClass;
}

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  documentNumber?: string;
  email: string;
  phone: string;
}

export interface Seat {
  id: string;
  row: number;
  column: string;
  type: "standard" | "premium" | "business";
  status: "available" | "occupied";
  price: number;
}

export interface BookingAddOn {
  id: string;
  title: string;
  description: string;
  price: number;
}
