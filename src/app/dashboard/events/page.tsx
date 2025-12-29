import Link from "next/link";
import { getAllEvents } from "@/lib/actions/event.action";
import DeleteEventButton from "@/components/admin/DeleteEventButton";
import { IEvent } from "@/models";

const AdminEventsPage = async () => {
  const events = await getAllEvents();

  //console.log(events);
  return (
    <div className="w-full p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <Link
          href="/admin/events/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Event
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white text-left text-sm text-gray-500">
          {/* ... Table Header ... */}
          <tbody className="divide-y divide-gray-200">
            {/* displays events */}
            {events.map((event: IEvent) => (
              <tr key={event.title} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {event.title}
                </td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.location}</td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <Link
                    href={`/admin/events/edit/${event._id}`}
                    className="text-blue-600 hover:text-blue-900 px-3 py-1 border border-blue-200 rounded"
                  >
                    Edit
                  </Link>
                  <DeleteEventButton eventId={event._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEventsPage;
