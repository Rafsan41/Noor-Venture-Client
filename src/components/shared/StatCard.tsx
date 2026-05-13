"use client";

import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { LiveDot } from "@/components/shared/NoorGeometry";

interface StatCardProps {
  title:     string;
  value:     string | number;
  subtitle?: string;
  icon:      LucideIcon;
  trend?:    { value: number; label: string };
  color?:    "coral" | "emerald" | "blue" | "purple" | "blush" | "ink";
  live?:     boolean;
  onClick?:  () => void;
}

const colorMap: Record<string, { iconBg: string; iconColor: string; accent: string }> = {
  coral:   { iconBg: "#FFF0EC", iconColor: "#FF5C35",  accent: "#FF9071" },
  blush:   { iconBg: "#FDE8F1", iconColor: "#E85395",  accent: "#E85395" },
  emerald: { iconBg: "#E6FAF4", iconColor: "#059669",  accent: "#059669" },
  blue:    { iconBg: "#EFF6FF", iconColor: "#2563EB",  accent: "#2563EB" },
  purple:  { iconBg: "#F5EAFB", iconColor: "#A73CCB",  accent: "#A73CCB" },
  ink:     { iconBg: "#F0EAF8", iconColor: "#1A0B2E",  accent: "#1A0B2E" },
};

export function StatCard({
  title, value, subtitle, icon: Icon, trend, color = "coral", live, onClick,
}: StatCardProps) {
  const [hovered, setHovered] = useState(false);
  const c = colorMap[color] ?? colorMap.coral;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="rounded-2xl p-5 transition-all duration-150 cursor-default"
      style={{
        background: "white",
        border: "1.5px solid var(--ink)",
        boxShadow: hovered ? "6px 6px 0 0 var(--ink)" : "3px 3px 0 0 var(--line)",
        transform: hovered ? "translate(-2px, -2px)" : "none",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {/* Top row: icon box + live badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: c.iconBg }}
        >
          <Icon className="h-5 w-5" style={{ color: c.iconColor }} />
        </div>

        {live && (
          <div
            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1"
            style={{
              background: "var(--paper-2)",
              borderColor: "var(--line)",
              fontSize: 10.5,
              fontWeight: 600,
              color: "var(--muted-brand)",
            }}
          >
            <LiveDot color="#10b981" />
            Live
          </div>
        )}
      </div>

      {/* Value */}
      <div
        className="font-display text-2xl font-bold leading-none mb-1"
        style={{ color: "var(--ink)" }}
      >
        {value}
      </div>

      {/* Title */}
      <div className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="text-xs mt-0.5" style={{ color: "var(--muted-brand)" }}>
          {subtitle}
        </div>
      )}

      {/* Trend */}
      {trend && (
        <div
          className="mt-3 flex items-center gap-1 text-xs font-semibold"
          style={{ color: trend.value >= 0 ? "#059669" : "#E85395" }}
        >
          <span>{trend.value >= 0 ? "↑" : "↓"}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span className="font-normal" style={{ color: "var(--muted-brand)" }}>
            {trend.label}
          </span>
        </div>
      )}
    </div>
  );
}
