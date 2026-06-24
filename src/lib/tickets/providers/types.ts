export type TicketStatus = "available" | "limited" | "sold_out" | "booked";

export interface NormalizedTicket {
  externalId: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  sector: string;
  destination: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  seatsLeft: number;
  status: TicketStatus;
  baggage?: string;
  meal?: string;
  tripType?: string;
  isDirect?: boolean;
}

export interface TicketSyncResult {
  provider: string;
  status: "success" | "partial" | "failed";
  ticketsProcessed: number;
  ticketsCreated: number;
  ticketsUpdated: number;
  ticketsDeactivated: number;
  message?: string;
}

export interface TicketProvider {
  name: string;
  fetchTickets(): Promise<NormalizedTicket[]>;
  sync(): Promise<TicketSyncResult>;
}
