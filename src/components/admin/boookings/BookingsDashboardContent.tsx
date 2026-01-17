import { getBookingsByEventId } from "@/actions/booking.action";
import { getAllEvents } from "@/actions/event.action";
import Link from "next/link";
import { Eye, Calendar, Users, TrendingUp, ArrowRight } from "lucide-react";
import { IEvent } from "@/models";

const BookingsDashboardContent = async () => {
  // Fetch events
  const events = await getAllEvents();

  // Parallel fetch for booking counts
  const eventsWithStats = await Promise.all(
    events.map(async (event: IEvent) => {
      const bookings = await getBookingsByEventId(event._id.toString());
      return {
        _id: event._id.toString(),
        title: event.title,
        date: event.date,
        bookingCount: bookings.length,
      };
    }),
  );

  const totalEvents = eventsWithStats.length;
  const totalAttendees = eventsWithStats.reduce(
    (acc, curr) => acc + curr.bookingCount,
    0,
  );

  return (
    <>
      {/* Quick Stats Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="bg-white px-5 py-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="p-3 bg-teal-50 rounded-xl text-teal-600">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Events
            </p>
            <p className="text-2xl font-bold text-slate-900">{totalEvents}</p>
          </div>
        </div>

        <div className="bg-white px-5 py-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-[200px]">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Attendees
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {totalAttendees}
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-8">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <TrendingUp className="text-slate-400" size={18} />
          <h3 className="font-semibold text-slate-700 text-sm">
            Performance by Event
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Event Details
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Registration
                </th>
                <th className="px-6 py-4 text-right font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {eventsWithStats.map((event) => (
                <tr
                  key={event._id}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-base mb-1 group-hover:text-teal-700 transition-colors">
                        {event.title}
                      </span>
                      {event.date && (
                        <span className="text-xs text-slate-500 flex items-center gap-1.5">
                          <Calendar size={12} className="text-slate-400" />{" "}
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
                          event.bookingCount > 0
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${event.bookingCount > 0 ? "bg-emerald-500" : "bg-slate-400"}`}
                        ></span>
                        {event.bookingCount}{" "}
                        {event.bookingCount === 1 ? "Attendee" : "Attendees"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/bookings/${event._id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 hover:border-teal-500 hover:text-teal-600 px-4 py-2 rounded-lg transition-all shadow-sm"
                    >
                      <Eye size={16} />
                      <span>Manage</span>
                      <ArrowRight
                        size={14}
                        className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal-400"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookingsDashboardContent;
