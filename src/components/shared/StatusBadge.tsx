import { cn } from "@/lib/utils";
import type { ProposalStatus, RiskLevel, InvestmentStatus } from "@/types";

type Status = ProposalStatus | RiskLevel | InvestmentStatus | string;

const variants: Record<string, { bg: string; color: string; border: string }> = {
  // Proposal statuses
  DRAFT:      { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
  PENDING:    { bg: "#FFF0EC", color: "#FF5C35", border: "#FFD1C2" },
  APPROVED:   { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  REJECTED:   { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  ACTIVE:     { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  FUNDED:     { bg: "#FDE8F1", color: "#E85395", border: "#F9A8D4" },
  COMPLETED:  { bg: "#F5EAFB", color: "#A73CCB", border: "#E9D5FF" },
  CANCELLED:  { bg: "#F3F4F6", color: "#9CA3AF", border: "#E5E7EB" },
  // Risk levels
  LOW:        { bg: "#ECFDF5", color: "#059669", border: "#A7F3D0" },
  MEDIUM:     { bg: "#FFFBEB", color: "#D97706", border: "#FDE68A" },
  HIGH:       { bg: "#FEF2F2", color: "#DC2626", border: "#FECACA" },
  // Investment
  SUSPENDED:  { bg: "#FDE8F1", color: "#E85395", border: "#F9A8D4" },
  WITHDRAWN:  { bg: "#F3F4F6", color: "#9CA3AF", border: "#E5E7EB" },
};

const fallback = { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" };

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const v = variants[status] ?? fallback;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize border",
        className
      )}
      style={{ background: v.bg, color: v.color, borderColor: v.border }}
    >
      {status.toLowerCase().replace(/_/g, " ")}
    </span>
  );
}
