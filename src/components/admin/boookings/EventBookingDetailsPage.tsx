import { getBookingsByEventId } from "@/actions/booking.action";
import { getEventById } from "@/actions/event.action";
import BookingHeader from "./BookingHeader";
import BookingStats from "./BookingStats";
import BookingTable from "./BookingTable";

interface EventBookingDetailsPageProps {
  eventId: string;
}

const EventBookingDetailsPage = async ({
  eventId,
}: EventBookingDetailsPageProps) => {
  const [bookings, event] = await Promise.all([
    getBookingsByEventId(eventId),
    getEventById(eventId),
  ]);

  if (!event) return <div>Event not found</div>;

  return (
    <div className="w-full space-y-6 p-6 lg:p-10 bg-[#f8faff] min-h-screen">
      <BookingHeader eventId={eventId} />

      <BookingStats title={event.title} count={bookings.length} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          Attendee List
          <span className="text-slate-400 text-sm font-normal bg-slate-100 px-2 py-0.5 rounded-full">
            {bookings.length}
          </span>
        </h3>
      </div>

      <BookingTable bookings={bookings} />
    </div>
  );
};

export default EventBookingDetailsPage;
