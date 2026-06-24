import type { Destination } from "@/types";

export const destinations: Destination[] = [
  { id: "d1", name: "Umrah Packages", country: "Saudi Arabia", label: "Umrah Packages", image: "/assets/gallery/umrah-1.svg", slug: "umrah", availableCount: 12, startingPrice: 285000, currency: "PKR", href: "/umrah-packages/" },
  { id: "d2", name: "KSA Oneway Groups", country: "Saudi Arabia", label: "KSA Oneway Groups", image: "/assets/gallery/dest-jeddah.svg", slug: "ksa-oneway", availableCount: 18, startingPrice: 88000, currency: "PKR", href: "/available-tickets/?destination=Saudi+Arabia" },
  { id: "d3", name: "UAE Oneway Groups", country: "UAE", label: "UAE Oneway Groups", image: "/assets/gallery/dest-dubai.svg", slug: "uae-oneway", availableCount: 14, startingPrice: 42000, currency: "PKR", href: "/available-tickets/?destination=UAE" },
  { id: "d4", name: "Afghanistan Tickets", country: "Afghanistan", label: "Afghanistan Tickets", image: "/assets/gallery/gallery-3.svg", slug: "afghanistan", availableCount: 8, startingPrice: 65000, currency: "PKR", href: "/available-tickets/?destination=Afghanistan" },
  { id: "d5", name: "Dubai Tours", country: "UAE", label: "Dubai Tours", image: "/assets/gallery/tour-1.svg", slug: "dubai-tours", availableCount: 6, startingPrice: 145000, currency: "PKR", href: "/tour-packages/" },
  { id: "d6", name: "Malaysia E-Visa", country: "Malaysia", label: "Malaysia E-Visa", image: "/assets/gallery/dest-kl.svg", slug: "malaysia-visa", availableCount: 0, startingPrice: 25000, currency: "PKR", href: "/services/#visit-visa" },
  { id: "d7", name: "Thailand E-Visa", country: "Thailand", label: "Thailand E-Visa", image: "/assets/gallery/gallery-6.svg", slug: "thailand-visa", availableCount: 0, startingPrice: 22000, currency: "PKR", href: "/services/#visit-visa" },
  { id: "d8", name: "Turkey Tours", country: "Turkey", label: "Turkey Tours", image: "/assets/gallery/dest-istanbul.svg", slug: "turkey-tours", availableCount: 4, startingPrice: 220000, currency: "PKR", href: "/tour-packages/" },
  { id: "d9", name: "Corporate Group Travel", country: "Worldwide", label: "Corporate Group Travel", image: "/assets/gallery/gallery-7.svg", slug: "corporate", availableCount: 0, href: "/corporate-travel/" },
];
