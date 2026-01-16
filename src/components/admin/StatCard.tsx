import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Remove } from "@mui/icons-material";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  icon: ReactNode;
  iconColorClass: string;
}

const StatCard = (
  {
    title,
    value,
    trend,
    trendDirection = "neutral",
    icon,
    iconColorClass,
  }: StatCardProps // Changed { to ( here for implicit return
) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>

      {trend && (
        <div className="flex items-center gap-1 mt-2 text-xs font-medium">
          {trendDirection === "up" && (
            <TrendingUp className="text-emerald-500" fontSize="inherit" />
          )}
          {trendDirection === "down" && (
            <TrendingDown className="text-red-500" fontSize="inherit" />
          )}
          {trendDirection === "neutral" && (
            <Remove className="text-slate-400" fontSize="inherit" />
          )}
          <span
            className={`${
              trendDirection === "up"
                ? "text-emerald-600"
                : trendDirection === "down"
                ? "text-red-600"
                : "text-slate-500"
            }`}
          >
            {trend}
          </span>
        </div>
      )}
    </div>
    <div className={`p-3 rounded-xl ${iconColorClass}`}>{icon}</div>
  </div>
);

export default StatCard;
