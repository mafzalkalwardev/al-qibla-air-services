import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

export function ContactCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-navy to-navy-light">
      <div className="container-wide text-center">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
          Ready to Start Your Journey?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Contact Al Qibla Air Services today for Umrah packages, group tickets, or corporate travel solutions.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "bg-[#25D366] text-white hover:bg-[#20bd5a]")}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${SITE.phone}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 text-white hover:bg-white/10"
            )}
          >
            <Phone className="mr-2 h-5 w-5" />
            {SITE.phone}
          </a>
          <Link
            href="/contact/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-gold text-gold hover:bg-gold hover:text-navy"
            )}
          >
            <MapPin className="mr-2 h-5 w-5" />
            Visit Our Office
          </Link>
        </div>
      </div>
    </section>
  );
}
