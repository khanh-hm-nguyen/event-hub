"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dashboard,
  Event,
  BookOnline,
  Settings,
  Logout,
  Notifications,
  Search,
  Menu as MenuIcon,
} from "@mui/icons-material";

interface AdminLayoutShellProps {
  children: ReactNode;
}

const AdminLayoutShell = ({ children }: AdminLayoutShellProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>

      {/* Sidebar (Mobile) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-64 bg-white h-full shadow-2xl flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:pl-64 h-full">
        <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

// Sub-component: Sidebar Content
function SidebarContent() {
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

        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-2">
          System
        </p>
        <SidebarLink
          href="/admin/settings"
          icon={<Settings />}
          label="Settings"
          isActive={pathname === "/admin/settings"}
        />
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
          <Logout fontSize="small" />
          Sign Out
        </button>
      </div>
    </>
  );
}

// Sub-component: Header
function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg w-64 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search className="text-slate-400" fontSize="small" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
          <Notifications fontSize="small" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">Admin</p>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Moderator
            </p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-md ring-2 ring-white"></div>
        </div>
      </div>
    </header>
  );
}

// Sub-component: Sidebar Link
function SidebarLink({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-indigo-50 text-indigo-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
    >
      <span className={`${isActive ? "text-indigo-600" : "text-slate-400"}`}>
        {icon}
      </span>
      {label}
    </Link>
  );
}

export default AdminLayoutShell