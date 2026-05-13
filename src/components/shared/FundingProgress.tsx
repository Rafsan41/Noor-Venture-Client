import { fundingProgress, formatCurrency, formatPercent } from "@/utils/format";
import { cn } from "@/lib/utils";

interface FundingProgressProps {
  raised:      number | string;
  goal:        number | string;
  size?:       "sm" | "md" | "lg";
  showLabels?: boolean;
  showGoal?:   boolean;
}

export function FundingProgress({
  raised, goal, size = "md", showLabels = true, showGoal = true,
}: FundingProgressProps) {
  const pct = fundingProgress(raised, goal);
  const barH = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";

  const trackColor =
    pct >= 100
      ? "#059669"
      : pct >= 75
      ? "#E85395"
      : undefined;

  return (
    <div className="w-full">
      {showLabels && (
        <div
          className="flex justify-between mb-1.5"
          style={{ fontSize: 11, color: "var(--muted-brand)" }}
        >
          <span className="font-medium" style={{ color: "var(--ink)" }}>
            {formatCurrency(raised)}
          </span>
          <span className="font-bold" style={{ color: trackColor ?? "#E85395" }}>
            {formatPercent(pct, 0)}
          </span>
        </div>
      )}

      {/* Track */}
      <div
        className={cn("w-full rounded-full overflow-hidden", barH)}
        style={{ background: "var(--line)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(pct, 100)}%`,
            background: trackColor ?? "linear-gradient(90deg, #FF9071 0%, #E85395 100%)",
          }}
        />
      </div>

      {showGoal && showLabels && (
        <div className="mt-1 text-right" style={{ fontSize: 10.5, color: "var(--muted-brand)" }}>
          Goal: {formatCurrency(goal)}
        </div>
      )}
    </div>
  );
}
