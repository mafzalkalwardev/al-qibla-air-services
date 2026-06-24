import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TicketCard } from "@/components/tickets/TicketCard";
import type { Ticket } from "@/types";

interface TicketsPreviewProps {
  tickets: Ticket[];
}

export function TicketsPreview({ tickets }: TicketsPreviewProps) {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading
          title="Available Group Tickets"
          subtitle="Live group fare inventory — book early for best seats"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {tickets.slice(0, 4).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} compact />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/available-tickets/"
            className={cn(buttonVariants({ size: "lg" }), "bg-gold text-navy hover:bg-gold-light")}
          >
            View All Available Tickets
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
