import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedFlightPath } from "@/components/motion/AnimatedFlightPath";
import { FloatingAircraftLayer } from "@/components/motion/FloatingAircraftLayer";
import { assetPath } from "@/lib/base-path";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  badge?: string;
  cta?: { label: string; href: string };
  showAnimatedRoute?: boolean;
  children?: React.ReactNode;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage = "/assets/gallery/hero-poster.svg",
  backgroundVideo,
  badge,
  cta,
  showAnimatedRoute = true,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${assetPath(backgroundImage)})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-royal/30" />
        {backgroundVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={assetPath(backgroundImage)}
            className="absolute inset-0 hidden h-full w-full object-cover opacity-20 md:block"
          >
            <source src={assetPath(backgroundVideo)} type="video/mp4" />
          </video>
        )}
        <FloatingAircraftLayer />
        {showAnimatedRoute && (
          <AnimatedFlightPath variant="section" className="bottom-0 h-24 opacity-60" />
        )}
      </div>
      <div className="container-wide relative z-10">
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-gold/30 bg-white/5 px-4 py-1 text-sm text-gold-light">
            {badge}
          </span>
        )}
        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/75 md:text-lg">{subtitle}</p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className={cn(buttonVariants({ variant: "primaryGold", size: "lg" }), "mt-8 inline-flex")}
          >
            {cta.label}
          </Link>
        )}
        {children}
      </div>
    </section>
  );
}
