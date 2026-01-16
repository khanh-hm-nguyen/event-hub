"use client";

import Logo from "@/components/ui/Logo";
import { AccountCircleOutlined, ExploreOutlined } from "@mui/icons-material";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-6 py-5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-[2rem] shadow-2xl">
        {/* --- Using the new Logo --- */}
        <Logo />

        {/* --- Navigation --- */}
        <div className="hidden md:flex items-center gap-10">
          <a
            href="/#events"
            className="text-xs font-black text-slate-300 hover:text-[#5dfeca] uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
          >
            <ExploreOutlined style={{ fontSize: 18 }} />
            Browse Events
          </a>
        </div>

        {/* --- Action --- */}
        <Link
          href="/login"
          className="flex items-center justify-center w-11 h-11 text-slate-400 hover:text-[#5dfeca] bg-white/5 border border-white/5 rounded-2xl transition-all"
        >
          <AccountCircleOutlined style={{ fontSize: 26 }} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
