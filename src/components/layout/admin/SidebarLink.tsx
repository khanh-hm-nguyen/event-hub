import { ReactNode } from "react";
import Link from "next/link";

const SidebarLink = ({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200
        ${
          isActive
            ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
    >
      <span className={`flex transition-colors ${isActive ? "text-[#5dfeca]" : "text-slate-400"}`}>
        {icon}
      </span>
      {label}
    </Link>
  );
};

export default SidebarLink;