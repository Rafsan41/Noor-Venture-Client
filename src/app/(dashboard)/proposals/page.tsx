"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Search, Filter, Brain, PlusCircle } from "lucide-react";

import { apiGet }          from "@/lib/api";
import { useAuthStore }    from "@/store/auth.store";
import { DashboardShell }  from "@/components/layout/DashboardShell";
import { DealCard }        from "@/components/shared/DealCard";
import { EmptyState }      from "@/components/shared/EmptyState";
import type { Proposal, PaginatedResponse } from "@/types";

const STATUS_FILTERS = ["ALL", "ACTIVE", "FUNDED", "PENDING", "APPROVED", "COMPLETED"];

export default function ProposalsPage() {
  const user    = useAuthStore((s) => s.user);
  const isOwner = user?.role === "BUSINESS_OWNER";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page,   setPage]   = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["proposals", { status, search, page, owner: isOwner }],
    queryFn: () =>
      apiGet<PaginatedResponse<Proposal>>(
        isOwner ? "/proposals/my" : "/proposals",
        { status: status === "ALL" ? undefined : status, search: search || undefined, page, limit: 9 }
      ),
  });

  const proposals   = data?.data ?? [];
  const totalPages  = data?.pagination?.totalPages ?? 1;

  return (
    <DashboardShell title={isOwner ? "My Proposals" : "Browse Deals"}>
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="font-display text-2xl font-bold"
              style={{ color: "var(--ink)" }}
            >
              {isOwner ? "My Proposals" : "Browse Deals"}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted-brand)" }}>
              {isOwner ? "Manage your funding campaigns" : "Halal investment opportunities"}
            </p>
          </div>

          {isOwner && (
            <Link
              href="/proposals/create"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "var(--ink)", boxShadow: "3px 3px 0 0 var(--pink)" }}
            >
              <PlusCircle className="h-4 w-4" />
              New Proposal
            </Link>
          )}
        </div>

        {/* ── Filters ── */}
        <div
          className="flex flex-col sm:flex-row gap-3 rounded-2xl p-4"
          style={{
            background: "white",
            border: "1.5px solid var(--line)",
          }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
              style={{ color: "var(--muted-brand)" }}
            />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search proposals…"
              className="w-full rounded-xl border py-2.5 pl-9 pr-4 text-sm outline-none transition-shadow focus:ring-2"
              style={{
                background: "var(--paper-2)",
                borderColor: "var(--line)",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Status chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <Filter className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--muted-brand)" }} />
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className="shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all"
                style={
                  status === s
                    ? { background: "var(--ink)", color: "white" }
                    : { background: "var(--paper-2)", color: "var(--ink-soft)", border: "1px solid var(--line)" }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Grid ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden animate-pulse"
                style={{ border: "1.5px solid var(--line)" }}
              >
                <div className="h-20" style={{ background: "var(--line)" }} />
                <div className="p-4 space-y-3">
                  <div className="h-4 rounded-lg w-3/4" style={{ background: "var(--line)" }} />
                  <div className="h-3 rounded-lg w-full" style={{ background: "var(--paper-2)" }} />
                  <div className="h-2 rounded-full w-full" style={{ background: "var(--paper-2)" }} />
                </div>
              </div>
            ))}
          </div>
        ) : proposals.length === 0 ? (
          <div
            className="rounded-2xl"
            style={{ border: "1.5px solid var(--line)", background: "white" }}
          >
            <EmptyState
              icon={Brain}
              title="No proposals found"
              description={isOwner
                ? "Create your first proposal to start raising funds."
                : "No deals match your current filters. Try adjusting the search."}
              action={isOwner
                ? { label: "Create Proposal", href: "/proposals/create" }
                : undefined}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {proposals.map((p) => (
              <DealCard
                key={p.id}
                id={p.id}
                title={p.title}
                businessName={p.businessType}
                sector={p.businessType ?? "Other"}
                status={p.status}
                raisedAmount={p.amountRaised}
                fundingGoal={p.fundingGoal}
                returnRate={p.profitSharePercent}
                shariahScore={p.shariahScore}
                minInvestment={p.minInvestment}
              />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="h-9 w-9 rounded-xl text-sm font-semibold transition-all"
                style={
                  page === p
                    ? { background: "var(--ink)", color: "white", boxShadow: "3px 3px 0 0 var(--pink)" }
                    : { background: "var(--paper-2)", color: "var(--ink-soft)", border: "1px solid var(--line)" }
                }
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
