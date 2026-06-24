export type TicketStatus = "available" | "limited" | "sold_out";
export type PackageStatus = "active" | "sold_out" | "coming_soon";
export type UmrahCategory = "economy" | "standard" | "premium" | "group" | "family" | "corporate";
export type FlyerCategory = "umrah" | "visa" | "tickets" | "tours" | "announcement";
export type GalleryCategory = FlyerCategory | "all";
export type TripType = "umrah" | "oneway" | "return";

export interface Announcement {
  id: string;
  message: string;
  priority: number;
  active: boolean;
  startsAt?: string;
  endsAt?: string;
}

export interface Flyer {
  id: string;
  title: string;
  image: string;
  link?: string;
  order: number;
  active: boolean;
  category: FlyerCategory;
}

export interface TravelPackage {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  duration: string;
  hotelStars?: number;
  highlights: string[];
  image: string;
  featured: boolean;
  status: PackageStatus;
  type: "umrah" | "tour";
  packageCode?: string;
  category?: UmrahCategory;
  departureCity?: string;
  airline?: string;
  hotelMakkah?: string;
  hotelMadinah?: string;
  distanceFromHaram?: string;
  transport?: boolean;
  visa?: boolean;
  ziyarat?: boolean;
  seatsLeft?: number;
  destination?: string;
}

export interface Ticket {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  sector: string;
  destination: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  seatsLeft: number;
  status: TicketStatus;
  baggage?: string;
  meal?: string;
  aircraft?: string;
  notes?: string;
  tripType?: TripType;
  isDirect?: boolean;
  lastUpdated?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  author: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar?: string;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  name: string;
  city?: string;
  service?: string;
  rating: number;
  comment: string;
  avatar_url?: string;
  status: ReviewStatus;
  featured: boolean;
  created_at: string;
}

export interface ReviewStats {
  average: number;
  count: number;
  distribution: Record<number, number>;
}

export interface Inquiry {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
}

export interface Airline {
  code: string;
  name: string;
  logo: string;
  regions: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  slug: string;
  label: string;
  availableCount?: number;
  startingPrice?: number;
  currency?: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export interface TicketFilters {
  airline?: string;
  sector?: string;
  fromCity?: string;
  toCity?: string;
  destination?: string;
  date?: string;
  maxPrice?: number;
  minPrice?: number;
  minSeats?: number;
  tripType?: TripType | "all";
  isDirect?: boolean;
  sortBy?: "price" | "date" | "seats";
}

export interface SyncMetadata {
  lastSyncedAt: string;
  source: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}
