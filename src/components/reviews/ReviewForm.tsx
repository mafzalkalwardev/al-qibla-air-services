"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";
import { Button } from "@/components/ui/button";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city, service, rating, comment, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setMessage(data.message);
      setName("");
      setCity("");
      setService("");
      setComment("");
      setConsent(false);
      setRating(5);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or contact us on WhatsApp.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-gold/30 bg-gold/10 p-6 text-center">
        <p className="font-medium text-navy">{message}</p>
        <Button variant="outlineDark" className="mt-4" onClick={() => setStatus("idle")}>
          Write another review
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-white p-6 shadow-sm">
      <h3 className="font-heading text-lg font-bold text-navy">Write a Review</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy" htmlFor="review-name">
            Name *
          </label>
          <input
            id="review-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy" htmlFor="review-city">
            City
          </label>
          <input
            id="review-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-navy" htmlFor="review-service">
          Service used
        </label>
        <input
          id="review-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Umrah Package, Air Ticket, Visa..."
          className="w-full rounded-lg border border-border px-3 py-2 text-sm"
        />
      </div>
      <div>
        <span className="mb-1 block text-sm font-medium text-navy">Your rating *</span>
        <StarRating value={rating} onChange={setRating} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-navy" htmlFor="review-comment">
          Your review *
        </label>
        <textarea
          id="review-comment"
          required
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-lg border border-border px-3 py-2 text-sm"
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        I agree that Al Qibla may display my review on the website.
      </label>
      {status === "error" && <p className="text-sm text-red-accent">{message}</p>}
      <Button type="submit" variant="primaryGold" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
