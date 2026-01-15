import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";
import { ReactNode } from "react";

interface ActionCardProps {
  href: string;
  title: string;
  description: string;
  linkText: string;
  icon: ReactNode;
  iconColorClass: string; 
  hoverBorderClass: string; 
}

const ActionCard = ({
  href,
  title,
  description,
  linkText,
  icon,
  iconColorClass,
  hoverBorderClass,
}: ActionCardProps) => {
  return (
    <Link
      href={href}
      className={`group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 ${hoverBorderClass}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl transition-colors duration-300 ${iconColorClass}`}
        >
          {icon}
        </div>
        <div className="p-2 bg-slate-50 rounded-full text-slate-400 group-hover:translate-x-1 transition-transform">
          <ArrowForward fontSize="small" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <span className="text-sm font-semibold opacity-90 group-hover:underline decoration-2 underline-offset-4">
        {linkText}
      </span>
    </Link>
  );
}

export default ActionCard