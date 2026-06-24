"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizes = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  label = "Rating",
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={cn(
            "transition-colors",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
            star <= value ? "text-gold" : "text-white/25"
          )}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star className={cn(sizes[size], star <= value && "fill-current")} />
        </button>
      ))}
    </div>
  );
}
