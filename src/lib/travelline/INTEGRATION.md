# Travel Line Group Integration

White-label sync between Al Qibla Air Services and Travel Line Travel & Tours (`travellinetour.com`).

## Portals

| Portal | URL | Purpose |
|--------|-----|---------|
| Public B2B site | `https://travellinetour.com` | Group flights search, Umrah promos, sub-agent signup |
| Agent admin | `https://admin.travellinetour.com` | Inventory management, bookings (TL Admin App 2.0) |

## Public API (verified working — no auth required)

```
GET https://travellinetour.com/api/umrah-packages
```

Returns **62** live Umrah/group packages with embedded flight data:
- `departureFlightNo`, `returnFlightNo`, `seatsAvailable`, `price`, `airline`, `hotel`, etc.
- Sync extracts **124 group flight legs** (outbound + return per package) into `tickets`
- Full packages map into `umrah_packages`

## Auth (NextAuth.js)

Travel Line uses **NextAuth.js** — `POST /api/auth/login` with JSON is not supported.
Agent login flow:
1. `GET /api/auth/csrf`
2. `POST /api/auth/callback/credentials` (form-urlencoded)

Admin portal login at `https://admin.travellinetour.com/signin` — required for backend booking placement only.

## Inventory endpoints (configurable)

Set via env if Travel Line changes routes:

```
TRAVELLINE_FLIGHTS_API_PATH=/api/flights
TRAVELLINE_UMRAH_API_PATH=/api/umrah-packages
TRAVELLINE_TOURS_API_PATH=/api/tour-packages
TRAVELLINE_PROMOS_API_PATH=/api/promos
```

When HTTP APIs return empty/404, the client falls back to Playwright DOM extraction on authenticated pages.

## Field mapping → NormalizedTicket

| Travel Line (typical) | Al Qibla field |
|----------------------|----------------|
| `id` / `flightId` | `externalId` |
| `airlineName` | `airline` |
| `airlineCode` / IATA | `airlineCode` |
| `flightNo` | `flightNumber` |
| `origin` / `from` | `from`, `fromCity` |
| `destination` / `to` | `to`, `toCity` |
| `departureDate` | `date` |
| `departureTime` | `departureTime` |
| `arrivalTime` | `arrivalTime` |
| `fare` / `price` | `price` (+ optional markup %) |
| `seats` / `availableSeats` | `seatsLeft` |
| `baggage` | `baggage` |

## Booking flow

1. Customer submits booking request → `bookings.status = pending_payment`
2. Admin confirms payment offline
3. `POST /api/admin/bookings/[id]/confirm` → `TravelLineClient.createBooking()`
4. On success: `confirmed` + `travelline_booking_ref`

## Local discovery

Run manually (credentials from env only):

```bash
TRAVELLINE_AGENT_USERNAME=... TRAVELLINE_AGENT_PASSWORD=... node scripts/discover-travelline.js
```

Output: `src/lib/travelline/discovery-output/` (gitignored).

## Security

- Never commit credentials.
- Rotate password if exposed in chat.
- Server-side only — no Travel Line branding on customer UI.
