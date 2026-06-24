import { createPageMetadata } from "@/lib/metadata";
import { ContactForm } from "@/components/shared/ContactForm";
import { OFFICES, SITE, SOCIAL } from "@/lib/constants";
import { FacebookIcon, InstagramIcon } from "@/components/shared/SocialIcons";
import { MapPin, MessageCircle, Phone, Mail, Clock } from "lucide-react";

export const metadata = createPageMetadata({
  title: "Contact Us",
  description: `Contact ${SITE.name} — Peshawar head office & Islamabad branch. WhatsApp ${SITE.whatsappNumber}`,
  path: "/contact/",
});

function TwitterIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">Visit our offices in Peshawar or Islamabad. 24/7 WhatsApp support.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              {[OFFICES.headOffice, OFFICES.islamabad].map((office) => (
                <div key={office.label} className="rounded-2xl border border-border/60 bg-white p-6">
                  <h2 className="font-heading text-lg font-semibold text-navy">{office.label}</h2>
                  <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {office.address}
                  </p>
                  <a href={`tel:${office.phoneTel}`} className="mt-2 flex items-center gap-2 text-sm hover:text-gold">
                    <Phone className="h-4 w-4 text-gold" /> {office.phone}
                  </a>
                </div>
              ))}

              <div className="rounded-2xl border border-border/60 bg-white p-6">
                <h2 className="font-heading text-lg font-semibold text-navy">Connect With Us</h2>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                  <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-gold" /><a href={SITE.whatsapp}>WhatsApp: {SITE.whatsappNumber}</a></li>
                  <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" />{SITE.businessHours}</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  {[
                    { href: SOCIAL.facebook, Icon: FacebookIcon, label: "Facebook" },
                    { href: SOCIAL.facebookGroup, Icon: FacebookIcon, label: "Group" },
                    { href: SOCIAL.instagram, Icon: InstagramIcon, label: "Instagram" },
                    { href: SOCIAL.twitter, Icon: TwitterIcon, label: "X" },
                    { href: SOCIAL.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
                  ].map(({ href, Icon, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border hover:border-gold hover:text-gold">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <ContactForm />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-heading text-xl font-semibold text-navy">{OFFICES.islamabad.label}</h2>
              <iframe src={OFFICES.islamabad.mapEmbed} width="100%" height="400" style={{ border: 0, borderRadius: 16 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Islamabad Office Map" />
            </div>
            <div>
              <h2 className="mb-4 font-heading text-xl font-semibold text-navy">{OFFICES.headOffice.label}</h2>
              <iframe src={OFFICES.headOffice.mapEmbed} width="100%" height="400" style={{ border: 0, borderRadius: 16 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Peshawar Office Map" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
