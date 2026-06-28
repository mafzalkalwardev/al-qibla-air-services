import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { requireAdmin } from "@/lib/supabase/require-admin";
import { getTravelLineClient } from "@/lib/travelline/client";
import { isTravelLineConfigured } from "@/lib/travelline/env";
import { TravelLineTicketProvider } from "@/lib/tickets/providers/travelLineProvider";

export const maxDuration = 120;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const supabase = createAdminClient();
  const { data: booking, error } = await supabase.from("bookings").select("*").eq("id", id).single();

  if (error || !booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (booking.status === "confirmed") {
    return NextResponse.json({ error: "Booking already confirmed" }, { status: 400 });
  }

  if (booking.status === "pending_payment") {
    return NextResponse.json(
      { error: "Mark payment as confirmed before booking on Travel Line" },
      { status: 400 }
    );
  }

  await supabase
    .from("bookings")
    .update({ status: "booking_in_progress", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (!isTravelLineConfigured()) {
    await supabase
      .from("bookings")
      .update({
        status: "failed",
        error_message: "Travel Line credentials not configured",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    return NextResponse.json({ error: "Travel Line not configured" }, { status: 400 });
  }

  try {
    const client = getTravelLineClient();
    const result = await client.createBooking({
      externalProductId: booking.external_product_id || booking.ticket_id || booking.umrah_package_id || "",
      productType: booking.product_type,
      passengers: booking.passengers,
      passengerDetails: booking.passenger_details as Record<string, unknown>,
      quotedPrice: Number(booking.quoted_price),
      currency: booking.currency,
    });

    if (result.success) {
      await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          travelline_booking_ref: result.bookingRef,
          travelline_response: result.raw ?? null,
          error_message: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      const ticketProvider = new TravelLineTicketProvider();
      await ticketProvider.sync();

      return NextResponse.json({ success: true, bookingRef: result.bookingRef });
    }

    await supabase
      .from("bookings")
      .update({
        status: "failed",
        error_message: result.error,
        travelline_response: result.raw ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return NextResponse.json({ error: result.error }, { status: 502 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Booking failed";
    await supabase
      .from("bookings")
      .update({ status: "failed", error_message: message, updated_at: new Date().toISOString() })
      .eq("id", id);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
