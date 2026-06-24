import { assetPath } from "./base-path";

export const SITE = {
  name: "Al Qibla Air Services",
  shortName: "Al Qibla",
  tagline: "Your Trusted Partner for Umrah, Group Tickets & Corporate Travel",
  description:
    "Premium travel agency offering domestic and international air ticketing, Umrah packages, visit visas, hotel reservations, travel insurance, and corporate travel management across Pakistan, UAE, Saudi Arabia, Afghanistan and worldwide.",
  url: "https://mafzalkalwardev.github.io/al-qibla-air-services",
  phone: "+923315576169",
  whatsapp: "https://wa.me/923315576169",
  email: "info@alqiblaairservices.com",
  address: "Office No.11, Askan Center, E-11/3 Markaz, Islamabad",
  businessHours: "Mon – Sat: 9:00 AM – 8:00 PM | Sun: 10:00 AM – 6:00 PM",
  regions: ["Pakistan", "UAE", "Afghanistan", "Saudi Arabia", "Worldwide"],
} as const;

export const SOCIAL = {
  facebook: "https://facebook.com/",
  facebookGroup: "https://facebook.com/groups/",
  instagram: "https://instagram.com/",
  whatsapp: SITE.whatsapp,
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About Us" },
  { href: "/services/", label: "Services" },
  { href: "/umrah-packages/", label: "Umrah Packages" },
  { href: "/tour-packages/", label: "Tour Packages" },
  { href: "/available-tickets/", label: "Available Tickets" },
  { href: "/corporate-travel/", label: "Corporate Travel" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
] as const;

export const LOGO_PATH = assetPath("/assets/logo/logo.png");

export const MAP_EMBED_URL =
  "https://maps.google.com/maps?q=Askan+Center+E-11%2F3+Markaz+Islamabad&t=&z=15&ie=UTF8&iwloc=&output=embed";
