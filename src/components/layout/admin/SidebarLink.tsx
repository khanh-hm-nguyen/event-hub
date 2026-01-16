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
};

export default SidebarLink;
