import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Booking } from "@/models";


// get all bookings
export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Bookings fetched successfully", bookings },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Bookings fetching failed", error: e },
      { status: 500 }
    );
  }
}
