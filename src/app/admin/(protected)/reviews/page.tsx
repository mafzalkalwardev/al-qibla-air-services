"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/reviews/StarRating";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Review } from "@/types";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }
    const supabase = createClient();
    let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setReviews((data as Review[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    const supabase = createClient();
    const { error } = await supabase
      .from("reviews")
      .update({ status, approved_at: status === "approved" ? new Date().toISOString() : null })
      .eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Review ${status}`);
      load();
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">Reviews</h1>
      <div className="mt-4 flex gap-2">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "navy" : "outlineDark"}
            size="sm"
            onClick={() => { setFilter(f); setLoading(true); }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>
      {!isSupabaseConfigured() && (
        <p className="mt-4 rounded-lg border border-gold/30 bg-gold/10 p-4 text-sm">
          Configure Supabase to manage reviews. Public site uses approved fallback testimonials.
        </p>
      )}
      {loading ? (
        <p className="mt-8 text-muted-foreground">Loading...</p>
      ) : (
        <div className="mt-6 space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-border bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <StarRating value={r.rating} readonly size="sm" />
                  <p className="mt-2 font-medium text-navy">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{[r.city, r.service].filter(Boolean).join(" · ")}</p>
                  <p className="mt-2 text-sm">{r.comment}</p>
                  <span className="mt-2 inline-block rounded-full bg-light-bg px-2 py-0.5 text-xs">{r.status}</span>
                </div>
                {r.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="primaryGold" onClick={() => updateStatus(r.id, "approved")}>
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStatus(r.id, "rejected")}>
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {!reviews.length && <p className="text-muted-foreground">No reviews found.</p>}
        </div>
      )}
    </div>
  );
}
