import { AdminCrudPlaceholder } from "@/components/admin/AdminCrudPlaceholder";

export default function AdminTicketsPage() {
  return (
    <AdminCrudPlaceholder
      title="Tickets"
      description="Manage available group tickets, seats, pricing, and status. Future hourly sync via /api/cron/sync-tickets."
      table="tickets"
    />
  );
}
