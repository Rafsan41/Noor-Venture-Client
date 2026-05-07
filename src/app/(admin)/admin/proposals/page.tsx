"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { apiGet, apiPatch } from "@/lib/api";
import { AdminShell }       from "@/components/layout/AdminShell";
import { StatusBadge }      from "@/components/shared/StatusBadge";
import { FundingProgress }  from "@/components/shared/FundingProgress";
import { formatCurrency, timeAgo } from "@/utils/format";
import type { Proposal, PaginatedResponse } from "@/types";

const STATUS_FILTERS = ["ALL", "PENDING", "APPROVED", "ACTIVE", "FUNDED", "COMPLETED", "REJECTED"];

export default function AdminProposalsPage() {
  const qc     = useQueryClient();
  const [status, setStatus] = useState("ALL");
  const [page,   setPage]   = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["proposals", "admin", { status, page }],
    queryFn:  () =>
      apiGet<PaginatedResponse<Proposal>>("/proposals", {
        status: status === "ALL" ? undefined : status,
        page,
        limit: 10,
      }),
  });

  const reviewMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      apiPatch(`/proposals/${id}/status`, { status }),
    onSuccess: () => {
      toast.success("Status updated!");
      qc.invalidateQueries({ queryKey: ["proposals", "admin"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const proposals  = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <AdminShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">All Proposals</h1>
          <p className="text-sm text-muted-foreground">Review and manage business proposals</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
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

        <div className="noor-card overflow-hidden">
          <div className="divide-y">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="px-6 py-4 flex gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                      <div className="h-3 bg-muted rounded w-1/3 animate-pulse" />
                    </div>
                  </div>
                ))
              : proposals.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 px-6 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Link href={`/proposals/${p.id}`} className="text-sm font-medium hover:text-coral-600 transition-colors truncate">
                          {p.title}
                        </Link>
                        <StatusBadge status={p.status} />
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {p.businessType} · {p.owner?.name} · {timeAgo(p.createdAt)}
                      </div>
                      <div className="max-w-xs">
                        <FundingProgress raised={p.amountRaised} goal={p.fundingGoal} size="sm" showLabels={false} />
                      </div>
                    </div>
                    <div className="text-right shrink-0 mr-4">
                      <div className="text-sm font-semibold">{formatCurrency(p.fundingGoal)}</div>
                      <div className="text-xs text-muted-foreground">{p.profitSharePercent}%</div>
                    </div>
                    {p.status === "PENDING" && (
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => reviewMutation.mutate({ id: p.id, status: "APPROVED" })}
                          disabled={reviewMutation.isPending}
                          className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
                        >
                          <CheckCircle className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={() => reviewMutation.mutate({ id: p.id, status: "REJECTED" })}
                          disabled={reviewMutation.isPending}
                          className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-60"
                        >
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
            }
            {proposals.length === 0 && !isLoading && (
              <div className="px-6 py-12 text-center text-muted-foreground text-sm">No proposals found.</div>
            )}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                  page === p ? "bg-coral-500 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
