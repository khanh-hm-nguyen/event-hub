"use server";

import connectDB from "@/lib/mongodb";
import { bookingService } from "@/services/booking.service";

export const getBookingsByEventId = async (eventId: string) => {
  try {
    await connectDB();

    const bookings = await bookingService.getBookingsByEventId(eventId);

    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error(`Failed to fetch bookings for event ${eventId}:`, error);
    return [];
  }
};
