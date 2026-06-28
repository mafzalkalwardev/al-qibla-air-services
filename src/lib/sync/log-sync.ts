import { createAdminClient } from "@/lib/supabase/admin";
import type { SyncChange } from "@/lib/tickets/providers/types";

export interface SyncLogInput {
  provider: string;
  status: "success" | "partial" | "failed";
  processed: number;
  created: number;
  updated: number;
  deactivated: number;
  message?: string;
  changes?: SyncChange[];
}

export async function writeSyncLog(input: SyncLogInput) {
  const supabase = createAdminClient();
  const { data: log, error } = await supabase
    .from("sync_logs")
    .insert({
      provider: input.provider,
      status: input.status,
      tickets_processed: input.processed,
      tickets_created: input.created,
      tickets_updated: input.updated,
      tickets_deactivated: input.deactivated,
      message: input.message,
      completed_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  if (error || !log?.id) return log;

  if (input.changes?.length) {
    await supabase.from("sync_changes").insert(
      input.changes.map((change) => ({
        sync_log_id: log.id,
        provider: change.provider,
        entity_type: change.entityType,
        entity_id: change.entityId || null,
        external_id: change.externalId || null,
        change_type: change.changeType,
        field_changes: change.fieldChanges || {},
        old_value: change.oldValue || null,
        new_value: change.newValue || null,
      }))
    );
  }

  return log;
}
