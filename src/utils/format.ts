import { format, formatDistanceToNow } from "date-fns";

export const formatCurrency = (amount: number | string, currency = "BDT") =>
  new Intl.NumberFormat("en-BD", {
    style:                 "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);

export const formatPercent = (n: number, digits = 1) =>
  `${n.toFixed(digits)}%`;

export const formatDate = (date: string | Date) =>
  format(new Date(date), "MMM dd, yyyy");

export const formatDateTime = (date: string | Date) =>
  format(new Date(date), "MMM dd, yyyy HH:mm");

export const timeAgo = (date: string | Date) =>
  formatDistanceToNow(new Date(date), { addSuffix: true });

export const fundingProgress = (raised: number | string, goal: number | string) =>
  Math.min(Math.round((Number(raised) / Number(goal)) * 100), 100);

export const shortNumber = (n: number | string): string => {
  const v = Number(n);
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000)     return `${(v / 1_000).toFixed(1)}K`;
  return String(v);
};

export const monthName = (month: number) =>
  new Date(2024, month - 1, 1).toLocaleString("default", { month: "short" });
