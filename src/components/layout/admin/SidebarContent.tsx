import SidebarLink from "./SidebarLink";
import { Dashboard, Event, BookOnline, Logout } from "@mui/icons-material";
import { usePathname } from "next/navigation";

const SidebarContent = () => {
   const pathname = usePathname();

  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-indigo-600">
          <Dashboard />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            DevEvent
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Overview
        </p>
        <SidebarLink
          href="/admin"
          icon={<Dashboard />}
          label="Dashboard"
          isActive={pathname === "/admin"}
        />
        <SidebarLink
          href="/admin/events"
          icon={<Event />}
          label="Events"
          isActive={pathname === "/admin/events"}
        />
        <SidebarLink
          href="/admin/bookings"
          icon={<BookOnline />}
          label="Bookings"
          isActive={pathname === "/admin/bookings"}
        />
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          <Logout fontSize="small" />
          Sign Out
        </button>
      </div>
    </>
  )
}

export default SidebarContent