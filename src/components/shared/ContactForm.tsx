"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  "Air Ticketing",
  "Umrah Package",
  "Tour Package",
  "Visit Visa",
  "Hotel Reservation",
  "Corporate Travel",
  "Travel Insurance",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission — ready for future API integration
    console.log("Inquiry submitted:", { ...form, createdAt: new Date().toISOString() });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-gold/30">
        <CardContent className="p-8 text-center">
          <h3 className="font-heading text-xl font-semibold text-navy">Thank You!</h3>
          <p className="mt-2 text-muted-foreground">
            Your inquiry has been received. We will contact you shortly via phone or WhatsApp.
          </p>
          <Button className="mt-4 bg-gold text-navy hover:bg-gold-light" onClick={() => setSubmitted(false)}>
            Send Another Inquiry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="font-heading text-navy">Send Us an Inquiry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone / WhatsApp *</Label>
              <Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Service Required *</Label>
            <Select value={form.service} onValueChange={(v) => v && setForm({ ...form, service: v })} required>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select a service" /></SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your travel requirements..."
            />
          </div>
          <Button type="submit" className="w-full bg-gold text-navy hover:bg-gold-light">
            Submit Inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
