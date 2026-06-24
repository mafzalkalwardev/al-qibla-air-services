"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/base-path";
import { SITE } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={assetPath("/assets/gallery/hero-poster.svg")}
          className="h-full w-full object-cover opacity-40"
        >
          <source src={assetPath("/assets/hero.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--gold)_0%,_transparent_50%)] opacity-10" />
      </div>

      <div className="container-wide relative z-10 flex min-h-[85vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-sm text-gold-light backdrop-blur-sm">
            <Plane className="h-4 w-4" />
            Trusted Travel Partner Since Islamabad
          </div>
          <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Your Journey to{" "}
            <span className="text-gradient-gold">Sacred Lands</span> & Beyond
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75 md:text-xl">
            {SITE.tagline}. Umrah packages, group tickets, corporate travel for NGOs & companies.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/umrah-packages/"
              className={cn(buttonVariants({ size: "lg" }), "bg-gold px-8 text-navy hover:bg-gold-light")}
            >
              Explore Umrah Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/available-tickets/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 bg-white/5 px-8 text-white backdrop-blur-sm hover:bg-white/10"
              )}
            >
              View Group Tickets
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
