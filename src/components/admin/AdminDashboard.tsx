import { Event, BookOnline, People } from "@mui/icons-material";
import StatCard from "@/components/admin/StatCard";
import ActionCard from "@/components/admin/ActionCard";

const AdminDashboard = () => {
 return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Overview
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back. Here is the activity on your event hub.
          </p>
        </div>
        <div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            + New Event
          </button>
        </div>
      </div>

      {/* Stats Grid - No Revenue, Focused on Community */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Attendees"
          value="1,234"
          trend="+45 this week"
          trendDirection="up"
          icon={<People className="text-violet-600" />}
          iconColorClass="bg-violet-50"
        />
        <StatCard
          title="Active Events"
          value="12"
          trend="3 ending soon"
          trendDirection="neutral"
          icon={<Event className="text-blue-600" />}
          iconColorClass="bg-blue-50"
        />
        <StatCard
          title="Pending Approvals"
          value="5"
          trend="Requires attention"
          trendDirection="down" // Red to indicate urgency
          icon={<BookOnline className="text-amber-600" />}
          iconColorClass="bg-amber-50"
        />
      </div>

      {/* Main Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <ActionCard
          href="/admin/events"
          title="Manage Events"
          description="Create, edit, and organize your free tech events. Manage capacities, locations, and speakers."
          linkText="View All Events"
          icon={<Event fontSize="large" />}
          iconColorClass="bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
          hoverBorderClass="hover:border-indigo-200"
        />

        <ActionCard
          href="/admin/bookings"
          title="Manage Bookings"
          description="Track attendee registrations, approve pending requests, and manage waitlists."
          linkText="View All Bookings"
          icon={<BookOnline fontSize="large" />}
          iconColorClass="bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white"
          hoverBorderClass="hover:border-teal-200"
        />
      </div>
    </div>
  );
}
export default AdminDashboard;
