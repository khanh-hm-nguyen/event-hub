import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Booking } from "@/models";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { handleCommonErrors } from "@/utils/errorHandler";

// Get all bookings
export async function GET(req: NextRequest) {
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

    const bookings = await Booking.find()
      .populate("eventId", "title date")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Bookings fetched successfully", bookings },
      { status: 200 }
    );
  } catch (error) {
    return handleCommonErrors(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { eventId, email } = body;

    // 1. Basic Validation
    if (!eventId || !email) {
      return NextResponse.json(
        { message: "Please provide both Event ID and Email" },
        { status: 400 }
      );
    }

    // 2. Create Booking
    const newBooking = await Booking.create({
      eventId,
      email: email.toLowerCase(),
    });

    // 3. Return Success
    return NextResponse.json(
      {
        message:
          "Booking successful! detailed information has been sent to your email.",
        booking: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleCommonErrors(error);
  }
}
