import { 
  Dashboard, 
  Event, 
  BookOnline, 
  Settings, 
  Logout, 
  Notifications, 
  Person 
} from '@mui/icons-material';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen text-slate-800 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 hidden md:flex flex-col bg-white/90 backdrop-blur-md border-r border-slate-200 shadow-sm z-10">
        
        {/* Logo Area */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-100">
          <div className="p-1.5 bg-indigo-600 rounded text-white">
            <Dashboard fontSize="small" />
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">
            Event<span className="text-indigo-600">Hub</span> Admin
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          <SidebarLink href="/admin" icon={<Dashboard />} label="Overview" active />
          <SidebarLink href="/admin/events" icon={<Event />} label="Events" />
          <SidebarLink href="/admin/bookings" icon={<BookOnline />} label="Bookings" />
          <SidebarLink href="/admin/settings" icon={<Settings />} label="Settings" />
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Logout fontSize="small" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col relative">
        
        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-20">
          <h2 className="font-semibold text-slate-700">Dashboard Console</h2>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Notifications fontSize="small" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                <Person />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="py-6 px-8 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} EventHub Admin Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

// Helper Component for Sidebar Links
function SidebarLink({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
    >
      <span className={`${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
        {icon}
      </span>
      {label}
    </Link>
  )
}