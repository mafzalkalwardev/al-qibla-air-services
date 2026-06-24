import { createPageMetadata } from "@/lib/metadata";
import { PackageCard } from "@/components/shared/PackageCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { dataProvider } from "@/lib/data-provider";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Umrah Packages",
  description: `Book Umrah packages with ${SITE.name} — flights, hotels, visa, transport and ziyarat included.`,
  path: "/umrah-packages/",
});

export default async function UmrahPackagesPage() {
  const packages = await dataProvider.getUmrahPackages();

  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Umrah Packages</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Complete Umrah solutions with group tickets, hotels near Haram, visa processing and ground transport.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            title="Choose Your Package"
            subtitle="Economy to 5-star options with flexible durations"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} bookLabel="Book Umrah" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
