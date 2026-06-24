import { announcements } from "@/data/announcements";
import { airlines } from "@/data/airlines";
import { blogPosts } from "@/data/blog";
import { destinations } from "@/data/destinations";
import { flyers } from "@/data/flyers";
import { tourPackages, umrahPackages } from "@/data/packages";
import { galleryImages, services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { tickets, ticketsSyncMetadata } from "@/data/tickets";
import { filterTickets } from "@/lib/ticket-filters";
import type {
  Airline,
  Announcement,
  BlogPost,
  Destination,
  Flyer,
  GalleryItem,
  Service,
  SyncMetadata,
  Testimonial,
  Ticket,
  TicketFilters,
  TravelPackage,
} from "@/types";

export interface IDataProvider {
  getAnnouncements(): Promise<Announcement[]>;
  getFlyers(): Promise<Flyer[]>;
  getUmrahPackages(): Promise<TravelPackage[]>;
  getTourPackages(): Promise<TravelPackage[]>;
  getFeaturedUmrahPackages(): Promise<TravelPackage[]>;
  getTickets(filters?: TicketFilters): Promise<Ticket[]>;
  getTicketsSyncMetadata(): Promise<SyncMetadata>;
  getAirlines(): Promise<Airline[]>;
  getDestinations(): Promise<Destination[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getTestimonials(): Promise<Testimonial[]>;
  getServices(): Promise<Service[]>;
  getGalleryImages(): Promise<GalleryItem[]>;
}

class MockDataProvider implements IDataProvider {
  async getAnnouncements() {
    return announcements.filter((a) => a.active).sort((a, b) => a.priority - b.priority);
  }

  async getFlyers() {
    return flyers.filter((f) => f.active).sort((a, b) => a.order - b.order);
  }

  async getUmrahPackages() {
    return umrahPackages;
  }

  async getTourPackages() {
    return tourPackages;
  }

  async getFeaturedUmrahPackages() {
    return umrahPackages.filter((p) => p.featured);
  }

  async getTickets(filters?: TicketFilters) {
    if (!filters) return tickets;
    return filterTickets(tickets, filters);
  }

  async getTicketsSyncMetadata() {
    return ticketsSyncMetadata;
  }

  async getAirlines() {
    return airlines;
  }

  async getDestinations() {
    return destinations;
  }

  async getBlogPosts() {
    return blogPosts.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getBlogPostBySlug(slug: string) {
    return blogPosts.find((p) => p.slug === slug);
  }

  async getTestimonials() {
    return testimonials;
  }

  async getServices() {
    return services;
  }

  async getGalleryImages() {
    return galleryImages;
  }
}

export const dataProvider: IDataProvider = new MockDataProvider();
