"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Person,
  CalendarMonth,
  CheckCircle,
  Email,
  DeleteOutline,
  Refresh,
} from "@mui/icons-material";
import { IBooking } from "@/models";

const BookingTable = ({ bookings }: { bookings: IBooking[] }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete");
      }

      // Refresh the server component data
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsDeleting(null);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
          <Email fontSize="large" className="text-slate-300" />
        </div>
        <h3 className="text-slate-900 font-black text-2xl tracking-tight">
          Empty Guestlist
        </h3>
        <p className="text-slate-500 max-w-xs mt-2 text-sm font-medium leading-relaxed">
          No registered attendees have been found for this event yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden ring-1 ring-slate-900/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Attendee Profile
              </th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Registration Timeline
              </th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">
                Status & Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((booking: IBooking) => {
              const bookingId = booking._id.toString();
              const loading = isDeleting === bookingId;

              return (
                <tr
                  key={bookingId}
                  className={`group hover:bg-indigo-50/30 transition-all ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
                          <Person />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-base">
                          {booking.email}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                          Verified Attendee
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-slate-700 font-bold flex items-center gap-2">
                        <CalendarMonth
                          style={{ fontSize: 16 }}
                          className="text-slate-400"
                        />
                        {new Date(booking.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 ml-6 uppercase tracking-tighter">
                        AT{" "}
                        {new Date(booking.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm">
                        <CheckCircle style={{ fontSize: 14 }} />
                        Confirmed
                      </span>
                      <button
                        onClick={() => handleDelete(bookingId)}
                        disabled={loading}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30"
                        title="Delete Booking"
                      >
                        {loading ? (
                          <Refresh color="inherit" />
                        ) : (
                          <DeleteOutline />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;
