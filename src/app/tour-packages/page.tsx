import { createPageMetadata } from "@/lib/metadata";
import { PackageCard } from "@/components/shared/PackageCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { dataProvider } from "@/lib/data-provider";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Tour Packages",
  description: `Holiday and tour packages by ${SITE.name} — Dubai, Turkey, Malaysia and domestic destinations.`,
  path: "/tour-packages/",
});

export default async function TourPackagesPage() {
  const packages = await dataProvider.getTourPackages();

  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Tour Packages</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Curated holiday packages for families and groups to destinations worldwide.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title="Holiday Packages" subtitle="Flights, hotels and tours — all included" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} bookLabel="Book Tour" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
