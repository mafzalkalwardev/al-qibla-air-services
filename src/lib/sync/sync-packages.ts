import { getTravelLineClient } from "@/lib/travelline/client";
import { isTravelLineSyncEnabled } from "@/lib/travelline/env";
import { mapPromoToAnnouncement, mapPromoToFlyer } from "@/lib/travelline/mappers";
import { upsertPromos, upsertTourPackages, upsertUmrahPackages } from "@/lib/sync/upsert-inventory";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { SyncChange } from "@/lib/tickets/providers/types";

export interface PackageSyncResult {
  provider: string;
  status: "success" | "partial" | "failed";
  umrahProcessed: number;
  toursProcessed: number;
  promosProcessed: number;
  umrahCreated?: number;
  umrahUpdated?: number;
  umrahDeactivated?: number;
  toursCreated?: number;
  toursUpdated?: number;
  toursDeactivated?: number;
  changes?: SyncChange[];
  message?: string;
}

export async function syncTravelLinePackages(): Promise<PackageSyncResult> {
  if (!isTravelLineSyncEnabled()) {
    return {
      provider: "travelline",
      status: "failed",
      umrahProcessed: 0,
      toursProcessed: 0,
      promosProcessed: 0,
      changes: [],
      message: "Travel Line sync not enabled",
    };
  }

  try {
    const client = getTravelLineClient();
    const { umrah, tours, promos } = await client.fetchPackages();

    let umrahResult = { created: 0, updated: 0, deactivated: 0, changes: [] as SyncChange[] };
    let tourResult = { created: 0, updated: 0, deactivated: 0, changes: [] as SyncChange[] };

    if (isSupabaseConfigured()) {
      umrahResult = await upsertUmrahPackages(umrah as Record<string, unknown>[]);
      tourResult = await upsertTourPackages(tours as Record<string, unknown>[]);
      if (promos.length) {
        const flyerRows = promos.map((p, i) => mapPromoToFlyer(p, i));
        const announcementRows = promos.map((p, i) => mapPromoToAnnouncement(p, i));
        await upsertPromos(flyerRows, announcementRows);
      }
    }

    return {
      provider: "travelline",
      status: umrah.length || tours.length || promos.length ? "success" : "partial",
      umrahProcessed: umrah.length,
      toursProcessed: tours.length,
      promosProcessed: promos.length,
      umrahCreated: umrahResult.created,
      umrahUpdated: umrahResult.updated,
      umrahDeactivated: umrahResult.deactivated,
      toursCreated: tourResult.created,
      toursUpdated: tourResult.updated,
      toursDeactivated: tourResult.deactivated,
      changes: [...umrahResult.changes, ...tourResult.changes],
      message: `Synced ${umrah.length} umrah, ${tours.length} tours, ${promos.length} promos (${umrahResult.created + tourResult.created} new, ${umrahResult.updated + tourResult.updated} changed, ${umrahResult.deactivated + tourResult.deactivated} sold out)`,
    };
  } catch (e) {
    return {
      provider: "travelline",
      status: "failed",
      umrahProcessed: 0,
      toursProcessed: 0,
      promosProcessed: 0,
      changes: [],
      message: e instanceof Error ? e.message : "Package sync failed",
    };
  }
}
