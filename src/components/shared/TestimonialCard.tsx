import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full border border-border/60 bg-white">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-3 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < testimonial.rating ? "fill-gold text-gold" : "text-border"}`}
            />
          ))}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          &ldquo;{testimonial.text}&rdquo;
        </p>
        <div className="mt-4 border-t border-border pt-4">
          <p className="font-semibold text-navy">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.location}</p>
        </div>
      </CardContent>
    </Card>
  );
}
