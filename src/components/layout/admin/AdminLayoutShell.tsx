"use client";

import { useState, ReactNode } from "react";
import AdminHeader from "./AdminHeader";
import SidebarContent from "./SidebarContent";

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
};

export default AdminLayoutShell;
