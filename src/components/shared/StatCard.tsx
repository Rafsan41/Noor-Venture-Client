import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title:    string;
  value:    string | number;
  subtitle?: string;
  icon:     LucideIcon;
  trend?:   { value: number; label: string };
  color?:   "amber" | "emerald" | "blue" | "purple";
  live?:    boolean;
}

const colorMap = {
  amber:   { bg: "bg-amber-50",   icon: "text-amber-600",   border: "border-amber-100" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
  blue:    { bg: "bg-blue-50",    icon: "text-blue-600",    border: "border-blue-100" },
  purple:  { bg: "bg-purple-50",  icon: "text-purple-600",  border: "border-purple-100" },
};

export function StatCard({
  title, value, subtitle, icon: Icon, trend, color = "amber", live,
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <div className="noor-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("rounded-xl p-2.5", c.bg, `border ${c.border}`)}>
          <Icon className={cn("h-5 w-5", c.icon)} />
        </div>
        {live && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-0.5">{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
      {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
      {trend && (
        <div className={cn(
          "mt-2 text-xs font-medium",
          trend.value >= 0 ? "text-emerald-600" : "text-red-500"
        )}>
          {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
        </div>
      )}
    </div>
  );
}
