"use client"

import { Menu, Person } from "@mui/icons-material";
import { useUserStore } from "@/store/useUserStore";

const AdminHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const user = useUserStore((state) => state.user);

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
      <div className="flex items-center">
        <button
          className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"
          onClick={onMenuClick}
        >
          <Menu />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Administrator</p>
            <p className="text-sm font-bold text-slate-900">
              {user?.name}
            </p>
          </div>
      
          <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#5dfeca] border border-slate-800 shadow-sm">
            <Person style={{ fontSize: 20 }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;