"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Plane, Shield, Award, Headphones, Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/base-path";
import { SITE, TRUST_BADGES } from "@/lib/constants";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";

const badgeIcons = [Award, Shield, Headphones, Globe];

export function HeroSection() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#0a2548] to-royal/40" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #0B5DA8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D6A84F33 0%, transparent 40%)" }} />
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={assetPath("/assets/gallery/hero-poster.svg")}
          className="hidden h-full w-full object-cover opacity-25 md:block"
        >
          <source src={assetPath("/assets/hero.mp4")} type="video/mp4" />
        </video>
        {/* Flight route animation */}
        <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden="true">
          <path
            d="M-50,400 Q200,200 400,350 T800,280 T1200,320"
            fill="none"
            stroke="#D6A84F"
            strokeWidth="2"
            strokeDasharray="8 12"
            className="animate-route"
          />
          <circle cx="400" cy="350" r="4" fill="#D6A84F" className="animate-cloud" />
        </svg>
      </div>

      <div className="container-wide relative z-10 flex min-h-[88vh] flex-col justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-sm text-gold-light backdrop-blur-sm">
            <Plane className="h-4 w-4" />
            {SITE.tagline}
          </div>
          <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
            Travel Smart. Travel Safe.{" "}
            <span className="text-gradient-gold">Travel with Al Qibla.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">{SITE.heroSubheading}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "bg-gold text-navy hover:bg-gold-light")}
            >
              Book on WhatsApp
            </a>
            <Link href="/umrah-packages/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/30 bg-white/5 text-white hover:bg-white/10")}>
              View Umrah Packages
            </Link>
            <Link href="/available-tickets/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-gold/50 text-gold hover:bg-gold/10")}>
              Check Available Tickets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {TRUST_BADGES.map((badge, i) => {
              const Icon = badgeIcons[i] || Shield;
              return (
                <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90">
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  {badge}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
