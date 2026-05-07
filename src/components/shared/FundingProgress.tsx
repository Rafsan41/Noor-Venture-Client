import { fundingProgress, formatCurrency, formatPercent } from "@/utils/format";
import { cn } from "@/lib/utils";

interface FundingProgressProps {
  raised: number;
  goal:   number;
  size?:  "sm" | "md" | "lg";
  showLabels?: boolean;
}

export function FundingProgress({
  raised, goal, size = "md", showLabels = true,
}: FundingProgressProps) {
  const pct = fundingProgress(raised, goal);
  const barH = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";

  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>{formatCurrency(raised)} raised</span>
          <span className="font-medium text-foreground">{formatPercent(pct, 0)}</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-muted overflow-hidden", barH)}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            pct >= 100 ? "bg-emerald-500" : pct >= 75 ? "bg-amber-500" : "bg-amber-400"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabels && (
        <div className="text-xs text-muted-foreground mt-1">
          Goal: {formatCurrency(goal)}
        </div>
      )}
    </div>
  );
}
