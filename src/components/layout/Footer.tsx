import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/shared/SocialIcons";
import { LOGO_PATH, NAV_LINKS, SITE, SOCIAL } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="container-wide section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={LOGO_PATH} alt={SITE.name} className="h-12 w-12" />
              <div>
                <p className="font-heading text-lg font-semibold">{SITE.shortName}</p>
                <p className="text-sm text-gold-light">Air Services</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">{SITE.description}</p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-gold">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-gold">Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {SITE.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${SITE.phone}`} className="hover:text-gold">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-gold">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.facebookGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
                aria-label="Facebook Group"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-gold hover:text-gold"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-xs text-white/50">{SITE.businessHours}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          <p>
            &copy; {currentYear} {SITE.name}. All rights reserved. | Serving{" "}
            {SITE.regions.join(", ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
