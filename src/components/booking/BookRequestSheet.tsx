"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SITE } from "@/lib/constants";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { BookingProductType } from "@/types";

interface BookRequestSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: BookingProductType;
  productTitle: string;
  quotedPrice: number;
  currency?: string;
  ticketId?: string;
  umrahPackageId?: string;
  tourPackageId?: string;
  sourcePage?: string;
}

export function BookRequestSheet({
  open,
  onOpenChange,
  productType,
  productTitle,
  quotedPrice,
  currency = "PKR",
  ticketId,
  umrahPackageId,
  tourPackageId,
  sourcePage,
}: BookRequestSheetProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    passengers: "1",
    passengerNames: "",
    notes: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_type: productType,
          ticket_id: ticketId,
          umrah_package_id: umrahPackageId,
          tour_package_id: tourPackageId,
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email || undefined,
          passengers: Number(form.passengers) || 1,
          quoted_price: quotedPrice,
          currency,
          product_title: productTitle,
          source_page: sourcePage,
          passenger_details: {
            names: form.passengerNames,
            notes: form.notes,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setBookingRef(json.bookingRef || "");
      setDone(true);
    } catch {
      alert("Could not submit booking request. Please contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const whatsappMsg = `Hello ${SITE.name}, I submitted booking request${bookingRef ? ` #${bookingRef.slice(0, 8)}` : ""} for:\n${productTitle}\nPrice: ${quotedPrice} ${currency}\nName: ${form.name}\nPhone: ${form.phone}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-navy">Book Request</SheetTitle>
          <SheetDescription>
            Submit your details — we will confirm availability and payment on WhatsApp.
          </SheetDescription>
        </SheetHeader>

        {done ? (
          <div className="mt-6 space-y-4 text-center">
            <p className="font-medium text-navy">Request received!</p>
            <p className="text-sm text-muted-foreground">
              Reference: <strong>{bookingRef.slice(0, 8).toUpperCase()}</strong>
            </p>
            <p className="text-sm text-muted-foreground">
              Our team will contact you shortly to confirm payment and complete your booking.
            </p>
            <a
              href={whatsappLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "default" }), "w-full bg-gold text-navy hover:bg-gold-light inline-flex")}
            >
              Continue on WhatsApp
            </a>
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="rounded-lg bg-secondary/50 p-3 text-sm">
              <p className="font-medium text-navy">{productTitle}</p>
              <p className="text-gold font-bold">
                {quotedPrice.toLocaleString()} {currency}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-name">Full name</Label>
              <Input id="br-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-phone">Phone / WhatsApp</Label>
              <Input id="br-phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-email">Email (optional)</Label>
              <Input id="br-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-passengers">Passengers</Label>
              <Input id="br-passengers" type="number" min={1} value={form.passengers} onChange={(e) => setForm({ ...form, passengers: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-names">Passenger names</Label>
              <Textarea id="br-names" placeholder="One name per line" value={form.passengerNames} onChange={(e) => setForm({ ...form, passengerNames: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="br-notes">Notes (optional)</Label>
              <Textarea id="br-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-navy text-white hover:bg-navy-light">
              {loading ? "Submitting…" : "Submit Book Request"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Subject to availability. Payment confirmed offline before ticket is issued.
            </p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
