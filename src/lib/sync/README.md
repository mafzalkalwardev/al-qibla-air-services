# Ticket & Inventory Sync Architecture

## Current State

When `TRAVELLINE_AGENT_USERNAME` and `TRAVELLINE_AGENT_PASSWORD` are set, cron jobs sync inventory from Travel Line into Supabase. Customer bookings use hold-then-pay via `/api/bookings`.

## Approved Sync Methods

- Authorized sub-agent portal access (server-side only)
- Configurable HTTP API paths (see `src/lib/travelline/INTEGRATION.md`)
- Optional Playwright fallback when `TRAVELLINE_USE_PLAYWRIGHT=true`

**Do not** expose Travel Line branding or credentials to the browser.

## Cron Endpoints

- `GET /api/cron/sync-tickets/` — every 30 min (Vercel cron)
- `GET /api/cron/sync-packages/` — hourly

## Environment Variables

See `.env.example` for `TRAVELLINE_*` and `CRON_SECRET`.
