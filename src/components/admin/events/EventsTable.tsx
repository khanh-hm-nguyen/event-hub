"use client";

import { Edit, Delete, CalendarMonth, LocationOn } from "@mui/icons-material";
import { IEvent } from "@/models";
import Image from "next/image";

interface EventsTableProps {
  events: IEvent[];
  isLoading: boolean;
  onEdit: (event: IEvent) => void;
  onDelete: (id: string) => void;
}

const EventsTable = ({
  events,
  isLoading,
  onEdit,
  onDelete,
}: EventsTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-slate-500">
          No events found. Create one to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Event Details
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Date & Time
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700">
                Location
              </th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.map((event) => (
              <tr
                key={event._id.toString()}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                          No Img
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">
                        {event.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {event.organizer}
                      </p>
                      <div className="flex gap-1 mt-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${
                            event.mode === "online"
                              ? "bg-green-100 text-green-700"
                              : event.mode === "offline"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {event.mode}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CalendarMonth
                      fontSize="small"
                      className="text-slate-400"
                    />
                    <div>
                      <p className="font-medium">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">{event.time}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <LocationOn fontSize="small" className="text-slate-400" />
                    <span
                      className="truncate max-w-[150px]"
                      title={event.location}
                    >
                      {event.venue}, {event.location}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(event)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit Event"
                    >
                      <Edit fontSize="small" />
                    </button>
                    <button
                      onClick={() => onDelete(event._id.toString())}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Event"
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
    </div>
  );
};

export default EventsTable;
