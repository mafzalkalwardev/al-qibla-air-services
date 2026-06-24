"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, Ticket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LOGO_PATH, NAV_LINKS, SERVICE_DROPDOWN, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/base-path";

const desktopNav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About Us" },
  { href: "/umrah-packages/", label: "Umrah Packages" },
  { href: "/tour-packages/", label: "Tour Packages" },
  { href: "/available-tickets/", label: "Available Tickets" },
  { href: "/destinations/", label: "Destinations" },
  { href: "/corporate-travel/", label: "Corporate Travel" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname === "" : pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-lg transition-shadow duration-300",
        scrolled && "shadow-lg shadow-black/20"
      )}
    >
      <div className="container-wide flex h-[72px] items-center justify-between gap-3 lg:h-[76px]">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src={assetPath(LOGO_PATH)}
            alt={SITE.name}
            width={52}
            height={52}
            className="h-11 w-11 rounded-lg object-contain lg:h-12 lg:w-12"
            unoptimized
            priority
          />
          <div className="hidden min-w-0 sm:block">
            <p className="font-heading text-sm font-bold leading-tight text-white lg:text-[15px]">
              Al Qibla Air Services
            </p>
            <p className="text-[10px] text-gold-light lg:text-xs">Travel Smart. Travel Safe.</p>
          </div>
        </Link>

        <nav className="hidden items-center xl:flex">
          <Link
            href="/"
            className={cn(
              "rounded-md px-2.5 py-2 text-xs font-medium transition-colors lg:text-sm",
              isActive("/") ? "text-gold" : "text-white/80 hover:text-gold"
            )}
          >
            Home
          </Link>
          <Link
            href="/about/"
            className={cn(
              "rounded-md px-2.5 py-2 text-xs font-medium transition-colors lg:text-sm",
              isActive("/about/") ? "text-gold" : "text-white/80 hover:text-gold"
            )}
          >
            About Us
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-xs font-medium transition-colors lg:text-sm",
                pathname?.startsWith("/services") ? "text-gold" : "text-white/80 hover:text-gold"
              )}
            >
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-xl border border-white/10 bg-navy py-1.5 shadow-2xl">
                {SERVICE_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {desktopNav.slice(2, 8).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-2 py-2 text-xs font-medium transition-colors lg:px-2.5 lg:text-sm",
                isActive(link.href) ? "text-gold" : "text-white/80 hover:text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/available-tickets/"
            className={cn(buttonVariants({ variant: "outlineLight", size: "sm" }), "hidden md:inline-flex")}
          >
            <Ticket className="mr-1.5 h-4 w-4" />
            Check Tickets
          </Link>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "primaryGold", size: "sm" }))}
          >
            <Phone className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">Book on </span>WhatsApp
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-white hover:bg-white/10 xl:hidden")}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100vw-2rem,320px)] overflow-y-auto bg-navy text-white">
              <SheetHeader>
                <SheetTitle className="text-left text-white">{SITE.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-0.5">
                <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gold">Menu</p>
                {NAV_LINKS.filter((l) => l.href !== "/inquiry/").map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium hover:bg-white/10",
                      isActive(link.href) ? "text-gold" : "text-white/90"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <p className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gold">Services</p>
                {SERVICE_DROPDOWN.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-2.5 text-sm text-white/85 hover:bg-white/10 hover:text-gold"
                  >
                    {item.label}
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
