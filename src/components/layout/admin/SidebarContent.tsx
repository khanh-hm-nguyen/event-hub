import SidebarLink from "./SidebarLink";
import { Dashboard, Event, BookOnline, Logout } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const SidebarContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      useUserStore.getState().clearUser();
      router.push("/login");
    }
  };

  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link href="/" className="flex items-center group">
          <span className="text-2xl font-black text-[#051713] tracking-tighter uppercase transition-colors ">
            Event
            <span className="text-[#3dc59a] drop-shadow-[0_0_8px_rgba(93,254,202,0.5)]">
              Hub
            </span>
          </span>
        </Link>
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

      <div className="p-6 border-t border-white/5">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-4 py-3 text-[11px] font-black text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all uppercase tracking-[0.2em]"
        >
          <Logout style={{ fontSize: 18 }} />
          Sign Out
        </button>
      </div>
    </>
  );
};

export default SidebarContent;
