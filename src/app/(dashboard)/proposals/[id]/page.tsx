"use client";

import { useState } from "react";
import { useParams }  from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TrendingUp, Calendar, Users, Brain, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { apiGet, apiPost } from "@/lib/api";
import { useAuthStore }    from "@/store/auth.store";
import { useProposalSocket } from "@/hooks/useSocket";
import { StatusBadge }     from "@/components/shared/StatusBadge";
import { FundingProgress } from "@/components/shared/FundingProgress";
import { formatCurrency, formatDate, formatPercent } from "@/utils/format";
import type { ApiResponse, Proposal, ProposalAnalysis } from "@/types";

export default function ProposalDetailPage() {
  const { id }    = useParams<{ id: string }>();
  const qc        = useQueryClient();
  const user      = useAuthStore((s) => s.user);
  const isInvestor = user?.role === "INVESTOR";

  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "investors" | "ai">("overview");

  // Subscribe to real-time updates for this proposal
  useProposalSocket(id);

  const { data: res, isLoading } = useQuery({
    queryKey: ["proposal", id],
    queryFn:  () => apiGet<ApiResponse<Proposal>>(`/proposals/${id}`),
  });

  const { data: analysisRes, isFetching: analyzing, refetch: runAnalysis } = useQuery({
    queryKey: ["proposal", id, "analysis"],
    queryFn:  () => apiPost<ApiResponse<ProposalAnalysis>>(`/ai/analyze-proposal`, { proposalId: id }),
    enabled:  false,
  });

  const investMutation = useMutation({
    mutationFn: () => apiPost("/investments", { proposalId: id, amount: parseFloat(amount) }),
    onSuccess: () => {
      toast.success(`Successfully invested ${formatCurrency(parseFloat(amount))}!`);
      qc.invalidateQueries({ queryKey: ["proposal", id] });
      qc.invalidateQueries({ queryKey: ["wallet"] });
      setAmount("");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const proposal  = res?.data;
  const analysis  = analysisRes?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!proposal) {
    return <div className="text-center py-16 text-muted-foreground">Proposal not found.</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="noor-card p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <StatusBadge status={proposal.status} />
              <StatusBadge status={proposal.riskLevel} />
              {proposal.aiTags?.map((t) => (
                <span key={t} className="rounded-md bg-amber-50 px-2 py-0.5 text-xs text-amber-700">{t}</span>
              ))}
            </div>
            <h1 className="text-2xl font-bold mb-1">{proposal.title}</h1>
            <p className="text-sm text-muted-foreground">{proposal.businessType}</p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-600">{proposal.profitSharePercent}%</div>
              <div className="text-xs text-muted-foreground">Profit Share</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">{proposal.duration}mo</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{proposal._count?.investments ?? 0}</div>
              <div className="text-xs text-muted-foreground">Investors</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <FundingProgress raised={proposal.amountRaised} goal={proposal.fundingGoal} size="lg" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b">
        {(["overview", "milestones", "investors", "ai"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-amber-500 text-amber-600"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "ai" ? "🤖 AI Analysis" : tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tab Content */}
        <div className="lg:col-span-2">
          {activeTab === "overview" && (
            <div className="noor-card p-6 space-y-4">
              <h3 className="font-semibold">About this Proposal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {proposal.description}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Funding Goal</div>
                  <div className="font-semibold">{formatCurrency(proposal.fundingGoal)}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Amount Raised</div>
                  <div className="font-semibold text-emerald-600">{formatCurrency(proposal.amountRaised)}</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Duration</div>
                  <div className="font-semibold">{proposal.duration} months</div>
                </div>
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="text-xs text-muted-foreground mb-1">Created</div>
                  <div className="font-semibold">{formatDate(proposal.createdAt)}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="noor-card p-6 space-y-3">
              <h3 className="font-semibold">Project Milestones</h3>
              {proposal.milestones?.length ? (
                proposal.milestones.map((m, i) => (
                  <div key={m.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className={`mt-0.5 h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold
                      ${m.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                      {m.status === "COMPLETED" ? "✓" : i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{m.title}</span>
                        <StatusBadge status={m.status} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                      {m.dueDate && (
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Due {formatDate(m.dueDate)}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No milestones defined yet.</p>
              )}
            </div>
          )}

          {activeTab === "ai" && (
            <div className="noor-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" /> Claude AI Analysis
                </h3>
                <button
                  onClick={() => runAnalysis()}
                  disabled={analyzing}
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 disabled:opacity-60 transition-colors"
                >
                  {analyzing && <Loader2 className="h-3 w-3 animate-spin" />}
                  {analysis ? "Re-analyze" : "Analyze Now"}
                </button>
              </div>

              {analysis ? (
                <div className="space-y-4">
                  {/* Scores */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-purple-50 p-3 text-center">
                      <div className="text-2xl font-bold text-purple-700">{analysis.riskScore}/10</div>
                      <div className="text-xs text-muted-foreground">Risk Score</div>
                    </div>
                    <div className="rounded-lg bg-emerald-50 p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-700">{analysis.viabilityScore}/10</div>
                      <div className="text-xs text-muted-foreground">Viability</div>
                    </div>
                    <div className={`rounded-lg p-3 text-center ${
                      analysis.shariahCompliance.compliant ? "bg-green-50" : "bg-red-50"
                    }`}>
                      <div className={`text-2xl font-bold ${
                        analysis.shariahCompliance.compliant ? "text-green-700" : "text-red-600"
                      }`}>
                        {analysis.shariahCompliance.compliant ? "✓" : "✗"}
                      </div>
                      <div className="text-xs text-muted-foreground">Shariah</div>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-600" /> Strengths
                    </h4>
                    <ul className="space-y-1">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">•</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4 text-amber-600" /> Considerations
                    </h4>
                    <ul className="space-y-1">
                      {analysis.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">•</span>{w}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h4 className="text-sm font-medium mb-2 text-blue-700">AI Suggestions</h4>
                    <ul className="space-y-1">
                      {analysis.suggestions.map((s, i) => (
                        <li key={i} className="text-sm text-blue-700/80 flex items-start gap-2">
                          <span className="mt-0.5">→</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Shariah Notes */}
                  <div className={`rounded-lg p-4 ${
                    analysis.shariahCompliance.compliant ? "bg-emerald-50" : "bg-red-50"
                  }`}>
                    <h4 className={`text-sm font-medium mb-1 ${
                      analysis.shariahCompliance.compliant ? "text-emerald-700" : "text-red-700"
                    }`}>
                      Shariah Assessment
                    </h4>
                    <p className="text-sm text-muted-foreground">{analysis.shariahCompliance.notes}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Click "Analyze Now" to get Claude AI's assessment of this proposal.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "investors" && (
            <div className="noor-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="h-4 w-4" /> Investors
              </h3>
              {proposal.investments?.length ? (
                <div className="space-y-2">
                  {proposal.investments.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">
                          {inv.investor?.name?.[0] ?? "?"}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{inv.investor?.name ?? "Anonymous"}</div>
                          <div className="text-xs text-muted-foreground">{formatDate(inv.createdAt)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatCurrency(inv.amount)}</div>
                        <div className="text-xs text-muted-foreground">{formatPercent(inv.sharePercent)} share</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-6">Be the first investor!</p>
              )}
            </div>
          )}
        </div>

        {/* Right: Invest Panel */}
        <div className="space-y-4">
          {isInvestor && ["ACTIVE", "FUNDED"].includes(proposal.status) && (
            <div className="noor-card p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-600" /> Invest Now
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Amount (BDT)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 10000"
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                {amount && parseFloat(amount) > 0 && (
                  <div className="rounded-lg bg-amber-50 p-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Your share</span>
                      <span className="font-medium">
                        {formatPercent((parseFloat(amount) / proposal.fundingGoal) * proposal.profitSharePercent)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profit share %</span>
                      <span className="font-medium">{proposal.profitSharePercent}%</span>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => investMutation.mutate()}
                  disabled={!amount || parseFloat(amount) <= 0 || investMutation.isPending}
                  className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                >
                  {investMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Invest {amount ? formatCurrency(parseFloat(amount)) : ""}
                </button>
              </div>
            </div>
          )}

          {/* Owner card */}
          <div className="noor-card p-5">
            <h3 className="text-sm font-semibold mb-3">Business Owner</h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                {proposal.owner?.name?.[0] ?? "?"}
              </div>
              <div>
                <div className="text-sm font-medium">{proposal.owner?.name}</div>
                <div className="text-xs text-muted-foreground">{proposal.owner?.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
