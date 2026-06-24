import Link from "next/link";
import { ArrowRight, Building2, Car, FileText, Globe, Hotel, Palmtree, Plane, Shield, Sparkles, Users, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Plane, Mosque: Sparkles, FileText, Hotel, Shield, Car, Building2, Palmtree, Users, Globe,
};

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="section-padding bg-light-bg">
      <div className="container-wide">
        <SectionHeading title="Our Services" subtitle="Complete travel solutions under one roof" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Plane;
            return (
              <Link key={service.id} href={service.href} className="card-premium group p-5">
                <Icon className="h-8 w-8 text-gold transition-transform group-hover:scale-110" />
                <h3 className="mt-3 font-heading text-sm font-semibold text-navy group-hover:text-royal">{service.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{service.description}</p>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services/" className="inline-flex items-center text-sm font-medium text-royal hover:text-gold">
            View all services <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
