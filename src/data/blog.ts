import { ASSETS } from "@/lib/assets";
import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "how-to-choose-umrah-package",
    title: "How to Choose the Right Umrah Package",
    excerpt: "A practical guide to selecting the best Umrah package for your budget, schedule, and spiritual goals.",
    content: `Choosing the right Umrah package requires balancing budget, duration, hotel proximity to Haram, and airline preferences.

## Key Factors
- **Duration**: 10–21 days depending on your schedule
- **Hotels**: Distance from Haram matters for convenience
- **Airline**: Group tickets on PIA, Saudia, AirSial offer savings
- **Visa & Transport**: Ensure all-inclusive packages

Contact Al Qibla Air Services on WhatsApp for personalized recommendations.`,
    coverImage: ASSETS.blog[0],
    publishedAt: "2026-06-01",
    author: "Al Qibla Team",
    tags: ["Umrah", "Guide"],
  },
  {
    id: "b2",
    slug: "best-time-book-international-tickets",
    title: "Best Time to Book International Air Tickets",
    excerpt: "Tips for securing the lowest group fares on international routes from Pakistan.",
    content: `Group tickets offer significant savings compared to individual bookings.

## Booking Tips
1. Book 4–8 weeks in advance for Umrah season
2. Be flexible with dates for better fares
3. Monitor our Available Tickets page for live group inventory

We update group fares regularly across ISB, LHE, PEW, SKT and more.`,
    coverImage: ASSETS.blog[1],
    publishedAt: "2026-05-20",
    author: "Al Qibla Team",
    tags: ["Tickets", "Tips"],
  },
  {
    id: "b3",
    slug: "corporate-travel-planning-ngos",
    title: "Corporate Travel Planning for NGOs and Companies",
    excerpt: "How organizations can streamline group travel with dedicated support and billing.",
    content: `NGOs, companies and schools benefit from consolidated travel management.

## What We Offer
- Dedicated account manager
- Group fares and flexible billing
- 24/7 WhatsApp support for urgent changes

Contact us for a corporate travel proposal tailored to your organization.`,
    coverImage: ASSETS.blog[2],
    publishedAt: "2026-05-10",
    author: "Al Qibla Team",
    tags: ["Corporate", "Travel"],
  },
];
