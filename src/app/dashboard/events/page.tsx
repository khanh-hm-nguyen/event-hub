import Link from "next/link";
import { getAllEvents } from "@/lib/actions/event.action";
import DeleteEventButton from "@/components/admin/DeleteEventButton";
import { IEvent } from "@/models";
import EventStatusBadge from "@/components/admin/EventStatusBadge";
import EventModeBadge from "@/components/admin/EventModeBadge"; // ✅ Import Mode Badge
import EventTableFilters from "@/components/admin/EventTableFilters";
import { isFuture, isPast, isToday, parseISO } from "date-fns";

export const dynamic = "force-dynamic";

const AdminEventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; status?: string }>;
}) => {
  const events = await getAllEvents();
  const { query, status } = await searchParams;

  const filteredEvents = events.filter((event: IEvent) => {
    const eventDate = parseISO(event.date);

    if (query && !event.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    if (status === "upcoming" && !isFuture(eventDate)) return false;
    if (status === "past" && !isPast(eventDate)) return false;
    if (status === "today" && !isToday(eventDate)) return false;

    return true;
  });

  return (
    <div className="w-full p-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Events Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Manage your conferences and workshops.
          </p>
        </div>
        <Link
          href="/dashboard/events/create"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-500 transition shadow-lg shadow-blue-900/20 flex items-center gap-2"
        >
          <span>+</span> Create Event
        </Link>
      </div>

      {/* Filters */}
      <EventTableFilters />

      {/* Table */}
      <div className="bg-gray-900/50 backdrop-blur-sm shadow-xl rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Location & Mode
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Tags
                </th>
                <th className="relative px-6 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredEvents.map((event: IEvent) => (
                <tr
                  key={event._id.toString()}
                  className="hover:bg-gray-800/50 transition-colors group"
                >
                  {/* Title */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col max-w-[250px]">
                      <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
                        {event.title}
                      </span>
                      <span className="text-xs text-gray-500 font-mono mt-0.5">
                        ID: {event._id.toString().slice(-6)}
                      </span>
                    </div>
                  </td>

                  {/* Date, Time & Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 items-start">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <span>{event.date}</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-400">{event.time}</span>
                      </div>
                      <EventStatusBadge date={event.date} />
                    </div>
                  </td>

                  {/* Location & Mode */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm text-gray-300 flex items-center gap-1.5">
                        <span className="opacity-70">📍</span>{" "}
                        {event.location || "N/A"}
                      </span>
                      <div className="w-fit">
                        {/* ✅ New Color-Coded Badge */}
                        <EventModeBadge mode={event.mode} />
                      </div>
                    </div>
                  </td>

                  {/* Tags */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {event.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-[10px] border border-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3 items-center">
                      <Link
                        href={`/dashboard/events/edit/${event._id}`}
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteEventButton eventId={event._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminEventsPage;