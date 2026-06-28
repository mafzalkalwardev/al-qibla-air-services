import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { TravelLineSession } from "./types";

const PROVIDER = "travelline";

export async function loadSession(): Promise<TravelLineSession | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("integration_sessions")
    .select("session_data, expires_at")
    .eq("provider", PROVIDER)
    .maybeSingle();

  if (!data?.session_data) return null;
  const session = data.session_data as TravelLineSession;
  if (data.expires_at && new Date(data.expires_at) < new Date()) return null;
  return session;
}

export async function saveSession(session: TravelLineSession): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const supabase = createAdminClient();
  await supabase.from("integration_sessions").upsert(
    {
      provider: PROVIDER,
      session_data: session,
      expires_at: session.expiresAt || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "provider" }
  );
}

export function sessionToCookieHeader(session: TravelLineSession): string {
  return session.cookies.map((c) => `${c.name}=${c.value}`).join("; ");
}

export function parseSetCookieHeaders(setCookie: string | null): TravelLineSession["cookies"] {
  if (!setCookie) return [];
  const parts = setCookie.split(/,(?=\s*[^;]+=[^;]+)/);
  return parts.map((part) => {
    const [pair] = part.split(";");
    const eq = pair.indexOf("=");
    if (eq === -1) return null;
    return {
      name: pair.slice(0, eq).trim(),
      value: pair.slice(eq + 1).trim(),
    };
  }).filter(Boolean) as TravelLineSession["cookies"];
}

export function mergeCookies(
  existing: TravelLineSession["cookies"],
  incoming: TravelLineSession["cookies"]
): TravelLineSession["cookies"] {
  const map = new Map(existing.map((c) => [c.name, c]));
  for (const c of incoming) map.set(c.name, c);
  return Array.from(map.values());
}
