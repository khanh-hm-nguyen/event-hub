import { getBookingsByEventId } from "@/actions/booking.action";
import { getAllEvents } from "@/actions/event.action";
import Link from "next/link";
import { 
  Visibility, 
  Event, 
  Group, 
  TrendingUp, 
  ArrowForward 
} from "@mui/icons-material";
import { IEvent } from "@/models";

const BookingsOverviewPage = async () => {
  // 1. Fetch data
  const events = await getAllEvents();

  // 2. Fetch bookings count in parallel
  const eventsWithStats = await Promise.all(
    events.map(async (event: IEvent) => {
      const bookings = await getBookingsByEventId(event._id.toString());
      return {
        _id: event._id.toString(),
        title: event.title,
        date: event.date, 
        bookingCount: bookings.length,
      };
    })
  );

  // 3. Calculate Totals for Summary Cards
  const totalEvents = eventsWithStats.length;
  const totalAttendees = eventsWithStats.reduce((acc, curr) => acc + curr.bookingCount, 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* --- Page Header & Stats --- */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bookings Dashboard</h1>
          <p className="text-slate-500 mt-2">Overview of event performance and attendee numbers.</p>
        </div>
        
        {/* Quick Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
              <Event fontSize="small" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Events</p>
              <p className="text-xl font-bold text-slate-900">{totalEvents}</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Group fontSize="small" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendees</p>
              <p className="text-xl font-bold text-slate-900">{totalAttendees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Table Card --- */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
           <TrendingUp className="text-slate-400" fontSize="small" />
           <h3 className="font-semibold text-slate-700 text-sm">Performance by Event</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600 w-1/2">Event Details</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Registration Status</th>
                <th className="px-6 py-4 text-right font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {eventsWithStats.length > 0 ? (
                eventsWithStats.map((event) => (
                  <tr key={event._id} className="group hover:bg-slate-50/80 transition-colors">
                    
                    {/* Column 1: Event Name & Date */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-base mb-1 group-hover:text-teal-700 transition-colors">
                          {event.title}
                        </span>
                        {/* Optional: Show date if available */}
                        {event.date && (
                           <span className="text-xs text-slate-500 flex items-center gap-1">
                             <Event fontSize="inherit" className="text-slate-400"/> {new Date(event.date).toLocaleDateString()}
                           </span>
                        )}
                      </div>
                    </td>

                    {/* Column 2: Booking Count Badge */}
                    <td className="px-6 py-4 align-middle">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                            event.bookingCount > 0
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${event.bookingCount > 0 ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                          {event.bookingCount} {event.bookingCount === 1 ? 'Attendee' : 'Attendees'}
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Action Link */}
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/bookings/${event._id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 hover:border-teal-500 hover:text-teal-600 px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow"
                      >
                        <Visibility fontSize="small" /> 
                        <span>Manage</span>
                        <ArrowForward fontSize="inherit" className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal-400"/>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                       <Event fontSize="large" className="text-slate-200 mb-2"/>
                       <p>No events found in the database.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsOverviewPage;