import { Event, BookOnline, ArrowForward } from "@mui/icons-material";
import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* 1. Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Welcome back, Admin 👋
        </h1>
        <p className="text-lg text-slate-600">
          What would you like to manage today?
        </p>
      </div>

      {/* 2. Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Events Card */}
        <Link
          href="/admin/events"
          className="group relative overflow-hidden bg-white/60 backdrop-blur-md border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300"
        >
          {/* Decorative Gradient Blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Event fontSize="large" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Manage Events
            </h3>
            <p className="text-slate-600 mb-8">
              Create new events, edit details, adjust capacity, or remove old
              listings.
            </p>

            <div className="mt-auto flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all">
              Go to Events <ArrowForward fontSize="small" />
            </div>
          </div>
        </Link>

        {/* Bookings Card */}
        <Link
          href="/admin/bookings"
          className="group relative overflow-hidden bg-white/60 backdrop-blur-md border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-teal-300 hover:-translate-y-1 transition-all duration-300"
        >
          {/* Decorative Gradient Blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-colors" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <BookOnline fontSize="large" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Manage Bookings
            </h3>
            <p className="text-slate-600 mb-8">
              View customer reservations, approve requests, and track ticket
              sales.
            </p>

            <div className="mt-auto flex items-center gap-2 text-teal-600 font-semibold group-hover:gap-3 transition-all">
              Go to Bookings <ArrowForward fontSize="small" />
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Quick Stats (Optional / Simple visual filler) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="p-6 rounded-2xl bg-white/40 border border-slate-200 backdrop-blur-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">$12,450</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/40 border border-slate-200 backdrop-blur-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Active Events
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1">8 Active</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/40 border border-slate-200 backdrop-blur-sm">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Pending Bookings
          </p>
          <p className="text-2xl font-bold text-amber-600 mt-1">12 Pending</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
