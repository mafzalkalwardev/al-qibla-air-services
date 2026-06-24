import type { NormalizedTicket, TicketProvider, TicketSyncResult } from "./types";

/** Manual admin-managed tickets — default provider when no external feed is configured */
export class ManualTicketProvider implements TicketProvider {
  name = "manual";

  async fetchTickets(): Promise<NormalizedTicket[]> {
    return [];
  }

  async sync(): Promise<TicketSyncResult> {
    return {
      provider: this.name,
      status: "success",
      ticketsProcessed: 0,
      ticketsCreated: 0,
      ticketsUpdated: 0,
      ticketsDeactivated: 0,
      message: "Manual provider active — tickets managed via admin panel",
    };
  }
}
