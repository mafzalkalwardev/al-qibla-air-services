import type { NormalizedTicket, TicketProvider, TicketSyncResult } from "./types";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export class DatabaseTicketProvider implements TicketProvider {
  name = "database";

  async fetchTickets(): Promise<NormalizedTicket[]> {
    if (!isSupabaseConfigured()) return [];
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("tickets")
      .select("*")
      .eq("active", true);
    if (!data) return [];
    return data.map((t) => ({
      externalId: t.id,
      airline: t.airline,
      airlineCode: t.airline_code,
      flightNumber: t.flight_number,
      from: t.from_code,
      fromCity: t.from_city,
      to: t.to_code,
      toCity: t.to_city,
      sector: t.sector || "",
      destination: t.destination || "",
      date: t.departure_date,
      departureTime: t.departure_time || "",
      arrivalTime: t.arrival_time || "",
      duration: t.duration || "",
      price: Number(t.price),
      currency: t.currency,
      seatsLeft: t.seats_left,
      status: t.status,
      baggage: t.baggage,
      meal: t.meal,
      tripType: t.trip_type,
      isDirect: t.is_direct,
    }));
  }

  async sync(): Promise<TicketSyncResult> {
    const tickets = await this.fetchTickets();
    return {
      provider: this.name,
      status: "success",
      ticketsProcessed: tickets.length,
      ticketsCreated: 0,
      ticketsUpdated: 0,
      ticketsDeactivated: 0,
      message: "Database provider — no external sync required",
    };
  }
}
