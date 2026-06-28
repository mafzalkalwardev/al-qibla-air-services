import { getTravelLineConfig } from "./env";
import {
  loadSession,
  mergeCookies,
  parseSetCookieHeaders,
  saveSession,
  sessionToCookieHeader,
} from "./auth";
import {
  announcementsFromUmrahItems,
  mapTravelLineUmrahApiItem,
  ticketsFromUmrahApiItems,
} from "./mappers";
import type { TravelLineUmrahApiItem } from "./mappers";
import type {
  TravelLineBookingInput,
  TravelLineBookingResult,
  TravelLineFetchResult,
  TravelLinePackageFetchResult,
  TravelLineSession,
} from "./types";

export class TravelLineClient {
  private config = getTravelLineConfig();
  private session: TravelLineSession | null = null;
  private umrahCache: TravelLineUmrahApiItem[] | null = null;

  /** Public API — no auth required */
  async fetchUmrahApiItems(): Promise<TravelLineUmrahApiItem[]> {
    if (this.umrahCache) return this.umrahCache;
    const res = await fetch(`${this.config.baseUrl}/api/umrah-packages`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error(`Travel Line umrah-packages API returned ${res.status}`);
    const data = (await res.json()) as TravelLineUmrahApiItem[];
    this.umrahCache = data;
    return data;
  }

  async fetchTickets(): Promise<TravelLineFetchResult> {
    const items = await this.fetchUmrahApiItems();
    const tickets = ticketsFromUmrahApiItems(items, this.config.markupPercent);
    return { tickets, rawTickets: items as unknown as TravelLineFetchResult["rawTickets"] };
  }

  async fetchPackages(): Promise<TravelLinePackageFetchResult> {
    const items = await this.fetchUmrahApiItems();
    const umrah = items.map((i) => mapTravelLineUmrahApiItem(i, this.config.markupPercent));
    const promos = announcementsFromUmrahItems(items).map((a) => ({
      id: a.source_external_id,
      title: a.message,
      message: a.message,
      active: a.active,
    }));
    return { umrah, tours: [], promos };
  }

  async ensureSession(): Promise<TravelLineSession | null> {
    try {
      if (this.session) return this.session;
      this.session = await loadSession();
      if (this.session) return this.session;
      this.session = await this.loginNextAuth();
      if (this.session) await saveSession(this.session);
      return this.session;
    } catch {
      return null;
    }
  }

  private async loginNextAuth(): Promise<TravelLineSession | null> {
    const { adminUrl, username, password } = this.config;

    for (const base of [adminUrl, this.config.baseUrl]) {
      try {
        const csrfRes = await fetch(`${base}/api/auth/csrf`);
        if (!csrfRes.ok) continue;
        const { csrfToken } = (await csrfRes.json()) as { csrfToken: string };
        const csrfCookies = csrfRes.headers.getSetCookie?.() || [];

        const fields: Record<string, string> = {
          csrfToken,
          callbackUrl: `${base}/`,
          json: "true",
          phone: username,
          password,
        };

        const loginRes = await fetch(`${base}/api/auth/callback/credentials`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: csrfCookies.map((c) => c.split(";")[0]).join("; "),
          },
          body: new URLSearchParams(fields).toString(),
          redirect: "manual",
        });

        const cookies = mergeCookies(
          parseSetCookieHeaders(csrfCookies.join(", ")),
          parseSetCookieHeaders(loginRes.headers.get("set-cookie"))
        );

        if (cookies.length && loginRes.status < 400) {
          return {
            cookies,
            expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
          };
        }
      } catch {
        /* try next base */
      }
    }
    return null;
  }

  async createBooking(input: TravelLineBookingInput): Promise<TravelLineBookingResult> {
    const session = await this.ensureSession();
    if (!session) {
      return {
        success: false,
        error:
          "Travel Line agent login unavailable — booking saved locally; place manually in agent portal",
      };
    }

    const paths = ["/api/bookings", "/api/bookings/create"];
    for (const path of paths) {
      try {
        const res = await fetch(`${this.config.adminUrl}${path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: sessionToCookieHeader(session),
          },
          body: JSON.stringify({
            packageId: input.externalProductId,
            productType: input.productType,
            passengers: input.passengers,
            passengerDetails: input.passengerDetails,
            price: input.quotedPrice,
            currency: input.currency,
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok) {
          const ref =
            (json as Record<string, unknown>).bookingRef ||
            (json as Record<string, unknown>).id ||
            `TL-${input.externalProductId}`;
          return { success: true, bookingRef: String(ref), raw: json };
        }
      } catch {
        /* next */
      }
    }

    return {
      success: false,
      error: "Booking API not available — complete booking manually in Travel Line agent portal",
    };
  }
}

let clientInstance: TravelLineClient | null = null;

export function getTravelLineClient(): TravelLineClient {
  if (!clientInstance) clientInstance = new TravelLineClient();
  return clientInstance;
}
