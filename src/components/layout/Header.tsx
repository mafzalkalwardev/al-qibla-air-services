"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, Ticket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LOGO_PATH, NAV_LINKS, SERVICE_DROPDOWN, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const primaryNav = NAV_LINKS.filter((l) => !["/inquiry/", "/services/"].includes(l.href));

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md transition-shadow duration-300",
        scrolled && "header-scrolled"
      )}
    >
      <div className="container-wide flex h-[72px] items-center justify-between gap-3 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={LOGO_PATH}
            alt={SITE.name}
            width={56}
            height={56}
            className="h-12 w-12 rounded-lg object-contain lg:h-14 lg:w-14"
            unoptimized
            priority
          />
          <div className="hidden min-w-0 sm:block">
            <p className="font-heading text-sm font-bold leading-tight text-white lg:text-base">
              {SITE.shortName}
            </p>
            <p className="truncate text-[10px] text-gold-light lg:text-xs">Air Services</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {primaryNav.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold lg:px-3 lg:text-sm"
            >
              {link.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold lg:px-3 lg:text-sm"
            >
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-xl border border-white/10 bg-navy-light py-2 shadow-xl">
                {SERVICE_DROPDOWN.map((item) => (
                  <Link key={item.href} href={item.href} className="block px-4 py-2.5 text-sm text-white/85 hover:bg-white/10 hover:text-gold">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {primaryNav.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden rounded-md px-2.5 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold xl:inline-flex lg:px-3 lg:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/available-tickets/"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden border-white/25 text-white hover:bg-white/10 md:inline-flex")}
          >
            <Ticket className="mr-1.5 h-4 w-4" />
            Check Tickets
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "bg-gold text-navy hover:bg-gold-light")}
          >
            <Phone className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">Book on </span>WhatsApp
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white hover:bg-white/10 lg:hidden")}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto bg-navy text-white">
              <SheetHeader>
                <SheetTitle className="text-left text-white">{SITE.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-gold">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
