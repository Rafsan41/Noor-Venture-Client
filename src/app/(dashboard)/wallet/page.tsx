"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Wallet, ArrowDownCircle, ArrowUpCircle, RefreshCw, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";

import { apiGet, apiPost } from "@/lib/api";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatCurrency, formatDateTime } from "@/utils/format";
import type { ApiResponse, Wallet as WalletType, Transaction, TransactionType } from "@/types";

const TX_META: Record<TransactionType, { icon: string; color: string; sign: string }> = {
  DEPOSIT:    { icon: "↓", color: "#10b981", sign: "+" },
  WITHDRAWAL: { icon: "↑", color: "#ef4444", sign: "-" },
  INVESTMENT: { icon: "→", color: "#A73CCB", sign: "-" },
  PROFIT:     { icon: "★", color: "#E85395", sign: "+" },
  REFUND:     { icon: "↩", color: "#FF9071", sign: "+" },
};

const CARD_STYLE = {
  background: "var(--surface)",
  border: "1.5px solid var(--line)",
  borderRadius: 20,
};

export default function WalletPage() {
  const qc = useQueryClient();
  const [amount, setAmount]   = useState("");
  const [action, setAction]   = useState<"deposit" | "withdraw">("deposit");

  const { data: walletRes, isLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn:  () => apiGet<ApiResponse<WalletType>>("/wallet"),
  });

  const { data: txRes } = useQuery({
    queryKey: ["wallet", "transactions"],
    queryFn:  () => apiGet<ApiResponse<{ transactions: Transaction[]; total: number }>>("/wallet/transactions"),
  });

  const mutation = useMutation({
    mutationFn: () => apiPost(`/wallet/${action}`, { amount: parseFloat(amount) }),
    onSuccess: () => {
      toast.success(`${action === "deposit" ? "Deposited" : "Withdrawn"} ${formatCurrency(parseFloat(amount))} successfully!`);
      qc.invalidateQueries({ queryKey: ["wallet"] });
      setAmount("");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const wallet       = walletRes?.data;
  const transactions = txRes?.data?.transactions ?? [];

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl space-y-6">

        {/* Page header */}
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
            Noor Wallet
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
            Deposit, withdraw, and track your investment funds
          </p>
        </div>

        {/* Balance card */}
        <div
          className="relative overflow-hidden rounded-3xl p-8"
          style={{
            background: "var(--grad)",
            boxShadow: "0 20px 60px -20px rgba(231,83,149,0.45)",
          }}
        >
          {/* Subtle pattern overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
          />
          <div className="relative">
            <div className="mb-1 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-white opacity-80" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white opacity-80">
                Available Balance
              </span>
            </div>
            {isLoading ? (
              <div className="my-2 h-12 w-48 animate-pulse rounded-xl bg-white/20" />
            ) : (
              <div className="font-display text-5xl font-semibold text-white" style={{ letterSpacing: "-0.03em" }}>
                {formatCurrency(wallet?.balance ?? 0)}
              </div>
            )}
            <p className="mt-3 text-xs text-white opacity-70">
              Riba-free · Zero interest · Transparent profit-sharing
            </p>
          </div>
        </div>

        {/* Deposit / Withdraw card */}
        <div className="rounded-2xl p-6" style={CARD_STYLE}>
          {/* Tab toggle */}
          <div className="mb-5 flex gap-2">
            <button
              onClick={() => setAction("deposit")}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
              style={{
                background: action === "deposit" ? "#10b981" : "var(--paper-2)",
                color:      action === "deposit" ? "white"   : "var(--ink-soft)",
                border:     action === "deposit" ? "1.5px solid #10b981" : "1.5px solid var(--line)",
              }}
            >
              <ArrowDownCircle className="h-4 w-4" /> Deposit
            </button>
            <button
              onClick={() => setAction("withdraw")}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
              style={{
                background: action === "withdraw" ? "#ef4444" : "var(--paper-2)",
                color:      action === "withdraw" ? "white"   : "var(--ink-soft)",
                border:     action === "withdraw" ? "1.5px solid #ef4444" : "1.5px solid var(--line)",
              }}
            >
              <ArrowUpCircle className="h-4 w-4" /> Withdraw
            </button>
          </div>

          {/* Amount input */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span
                className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold"
                style={{ color: "var(--ink-soft)" }}
              >৳</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border py-3 pl-9 pr-4 text-sm outline-none transition-shadow focus:ring-2"
                style={{ borderColor: "var(--line)", background: "var(--paper-2)", fontFamily: "inherit" }}
              />
            </div>
            <button
              onClick={() => mutation.mutate()}
              disabled={!amount || parseFloat(amount) <= 0 || mutation.isPending}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white disabled:opacity-50 transition-opacity hover:opacity-90"
              style={{ background: action === "deposit" ? "#10b981" : "#ef4444" }}
            >
              {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {action === "deposit" ? "Deposit" : "Withdraw"}
            </button>
          </div>

          {/* Quick amounts */}
          <div className="mt-3 flex gap-2">
            <span className="text-xs self-center" style={{ color: "var(--ink-soft)" }}>Quick:</span>
            {[1000, 5000, 10000, 50000].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(String(v))}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                style={{ background: "var(--paper-2)", color: "var(--ink-soft)", border: "1px solid var(--line)" }}
              >
                ৳{v >= 1000 ? `${v / 1000}K` : v}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        <div className="overflow-hidden rounded-2xl" style={CARD_STYLE}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
            <div>
              <h3 className="font-semibold">Transaction History</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>
                {transactions.length} transactions
              </p>
            </div>
            <button
              onClick={() => qc.invalidateQueries({ queryKey: ["wallet", "transactions"] })}
              className="rounded-full p-2 transition-colors hover:bg-[var(--paper-2)]"
              style={{ color: "var(--ink-soft)" }}
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          <div>
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "var(--paper-2)", border: "1.5px solid var(--line)" }}
                >
                  <Zap className="h-6 w-6" style={{ color: "var(--pink)" }} />
                </div>
                <p className="font-medium" style={{ color: "var(--ink)" }}>No transactions yet</p>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>Make your first deposit to get started</p>
              </div>
            ) : (
              transactions.map((tx, i) => {
                const m = TX_META[tx.type];
                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[var(--paper-2)]"
                    style={{ borderBottom: i < transactions.length - 1 ? "1px solid var(--line)" : "none" }}
                  >
                    {/* Icon */}
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                      style={{ background: `${m.color}18`, color: m.color, border: `1.5px solid ${m.color}30` }}
                    >
                      {m.icon}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold capitalize" style={{ color: "var(--ink)" }}>
                        {tx.type.toLowerCase().replace("_", " ")}
                      </div>
                      <div className="truncate text-xs" style={{ color: "var(--ink-soft)" }}>
                        {tx.description}
                      </div>
                    </div>

                    {/* Amount & time */}
                    <div className="shrink-0 text-right">
                      <div className="text-sm font-bold" style={{ color: m.color }}>
                        {m.sign}{formatCurrency(tx.amount)}
                      </div>
                      <div className="text-xs" style={{ color: "var(--ink-soft)" }}>
                        {formatDateTime(tx.createdAt)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
