"use server";

import connectDB from "@/lib/mongodb";
import { bookingService } from "@/services/booking.service";
import { isAdmin } from "@/utils/getDataFromToken";

export const getBookingsByEventId = async (eventId: string) => {
  try {
    // Verify Admin Role
    const isAuthorized = await isAdmin();

    if (!isAuthorized) {
      throw new Error("Unauthorized: Admin access required");
    }
    await connectDB();

    const bookings = await bookingService.getBookingsByEventId(eventId);

    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error(`Failed to fetch bookings for event ${eventId}:`, error);
    return [];
  }
};
