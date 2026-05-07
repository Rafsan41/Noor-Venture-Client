"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Search, Filter, Brain, TrendingUp } from "lucide-react";

import { apiGet }        from "@/lib/api";
import { useAuthStore }  from "@/store/auth.store";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { StatusBadge }   from "@/components/shared/StatusBadge";
import { FundingProgress } from "@/components/shared/FundingProgress";
import { formatCurrency, timeAgo } from "@/utils/format";
import type { Proposal, PaginatedResponse } from "@/types";

const STATUS_FILTERS = ["ALL", "ACTIVE", "FUNDED", "PENDING", "APPROVED", "COMPLETED"];

export default function ProposalsPage() {
  const user          = useAuthStore((s) => s.user);
  const isOwner       = user?.role === "BUSINESS_OWNER";
  const [search,  setSearch]  = useState("");
  const [status,  setStatus]  = useState("ALL");
  const [page,    setPage]    = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["proposals", { status, search, page, owner: isOwner }],
    queryFn:  () =>
      apiGet<PaginatedResponse<Proposal>>(
        isOwner ? "/proposals/my" : "/proposals",
        { status: status === "ALL" ? undefined : status, search: search || undefined, page, limit: 9 }
      ),
  });

  const proposals = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <DashboardShell>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{isOwner ? "My Proposals" : "Browse Proposals"}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isOwner ? "Manage your funding campaigns" : "Halal investment opportunities"}
          </p>
        </div>
        {isOwner && (
          <Link
            href="/proposals/create"
            className="rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white hover:bg-coral-600 transition-colors"
          >
            + New Proposal
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search proposals..."
            className="w-full rounded-lg border pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1); }}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                status === s ? "bg-coral-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="noor-card p-5 animate-pulse space-y-3">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {proposals.map((p) => (
            <Link key={p.id} href={`/proposals/${p.id}`} className="noor-card p-5 block group">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm leading-snug truncate group-hover:text-coral-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.businessType}</p>
                </div>
                <StatusBadge status={p.status} className="shrink-0 ml-2" />
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                {p.description}
              </p>

              <FundingProgress raised={p.amountRaised} goal={p.fundingGoal} size="sm" />

              <div className="mt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {p.profitSharePercent}% profit
                  </span>
                  <StatusBadge status={p.riskLevel} />
                </div>
                <span className="text-muted-foreground">{timeAgo(p.createdAt)}</span>
              </div>

              {p.aiTags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {p.aiTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md bg-coral-50 px-2 py-0.5 text-xs text-coral-700">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
          {proposals.length === 0 && (
            <div className="col-span-3 text-center py-16 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">No proposals found</p>
              {isOwner && (
                <Link href="/proposals/create" className="text-sm text-coral-600 hover:underline mt-1 block">
                  Create your first proposal →
                </Link>
              )}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                page === p ? "bg-coral-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
    </DashboardShell>
  );
}
