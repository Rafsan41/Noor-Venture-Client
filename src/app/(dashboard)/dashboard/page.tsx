"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Wallet, FileText, Users, BarChart3, Brain } from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

import { apiGet }           from "@/lib/api";
import { useAuthStore }     from "@/store/auth.store";
import { DashboardShell }   from "@/components/layout/DashboardShell";
import { useStatsStore }    from "@/store/stats.store";
import { StatCard }         from "@/components/shared/StatCard";
import { FundingProgress }  from "@/components/shared/FundingProgress";
import { StatusBadge }      from "@/components/shared/StatusBadge";
import { LiveDot }          from "@/components/shared/NoorGeometry";
import { formatCurrency, shortNumber } from "@/utils/format";
import type { ApiResponse, Proposal, Investment, Wallet as WalletType, LiveStats } from "@/types";

/* ── Inline stat panel ──────────────────────────────────────── */
function Panel({
  title,
  action,
  actionHref,
  children,
}: {
  title: string;
  action?: string;
  actionHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ background: "white", borderColor: "var(--ink)", borderWidth: "1.5px" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        {action && actionHref && (
          <Link
            href={actionHref}
            className="text-sm font-semibold"
            style={{ color: "var(--pink-deep)" }}
          >
            {action}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── Transaction row ────────────────────────────────────────── */
function TxRow({
  icon,
  label,
  sub,
  amount,
  type,
  color,
  negative,
}: {
  icon: string;
  label: string;
  sub: string;
  amount: string;
  type: string;
  color: string;
  negative: boolean;
}) {
  return (
    <div
      className="grid items-center gap-3.5 border-b py-3.5 last:border-0"
      style={{
        gridTemplateColumns: "36px 1fr auto auto",
        borderColor: "var(--line)",
        borderStyle: "dashed",
      }}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs" style={{ color: "var(--muted-brand)" }}>{sub}</div>
      </div>
      <div
        className="font-display text-base font-semibold"
        style={{ color: negative ? "var(--ink)" : "var(--emerald-c)" }}
      >
        {amount}
      </div>
      <div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
          style={{ background: "var(--paper-2)", color: "var(--muted-brand)" }}
        >
          {type}
        </span>
      </div>
    </div>
  );
}

/* ── Donut chart (sector allocation) ──────────────────────── */
const SECTORS = [
  { name: "Food",      value: 32, color: "#FF9071" },
  { name: "Tech",      value: 28, color: "#E85395" },
  { name: "Retail",    value: 22, color: "#A73CCB" },
  { name: "Logistics", value: 18, color: "#FFE585" },
];

function SectorDonut() {
  return (
    <div className="flex items-center gap-6 py-2">
      <PieChart width={160} height={160}>
        <Pie
          data={SECTORS}
          cx={75}
          cy={75}
          innerRadius={48}
          outerRadius={72}
          paddingAngle={2}
          dataKey="value"
          strokeWidth={0}
        >
          {SECTORS.map((s, i) => (
            <Cell key={i} fill={s.color} />
          ))}
        </Pie>
      </PieChart>
      <div className="flex-1 space-y-2.5">
        {SECTORS.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-between border-b pb-2 last:border-0 text-sm"
            style={{ borderColor: "var(--line)", borderStyle: "dashed" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: s.color }}
              />
              {s.name}
            </div>
            <span className="font-semibold">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Chart data ─────────────────────────────────────────────── */
const CHART_DATA = [
  { month: "Jul", profit: 12000, invested: 45000 },
  { month: "Aug", profit: 18000, invested: 62000 },
  { month: "Sep", profit: 22000, invested: 78000 },
  { month: "Oct", profit: 31000, invested: 95000 },
  { month: "Nov", profit: 28000, invested: 108000 },
  { month: "Dec", profit: 42000, invested: 134000 },
];

const MOCK_TXS = [
  { icon: "✦", label: "Profit share · Olive Press Co.",   sub: "Today, 9:42 AM",     amount: "+৳8,240",   type: "PROFIT",  color: "#10b981", negative: false },
  { icon: "↗", label: "Invested · Crescent Logistics",    sub: "Yesterday, 3:18 PM", amount: "-৳50,000",  type: "INVEST",  color: "#A73CCB", negative: true  },
  { icon: "+", label: "Deposit · City Bank ****4521",      sub: "Yesterday, 11:02 AM",amount: "+৳200,000", type: "DEPOSIT", color: "#FF9071", negative: false },
  { icon: "✦", label: "Profit share · HalalFoods Co.",    sub: "2 days ago",         amount: "+৳4,180",   type: "PROFIT",  color: "#10b981", negative: false },
  { icon: "↗", label: "Invested · Modest Threads",        sub: "3 days ago",         amount: "-৳25,000",  type: "INVEST",  color: "#E85395", negative: true  },
];

/* ── Active proposals mini list ─────────────────────────────── */
const ACTIVE_PROPOSALS = [
  { name: "Crescent Logistics", tag: "Logistics", pct: 74, color: "#FF9071", amt: "৳350,000", ret: "19%" },
  { name: "Olive Press Co.",    tag: "Food",      pct: 90, color: "#E85395", amt: "৳120,000", ret: "16%" },
  { name: "Modest Threads",     tag: "Retail",    pct: 28, color: "#A73CCB", amt: "৳80,000",  ret: "22%" },
];

/* ══════════════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const user              = useAuthStore((s) => s.user);
  const { stats, connected } = useStatsStore();

  const { data: liveStatsRes } = useQuery({
    queryKey: ["stats", "live"],
    queryFn:  () => apiGet<ApiResponse<LiveStats>>("/stats/live"),
    refetchInterval: 30000,
  });
  const liveStats = stats ?? liveStatsRes?.data;

  const { data: proposalsRes } = useQuery({
    queryKey: ["proposals", "my"],
    queryFn:  () => apiGet<{ data: Proposal[]; pagination: { total: number; page: number; limit: number; totalPages: number } }>("/proposals?limit=5"),
  });

  const { data: investmentsRes } = useQuery({
    queryKey: ["investments", "portfolio"],
    queryFn:  () => apiGet<ApiResponse<{ investments: Investment[]; summary: { totalInvested: number; totalEarned: number; active: number; total: number } }>>("/investments/portfolio"),
    enabled:  user?.role === "INVESTOR",
  });

  const { data: walletRes } = useQuery({
    queryKey: ["wallet"],
    queryFn:  () => apiGet<ApiResponse<WalletType>>("/wallet"),
  });

  const proposals  = proposalsRes?.data ?? [];
  const investments = investmentsRes?.data?.investments ?? [];
  const wallet      = walletRes?.data;
  const isInvestor  = user?.role === "INVESTOR";
  const isOwner     = user?.role === "BUSINESS_OWNER";

  return (
    <DashboardShell>
      <div className="space-y-6">

        {/* ── Page header ─────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1
              className="font-display font-semibold"
              style={{ fontSize: 36, letterSpacing: "-0.02em" }}
            >
              {isOwner
                ? `Welcome back, ${user?.name?.split(" ")[0]} 👋`
                : `Assalamu Alaikum, ${user?.name?.split(" ")[0]} 👋`}
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
              {isOwner
                ? "Your business at a glance."
                : "Here's your halal portfolio."}
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
            style={{
              background: "var(--paper-2)",
              borderColor: "var(--line)",
              color: "var(--muted-brand)",
            }}
          >
            <LiveDot color={connected ? "#10b981" : "#9ca3af"} />
            {connected ? "Live updates on" : "Connecting…"}
          </div>
        </div>

        {/* ── Live platform stats banner ───────────────────────── */}
        <div
          className="grid grid-cols-2 gap-3 rounded-2xl border p-5 sm:grid-cols-4"
          style={{
            background: "linear-gradient(135deg, #FFF5B5 0%, #FFE585 100%)",
            borderColor: "var(--ink)",
            borderWidth: "1.5px",
          }}
        >
          {[
            { label: "Total Capital",    value: `৳${shortNumber(liveStats?.totalCapital ?? 4_200_000)}` },
            { label: "Active Proposals", value: liveStats?.activeProposals ?? 38 },
            { label: "Total Investors",  value: liveStats?.totalInvestors  ?? 212 },
            { label: "Funded Projects",  value: liveStats?.totalFunded     ?? 14 },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="font-display text-2xl font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {s.value}
              </div>
              <div className="mt-0.5 text-xs font-medium" style={{ color: "var(--ink-soft)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Personal stat cards ──────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Wallet Balance"
            value={formatCurrency(wallet?.balance ?? 0)}
            icon={Wallet}
            color="coral"
            live
          />
          {isInvestor && (
            <>
              <StatCard
                title="Active Investments"
                value={investments.filter((i) => i.status === "ACTIVE").length || 7}
                icon={TrendingUp}
                color="emerald"
                trend={{ value: 2, label: "this month" }}
              />
              <StatCard
                title="Total Invested"
                value={formatCurrency(investments.reduce((s, i) => s + Number(i.amount), 0) || 1_248_330)}
                icon={BarChart3}
                color="blue"
              />
              <StatCard
                title="Profit Earned"
                value={formatCurrency(investments.reduce((s, i) => s + Number(i.profitEarned), 0) || 184_750)}
                icon={Brain}
                color="purple"
                trend={{ value: 18, label: "this month" }}
              />
            </>
          )}
          {isOwner && (
            <>
              <StatCard title="My Proposals"  value={proposals.length || 3}                                         icon={FileText} color="emerald" />
              <StatCard title="Active Investors" value={42}                                                          icon={Users}    color="blue" trend={{ value: 8, label: "this week" }} />
              <StatCard title="Next Distribution" value={formatCurrency(41_200)}                                     icon={Brain}    color="purple" />
            </>
          )}
        </div>

        {/* ── Charts row ───────────────────────────────────────── */}
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          {/* Area chart */}
          <Panel title="Portfolio growth" action="6M ▾" actionHref="#">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#E85395" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#E85395" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 4" stroke="var(--line)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-brand)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-brand)" }} tickFormatter={(v) => `৳${shortNumber(v)}`} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(v: number) => [formatCurrency(v)]}
                  contentStyle={{ borderRadius: 12, border: "1.5px solid var(--ink)", fontFamily: "inherit", fontSize: 13 }}
                />
                <Area type="monotone" dataKey="profit" stroke="#A73CCB" strokeWidth={2.5} fill="url(#pGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          {/* Donut chart */}
          <Panel title="Sector allocation">
            <SectorDonut />
          </Panel>
        </div>

        {/* ── Active proposals + recent transactions ───────────── */}
        <div className="grid gap-5 lg:grid-cols-2">

          {/* Active proposals */}
          <Panel title="Active partnerships" action="View all →" actionHref="/proposals">
            {(isInvestor ? ACTIVE_PROPOSALS : []).map((d) => (
              <div
                key={d.name}
                className="grid items-center gap-3.5 border-b py-3.5 last:border-0"
                style={{
                  gridTemplateColumns: "40px 1fr auto",
                  borderColor: "var(--line)",
                  borderStyle: "dashed",
                }}
              >
                <div
                  className="h-10 w-10 rounded-xl border-2"
                  style={{ background: d.color, borderColor: "var(--ink)" }}
                />
                <div>
                  <div className="text-sm font-semibold">
                    {d.name}{" "}
                    <span className="text-xs font-normal" style={{ color: "var(--muted-brand)" }}>
                      · {d.tag}
                    </span>
                  </div>
                  <div className="mt-1.5 max-w-[280px]">
                    <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${d.pct}%`, background: "var(--grad)" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-sm font-semibold">{d.amt}</div>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{ background: "var(--emerald-soft)", color: "var(--emerald-c)" }}
                  >
                    +{d.ret}
                  </span>
                </div>
              </div>
            ))}
            {isOwner && proposals.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/proposals/${p.id}`}
                className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium truncate">{p.title}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <FundingProgress raised={p.amountRaised} goal={p.fundingGoal} size="sm" showLabels={false} />
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold" style={{ color: "var(--pink-deep)" }}>{p.profitSharePercent}%</div>
                  <div className="text-xs" style={{ color: "var(--muted-brand)" }}>profit share</div>
                </div>
              </Link>
            ))}
          </Panel>

          {/* Recent transactions */}
          <Panel title="Recent activity" action="All transactions →" actionHref="/wallet">
            {MOCK_TXS.map((tx, i) => (
              <TxRow key={i} {...tx} />
            ))}
          </Panel>
        </div>

        {/* ── NoorAI promo banner ───────────────────────────────── */}
        <div
          className="relative flex flex-wrap items-center gap-5 overflow-hidden rounded-2xl border p-6"
          style={{ background: "var(--ink)", borderColor: "var(--ink)", color: "var(--cream)" }}
        >
          {/* Deco */}
          <div className="pointer-events-none absolute right-0 top-0 opacity-[0.14]">
            <svg viewBox="0 0 100 100" width="200" height="200">
              <path d="M50 5 L61 39 L95 50 L61 61 L50 95 L39 61 L5 50 L39 39 Z" fill="#FF9071" />
            </svg>
          </div>

          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 text-3xl"
            style={{ background: "var(--grad)", borderColor: "var(--cream)" }}
          >
            ✦
          </div>

          <div className="flex-1 min-w-[200px]">
            <div
              className="font-display mb-1 text-xl font-semibold"
              style={{ color: "var(--cream)" }}
            >
              NoorAI matched 3 new deals to you this week
            </div>
            <div className="text-sm opacity-80">
              Based on your sector preferences (Food, Logistics) and avg ticket size of ৳80K.
            </div>
          </div>

          <Link
            href="/ai"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-bold transition-colors hover:opacity-90"
            style={{ background: "white", color: "var(--ink)" }}
          >
            See matches →
          </Link>
        </div>

      </div>
    </DashboardShell>
  );
}
