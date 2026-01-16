import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import { Booking } from "@/models";

import { getDataFromToken } from "@/utils/getDataFromToken";
import { handleCommonErrors } from "@/utils/errorHandler";

// route params
type RouteParams = {
  params: Promise<{
    eventId: string;
  }>;
};

/**
 * GET /api/events/[eventId]
 * Fetches all bookings by event id
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // only allow admin to get booking
    const user = getDataFromToken(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }
    await connectDB();

    const { eventId } = await params;
    if (!eventId || typeof eventId !== "string" || eventId.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 }
      );
    }

    //remove any potential malicious input
    const sanitizedEventId = eventId.trim().toLowerCase();

    const booking = await Booking.find({ eventId: sanitizedEventId }).lean();

    // Handle events not found
    if (!booking) {
      return NextResponse.json(
        { message: `Booking with event '${sanitizedEventId}' not found` },
        { status: 404 }
      );
    }

    // Return successful response with events data
    return NextResponse.json(
      { message: "Booking fetched successfully", booking },
      { status: 200 }
    );
  } catch (error) {
     return handleCommonErrors(error);
  }
}