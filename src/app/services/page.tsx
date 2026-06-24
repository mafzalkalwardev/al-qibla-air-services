import Link from "next/link";
import {
  Building2,
  Car,
  FileText,
  Hotel,
  Palmtree,
  Plane,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { dataProvider } from "@/lib/data-provider";
import { SITE } from "@/lib/constants";

export const metadata = createPageMetadata({
  title: "Services",
  description: `Complete travel services by ${SITE.name} — air ticketing, Umrah, visas, hotels, insurance and corporate travel.`,
  path: "/services/",
});

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Mosque: Sparkles,
  FileText,
  Hotel,
  Shield,
  Car,
  Building2,
  Palmtree,
};

export default async function ServicesPage() {
  const services = await dataProvider.getServices();

  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Comprehensive travel solutions for individuals, families, pilgrims, and organizations.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            title="What We Offer"
            subtitle="From air tickets to complete Umrah packages — we handle it all"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Plane;
              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group rounded-xl border border-border/60 bg-white p-6 transition-all hover:border-gold/50 hover:shadow-lg"
                >
                  <Icon className="h-10 w-10 text-gold transition-transform group-hover:scale-110" />
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy group-hover:text-gold">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
