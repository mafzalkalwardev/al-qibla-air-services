import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { writeSyncLog } from "@/lib/sync/log-sync";
import { ManualTicketProvider } from "@/lib/tickets/providers/manualProvider";
import { TravelLineTicketProvider } from "@/lib/tickets/providers/travelLineProvider";
import { isTravelLineSyncEnabled } from "@/lib/travelline/env";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

function getProvider() {
  return isTravelLineSyncEnabled() ? new TravelLineTicketProvider() : new ManualTicketProvider();
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "CRON_SECRET is required" }, { status: 500 });
  }

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = getProvider();
  const result = await provider.sync();

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ...result,
      lastSyncedAt: new Date().toISOString(),
      note: "Supabase not configured — sync skipped",
    });
  }

  try {
    await writeSyncLog({
      provider: result.provider,
      status: result.status,
      processed: result.ticketsProcessed,
      created: result.ticketsCreated,
      updated: result.ticketsUpdated,
      deactivated: result.ticketsDeactivated,
      message: result.message,
      changes: result.changes,
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
