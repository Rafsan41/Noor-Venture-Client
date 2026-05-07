"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BarChart3, Loader2, Brain, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

import { apiGet, apiPost } from "@/lib/api";
import { useAuthStore }    from "@/store/auth.store";
import { DashboardShell }  from "@/components/layout/DashboardShell";
import { formatCurrency, formatDate, monthName, shortNumber } from "@/utils/format";
import type { ApiResponse, ProfitReport, Proposal, ReportAnalysis } from "@/types";

const schema = z.object({
  proposalId: z.string().min(1, "Select a proposal"),
  month:      z.coerce.number().min(1).max(12),
  year:       z.coerce.number().min(2020).max(2030),
  revenue:    z.coerce.number().min(0),
  expenses:   z.coerce.number().min(0),
  notes:      z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export default function ReportsPage() {
  const user = useAuthStore((s) => s.user);
  const qc   = useQueryClient();
  const isOwner = user?.role === "BUSINESS_OWNER";
  const [selectedProposal, setSelectedProposal] = useState<string>("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      month: new Date().getMonth() + 1,
      year:  new Date().getFullYear(),
    },
  });

  const { data: proposalsRes } = useQuery({
    queryKey: ["proposals", "my", "funded"],
    queryFn:  () => apiGet<{ data: Proposal[] }>("/proposals/my"),
    enabled:  isOwner,
  });

  const { data: reportsRes } = useQuery({
    queryKey: ["reports", "my"],
    queryFn:  () => apiGet<ApiResponse<ProfitReport[]>>("/reports/my"),
    enabled:  isOwner,
  });

  const { data: proposalReportsRes } = useQuery({
    queryKey: ["reports", "proposal", selectedProposal],
    queryFn:  () => apiGet<ApiResponse<ProfitReport[]>>(`/reports/proposal/${selectedProposal}`),
    enabled:  !!selectedProposal,
  });

  const { data: analysisRes, isFetching: analyzing, refetch: runAnalysis } = useQuery({
    queryKey: ["reports", "analysis", selectedProposal],
    queryFn:  () => apiPost<ApiResponse<ReportAnalysis>>("/ai/analyze-report", { proposalId: selectedProposal }),
    enabled:  false,
  });

  const createMutation = useMutation({
    mutationFn: (data: FormData) => apiPost("/reports", data),
    onSuccess: () => {
      toast.success("Report submitted! Profits distributed to investors.");
      qc.invalidateQueries({ queryKey: ["reports"] });
      qc.invalidateQueries({ queryKey: ["wallet"] });
      reset();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const reports        = reportsRes?.data ?? [];
  const proposalReports = proposalReportsRes?.data ?? [];
  const proposals      = proposalsRes?.data?.filter(p => ["ACTIVE", "FUNDED"].includes(p.status)) ?? [];
  const analysis       = analysisRes?.data;

  // Chart data from proposal reports
  const chartData = proposalReports.slice(-6).map((r) => ({
    month:    monthName(r.month),
    Revenue:  r.revenue,
    Expenses: r.expenses,
    Profit:   r.netProfit,
  }));

  return (
    <DashboardShell>
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profit Reports</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Submit monthly reports and auto-distribute profits to investors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Report Form */}
        {isOwner && (
          <div className="noor-card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Submit Monthly Report
            </h3>
            <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Proposal</label>
                <select
                  {...register("proposalId")}
                  onChange={(e) => setSelectedProposal(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
                >
                  <option value="">Select proposal...</option>
                  {proposals.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
                {errors.proposalId && <p className="text-xs text-red-500 mt-1">{errors.proposalId.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Month</label>
                  <select
                    {...register("month")}
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <option key={m} value={m}>{monthName(m)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Year</label>
                  <input
                    {...register("year")}
                    type="number"
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Revenue (৳)</label>
                  <input
                    {...register("revenue")}
                    type="number"
                    placeholder="0"
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Expenses (৳)</label>
                  <input
                    {...register("expenses")}
                    type="number"
                    placeholder="0"
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Notes (optional)</label>
                <textarea
                  {...register("notes")}
                  rows={2}
                  placeholder="Any context for investors..."
                  className="w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-coral-400"
                />
              </div>

              <button
                type="submit"
                disabled={createMutation.isPending}
                className="w-full rounded-lg bg-coral-500 py-2.5 text-sm font-semibold text-white hover:bg-coral-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
              >
                {createMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit & Distribute Profits
              </button>
            </form>
          </div>
        )}

        {/* Chart */}
        {selectedProposal && chartData.length > 0 && (
          <div className="noor-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Financial Performance</h3>
              <button
                onClick={() => runAnalysis()}
                disabled={analyzing}
                className="flex items-center gap-1.5 text-xs text-purple-600 font-medium hover:underline"
              >
                <Brain className="h-3.5 w-3.5" />
                {analyzing ? "Analyzing..." : "AI Analysis"}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `৳${shortNumber(v)}`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Revenue"  fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Profit"   fill="#FF8C69" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            {/* AI Analysis */}
            {analysis && (
              <div className="mt-4 rounded-lg bg-purple-50 p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-purple-700 flex items-center gap-1">
                    <Brain className="h-3.5 w-3.5" /> AI Report Analysis
                  </span>
                  <span className={`font-bold ${analysis.healthScore >= 7 ? "text-emerald-600" : analysis.healthScore >= 5 ? "text-coral-600" : "text-red-600"}`}>
                    Health: {analysis.healthScore}/10
                  </span>
                </div>
                <p className="text-purple-700/80"><strong>Trend:</strong> {analysis.trend}</p>
                <p className="text-purple-700/80"><strong>Next Month Projection:</strong> {formatCurrency(analysis.projectedNextMonth)}</p>
                {analysis.recommendations.slice(0, 2).map((r, i) => (
                  <p key={i} className="text-purple-700/80">→ {r}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Recent Reports */}
      <div className="noor-card overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold">Recent Reports</h3>
        </div>
        <div className="divide-y">
          {reports.slice(0, 8).map((r) => (
            <div key={r.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1">
                <div className="text-sm font-medium">{r.proposal?.title ?? "Proposal"}</div>
                <div className="text-xs text-muted-foreground">
                  {monthName(r.month)} {r.year} · Submitted {formatDate(r.createdAt)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-right text-sm shrink-0">
                <div>
                  <div className="font-medium text-emerald-600">{formatCurrency(r.revenue)}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
                <div>
                  <div className="font-medium text-red-500">{formatCurrency(r.expenses)}</div>
                  <div className="text-xs text-muted-foreground">Expenses</div>
                </div>
                <div>
                  <div className={`font-semibold ${r.netProfit >= 0 ? "text-coral-600" : "text-red-600"}`}>
                    {formatCurrency(r.netProfit)}
                  </div>
                  <div className="text-xs text-muted-foreground">Net Profit</div>
                </div>
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No reports yet. Submit your first monthly report above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </DashboardShell>
  );
}
