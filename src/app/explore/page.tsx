"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Search, Filter, ArrowRight, Lock } from "lucide-react";

import { apiGet }       from "@/lib/api";
import { Nav }          from "@/components/landing/Nav";
import { Footer }       from "@/components/landing/Footer";
import { DealCard }     from "@/components/shared/DealCard";
import { TilePattern }  from "@/components/shared/NoorGeometry";
import type { Proposal, PaginatedResponse } from "@/types";

const SECTORS = ["All", "Food & Beverage", "Technology", "Retail", "Agriculture", "Healthcare", "Education", "Logistics"];
const STATUS_FILTERS = ["ALL", "ACTIVE", "FUNDED", "COMPLETED"];

export default function ExplorePage() {
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState("ALL");
  const [sector, setSector]   = useState("All");
  const [page,   setPage]     = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["public-proposals", { status, search, sector, page }],
    queryFn: () =>
      apiGet<PaginatedResponse<Proposal>>("/proposals", {
        status: status === "ALL" ? undefined : status,
        search: search || undefined,
        sector: sector === "All" ? undefined : sector,
        page,
        limit: 9,
      }),
  });

  const proposals  = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const total      = data?.pagination?.total ?? 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-16 pt-20"
        style={{ background: "var(--ink)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <TilePattern color="rgba(255,245,181,0.5)" />
        </div>

        <div className="wrap relative text-center">
          <div
            className="eyebrow mx-auto mb-4 inline-block"
            style={{ color: "var(--paper)", opacity: 0.65 }}
          >
            {total > 0 ? `${total} live opportunities` : "Live opportunities"}
          </div>
          <h1
            className="font-display mx-auto mb-5 font-medium"
            style={{
              fontSize: "clamp(40px,5.5vw,68px)",
              letterSpacing: "-0.035em",
              color: "var(--paper)",
              maxWidth: 700,
              lineHeight: 1.05,
            }}
          >
            Browse ethical{" "}
            <span className="noor-gradient-text italic">investment deals.</span>
          </h1>
          <p
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--paper)", opacity: 0.65 }}
          >
            Every proposal is screened for Shariah compliance, audited for risk,
            and verified by our ethics board before it reaches you.
          </p>

          {/* Search bar */}
          <div
            className="relative mx-auto max-w-xl overflow-hidden rounded-2xl"
            style={{ border: "1.5px solid rgba(255,245,181,0.2)", background: "rgba(255,245,181,0.07)" }}
          >
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--paper)", opacity: 0.5 }}
            />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by business name, sector, or keyword…"
              className="w-full bg-transparent py-4 pl-11 pr-4 text-sm outline-none"
              style={{ color: "var(--paper)", fontFamily: "inherit" }}
            />
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <section className="sticky top-16 z-30 border-b py-4" style={{ background: "var(--paper)", borderColor: "var(--line)" }}>
        <div className="wrap flex flex-wrap items-center gap-3">
          {/* Status */}
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--ink-soft)" }} />
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className="rounded-full px-3 py-1 text-xs font-semibold transition-all"
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

          <div className="h-4 w-px" style={{ background: "var(--line)" }} />

          {/* Sectors */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => { setSector(s); setPage(1); }}
                className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all"
                style={
                  sector === s
                    ? { background: "var(--grad)", color: "white" }
                    : { background: "var(--paper-2)", color: "var(--ink-soft)", border: "1px solid var(--line)" }
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="wrap">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl"
                  style={{ border: "1.5px solid var(--line)" }}
                >
                  <div className="h-20" style={{ background: "var(--line)" }} />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-3/4 rounded-lg" style={{ background: "var(--paper-2)" }} />
                    <div className="h-3 w-full rounded-lg" style={{ background: "var(--paper-2)" }} />
                    <div className="h-2 w-full rounded-full" style={{ background: "var(--paper-2)" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : proposals.length === 0 ? (
            <div
              className="flex flex-col items-center gap-4 rounded-3xl py-24 text-center"
              style={{ border: "1.5px dashed var(--line)", background: "var(--surface)" }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                style={{ background: "var(--paper-2)", border: "1.5px solid var(--line)" }}
              >
                🔍
              </div>
              <h3 className="font-semibold" style={{ color: "var(--ink)" }}>No proposals found</h3>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => { setSearch(""); setStatus("ALL"); setSector("All"); }}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ background: "var(--paper-2)", color: "var(--ink)", border: "1.5px solid var(--line)" }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                  href={`/login?redirect=/proposals/${p.id}`}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="h-9 w-9 rounded-xl text-sm font-semibold transition-all"
                  style={
                    page === n
                      ? { background: "var(--ink)", color: "white", boxShadow: "3px 3px 0 0 var(--pink)" }
                      : { background: "var(--paper-2)", color: "var(--ink-soft)", border: "1px solid var(--line)" }
                  }
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section
        className="py-16"
        style={{ background: "var(--ink)", borderTop: "1.5px solid var(--line)" }}
      >
        <div className="wrap flex flex-col items-center gap-6 text-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "var(--grad)" }}
          >
            <Lock className="h-5 w-5 text-white" />
          </div>
          <h2
            className="font-display font-medium"
            style={{ fontSize: "clamp(28px,4vw,44px)", color: "var(--paper)", letterSpacing: "-0.03em" }}
          >
            Ready to invest?
          </h2>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--paper)", opacity: 0.65 }}>
            Create a free account to commit capital, track returns, and access
            your Noor Wallet. Your first investment takes 2 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register?role=INVESTOR"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--grad)", boxShadow: "0 10px 30px -10px rgba(231,83,149,0.55)" }}
            >
              Open account — it&apos;s free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[var(--ink)]"
              style={{ borderColor: "rgba(255,245,181,0.3)", color: "var(--paper)" }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
