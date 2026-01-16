import Logo from "@/components/ui/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-10">
        
        {/* Simplified Logo */}
        <Logo />

        {/* Essential Navigation Only */}
        <div className="flex items-center gap-8">
          <Link 
            href="/events" 
            className="text-[11px] font-black text-slate-500 hover:text-[#5dfeca] uppercase tracking-[0.2em] transition-colors"
          >
            Browse Events
          </Link>
          <Link 
            href="/community" 
            className="text-[11px] font-black text-slate-500 hover:text-[#5dfeca] uppercase tracking-[0.2em] transition-colors"
          >
            Community
          </Link>
        </div>

        {/* Copyright Attribution */}
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          © 2026 EventHub
        </p>
      </div>
    </footer>
  );
};

export default Footer;