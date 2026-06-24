import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  city: z.string().max(100).optional(),
  service: z.string().max(100).optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10, "Please write at least 10 characters").max(2000),
  consent: z.literal(true, { message: "Consent is required" }),
});

export const inquirySchema = z.object({
  type: z.string().default("general"),
  name: z.string().min(2, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7, "Phone is required"),
  whatsapp: z.string().optional(),
  service: z.string().optional(),
  from_city: z.string().optional(),
  to_city: z.string().optional(),
  travel_date: z.string().optional(),
  passengers: z.coerce.number().int().positive().optional(),
  budget: z.coerce.number().positive().optional(),
  message: z.string().min(5, "Message is required").max(5000),
  source_page: z.string().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
