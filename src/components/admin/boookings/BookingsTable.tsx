"use client";

import { Edit, Delete } from "@mui/icons-material";
import type { IEvent, IBooking } from "@/models";

interface BookingsTableProps {
  bookings: IBooking[];
  events: IEvent[];
  isLoading: boolean;
  onEdit: (booking: IBooking) => void;
  onDelete: (id: string) => void;
}

const BookingsTable = ({
  bookings,
  events,
  isLoading,
  onEdit,
  onDelete,
}: BookingsTableProps) => {
  const getEventTitle = (eventId: string) => {
    const idString = eventId.toString();
    const event = events.find((e) => e._id.toString() === idString);
    return event ? event.title : "Unknown Event";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-slate-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-semibold text-slate-700">
              User Email
            </th>
            <th className="px-6 py-4 font-semibold text-slate-700">Event</th>
            <th className="px-6 py-4 font-semibold text-slate-700">
              Booked On
            </th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <tr
              key={booking._id.toString()}
              className="hover:bg-slate-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-slate-900">
                {booking.email}
              </td>
              <td className="px-6 py-4 text-teal-600 font-medium">
                {getEventTitle(booking.eventId.toString())}
              </td>
              <td className="px-6 py-4 text-slate-500">
                {/* Handle Date string from JSON */}
                {new Date(booking.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(booking)}
                    className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  >
                    <Edit fontSize="small" />
                  </button>
                  <button
                    onClick={() => onDelete(booking._id.toString())}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Delete fontSize="small" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
