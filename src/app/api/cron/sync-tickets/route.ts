import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { ManualTicketProvider } from "@/lib/tickets/providers/manualProvider";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    const provider = new ManualTicketProvider();
    const result = await provider.sync();
    return NextResponse.json({
      ...result,
      lastSyncedAt: new Date().toISOString(),
      note: "Supabase not configured — sync skipped",
    });
  }

  try {
    const supabase = createAdminClient();
    const provider = new ManualTicketProvider();
    const result = await provider.sync();

    await supabase.from("sync_logs").insert({
      provider: result.provider,
      status: result.status,
      tickets_processed: result.ticketsProcessed,
      tickets_created: result.ticketsCreated,
      tickets_updated: result.ticketsUpdated,
      tickets_deactivated: result.ticketsDeactivated,
      message: result.message,
      completed_at: new Date().toISOString(),
    });

    return NextResponse.json({
      ...result,
      lastSyncedAt: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Sync failed" },
      { status: 500 }
    );
  }
}
