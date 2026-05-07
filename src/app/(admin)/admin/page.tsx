"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, FileText, TrendingUp, DollarSign, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { apiGet, apiPatch } from "@/lib/api";
import { StatCard }         from "@/components/shared/StatCard";
import { StatusBadge }      from "@/components/shared/StatusBadge";
import { FundingProgress }  from "@/components/shared/FundingProgress";
import { formatCurrency, timeAgo } from "@/utils/format";
import type { ApiResponse, AdminStats, Proposal } from "@/types";

export default function AdminDashboardPage() {
  const qc = useQueryClient();

  const { data: statsRes } = useQuery({
    queryKey: ["admin", "stats"],
    queryFn:  () => apiGet<ApiResponse<AdminStats>>("/admin/stats"),
  });

  const { data: pendingRes } = useQuery({
    queryKey: ["admin", "proposals", "pending"],
    queryFn:  () => apiGet<ApiResponse<Proposal[]>>("/admin/proposals/pending"),
  });

  const reviewMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "APPROVED" | "REJECTED" }) =>
      apiPatch(`/proposals/${id}/status`, { status }),
    onSuccess: (_, vars) => {
      toast.success(`Proposal ${vars.status.toLowerCase()}!`);
      qc.invalidateQueries({ queryKey: ["admin"] });
      qc.invalidateQueries({ queryKey: ["proposals"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const stats   = statsRes?.data;
  const pending = pendingRes?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Overview</h1>
        <p className="text-sm text-muted-foreground">Platform management dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users"        value={stats?.users ?? 0}       icon={Users}      color="amber" />
        <StatCard title="Total Proposals"    value={stats?.proposals ?? 0}   icon={FileText}   color="blue" />
        <StatCard title="Total Investments"  value={stats?.investments ?? 0} icon={TrendingUp} color="emerald" />
        <StatCard
          title="Total Capital"
          value={formatCurrency(stats?.totalCapital ?? 0)}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Pending Proposals */}
      <div className="noor-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-600" />
            Pending Review ({pending.length})
          </h3>
        </div>
        <div className="divide-y">
          {pending.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium truncate">{p.title}</span>
                  <StatusBadge status={p.riskLevel} />
                </div>
                <div className="text-xs text-muted-foreground">
                  {p.businessType} · by {p.owner?.name} · {timeAgo(p.createdAt)}
                </div>
                <div className="mt-2 max-w-xs">
                  <FundingProgress raised={p.amountRaised} goal={p.fundingGoal} size="sm" showLabels={false} />
                </div>
              </div>
              <div className="text-right shrink-0 mr-4">
                <div className="text-sm font-semibold">{formatCurrency(p.fundingGoal)}</div>
                <div className="text-xs text-muted-foreground">{p.profitSharePercent}% profit</div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => reviewMutation.mutate({ id: p.id, status: "APPROVED" })}
                  disabled={reviewMutation.isPending}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 disabled:opacity-60 transition-colors"
                >
                  {reviewMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3" />}
                  Approve
                </button>
                <button
                  onClick={() => reviewMutation.mutate({ id: p.id, status: "REJECTED" })}
                  disabled={reviewMutation.isPending}
                  className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-60 transition-colors"
                >
                  <XCircle className="h-3 w-3" />
                  Reject
                </button>
              </div>
            </div>
          ))}
          {pending.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground">
              <CheckCircle className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No pending proposals. All caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
