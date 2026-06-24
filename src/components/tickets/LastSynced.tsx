"use client";

import { RefreshCw } from "lucide-react";
import { formatSyncTime } from "@/lib/ticket-filters";

interface LastSyncedProps {
  lastSyncedAt: string;
  source?: string;
}

export function LastSynced({ lastSyncedAt, source }: LastSyncedProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 px-4 py-2 text-sm text-muted-foreground">
      <RefreshCw className="h-4 w-4 text-gold" />
      <span>
        Last synced: <strong className="text-navy">{formatSyncTime(lastSyncedAt)}</strong>
        {source && <span className="ml-1 text-xs">({source})</span>}
      </span>
    </div>
  );
}
