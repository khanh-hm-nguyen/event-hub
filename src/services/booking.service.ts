import { Booking, IBooking } from "@/models";

export const bookingService = {
  getBookingsByEventId: async (eventId: string): Promise<IBooking[]> => {
    const bookings = await Booking.find({ eventId })
      .sort({ createdAt: -1 })
      .lean<IBooking[]>();

    return bookings;
  },

  deleteBookingById: async (bookingId: string) => {
    return await Booking.findByIdAndDelete(bookingId);
  },
};
