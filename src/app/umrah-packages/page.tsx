import { createPageMetadata } from "@/lib/metadata";
import { UmrahPackageCard } from "@/components/cards/UmrahPackageCard";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { PAGE_HEROES } from "@/lib/page-heroes";
import { dataProvider } from "@/lib/data-provider";
import { SITE } from "@/lib/constants";
import type { UmrahCategory } from "@/types";

export const metadata = createPageMetadata({
  title: "Umrah Packages",
  description: `Book Umrah packages with ${SITE.name} — economy to premium, group and corporate options.`,
  path: "/umrah-packages/",
});

const sections: { title: string; category: UmrahCategory }[] = [
  { title: "Economy Umrah Packages", category: "economy" },
  { title: "Standard Umrah Packages", category: "standard" },
  { title: "Premium Umrah Packages", category: "premium" },
  { title: "Group Umrah Packages", category: "group" },
  { title: "Family Umrah Packages", category: "family" },
  { title: "Corporate / NGO Umrah Groups", category: "corporate" },
];

export default async function UmrahPackagesPage() {
  const packages = await dataProvider.getUmrahPackages();

  return (
    <>
      <PageHero {...PAGE_HEROES.umrah} badge="Economy · Standard · Premium · Group" />

      {sections.map(({ title, category }) => {
        const items = packages.filter((p) => p.category === category);
        if (!items.length) return null;
        return (
          <section key={category} className="section-padding even:bg-light-bg">
            <div className="container-wide">
              <SectionHeading title={title} align="left" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((pkg) => <UmrahPackageCard key={pkg.id} pkg={pkg} />)}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-padding bg-navy/5">
        <div className="container-wide max-w-2xl">
          <SectionHeading title="Umrah Inquiry Form" subtitle="Tell us your requirements and we will contact you on WhatsApp" />
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
