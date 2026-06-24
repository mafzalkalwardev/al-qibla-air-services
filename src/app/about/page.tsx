import { createPageMetadata } from "@/lib/metadata";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SITE } from "@/lib/constants";
import { CheckCircle, Globe, Heart, Shield } from "lucide-react";

export const metadata = createPageMetadata({
  title: "About Us",
  description: `Learn about ${SITE.name} — your trusted travel partner for Umrah, group tickets and corporate travel in Islamabad and worldwide.`,
  path: "/about/",
});

const values = [
  { icon: Heart, title: "Customer First", desc: "We prioritize your comfort, safety and spiritual journey above all." },
  { icon: Shield, title: "Trust & Integrity", desc: "Transparent pricing and honest advice on every booking." },
  { icon: Globe, title: "Global Reach", desc: "Serving clients across Pakistan, UAE, Saudi Arabia, Afghanistan and worldwide." },
  { icon: CheckCircle, title: "Excellence", desc: "Premium service with attention to every detail of your travel." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-20 text-white">
        <div className="container-wide text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">About {SITE.name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Your trusted partner for sacred journeys and world-class travel since our establishment in Islamabad.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title="Our Story" align="left" />
              <div className="space-y-4 text-muted-foreground">
                <p>
                  {SITE.name} is a premier travel agency based at {SITE.address}. We specialize in
                  Umrah packages, group air ticketing, and corporate travel management for NGOs,
                  companies, and families across Pakistan and the Gulf region.
                </p>
                <p>
                  With partnerships across 30+ airlines including PIA, Saudia, Emirates, Qatar Airways,
                  and many more, we offer competitive group fares and complete travel solutions under one roof.
                </p>
                <p>
                  Whether you are planning a spiritual journey to the Holy Lands, organizing corporate travel
                  for your organization, or booking a family holiday, our experienced team is here to serve you
                  with dedication and professionalism.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-8 text-white">
              <h3 className="font-heading text-2xl font-semibold text-gold">Service Regions</h3>
              <ul className="mt-6 space-y-3">
                {SITE.regions.map((region) => (
                  <li key={region} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-gold" />
                    <span>{region}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-white/70">Office Location</p>
                <p className="mt-1 font-medium">{SITE.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary/50">
        <div className="container-wide">
          <SectionHeading title="Our Values" subtitle="The principles that guide everything we do" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border/60 bg-white p-6 text-center">
                <v.icon className="mx-auto h-10 w-10 text-gold" />
                <h3 className="mt-4 font-heading font-semibold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
