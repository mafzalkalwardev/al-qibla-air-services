import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { inquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Thank you. We will contact you shortly. (Development mode — configure Supabase to persist.)",
        devFallback: true,
      });
    }

    const supabase = createAdminClient();
    const data = parsed.data;
    const { error } = await supabase.from("inquiries").insert({
      type: data.type,
      name: data.name,
      email: data.email || null,
      phone: data.phone,
      whatsapp: data.whatsapp || null,
      service: data.service || null,
      from_city: data.from_city || null,
      to_city: data.to_city || null,
      travel_date: data.travel_date || null,
      passengers: data.passengers || null,
      budget: data.budget || null,
      message: data.message,
      source_page: data.source_page || null,
      status: "new",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you. We will contact you shortly.",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
