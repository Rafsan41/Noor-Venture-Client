import { cn } from "@/lib/utils";
import type { ProposalStatus, RiskLevel, InvestmentStatus } from "@/types";

type Status = ProposalStatus | RiskLevel | InvestmentStatus | string;

const variants: Record<string, string> = {
  // Proposal
  DRAFT:      "bg-gray-100 text-gray-600",
  PENDING:    "bg-yellow-100 text-yellow-700",
  APPROVED:   "bg-blue-100 text-blue-700",
  REJECTED:   "bg-red-100 text-red-600",
  ACTIVE:     "bg-emerald-100 text-emerald-700",
  FUNDED:     "bg-green-100 text-green-700",
  COMPLETED:  "bg-purple-100 text-purple-700",
  CANCELLED:  "bg-gray-100 text-gray-500",
  // Risk
  LOW:        "bg-emerald-100 text-emerald-700",
  MEDIUM:     "bg-amber-100 text-amber-700",
  HIGH:       "bg-red-100 text-red-600",
  // Investment
  WITHDRAWN:  "bg-gray-100 text-gray-500",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const variant = variants[status] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={cn("stat-badge font-medium capitalize", variant, className)}>
      {status.toLowerCase().replace("_", " ")}
    </span>
  );
}
