import { AirlinePartners } from "@/components/home/AirlinePartners";
import { AnnouncementTicker } from "@/components/home/AnnouncementTicker";
import { ContactCTA } from "@/components/home/ContactCTA";
import { CorporateTravelCTA } from "@/components/home/CorporateTravelCTA";
import { DestinationGrid } from "@/components/home/DestinationGrid";
import { FeaturedUmrahPackages } from "@/components/home/FeaturedUmrahPackages";
import { FlyersCarousel } from "@/components/home/FlyersCarousel";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { GroupFlightSearch } from "@/components/home/GroupFlightSearch";
import { HeroSection } from "@/components/home/HeroSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TicketsPreview } from "@/components/home/TicketsPreview";
import { dataProvider } from "@/lib/data-provider";

export default async function HomePage() {
  const [
    announcements,
    flyers,
    destinations,
    umrahPackages,
    tickets,
    airlines,
    testimonials,
    galleryImages,
  ] = await Promise.all([
    dataProvider.getAnnouncements(),
    dataProvider.getFlyers(),
    dataProvider.getDestinations(),
    dataProvider.getFeaturedUmrahPackages(),
    dataProvider.getTickets(),
    dataProvider.getAirlines(),
    dataProvider.getTestimonials(),
    dataProvider.getGalleryImages(),
  ]);

  return (
    <>
      <HeroSection />
      <GroupFlightSearch />
      <AnnouncementTicker announcements={announcements} />
      <FlyersCarousel flyers={flyers} />
      <DestinationGrid destinations={destinations} />
      <FeaturedUmrahPackages packages={umrahPackages} />
      <TicketsPreview tickets={tickets.filter((t) => t.status !== "sold_out")} />
      <CorporateTravelCTA />
      <AirlinePartners airlines={airlines} />
      <TestimonialsSection testimonials={testimonials} />
      <GalleryPreview images={galleryImages} />
      <ContactCTA />
    </>
  );
}
