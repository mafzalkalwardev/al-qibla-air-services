import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE } from "@/lib/constants";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";

export function CorporateTravelCTA() {
  const msg = bookingMessage("corporate travel proposal", "We are an NGO/company looking for group travel management.");

  return (
    <section className="section-padding bg-navy text-white">
      <div className="container-wide">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Corporate Travel Management for NGOs, Companies & Groups"
              subtitle="Trusted by NGOs, companies, schools, universities, religious groups and delegations"
              align="left"
              light
            />
            <p className="mb-6 text-white/75">
              Al Qibla provides group ticketing, hotels, airport transfers, visas, insurance, itinerary planning,
              emergency changes and dedicated 24/7 WhatsApp support for organizational travel.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/corporate-travel/" className={cn(buttonVariants({ variant: "primaryGold", size: "lg" }))}>
                Request Corporate Travel Proposal
              </Link>
              <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outlineLight", size: "lg" }))}>
                WhatsApp Corporate Desk
              </a>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Group Ticketing", "Visa Coordination", "24/7 Support", "Group Discounts", "Document Support", "Dedicated Manager"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                <span className="text-gold">✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
