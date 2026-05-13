"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TrendingUp, TrendingDown, BarChart2, Coins, Activity } from "lucide-react";

import { apiGet }            from "@/lib/api";
import { DashboardShell }    from "@/components/layout/DashboardShell";
import { StatCard }          from "@/components/shared/StatCard";
import { StatusBadge }       from "@/components/shared/StatusBadge";
import { EmptyState }        from "@/components/shared/EmptyState";
import { formatCurrency, formatDate, formatPercent } from "@/utils/format";
import type { ApiResponse, Investment } from "@/types";

export default function InvestmentsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["investments", "my"],
    queryFn:  () =>
      apiGet<ApiResponse<{
        investments: Investment[];
        summary: { totalInvested: number; totalEarned: number; active: number; total: number };
      }>>("/investments/portfolio"),
  });

  const investments   = data?.data?.investments ?? [];
  const totalInvested = data?.data?.summary?.totalInvested ?? 0;
  const totalProfit   = data?.data?.summary?.totalEarned   ?? 0;
  const active        = data?.data?.summary?.active        ?? 0;
  const returnRate    = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  return (
    <DashboardShell>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
            My Investments
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
            Track your Musharakah portfolio and profit-sharing returns
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Invested"
            value={formatCurrency(totalInvested)}
            subtitle={`${investments.length} investments`}
            icon={Coins}
            color="coral"
          />
          <StatCard
            title="Profit Earned"
            value={formatCurrency(totalProfit)}
            subtitle={`${formatPercent(returnRate)} total return`}
            icon={TrendingUp}
            color="pink"
            trend={returnRate > 0 ? { value: returnRate, dir: "up" } : undefined}
          />
          <StatCard
            title="Active Investments"
            value={String(active)}
            subtitle={`of ${investments.length} total`}
            icon={Activity}
            color="purple"
            live={active > 0}
          />
        </div>

        {/* Portfolio table */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{
            background: "var(--surface)",
            border: "1.5px solid var(--line)",
          }}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <div>
              <h3 className="font-semibold" style={{ color: "var(--ink)" }}>Portfolio</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                All your Musharakah positions
              </p>
            </div>
            <Link
              href="/proposals"
              className="rounded-full px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--grad)" }}
            >
              + Browse deals
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-3 p-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl" style={{ background: "var(--paper-2)" }} />
              ))}
            </div>
          ) : investments.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={BarChart2}
                title="No investments yet"
                description="Browse ethical proposals and make your first Musharakah investment."
                action={{ label: "Browse proposals →", href: "/proposals" }}
              />
            </div>
          ) : (
            <div>
              {investments.map((inv, i) => {
                const isProfit = inv.profitEarned > 0;
                return (
                  <Link
                    key={inv.id}
                    href={`/proposals/${inv.proposalId}`}
                    className="flex items-center gap-4 px-6 py-4 transition-colors"
                    style={{
                      borderBottom: i < investments.length - 1 ? "1px solid var(--line)" : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper-2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Sector dot */}
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: isProfit ? "#10b981" : "var(--coral)" }}
                    />

                    {/* Proposal name */}
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold" style={{ color: "var(--ink)" }}>
                        {inv.proposal?.title ?? "Proposal"}
                      </div>
                      <div className="mt-0.5 text-xs" style={{ color: "var(--ink-soft)" }}>
                        {inv.proposal?.businessType} · {formatDate(inv.createdAt)}
                      </div>
                    </div>

                    {/* Amount invested */}
                    <div className="shrink-0 text-right">
                      <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                        {formatCurrency(inv.amount)}
                      </div>
                      <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
                        {formatPercent(inv.sharePercent)} share
                      </div>
                    </div>

                    {/* Profit */}
                    <div className="shrink-0 text-right">
                      <div
                        className="flex items-center justify-end gap-1 text-sm font-semibold"
                        style={{ color: isProfit ? "#10b981" : "var(--ink-soft)" }}
                      >
                        {isProfit
                          ? <TrendingUp className="h-3.5 w-3.5" />
                          : <TrendingDown className="h-3.5 w-3.5" />}
                        {formatCurrency(inv.profitEarned)}
                      </div>
                      <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
                        profit earned
                      </div>
                    </div>

                    <StatusBadge status={inv.status} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
