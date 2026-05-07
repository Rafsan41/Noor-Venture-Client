"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Wallet, ArrowDownCircle, ArrowUpCircle, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { apiGet, apiPost } from "@/lib/api";
import { formatCurrency, formatDateTime } from "@/utils/format";
import { cn } from "@/lib/utils";
import type { ApiResponse, Wallet as WalletType, Transaction, TransactionType } from "@/types";

const TX_ICONS: Record<TransactionType, string> = {
  DEPOSIT:    "↓",
  WITHDRAWAL: "↑",
  INVESTMENT: "→",
  PROFIT:     "★",
  REFUND:     "↩",
};

const TX_COLORS: Record<TransactionType, string> = {
  DEPOSIT:    "text-emerald-600",
  WITHDRAWAL: "text-red-500",
  INVESTMENT: "text-blue-600",
  PROFIT:     "text-amber-600",
  REFUND:     "text-purple-600",
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
    queryFn:  () => apiGet<ApiResponse<Transaction[]>>("/wallet/transactions"),
  });

  const mutation = useMutation({
    mutationFn: () =>
      apiPost(`/wallet/${action}`, { amount: parseFloat(amount) }),
    onSuccess: () => {
      toast.success(`${action === "deposit" ? "Deposited" : "Withdrawn"} ${formatCurrency(parseFloat(amount))} successfully!`);
      qc.invalidateQueries({ queryKey: ["wallet"] });
      setAmount("");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const wallet       = walletRes?.data;
  const transactions = txRes?.data ?? [];

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Noor Wallet</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your halal investment funds</p>
      </div>

      {/* Balance Card */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-6 w-6 opacity-80" />
          <span className="text-sm opacity-80">Available Balance</span>
        </div>
        {isLoading ? (
          <div className="h-10 w-40 bg-white/20 rounded-lg animate-pulse" />
        ) : (
          <div className="text-4xl font-bold">{formatCurrency(wallet?.balance ?? 0)}</div>
        )}
        <p className="text-xs opacity-70 mt-2">Halal · Zero interest · Sharia-compliant</p>
      </div>

      {/* Deposit / Withdraw */}
      <div className="noor-card p-5">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setAction("deposit")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              action === "deposit"
                ? "bg-emerald-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <ArrowDownCircle className="h-4 w-4" /> Deposit
          </button>
          <button
            onClick={() => setAction("withdraw")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              action === "withdraw"
                ? "bg-red-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <ArrowUpCircle className="h-4 w-4" /> Withdraw
          </button>
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in BDT"
            className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={() => mutation.mutate()}
            disabled={!amount || parseFloat(amount) <= 0 || mutation.isPending}
            className={cn(
              "rounded-lg px-5 py-2 text-sm font-medium text-white disabled:opacity-60 transition-colors flex items-center gap-2",
              action === "deposit" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
            )}
          >
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {action === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        </div>
        {/* Quick amounts */}
        <div className="flex gap-2 mt-3">
          {[1000, 5000, 10000, 50000].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(String(v))}
              className="rounded-lg bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              ৳{(v / 1000).toFixed(0)}K
            </button>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="noor-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold">Transaction History</h3>
          <button
            onClick={() => qc.invalidateQueries({ queryKey: ["wallet", "transactions"] })}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-4 px-6 py-4">
              <div className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold bg-muted",
                TX_COLORS[tx.type]
              )}>
                {TX_ICONS[tx.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium capitalize">
                  {tx.type.toLowerCase().replace("_", " ")}
                </div>
                <div className="text-xs text-muted-foreground truncate">{tx.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className={cn("text-sm font-semibold", TX_COLORS[tx.type])}>
                  {["DEPOSIT", "PROFIT", "REFUND"].includes(tx.type) ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </div>
                <div className="text-xs text-muted-foreground">{formatDateTime(tx.createdAt)}</div>
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground">
              <p className="text-sm">No transactions yet. Make your first deposit!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
