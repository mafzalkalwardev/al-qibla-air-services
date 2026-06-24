import { createPageMetadata } from "@/lib/metadata";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { dataProvider } from "@/lib/data-provider";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Gallery",
  description: `Photo gallery from ${SITE.name} — Umrah journeys, travel experiences and destinations.`,
  path: "/gallery/",
});

export default async function GalleryPage() {
  const images = await dataProvider.getGalleryImages();

  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Gallery</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Moments from Umrah journeys, group departures and travel experiences.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <GalleryGrid images={images} />
        </div>
      </section>
    </>
  );
}
