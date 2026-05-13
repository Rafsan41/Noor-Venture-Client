"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users, FileText, TrendingUp, DollarSign,
  Clock, CheckCircle, XCircle, Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { apiGet, apiPatch }    from "@/lib/api";
import { AdminShell }          from "@/components/layout/AdminShell";
import { StatCard }            from "@/components/shared/StatCard";
import { StatusBadge }         from "@/components/shared/StatusBadge";
import { FundingProgress }     from "@/components/shared/FundingProgress";
import { NoorPanel, PanelHeader } from "@/components/shared/NoorPanel";
import { EmptyState }          from "@/components/shared/EmptyState";
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
    <AdminShell>
      <div className="space-y-6">

        {/* ── Heading ── */}
        <div>
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: "var(--ink)" }}
          >
            Admin Overview
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-brand)" }}>
            Platform management dashboard
          </p>
        </div>

        {/* ── Primary stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={stats?.users.total ?? 0}
            icon={Users}
            color="purple"
            trend={{ value: 12, label: "this month" }}
          />
          <StatCard
            title="Total Proposals"
            value={stats?.proposals.total ?? 0}
            icon={FileText}
            color="blue"
          />
          <StatCard
            title="Total Investments"
            value={stats?.investments.total ?? 0}
            icon={TrendingUp}
            color="emerald"
            live
          />
          <StatCard
            title="Total Capital"
            value={formatCurrency(stats?.investments.totalRaised ?? 0)}
            icon={DollarSign}
            color="coral"
          />
        </div>

        {/* ── Secondary metrics row ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Investors",      value: stats?.users.investors ?? 0,   color: "#059669" },
            { label: "Business Owners", value: stats?.users.owners ?? 0,    color: "#E85395" },
            { label: "Pending Review", value: stats?.proposals.pending ?? 0, color: "#A73CCB" },
          ].map(({ label, value, color }) => (
            <NoorPanel key={label} padding="md">
              <div
                className="font-display text-3xl font-bold leading-none mb-1"
                style={{ color }}
              >
                {value}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--muted-brand)" }}>
                {label}
              </div>
            </NoorPanel>
          ))}
        </div>

        {/* ── Pending proposals queue ── */}
        <NoorPanel padding="none">
          <div
            className="flex items-center gap-2 px-6 py-4"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <Clock className="h-4 w-4" style={{ color: "#A73CCB" }} />
            <h3
              className="font-display font-semibold text-sm"
              style={{ color: "var(--ink)" }}
            >
              Pending Review
            </h3>
            {pending.length > 0 && (
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                style={{ background: "#A73CCB" }}
              >
                {pending.length}
              </span>
            )}
          </div>

          {pending.length === 0 ? (
            <EmptyState
              icon={CheckCircle}
              title="All caught up!"
              description="No proposals are waiting for review."
            />
          ) : (
            <div style={{ borderTop: "none" }}>
              {pending.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 px-6 py-4"
                  style={{
                    borderTop: idx === 0 ? "none" : "1px solid var(--line)",
                  }}
                >
                  {/* Proposal info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-sm font-semibold truncate"
                        style={{ color: "var(--ink)" }}
                      >
                        {p.title}
                      </span>
                      <StatusBadge status={p.riskLevel} />
                    </div>
                    <div className="text-xs mb-2" style={{ color: "var(--muted-brand)" }}>
                      {p.businessType} · by {p.owner?.name} · {timeAgo(p.createdAt)}
                    </div>
                    <div className="max-w-xs">
                      <FundingProgress
                        raised={p.amountRaised}
                        goal={p.fundingGoal}
                        size="sm"
                        showLabels={false}
                      />
                    </div>
                  </div>

                  {/* Goal + profit */}
                  <div className="text-right shrink-0 mr-2">
                    <div
                      className="text-sm font-bold font-display"
                      style={{ color: "var(--ink)" }}
                    >
                      {formatCurrency(p.fundingGoal)}
                    </div>
                    <div className="text-xs" style={{ color: "var(--muted-brand)" }}>
                      {p.profitSharePercent}% profit
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => reviewMutation.mutate({ id: p.id, status: "APPROVED" })}
                      disabled={reviewMutation.isPending}
                      className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-white transition-all disabled:opacity-60"
                      style={{ background: "#059669" }}
                    >
                      {reviewMutation.isPending
                        ? <Loader2 className="h-3 w-3 animate-spin" />
                        : <CheckCircle className="h-3 w-3" />}
                      Approve
                    </button>
                    <button
                      onClick={() => reviewMutation.mutate({ id: p.id, status: "REJECTED" })}
                      disabled={reviewMutation.isPending}
                      className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-white transition-all disabled:opacity-60"
                      style={{ background: "#DC2626" }}
                    >
                      <XCircle className="h-3 w-3" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </NoorPanel>

      </div>
    </AdminShell>
  );
}
