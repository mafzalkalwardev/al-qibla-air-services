"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LOGO_PATH, NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center gap-3">
          <img src={LOGO_PATH} alt={SITE.name} className="h-10 w-10 lg:h-12 lg:w-12" />
          <div className="hidden sm:block">
            <p className="font-heading text-sm font-semibold leading-tight text-white lg:text-base">
              {SITE.shortName}
            </p>
            <p className="text-[10px] text-gold-light lg:text-xs">Air Services</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-gold lg:px-3 lg:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden bg-gold text-navy hover:bg-gold-light sm:inline-flex"
            )}
          >
            <Phone className="mr-1.5 h-4 w-4" />
            WhatsApp
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "text-white hover:bg-white/10 xl:hidden"
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-navy text-white">
              <SheetHeader>
                <SheetTitle className="text-left text-white">{SITE.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm font-medium text-white/90",
                      "transition-colors hover:bg-white/10 hover:text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "mt-6 w-full bg-gold text-navy hover:bg-gold-light")}
              >
                Chat on WhatsApp
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
