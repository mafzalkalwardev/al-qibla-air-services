"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TicketCard } from "@/components/tickets/TicketCard";
import { TicketFiltersPanel } from "@/components/tickets/TicketFiltersPanel";
import { LastSynced } from "@/components/tickets/LastSynced";
import { filterTickets, getUniqueFilterOptions } from "@/lib/ticket-filters";
import { airlines } from "@/data/airlines";
import type { SyncMetadata, Ticket, TicketFilters } from "@/types";

const airlineNames = Object.fromEntries(airlines.map((a) => [a.code, a.name]));

interface TicketsPageClientProps {
  tickets: Ticket[];
  syncMetadata: SyncMetadata;
}

export function TicketsPageClient({ tickets, syncMetadata }: TicketsPageClientProps) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<TicketFilters>({});

  useEffect(() => {
    const initial: TicketFilters = {};
    const fromCity = searchParams.get("fromCity");
    const toCity = searchParams.get("toCity");
    const date = searchParams.get("date");
    if (fromCity) initial.fromCity = fromCity;
    if (toCity) initial.toCity = toCity;
    if (date) initial.date = date;
    const airline = searchParams.get("airline");
    if (airline && airline !== "All Airlines") {
      const codeMap: Record<string, string> = {
        PIA: "PK",
        Saudia: "SV",
        Emirates: "EK",
        Airblue: "PA",
        AirSial: "PF",
        "Qatar Airways": "QR",
        "Fly Jinnah": "9P",
      };
      initial.airline = codeMap[airline] || airline;
    }
    setFilters(initial);
  }, [searchParams]);

  const options = useMemo(() => getUniqueFilterOptions(tickets), [tickets]);
  const filtered = useMemo(() => filterTickets(tickets, filters), [tickets, filters]);

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <TicketFiltersPanel
          filters={filters}
          onChange={setFilters}
          options={options}
          airlineNames={airlineNames}
        />
      </aside>
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <strong className="text-navy">{filtered.length}</strong> of {tickets.length} group tickets
          </p>
          <LastSynced lastSyncedAt={syncMetadata.lastSyncedAt} source={syncMetadata.source} />
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No tickets match your filters. Try adjusting your search criteria.</p>
          </div>
        ) : (
          filtered.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
        )}
      </div>
    </div>
  );
}
