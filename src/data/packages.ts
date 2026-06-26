import { ASSETS } from "@/lib/assets";
import type { TravelPackage } from "@/types";

const umrahBase = {
  currency: "PKR",
  type: "umrah" as const,
  status: "active" as const,
  visa: true,
  transport: true,
  ziyarat: true,
};

export const umrahPackages: TravelPackage[] = [
  {
    ...umrahBase,
    id: "u1", packageCode: "AQ-UMR-ECO-15", category: "economy",
    title: "Economy Umrah Package — 15 Days", slug: "economy-umrah-15-days",
    price: 285000, duration: "15 Days / 14 Nights", hotelStars: 3,
    departureCity: "Islamabad", airline: "PIA / AirSial",
    hotelMakkah: "3-Star near Haram", hotelMadinah: "3-Star near Haram",
    distanceFromHaram: "~800m Makkah", seatsLeft: 18,
    highlights: ["Return airfare ISB–JED–ISB", "3-star hotels", "Visa & transport", "Ziyarat tours"],
    image: ASSETS.umrahPackages[0], featured: true,
  },
  {
    ...umrahBase,
    id: "u2", packageCode: "AQ-UMR-STD-18", category: "standard",
    title: "Standard Umrah Package — 18 Days", slug: "standard-umrah-18-days",
    price: 335000, duration: "18 Days / 17 Nights", hotelStars: 4,
    departureCity: "Lahore", airline: "Saudia / PIA",
    hotelMakkah: "4-Star Makkah", hotelMadinah: "4-Star Madinah",
    distanceFromHaram: "~500m Makkah", seatsLeft: 12,
    highlights: ["Group departure Lahore", "4-star hotels", "Full ziyarat", "Airport transfers"],
    image: ASSETS.umrahPackages[1], featured: true,
  },
  {
    ...umrahBase,
    id: "u3", packageCode: "AQ-UMR-PRM-21", category: "premium",
    title: "Premium Umrah Package — 21 Days", slug: "premium-umrah-21-days",
    price: 425000, duration: "21 Days / 20 Nights", hotelStars: 5,
    departureCity: "Islamabad", airline: "Saudia / Emirates",
    hotelMakkah: "5-Star walking distance", hotelMadinah: "5-Star near Haram",
    distanceFromHaram: "Walking distance", seatsLeft: 8,
    highlights: ["VIP visa assistance", "5-star hotels", "Private transport", "Dedicated group leader"],
    image: ASSETS.umrahPackages[2], featured: true,
  },
  {
    ...umrahBase,
    id: "u4", packageCode: "AQ-UMR-GRP-15", category: "group",
    title: "Group Umrah — 15 Days", slug: "group-umrah-15-days",
    price: 275000, duration: "15 Days / 14 Nights", hotelStars: 3,
    departureCity: "Peshawar", airline: "PIA",
    hotelMakkah: "3-Star group block", hotelMadinah: "3-Star group block", seatsLeft: 25,
    highlights: ["Minimum 10 persons", "Group leader", "Shared transport", "Best group rates"],
    image: ASSETS.umrahPackages[3], featured: false,
  },
  {
    ...umrahBase,
    id: "u5", packageCode: "AQ-UMR-FAM-18", category: "family",
    title: "Family Umrah Package — 18 Days", slug: "family-umrah-18-days",
    price: 310000, duration: "18 Days / 17 Nights", hotelStars: 4,
    departureCity: "Karachi", airline: "AirSial / Saudia",
    hotelMakkah: "Family-friendly 4-Star", hotelMadinah: "4-Star Madinah", seatsLeft: 10,
    highlights: ["Child discounts", "Family rooms", "Flexible dates", "Complete documentation"],
    image: ASSETS.umrahPackages[4], featured: false,
  },
  {
    ...umrahBase,
    id: "u6", packageCode: "AQ-UMR-CRP-12", category: "corporate",
    title: "Corporate / NGO Umrah Group", slug: "corporate-umrah-group",
    price: 295000, duration: "12–21 Days (Custom)", hotelStars: 4,
    departureCity: "Any City", airline: "As per group size",
    hotelMakkah: "Custom", hotelMadinah: "Custom", seatsLeft: 50,
    highlights: ["NGO & corporate rates", "Dedicated coordinator", "Consolidated billing", "Custom itinerary"],
    image: ASSETS.umrahPackages[5], featured: false,
  },
];

export const tourPackages: TravelPackage[] = [
  { id: "t1", title: "Dubai Explorer", slug: "dubai-explorer", price: 145000, currency: "PKR", duration: "5 Days / 4 Nights", hotelStars: 4, destination: "Dubai", highlights: ["Return flights", "4-star hotel", "Desert safari", "City tour"], image: ASSETS.tourPackages[0], featured: true, status: "active", type: "tour" },
  { id: "t2", title: "Turkey Heritage Tour", slug: "turkey-heritage", price: 220000, currency: "PKR", duration: "8 Days / 7 Nights", destination: "Turkey", highlights: ["Istanbul & Cappadocia", "Guided tours", "Breakfast included"], image: ASSETS.tourPackages[1], featured: true, status: "active", type: "tour" },
  { id: "t3", title: "Malaysia & Singapore", slug: "malaysia-singapore", price: 265000, currency: "PKR", duration: "10 Days / 9 Nights", destination: "Malaysia", highlights: ["Twin city package", "Theme parks", "Shopping tours"], image: ASSETS.tourPackages[2], featured: false, status: "active", type: "tour" },
  { id: "t4", title: "Thailand Getaway", slug: "thailand-getaway", price: 195000, currency: "PKR", duration: "7 Days / 6 Nights", destination: "Thailand", highlights: ["Bangkok & Pattaya", "Island tour", "Hotel & transfers"], image: ASSETS.tourPackages[3], featured: false, status: "active", type: "tour" },
  { id: "t5", title: "Azerbaijan Discovery", slug: "azerbaijan-discovery", price: 175000, currency: "PKR", duration: "6 Days / 5 Nights", destination: "Azerbaijan", highlights: ["Baku city tour", "Flame Towers", "Old City"], image: ASSETS.tourPackages[4], featured: false, status: "active", type: "tour" },
  { id: "t6", title: "Northern Pakistan", slug: "northern-pakistan", price: 85000, currency: "PKR", duration: "6 Days / 5 Nights", destination: "Pakistan", highlights: ["Hunza & Skardu", "Private transport", "Hotels"], image: ASSETS.tourPackages[5], featured: false, status: "active", type: "tour" },
];
