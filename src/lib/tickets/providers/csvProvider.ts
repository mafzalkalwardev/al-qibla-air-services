import type { NormalizedTicket, TicketProvider, TicketSyncResult } from "./types";

export interface CsvTicketRow {
  airline_code: string;
  airline: string;
  flight_number: string;
  from_code: string;
  from_city: string;
  to_code: string;
  to_city: string;
  departure_date: string;
  departure_time?: string;
  arrival_time?: string;
  price: number;
  seats_left: number;
  status?: string;
}

/** CSV import-ready provider — admin uploads CSV via /api/admin/import-tickets */
export class CsvTicketProvider implements TicketProvider {
  name = "csv";
  private rows: CsvTicketRow[] = [];

  setRows(rows: CsvTicketRow[]) {
    this.rows = rows;
  }

  async fetchTickets(): Promise<NormalizedTicket[]> {
    return this.rows.map((r, i) => ({
      externalId: `csv-${i}`,
      airline: r.airline,
      airlineCode: r.airline_code,
      flightNumber: r.flight_number,
      from: r.from_code,
      fromCity: r.from_city,
      to: r.to_code,
      toCity: r.to_city,
      sector: `${r.from_code}-${r.to_code}`,
      destination: r.to_city,
      date: r.departure_date,
      departureTime: r.departure_time || "",
      arrivalTime: r.arrival_time || "",
      duration: "",
      price: r.price,
      currency: "PKR",
      seatsLeft: r.seats_left,
      status: (r.status as NormalizedTicket["status"]) || "available",
    }));
  }

  async sync(): Promise<TicketSyncResult> {
    const tickets = await this.fetchTickets();
    return {
      provider: this.name,
      status: "success",
      ticketsProcessed: tickets.length,
      ticketsCreated: tickets.length,
      ticketsUpdated: 0,
      ticketsDeactivated: 0,
      message: `CSV import processed ${tickets.length} tickets`,
    };
  }
}
