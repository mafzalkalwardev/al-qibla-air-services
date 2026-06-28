import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { bookingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        bookingRef: `DEV-${Date.now()}`,
        message: "Booking request received (development mode).",
        devFallback: true,
      });
    }

    const supabase = createAdminClient();

    let externalProductId = data.external_product_id;
    if (!externalProductId && data.ticket_id) {
      const { data: ticket } = await supabase
        .from("tickets")
        .select("external_id")
        .eq("id", data.ticket_id)
        .maybeSingle();
      externalProductId = ticket?.external_id ?? undefined;
    }
    if (!externalProductId && data.umrah_package_id) {
      const { data: pkg } = await supabase
        .from("umrah_packages")
        .select("external_id")
        .eq("id", data.umrah_package_id)
        .maybeSingle();
      externalProductId = pkg?.external_id ?? undefined;
    }
    if (!externalProductId && data.tour_package_id) {
      const { data: pkg } = await supabase
        .from("tour_packages")
        .select("external_id")
        .eq("id", data.tour_package_id)
        .maybeSingle();
      externalProductId = pkg?.external_id ?? undefined;
    }

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        status: "pending_payment",
        product_type: data.product_type,
        ticket_id: data.ticket_id || null,
        umrah_package_id: data.umrah_package_id || null,
        tour_package_id: data.tour_package_id || null,
        external_product_id: externalProductId || null,
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_email: data.customer_email || null,
        passenger_details: data.passenger_details,
        passengers: data.passengers,
        quoted_price: data.quoted_price,
        currency: data.currency,
        source_page: data.source_page || null,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const productLabel = data.product_title || data.product_type;
    await supabase.from("inquiries").insert({
      type: "booking",
      name: data.customer_name,
      email: data.customer_email || null,
      phone: data.customer_phone,
      service: productLabel,
      passengers: data.passengers,
      budget: data.quoted_price,
      message: `Booking request #${booking.id.slice(0, 8)} — ${productLabel}. Passengers: ${data.passenger_details.names || data.passengers}. Awaiting payment confirmation.`,
      source_page: data.source_page || "/",
      status: "new",
    });

    return NextResponse.json({
      success: true,
      bookingRef: booking.id,
      message: "Booking request submitted. We will contact you on WhatsApp to confirm payment.",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
