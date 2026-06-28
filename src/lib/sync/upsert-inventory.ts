import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { writeLocalTickets } from "@/lib/sync/local-inventory";
import type { NormalizedTicket, SyncChange } from "@/lib/tickets/providers/types";

const PROVIDER = "travelline";

export interface UpsertTicketsResult {
  created: number;
  updated: number;
  deactivated: number;
  changes: SyncChange[];
}

export async function upsertTickets(
  tickets: NormalizedTicket[],
  provider = PROVIDER
): Promise<UpsertTicketsResult> {
  if (!isSupabaseConfigured()) {
    writeLocalTickets(tickets, provider);
    return { created: tickets.length, updated: 0, deactivated: 0, changes: [] };
  }

  const supabase = createAdminClient();

  // Verify tickets table exists
  const { error: probeError } = await supabase.from("tickets").select("id").limit(1);
  if (probeError?.message?.includes("Could not find the table")) {
    writeLocalTickets(tickets, provider);
    return { created: tickets.length, updated: 0, deactivated: 0, changes: [] };
  }

  let created = 0;
  let updated = 0;
  const changes: SyncChange[] = [];
  const seenIds: string[] = [];

  for (const t of tickets) {
    seenIds.push(t.externalId);
    const row = {
      external_id: t.externalId,
      source_provider: provider,
      airline: t.airline,
      airline_code: t.airlineCode,
      flight_number: t.flightNumber,
      from_code: t.from,
      from_city: t.fromCity,
      to_code: t.to,
      to_city: t.toCity,
      sector: t.sector,
      destination: t.destination,
      departure_date: t.date,
      departure_time: t.departureTime,
      arrival_time: t.arrivalTime,
      duration: t.duration,
      price: t.price,
      currency: t.currency,
      seats_left: t.seatsLeft,
      status: t.status,
      baggage: t.baggage ?? null,
      meal: t.meal ?? null,
      trip_type: t.tripType ?? "oneway",
      is_direct: t.isDirect ?? true,
      active: t.status !== "sold_out",
      last_updated: new Date().toISOString(),
      raw_payload: t,
    };

    const { data: existing } = await supabase
      .from("tickets")
      .select("*")
      .eq("source_provider", provider)
      .eq("external_id", t.externalId)
      .maybeSingle();

    if (existing) {
      const fieldChanges = diffFields(existing, row, [
        "airline",
        "airline_code",
        "flight_number",
        "from_code",
        "from_city",
        "to_code",
        "to_city",
        "sector",
        "destination",
        "departure_date",
        "departure_time",
        "arrival_time",
        "duration",
        "price",
        "currency",
        "seats_left",
        "status",
        "baggage",
        "meal",
        "trip_type",
        "is_direct",
        "active",
      ]);
      if (Object.keys(fieldChanges).length) {
        await supabase.from("tickets").update(row).eq("id", existing.id);
        updated++;
        changes.push({
          provider,
          entityType: "ticket",
          entityId: existing.id,
          externalId: t.externalId,
          changeType: "updated",
          fieldChanges,
        });
      }
    } else {
      const { data: inserted } = await supabase.from("tickets").insert(row).select("id").single();
      created++;
      changes.push({
        provider,
        entityType: "ticket",
        entityId: inserted?.id,
        externalId: t.externalId,
        changeType: "created",
        newValue: row,
      });
    }
  }

  let deactivated = 0;
  if (seenIds.length) {
    const { data: activeRows } = await supabase
      .from("tickets")
      .select("id, external_id, status, active, seats_left, price")
      .eq("source_provider", provider)
      .eq("active", true);

    const staleIds = (activeRows || [])
      .filter((r) => r.external_id && !seenIds.includes(r.external_id))
      .map((r) => r.id);

    if (staleIds.length) {
      await supabase
        .from("tickets")
        .update({ active: false, status: "sold_out", last_updated: new Date().toISOString() })
        .in("id", staleIds);
      deactivated = staleIds.length;
      for (const row of activeRows || []) {
        if (staleIds.includes(row.id)) {
          changes.push({
            provider,
            entityType: "ticket",
            entityId: row.id,
            externalId: row.external_id,
            changeType: "deactivated",
            fieldChanges: {
              active: { old: row.active, new: false },
              status: { old: row.status, new: "sold_out" },
            },
            oldValue: row,
          });
        }
      }
    }
  }

  return { created, updated, deactivated, changes };
}

export async function upsertUmrahPackages(
  rows: Record<string, unknown>[],
  provider = PROVIDER
): Promise<UpsertTicketsResult> {
  const supabase = createAdminClient();
  let created = 0;
  let updated = 0;
  const changes: SyncChange[] = [];
  const seenIds: string[] = [];

  for (const row of rows) {
    const externalId = String(row.external_id);
    seenIds.push(externalId);
    const { data: existing } = await supabase
      .from("umrah_packages")
      .select("*")
      .eq("source_provider", provider)
      .eq("external_id", externalId)
      .maybeSingle();

    if (existing) {
      const fieldChanges = diffFields(existing, row, packageDiffFields);
      if (Object.keys(fieldChanges).length) {
        await supabase.from("umrah_packages").update(row).eq("id", existing.id);
        updated++;
        changes.push({
          provider,
          entityType: "umrah_package",
          entityId: existing.id,
          externalId,
          changeType: "updated",
          fieldChanges,
        });
      }
    } else {
      const { data: inserted } = await supabase.from("umrah_packages").insert(row).select("id").single();
      created++;
      changes.push({
        provider,
        entityType: "umrah_package",
        entityId: inserted?.id,
        externalId,
        changeType: "created",
        newValue: row,
      });
    }
  }

  const stale = await deactivateStale(supabase, "umrah_packages", provider, seenIds);
  changes.push(...stale.changes);
  return { created, updated, deactivated: stale.deactivated, changes };
}

