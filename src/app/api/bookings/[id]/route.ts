import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { handleCommonErrors } from "@/utils/errorHandler";
import { bookingService } from "@/services/booking.service";


/**
 * DELETE /api/bookings/[id]
 * Deletes an event by its id (Protected: Admin only)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // only allow admin to delete booking
    const user = getDataFromToken(req);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await connectDB();

    const { id } = await params;

    const deletedBooking = await bookingService.deleteBookingById(id);

    if (!deletedBooking) {
      return NextResponse.json(
        { message: `Event with id '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleCommonErrors(error);
  }
}
