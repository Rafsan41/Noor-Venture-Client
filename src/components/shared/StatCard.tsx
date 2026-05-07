import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title:    string;
  value:    string | number;
  subtitle?: string;
  icon:     LucideIcon;
  trend?:   { value: number; label: string };
  color?:   "coral" | "emerald" | "blue" | "purple" | "blush";
  live?:    boolean;
}

const colorMap = {
  coral:   { bg: "bg-coral-50 dark:bg-coral-950/30",   icon: "text-coral-600",   border: "border-coral-100 dark:border-coral-900/40" },
  blush:   { bg: "bg-blush-50 dark:bg-blush-950/30",   icon: "text-blush-500",   border: "border-blush-100 dark:border-blush-900/40" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/30", icon: "text-emerald-600", border: "border-emerald-100 dark:border-emerald-900/40" },
  blue:    { bg: "bg-blue-50 dark:bg-blue-950/30",     icon: "text-blue-600",    border: "border-blue-100 dark:border-blue-900/40" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-950/30", icon: "text-purple-600",  border: "border-purple-100 dark:border-purple-900/40" },
};

export function StatCard({
  title, value, subtitle, icon: Icon, trend, color = "coral", live,
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <div className="noor-card p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("rounded-xl p-2.5 border", c.bg, c.border)}>
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