export async function upsertTourPackages(
  rows: Record<string, unknown>[],
  provider = PROVIDER
): Promise<UpsertTicketsResult> {
  const supabase = createAdminClient();
  let created = 0;
  let updated = 0;
  const changes: SyncChange[] = [];
  const seenIds: string[] = [];

  for (const row of rows) {
    const externalId = String(row.external_id);
    seenIds.push(externalId);
    const { data: existing } = await supabase
      .from("tour_packages")
      .select("*")
      .eq("source_provider", provider)
      .eq("external_id", externalId)
      .maybeSingle();

    if (existing) {
      const fieldChanges = diffFields(existing, row, packageDiffFields);
      if (Object.keys(fieldChanges).length) {
        await supabase.from("tour_packages").update(row).eq("id", existing.id);
        updated++;
        changes.push({
          provider,
          entityType: "tour_package",
          entityId: existing.id,
          externalId,
          changeType: "updated",
          fieldChanges,
        });
      }
    } else {
      const { data: inserted } = await supabase.from("tour_packages").insert(row).select("id").single();
      created++;
      changes.push({
        provider,
        entityType: "tour_package",
        entityId: inserted?.id,
        externalId,
        changeType: "created",
        newValue: row,
      });
    }
  }

  const stale = await deactivateStale(supabase, "tour_packages", provider, seenIds);
  changes.push(...stale.changes);
  return { created, updated, deactivated: stale.deactivated, changes };
}

async function deactivateStale(
  supabase: ReturnType<typeof createAdminClient>,
  table: "umrah_packages" | "tour_packages",
  provider: string,
  seenIds: string[]
): Promise<{ deactivated: number; changes: SyncChange[] }> {
  if (!seenIds.length) return { deactivated: 0, changes: [] };
  const { data: activeRows } = await supabase
    .from(table)
    .select("id, external_id, status, price, seats_left")
    .eq("source_provider", provider)
    .eq("status", "active");

  const staleIds = (activeRows || [])
    .filter((r) => r.external_id && !seenIds.includes(r.external_id))
    .map((r) => r.id);

  if (!staleIds.length) return { deactivated: 0, changes: [] };
  await supabase.from(table).update({ status: "sold_out" }).in("id", staleIds);
  const entityType = table === "umrah_packages" ? "umrah_package" : "tour_package";
  return {
    deactivated: staleIds.length,
    changes: (activeRows || [])
      .filter((row) => staleIds.includes(row.id))
      .map((row) => ({
        provider,
        entityType,
        entityId: row.id,
        externalId: row.external_id,
        changeType: "deactivated" as const,
        fieldChanges: { status: { old: row.status, new: "sold_out" } },
        oldValue: row,
      })),
  };
}

const packageDiffFields = [
  "title",
  "slug",
  "package_code",
  "category",
  "destination",
  "price",
  "currency",
  "duration",
  "departure_city",
  "airline",
  "hotel_makkah",
  "hotel_madinah",
  "distance_from_haram",
  "transport",
  "visa",
  "ziyarat",
  "seats_left",
  "image_url",
  "featured",
  "status",
];

function normalizeComparable(value: unknown) {
  if (value === undefined) return null;
  if (typeof value === "number") return Number(value);
  if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}

function diffFields(
  existing: Record<string, unknown>,
  next: Record<string, unknown>,
  fields: string[]
): Record<string, { old: unknown; new: unknown }> {
  const changes: Record<string, { old: unknown; new: unknown }> = {};
  for (const field of fields) {
    const oldValue = normalizeComparable(existing[field]);
    const newValue = normalizeComparable(next[field]);
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      changes[field] = { old: existing[field] ?? null, new: next[field] ?? null };
    }
  }
  return changes;
}

export async function upsertPromos(
  flyers: Record<string, unknown>[],
  announcements: Record<string, unknown>[]
): Promise<void> {
  const supabase = createAdminClient();

  for (const [i, flyer] of flyers.entries()) {
    const extId = String(flyer.source_external_id ?? i);
    const { data: existing } = await supabase
      .from("flyers")
      .select("id")
      .eq("title", flyer.title)
      .maybeSingle();
    const payload = {
      title: flyer.title,
      category: flyer.category || "announcement",
      image_url: flyer.image_url,
      link: flyer.link ?? null,
      display_order: flyer.display_order ?? i,
      active: flyer.active !== false,
    };
    if (existing) await supabase.from("flyers").update(payload).eq("id", existing.id);
    else await supabase.from("flyers").insert(payload);
    void extId;
  }

  for (const [i, ann] of announcements.entries()) {
    const { data: existing } = await supabase
      .from("announcements")
      .select("id")
      .eq("message", ann.message)
      .maybeSingle();
    const payload = {
      message: ann.message,
      priority: ann.priority ?? i + 1,
      active: ann.active !== false,
    };
    if (existing) await supabase.from("announcements").update(payload).eq("id", existing.id);
    else await supabase.from("announcements").insert(payload);
  }
}
