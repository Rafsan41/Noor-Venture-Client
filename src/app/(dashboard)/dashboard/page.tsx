"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Wallet, FileText, Users, BarChart3, Brain, Zap } from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

import { apiGet }        from "@/lib/api";
import { useAuthStore }  from "@/store/auth.store";
import { useStatsStore } from "@/store/stats.store";
import { StatCard }      from "@/components/shared/StatCard";
import { FundingProgress } from "@/components/shared/FundingProgress";
import { StatusBadge }   from "@/components/shared/StatusBadge";
import { formatCurrency, formatDate, shortNumber } from "@/utils/format";
import type { ApiResponse, Proposal, Investment, Wallet as WalletType, LiveStats } from "@/types";

export default function DashboardPage() {
  const user    = useAuthStore((s) => s.user);
  const { stats, connected } = useStatsStore();

  // Fetch live stats from API (fallback if socket not yet populated)
  const { data: liveStatsRes } = useQuery({
    queryKey: ["stats", "live"],
    queryFn:  () => apiGet<ApiResponse<LiveStats>>("/stats/live"),
    refetchInterval: 30000,
  });
  const liveStats = stats ?? liveStatsRes?.data;

  const { data: proposalsRes } = useQuery({
    queryKey: ["proposals", "my"],
    queryFn:  () => apiGet<{ data: Proposal[] }>("/proposals?limit=5"),
  });

  const { data: investmentsRes } = useQuery({
    queryKey: ["investments", "my"],
    queryFn:  () => apiGet<{ data: Investment[] }>("/investments/my"),
    enabled:  user?.role === "INVESTOR",
  });

  const { data: walletRes } = useQuery({
    queryKey: ["wallet"],
    queryFn:  () => apiGet<ApiResponse<WalletType>>("/wallet"),
  });

  const proposals  = proposalsRes?.data ?? [];
  const investments = investmentsRes?.data ?? [];
  const wallet     = walletRes?.data;
  const isInvestor = user?.role === "INVESTOR";
  const isOwner    = user?.role === "BUSINESS_OWNER";

  // Chart: mock monthly data (replace with real report data later)
  const chartData = [
    { month: "Nov", profit: 12000, invested: 45000 },
    { month: "Dec", profit: 18000, invested: 62000 },
    { month: "Jan", profit: 22000, invested: 78000 },
    { month: "Feb", profit: 31000, invested: 95000 },
    { month: "Mar", profit: 28000, invested: 108000 },
    { month: "Apr", profit: 42000, invested: 134000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Assalamu Alaikum, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground border rounded-lg px-3 py-1.5">
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
          {connected ? "Live updates on" : "Connecting..."}
        </div>
      </div>

      {/* Live Platform Stats */}
      <div className="rounded-xl border bg-gradient-to-r from-amber-50 to-emerald-50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-semibold">Live Platform Stats</span>
          <span className="text-xs text-muted-foreground ml-auto">Real-time</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Capital",    value: shortNumber(liveStats?.totalCapital   ?? 0), prefix: "৳" },
            { label: "Active Proposals", value: liveStats?.activeProposals ?? 0, prefix: "" },
            { label: "Total Investors",  value: liveStats?.totalInvestors  ?? 0, prefix: "" },
            { label: "Funded Projects",  value: liveStats?.totalFunded     ?? 0, prefix: "" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-bold text-amber-700">{s.prefix}{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Wallet Balance"
          value={formatCurrency(wallet?.balance ?? 0)}
          icon={Wallet}
          color="amber"
          live
        />
        {isInvestor && (
          <>
            <StatCard
              title="Active Investments"
              value={investments.filter(i => i.status === "ACTIVE").length}
              icon={TrendingUp}
              color="emerald"
            />
            <StatCard
              title="Total Invested"
              value={formatCurrency(investments.reduce((s, i) => s + i.amount, 0))}
              icon={BarChart3}
              color="blue"
            />
            <StatCard
              title="Profit Earned"
              value={formatCurrency(investments.reduce((s, i) => s + i.profitEarned, 0))}
              icon={Brain}
              color="purple"
              trend={{ value: 18, label: "this month" }}
            />
          </>
        )}
        {isOwner && (
          <>
            <StatCard
              title="My Proposals"
              value={proposals.length}
              icon={FileText}
              color="emerald"
            />
            <StatCard
              title="Total Raised"
              value={formatCurrency(proposals.reduce((s, p) => s + p.amountRaised, 0))}
              icon={BarChart3}
              color="blue"
            />
            <StatCard
              title="Active Projects"
              value={proposals.filter(p => p.status === "ACTIVE" || p.status === "FUNDED").length}
              icon={Users}
              color="purple"
            />
          </>
        )}
      </div>

      {/* Charts + Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-2 noor-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Profit & Investment Trend</h3>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#df8a27" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#df8a27" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `৳${shortNumber(v)}`} />
              <Tooltip
                formatter={(v: number, name: string) => [
                  formatCurrency(v),
                  name === "profit" ? "Profit" : "Invested",
                ]}
              />
              <Area type="monotone" dataKey="profit"   stroke="#df8a27" fill="url(#profitGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="invested" stroke="#10b981" fill="url(#investGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="noor-card p-5">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {isInvestor && (
              <>
                <Link href="/proposals" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Browse Proposals</div>
                    <div className="text-xs text-muted-foreground">Find halal investments</div>
                  </div>
                </Link>
                <Link href="/wallet" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Add Funds</div>
                    <div className="text-xs text-muted-foreground">Deposit to wallet</div>
                  </div>
                </Link>
                <Link href="/ai" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">AI Advisor</div>
                    <div className="text-xs text-muted-foreground">Get investment recommendations</div>
                  </div>
                </Link>
              </>
            )}
            {isOwner && (
              <>
                <Link href="/proposals/create" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">New Proposal</div>
                    <div className="text-xs text-muted-foreground">Start raising funds</div>
                  </div>
                </Link>
                <Link href="/reports" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Submit Report</div>
                    <div className="text-xs text-muted-foreground">Distribute profits</div>
                  </div>
                </Link>
                <Link href="/ai" className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted transition-colors">
                  <div className="h-9 w-9 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">AI Proposal Builder</div>
                    <div className="text-xs text-muted-foreground">Generate with Claude AI</div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Proposals */}
      <div className="noor-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">
            {isInvestor ? "Recent Proposals" : "My Proposals"}
          </h3>
          <Link href="/proposals" className="text-xs text-amber-600 hover:underline font-medium">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {proposals.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href={`/proposals/${p.id}`}
              className="flex items-center gap-4 rounded-lg p-3 hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium truncate">{p.title}</span>
                  <StatusBadge status={p.status} />
                </div>
                <FundingProgress raised={p.amountRaised} goal={p.fundingGoal} size="sm" showLabels={false} />
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold text-amber-600">{p.profitSharePercent}%</div>
                <div className="text-xs text-muted-foreground">profit share</div>
              </div>
            </Link>
          ))}
          {proposals.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-6">
              No proposals yet.{" "}
              {isOwner && <Link href="/proposals/create" className="text-amber-600 hover:underline">Create one!</Link>}
              {isInvestor && <Link href="/proposals" className="text-amber-600 hover:underline">Browse proposals.</Link>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
