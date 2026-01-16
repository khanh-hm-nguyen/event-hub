"use client";

import { Event, BookOnline, Add, ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import ActionCard from "@/components/admin/ActionCard";

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12">
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Select a management module to begin organizing your events.
          </p>
        </div>

        <Link
          href="/admin/events"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl text-sm font-black shadow-xl shadow-indigo-100 transition-all active:scale-95 group"
        >
          <Add
            style={{ fontSize: 20 }}
            className="group-hover:rotate-90 transition-transform"
          />
          CREATE NEW EVENT
        </Link>
      </div>

      {/* --- Core Management Section --- */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Manage Events Card */}
        <ActionCard
          href="/admin/events"
          title="Manage Events"
          description="Access the full event catalog. Create new sessions, edit current details, or remove past events from the public schedule."
          linkText="Go to Events"
          icon={<Event style={{ fontSize: 40 }} />}
          iconColorClass="bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
          hoverBorderClass="hover:border-indigo-200"
        />

        {/* Manage Bookings Card */}
        <ActionCard
          href="/admin/bookings"
          title="Manage Bookings"
          description="Review registrations and attendee data. Manage waitlists and export participant lists for your upcoming tech meetups."
          linkText="Go to Bookings"
          icon={<BookOnline style={{ fontSize: 40 }} />}
          iconColorClass="bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white"
          hoverBorderClass="hover:border-teal-200"
        />
      </div>

      {/* --- System Status & Info --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Platform Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-700">
              All Systems Operational
            </span>
          </div>
        </div>

        <Link
          href="/admin/events"
          className="md:col-span-2 p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100 flex items-center justify-between group cursor-pointer transition-all hover:bg-indigo-50"
        >
          <div>
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">
              Quick Tip
            </p>
            <p className="text-sm font-bold text-indigo-900">
              Need to export attendee data? Use the 'Bookings' view inside each
              event.
            </p>
          </div>
          <ArrowForward className="text-indigo-300 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
