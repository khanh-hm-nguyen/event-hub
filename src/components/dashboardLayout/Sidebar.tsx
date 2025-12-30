"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


const navLinks = [
  { name: "Overview", href: "/admin", icon: "Dashboard" },
  { name: "Events", href: "/admin/events", icon: "📅" },
  { name: "Users", href: "/admin/users", icon: "👥" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-screen fixed left-0 top-0 flex flex-col z-40">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Link href="/" className="font-mono text-xl font-bold text-white">
          DevHub<span className="text-[#5dfeca]">.io</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map((link) => {
          // Check if link is active
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }
              `}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom User Area */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
            JD
          </div>
          <div className="text-sm">
            <p className="text-white">John Doe</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
