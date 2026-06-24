import { createClient } from "@supabase/supabase-js";
import { getServiceRoleKey, getSupabaseUrl, isSupabaseConfigured } from "./env";

/** Server-only admin client with service role. Never import in client components. */
export function createAdminClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }
  const key = getServiceRoleKey();
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for admin operations");
  }
  return createClient(getSupabaseUrl(), key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
