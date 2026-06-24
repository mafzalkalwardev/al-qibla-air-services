"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cities = ["Islamabad", "Lahore", "Karachi", "Peshawar", "Sialkot", "Jeddah", "Dubai", "Madinah", "Kabul"];
const airlines = ["All Airlines", "PIA", "Saudia", "Emirates", "Airblue", "AirSial", "Qatar Airways", "Fly Jinnah"];

export function GroupFlightSearch() {
  const router = useRouter();
  const [from, setFrom] = useState("Islamabad");
  const [to, setTo] = useState("Jeddah");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [airline, setAirline] = useState("All Airlines");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (from) params.set("fromCity", from);
    if (to) params.set("toCity", to);
    if (date) params.set("date", date);
    if (airline !== "All Airlines") params.set("airline", airline);
    router.push(`/available-tickets/?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-16 pb-8">
      <div className="container-wide">
        <Card className="border-gold/20 shadow-2xl">
          <CardContent className="p-6 md:p-8">
            <h2 className="mb-6 font-heading text-xl font-semibold text-navy md:text-2xl">
              Search Group Flights
            </h2>
            <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <div className="space-y-2">
                <Label htmlFor="from" className="flex items-center gap-1.5 text-navy">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> From
                </Label>
                <Select value={from} onValueChange={(v) => v && setFrom(v)}>
                  <SelectTrigger id="from" className="w-full">
                    <SelectValue placeholder="From city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="to" className="flex items-center gap-1.5 text-navy">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> To
                </Label>
                <Select value={to} onValueChange={(v) => v && setTo(v)}>
                  <SelectTrigger id="to" className="w-full">
                    <SelectValue placeholder="To city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-1.5 text-navy">
                  <Calendar className="h-3.5 w-3.5 text-gold" /> Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers" className="flex items-center gap-1.5 text-navy">
                  <Users className="h-3.5 w-3.5 text-gold" /> Passengers
                </Label>
                <Select value={passengers} onValueChange={(v) => v && setPassengers(v)}>
                  <SelectTrigger id="passengers" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "2", "5", "10", "15", "20", "25+"].map((n) => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-navy">Airline</Label>
                <Select value={airline} onValueChange={(v) => v && setAirline(v)}>
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {airlines.map((a) => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full bg-navy text-white hover:bg-navy-light lg:h-9">
                  <Search className="mr-2 h-4 w-4" />
                  Search Flights
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
