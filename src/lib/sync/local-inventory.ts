import fs from "fs";
import path from "path";
import type { NormalizedTicket } from "@/lib/tickets/providers/types";

const SYNC_DIR = path.join(process.cwd(), "data", "synced");
const TICKETS_FILE = path.join(SYNC_DIR, "tickets.json");
const META_FILE = path.join(SYNC_DIR, "meta.json");

export interface LocalSyncMeta {
  lastSyncedAt: string;
  source: string;
  ticketsCount: number;
}

export function isLocalSyncAvailable(): boolean {
  return fs.existsSync(TICKETS_FILE);
}

export function readLocalTickets(): NormalizedTicket[] {
  if (!fs.existsSync(TICKETS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TICKETS_FILE, "utf8")) as NormalizedTicket[];
}

export function readLocalSyncMeta(): LocalSyncMeta {
  if (!fs.existsSync(META_FILE)) {
    return { lastSyncedAt: new Date(0).toISOString(), source: "local", ticketsCount: 0 };
  }
  return JSON.parse(fs.readFileSync(META_FILE, "utf8")) as LocalSyncMeta;
}

export function writeLocalTickets(tickets: NormalizedTicket[], source = "travelline"): void {
  fs.mkdirSync(SYNC_DIR, { recursive: true });
  fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2));
  const meta: LocalSyncMeta = {
    lastSyncedAt: new Date().toISOString(),
    source,
    ticketsCount: tickets.length,
  };
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2));
}
