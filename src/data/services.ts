import { ASSETS } from "@/lib/assets";
import type { GalleryItem, Service } from "@/types";

export const galleryImages: GalleryItem[] = [
  { id: "g1", src: ASSETS.gallery[0], alt: "Air travel and group tickets", category: "tickets" },
  { id: "g2", src: ASSETS.gallery[1], alt: "World destinations", category: "tours" },
  { id: "g3", src: ASSETS.gallery[2], alt: "Travel experiences", category: "tours" },
  { id: "g4", src: ASSETS.gallery[3], alt: "Dubai skyline", category: "tours" },
  { id: "g5", src: ASSETS.gallery[4], alt: "Istanbul Turkey", category: "tours" },
  { id: "g6", src: ASSETS.gallery[5], alt: "Kuala Lumpur Malaysia", category: "tours" },
  { id: "g7", src: ASSETS.flyers.umrah, alt: "Umrah Special 2026", category: "umrah" },
  { id: "g8", src: ASSETS.flyers.tickets, alt: "Group Tickets", category: "tickets" },
  { id: "g9", src: ASSETS.flyers.corporate, alt: "Corporate Travel", category: "announcement" },
  { id: "g10", src: ASSETS.flyers.tours, alt: "Tour Packages", category: "tours" },
  { id: "g11", src: ASSETS.flyers.visa, alt: "Visit Visa", category: "visa" },
  { id: "g12", src: ASSETS.flyers.airfares, alt: "Air Fares", category: "tickets" },
];

export const services: Service[] = [
  { id: "s1", title: "Domestic & International Air Ticketing", description: "Competitive fares on all major airlines for individual and group travel worldwide.", icon: "Plane", href: "/available-tickets/" },
  { id: "s2", title: "Umrah Packages", description: "Complete Umrah solutions with flights, hotels, visa, transport, and ziyarat tours.", icon: "Mosque", href: "/umrah-packages/" },
  { id: "s3", title: "Visit Visa Services", description: "Thailand, Malaysia, UAE visit visas and assistance for other destinations.", icon: "FileText", href: "/services/#visit-visa" },
  { id: "s4", title: "Hotel Reservations", description: "Hotels in Makkah, Madinah, Dubai, and worldwide at negotiated rates.", icon: "Hotel", href: "/inquiry/" },
  { id: "s5", title: "Travel Insurance", description: "Comprehensive travel insurance for peace of mind on every journey.", icon: "Shield", href: "/inquiry/" },
  { id: "s6", title: "Airport Transfers", description: "Reliable pickup and drop-off in Islamabad, Peshawar and destination cities.", icon: "Car", href: "/inquiry/" },
  { id: "s7", title: "Corporate Travel Management", description: "Dedicated solutions for NGOs, companies, schools and delegations.", icon: "Building2", href: "/corporate-travel/" },
  { id: "s8", title: "Holiday & Tour Packages", description: "Dubai, Turkey, Malaysia, Thailand, Azerbaijan and custom worldwide tours.", icon: "Palmtree", href: "/tour-packages/" },
  { id: "s9", title: "Group Travel for NGOs & Companies", description: "Special group fares and coordination for organizations.", icon: "Users", href: "/corporate-travel/" },
  { id: "s10", title: "Worldwide Ticketing Facilities", description: "Tickets to all major destinations through our airline partnerships.", icon: "Globe", href: "/available-tickets/" },
];
