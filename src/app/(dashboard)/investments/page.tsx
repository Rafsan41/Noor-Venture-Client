"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";

import { apiGet }       from "@/lib/api";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { StatusBadge }  from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, formatPercent } from "@/utils/format";
import type { ApiResponse, Investment } from "@/types";

export default function InvestmentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["investments", "my"],
    queryFn:  () => apiGet<ApiResponse<{ investments: Investment[]; summary: { totalInvested: number; totalEarned: number; active: number; total: number } }>>("/investments/portfolio"),
  });

  const investments   = data?.data?.investments ?? [];
  const totalInvested = data?.data?.summary?.totalInvested ?? 0;
  const totalProfit   = data?.data?.summary?.totalEarned   ?? 0;
  const active        = data?.data?.summary?.active        ?? 0;

  return (
    <DashboardShell>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Investments</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track your Musharakah portfolio</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="noor-card p-5">
          <div className="text-xs text-muted-foreground mb-1">Total Invested</div>
          <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{investments.length} investments</div>
        </div>
        <div className="noor-card p-5">
          <div className="text-xs text-muted-foreground mb-1">Profit Earned</div>
          <div className="text-2xl font-bold text-emerald-600">{formatCurrency(totalProfit)}</div>
          <div className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {totalInvested > 0 ? formatPercent((totalProfit / totalInvested) * 100) : "0%"} return
          </div>
        </div>
        <div className="noor-card p-5">
          <div className="text-xs text-muted-foreground mb-1">Active Investments</div>
          <div className="text-2xl font-bold text-coral-600">{active}</div>
          <div className="text-xs text-muted-foreground mt-0.5">of {investments.length} total</div>
        </div>
      </div>

      {/* Table */}
      <div className="noor-card overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold">Portfolio</h3>
        </div>
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {investments.map((inv) => (
              <Link
                key={inv.id}
                href={`/proposals/${inv.proposalId}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {inv.proposal?.title ?? "Proposal"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {inv.proposal?.businessType} · {formatDate(inv.createdAt)}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold">{formatCurrency(inv.amount)}</div>
                  <div className="text-xs text-muted-foreground">{formatPercent(inv.sharePercent)} share</div>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-sm font-semibold flex items-center gap-1 justify-end ${
                    inv.profitEarned > 0 ? "text-emerald-600" : "text-muted-foreground"
                  }`}>
                    {inv.profitEarned > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {formatCurrency(inv.profitEarned)}
                  </div>
                  <div className="text-xs text-muted-foreground">profit earned</div>
                </div>
                <StatusBadge status={inv.status} />
              </Link>
            ))}
            {investments.length === 0 && (
              <div className="px-6 py-16 text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">No investments yet</p>
                <Link href="/proposals" className="text-sm text-coral-600 hover:underline mt-1 block">
                  Browse halal proposals →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </DashboardShell>
  );
}
