import { cn } from "@/lib/utils";
import type { ProposalStatus, RiskLevel, InvestmentStatus } from "@/types";

type Status = ProposalStatus | RiskLevel | InvestmentStatus | string;

const variants: Record<string, string> = {
  // Proposal statuses
  DRAFT:      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  PENDING:    "bg-cream-200 text-coral-700 dark:bg-coral-950/40 dark:text-coral-300",
  APPROVED:   "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  REJECTED:   "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  ACTIVE:     "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  FUNDED:     "bg-blush-100 text-blush-700 dark:bg-blush-950/40 dark:text-blush-300",
  COMPLETED:  "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
  CANCELLED:  "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  // Risk levels
  LOW:        "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
  MEDIUM:     "bg-coral-100 text-coral-700 dark:bg-coral-950/40 dark:text-coral-300",
  HIGH:       "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  // Investment
  SUSPENDED:  "bg-blush-100 text-blush-700 dark:bg-blush-950/40 dark:text-blush-300",
  WITHDRAWN:  "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const variant = variants[status] ?? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  return (
    <span className={cn("stat-badge font-medium capitalize", variant, className)}>
      {status.toLowerCase().replace("_", " ")}
    </span>
  );
}
