import Link from "next/link";
import { Building2, CheckCircle, Headphones, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";

const benefits = [
  { icon: Building2, title: "NGO & Corporate Accounts", desc: "Dedicated account management for organizations" },
  { icon: Shield, title: "Consolidated Billing", desc: "Simplified invoicing and payment terms" },
  { icon: Headphones, title: "24/7 Support", desc: "WhatsApp support for urgent travel needs" },
  { icon: CheckCircle, title: "Group Fare Access", desc: "Exclusive B2B group ticket inventory" },
];

export function CorporateTravelCTA() {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Corporate Travel Management"
              subtitle="Trusted by NGOs, companies and organizations across Pakistan and the Gulf"
              align="left"
            />
            <p className="mb-8 text-muted-foreground">
              Al Qibla Air Services provides end-to-end corporate travel solutions including group
              ticketing, visa coordination, travel insurance, and dedicated support for mission
              travel and business trips.
            </p>
            <Link
              href="/corporate-travel/"
              className={cn(buttonVariants({ size: "lg" }), "bg-navy text-white hover:bg-navy-light")}
            >
              Learn More About Corporate Travel
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-border/60 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <b.icon className="mb-3 h-8 w-8 text-gold" />
                <h3 className="font-heading font-semibold text-navy">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
