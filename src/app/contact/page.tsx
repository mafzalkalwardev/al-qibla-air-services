import { createPageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/shared/ContactForm";
import { MAP_EMBED_URL, SITE, SOCIAL } from "@/lib/constants";
import { MapPin, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/shared/SocialIcons";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description: `Contact ${SITE.name} — ${SITE.address}. Call ${SITE.phone} or chat on WhatsApp.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Visit our office, call us, or chat on WhatsApp. We are here to help with all your travel needs.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-xl border border-border/60 bg-white p-6">
                <h2 className="font-heading text-xl font-semibold text-navy">Get in Touch</h2>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-medium text-navy">Office Address</p>
                      <p className="text-sm text-muted-foreground">{SITE.address}</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-medium text-navy">Phone / WhatsApp</p>
                      <a href={`tel:${SITE.phone}`} className="text-sm text-muted-foreground hover:text-gold">
                        {SITE.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-medium text-navy">Email</p>
                      <a href={`mailto:${SITE.email}`} className="text-sm text-muted-foreground hover:text-gold">
                        {SITE.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-medium text-navy">Business Hours</p>
                      <p className="text-sm text-muted-foreground">{SITE.businessHours}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="mb-3 text-sm font-medium text-navy">Follow Us</p>
                  <div className="flex gap-3">
                    <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold" aria-label="Facebook">
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                    <a href={SOCIAL.facebookGroup} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold" aria-label="Facebook Group">
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                    <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold" aria-label="Instagram">
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                    <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-gold hover:text-gold" aria-label="WhatsApp">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 font-medium text-white hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="overflow-hidden rounded-xl border border-border/60">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Al Qibla Air Services Office Location"
                />
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
