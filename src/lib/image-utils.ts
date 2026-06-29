export const FALLBACK_IMAGES = {
  umrah: "/assets/packages/umrah-standard.jpg",
  tour: "/assets/packages/tours/dubai.jpg",
  flyer: "/assets/flyers/flyer-1.jpeg",
  generic: "/assets/heroes/tickets.jpg",
} as const;

const BAD_IMAGE_VALUES = new Set(["", "null", "undefined", "none", "n/a", "#"]);

export function isExternalUrl(path: string): boolean {
  return /^(https?:)?\/\//i.test(path);
}

export function isUnsafeImageUrl(path: string): boolean {
  return /^(javascript|data|blob):/i.test(path.trim());
}

export function normalizeImageUrl(
  input: unknown,
  fallback: string = FALLBACK_IMAGES.generic,
  baseUrl = "https://travellinetour.com"
): string {
  const value = typeof input === "string" ? input.trim() : "";
  if (BAD_IMAGE_VALUES.has(value.toLowerCase()) || isUnsafeImageUrl(value)) return fallback;
  if (value.startsWith("/assets/")) return value;

  try {
    if (value.startsWith("//")) return `https:${value}`;
    if (value.startsWith("/")) return new URL(value, baseUrl).toString();
    if (/^https?:\/\//i.test(value)) return new URL(value).toString();
  } catch {
    return fallback;
  }

  return fallback;
}

export async function ensureUsableImageUrl(
  input: unknown,
  fallback: string = FALLBACK_IMAGES.generic,
  baseUrl?: string
): Promise<string> {
  const normalized = normalizeImageUrl(input, fallback, baseUrl);
  if (!isExternalUrl(normalized)) return normalized;

  const headers = {
    Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "User-Agent": "AlQiblaSyncBot/1.0",
  };

  try {
    const head = await fetch(normalized, {
      method: "HEAD",
      headers,
      signal: AbortSignal.timeout(6000),
    });
    if (isValidImageResponse(head, normalized)) return normalized;
    if (head.status !== 405 && head.status !== 403) return fallback;
  } catch {
    /* Try a tiny GET below. */
  }

  try {
    const probe = await fetch(normalized, {
      method: "GET",
      headers: { ...headers, Range: "bytes=0-0" },
      signal: AbortSignal.timeout(8000),
    });
    return isValidImageResponse(probe, normalized) ? normalized : fallback;
  } catch {
    return fallback;
  }
}

function isValidImageResponse(response: Response, url: string): boolean {
  if (!response.ok && response.status !== 206) return false;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.startsWith("image/")) return true;
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?|#|$)/i.test(url);
}
