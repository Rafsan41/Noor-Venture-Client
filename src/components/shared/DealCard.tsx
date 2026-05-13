"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, MapPin, Shield } from "lucide-react";
import { FundingProgress } from "@/components/shared/FundingProgress";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TilePattern } from "@/components/shared/NoorGeometry";
import { formatCurrency } from "@/utils/format";

export interface DealCardProps {
  id:            string;
  title:         string;
  businessName?: string;
  sector:        string;
  location?:     string;
  status:        string;
  raisedAmount:  number | string;
  fundingGoal:   number | string;
  returnRate?:   number;
  shariahScore?: number;         // 0–100
  minInvestment?: number | string;
  href?:         string;
  compact?:      boolean;
}

const SECTOR_COLORS: Record<string, string> = {
  "Tech":        "#A73CCB",
  "Technology":  "#A73CCB",
  "Food":        "#FF5C35",
  "Agriculture": "#059669",
  "Education":   "#2563EB",
  "Finance":     "#E85395",
  "Healthcare":  "#0891B2",
  "Retail":      "#D97706",
  "Real Estate": "#7C3AED",
};

export function DealCard({
  id, title, businessName, sector, location, status,
  raisedAmount, fundingGoal, returnRate, shariahScore,
  minInvestment, href, compact = false,
}: DealCardProps) {
  const [hovered, setHovered] = useState(false);

  const cardHref = href ?? `/proposals/${id}`;
  const accentColor = SECTOR_COLORS[sector] ?? "#E85395";
  const scoreGood = shariahScore !== undefined && shariahScore >= 80;

  return (
    <Link
      href={cardHref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block rounded-2xl overflow-hidden transition-all duration-150 no-underline"
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--ink)",
        boxShadow: hovered ? "8px 8px 0 0 var(--ink)" : "3px 3px 0 0 var(--line)",
        transform: hovered ? "translate(-3px, -3px)" : "none",
        textDecoration: "none",
      }}
    >
      {/* Banner */}
      <div
        className="relative h-[80px] flex items-end px-4 pb-3"
        style={{ background: accentColor, overflow: "hidden" }}
      >
        <TilePattern color="rgba(255,255,255,0.12)" className="absolute inset-0" />

        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Sector pill */}
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            {sector}
          </span>

          {/* Shariah score */}
          {shariahScore !== undefined && (
            <span
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
              style={{
                background: scoreGood ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.25)",
                color: scoreGood ? "#059669" : "rgba(255,255,255,0.9)",
              }}
            >
              <Shield className="h-3 w-3" />
              {shariahScore}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Title + status */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-display font-semibold text-sm leading-snug line-clamp-2 flex-1"
            style={{ color: "var(--ink)" }}
          >
            {title}
          </h3>
          <StatusBadge status={status} className="shrink-0 mt-0.5" />
        </div>

        {/* Business name + location */}
        {!compact && (
          <div
            className="flex items-center gap-3 mb-3"
            style={{ fontSize: 11, color: "var(--muted-brand)" }}
          >
            {businessName && <span className="truncate">{businessName}</span>}
            {location && (
              <span className="flex items-center gap-0.5 shrink-0">
                <MapPin className="h-3 w-3" />
                {location}
              </span>
            )}
          </div>
        )}

        {/* Funding progress */}
        <div className="mb-3">
          <FundingProgress
            raised={raisedAmount}
            goal={fundingGoal}
            size="sm"
            showLabels={!compact}
          />
        </div>

        {/* Bottom row: return rate + min investment */}
        <div className="flex items-center justify-between">
          {returnRate !== undefined && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" style={{ color: "#059669" }} />
              <span
                className="text-xs font-bold"
                style={{ color: "#059669" }}
              >
                {returnRate}% p.a.
              </span>
            </div>
          )}

          {minInvestment !== undefined && (
            <div style={{ fontSize: 11, color: "var(--muted-brand)" }}>
              Min{" "}
              <span
                className="font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {formatCurrency(minInvestment)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
