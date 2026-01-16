"use client";

import { Edit, Delete, CalendarMonth, ArrowForward } from "@mui/icons-material";
import type { IEvent } from "@/models";
import Image from "next/image";
import Link from "next/link"; 

type IEventFrontend = Omit<IEvent, "_id"> & { _id: string };

interface EventsTableProps {
  events: IEventFrontend[];
  isLoading: boolean;
  onEdit: (event: IEventFrontend) => void;
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
      <div className="space-y-4 p-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-slate-100 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-24 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-200 m-6">
        <p className="text-slate-900 font-bold">No events found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200">
            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
              Event Details
            </th>
            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">
              Timing
            </th>
            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {events.map((event) => (
            <tr
              key={event._id}
              className="group hover:bg-indigo-50/30 transition-all duration-200"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={event.image || ""}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900 text-base leading-tight group-hover:text-teal-600 transition-colors">
                      {event.title}
                    </p>
                    <p className="text-xs font-medium text-slate-400 mt-1">
                      {event.location}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <CalendarMonth
                    style={{ fontSize: 16 }}
                    className="text-teal-400"
                  />
                  <span>{event.date}</span>
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex items-center justify-end gap-3">
                  {/* --- NEW BOOKINGS LINK --- */}
                  <Link
                    href={`/admin/bookings/${event._id}`}
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 px-4 py-2 rounded-xl text-xs font-black transition-all"
                  >
                    BOOKINGS <ArrowForward style={{ fontSize: 14 }} />
                  </Link>

                  <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
                    <button
                      onClick={() => onEdit(event)}
                      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                    >
                      <Edit style={{ fontSize: 18 }} />
                    </button>
                    <button
                      onClick={() => onDelete(event._id)}
                      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                    >
                      <Delete style={{ fontSize: 18 }} />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;
