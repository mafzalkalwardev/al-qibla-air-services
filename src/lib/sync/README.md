# Ticket & Inventory Sync Architecture

## Current State

The website uses **mock data** from `src/data/` loaded through `IDataProvider` in `src/lib/data-provider.ts`.

## Approved Sync Methods Only

Travel Line or any third-party sync must be done **only** with:

- Official partner API access
- Written permission from the data provider
- Approved CSV export/import workflows
- Publicly allowed data sources

**Do not** bypass login, CAPTCHA, private APIs, or protected systems.

## Future Integration Options

1. **CSV Upload Provider** — Admin uploads exported ticket CSV; parser updates `tickets.ts` or a JSON store.
2. **API Provider** — Replace `MockDataProvider` with `ApiDataProvider` calling your approved backend.
3. **Sync Worker** — Cron job (e.g. hourly) fetches from approved source and writes to database/storage.
4. **Manual Admin** — Future admin panel edits announcements, flyers, packages, and tickets.

## Frontend Contract

- `getTicketsSyncMetadata()` returns `{ lastSyncedAt, source }` shown on the tickets page.
- `filterTickets()` in `src/lib/ticket-filters.ts` mirrors server-side filter logic for API reuse.

## Environment Variables (Future)

```
TICKETS_API_URL=
TICKETS_API_KEY=
SYNC_CRON_SECRET=
```

Not required for mock data operation.
