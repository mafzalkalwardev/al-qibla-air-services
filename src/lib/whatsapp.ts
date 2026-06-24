import { SITE } from "./constants";

export function whatsappLink(message: string): string {
  return `${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookingMessage(topic: string, details?: string): string {
  const base = `Hello ${SITE.name}, I would like to inquire about ${topic}.`;
  return details ? `${base}\n\n${details}` : base;
}
