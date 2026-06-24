import type { Ticket, TicketFilters } from "@/types";

export function filterTickets(tickets: Ticket[], filters: TicketFilters): Ticket[] {
  let result = tickets.filter((ticket) => {
    if (filters.airline && filters.airline !== "all" && ticket.airlineCode !== filters.airline) return false;
    if (filters.sector && filters.sector !== "all" && ticket.sector !== filters.sector) return false;
    if (filters.fromCity && filters.fromCity !== "all" && ticket.fromCity !== filters.fromCity) return false;
    if (filters.toCity && filters.toCity !== "all" && ticket.toCity !== filters.toCity) return false;
    if (filters.destination && filters.destination !== "all" && ticket.destination !== filters.destination) return false;
    if (filters.date && ticket.date !== filters.date) return false;
    if (filters.maxPrice !== undefined && ticket.price > filters.maxPrice) return false;
    if (filters.minPrice !== undefined && ticket.price < filters.minPrice) return false;
    if (filters.minSeats !== undefined && ticket.seatsLeft < filters.minSeats) return false;
    if (filters.tripType && filters.tripType !== "all" && ticket.tripType !== filters.tripType) return false;
    if (filters.isDirect === true && ticket.isDirect === false) return false;
    return true;
  });

  if (filters.sortBy === "price") result = [...result].sort((a, b) => a.price - b.price);
  else if (filters.sortBy === "date") result = [...result].sort((a, b) => a.date.localeCompare(b.date));
  else if (filters.sortBy === "seats") result = [...result].sort((a, b) => b.seatsLeft - a.seatsLeft);

  return result;
}

export function getUniqueFilterOptions(tickets: Ticket[]) {
  return {
    airlines: [...new Set(tickets.map((t) => t.airlineCode))].sort(),
    sectors: [...new Set(tickets.map((t) => t.sector))].sort(),
    fromCities: [...new Set(tickets.map((t) => t.fromCity))].sort(),
    toCities: [...new Set(tickets.map((t) => t.toCity))].sort(),
    destinations: [...new Set(tickets.map((t) => t.destination))].sort(),
    dates: [...new Set(tickets.map((t) => t.date))].sort(),
  };
}

export function formatPrice(price: number, currency: string): string {
  return `${currency} ${price.toLocaleString("en-PK")}`;
}

export function formatSyncTime(iso: string): string {
  return new Date(iso).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" });
}
