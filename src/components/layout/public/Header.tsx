"use client";

import Logo from "@/components/ui/Logo";
import { 
  AccountCircleOutlined, 
  ExploreOutlined, 
  DashboardOutlined, 
  LogoutOutlined 
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const Header = () => {
  const router = useRouter();
  const { user, isHydrated, clearUser } = useUserStore();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        clearUser();
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isLoggedIn = isHydrated && user;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-[2rem] shadow-2xl">
        
        <Logo />

        {/* --- Navigation --- */}
        <div className="hidden md:flex items-center gap-10">
          <a href="/#events" className="text-xs font-black text-slate-300 hover:text-[#5dfeca] uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
            <ExploreOutlined style={{ fontSize: 18 }} />
            Browse Events
          </a>
        </div>

        {/* --- Action Section --- */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {/* User Info Display */}
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[9px] font-black text-[#5dfeca] uppercase tracking-[0.2em]">Member</span>
                <span className="text-sm font-bold text-white tracking-tight">{user.name}</span>
              </div>

              {/* Dashboard/Account Link */}
              <Link
                href={user.role === "admin" ? "/admin" : "/profile"}
                className="flex items-center justify-center w-11 h-11 text-slate-300 hover:text-[#5dfeca] bg-white/5 border border-white/10 rounded-2xl transition-all"
                title={user.role === "admin" ? "Admin Dashboard" : "My Profile"}
              >
                {user.role === "admin" ? <DashboardOutlined /> : <AccountCircleOutlined />}
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-11 h-11 text-slate-400 hover:text-rose-800 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-rose-600/10 cursor-pointer"
                title="Sign Out"
              >
                <LogoutOutlined style={{ fontSize: 20 }} />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center w-11 h-11 text-slate-400 hover:text-[#5dfeca] bg-white/5 border border-white/10 rounded-2xl transition-all"
            >
              <AccountCircleOutlined style={{ fontSize: 26 }} />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;