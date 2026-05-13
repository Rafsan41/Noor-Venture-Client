"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NoorPanelProps {
  children:     React.ReactNode;
  className?:   string;
  hoverable?:   boolean;
  padding?:     "none" | "sm" | "md" | "lg";
  style?:       React.CSSProperties;
}

const padMap = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };

export function NoorPanel({
  children, className, hoverable = false, padding = "md", style,
}: NoorPanelProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={hoverable ? () => setHovered(true)  : undefined}
      onMouseLeave={hoverable ? () => setHovered(false) : undefined}
      className={cn("rounded-2xl transition-all duration-150", padMap[padding], className)}
      style={{
        background: "var(--surface)",
        border: "1.5px solid var(--ink)",
        boxShadow: hoverable && hovered
          ? "6px 6px 0 0 var(--ink)"
          : "3px 3px 0 0 var(--line)",
        transform: hoverable && hovered ? "translate(-2px, -2px)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Section header used inside panels */
export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title:     string;
  subtitle?: string;
  action?:   React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2
          className="font-display font-semibold text-base leading-none"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs mt-1" style={{ color: "var(--muted-brand)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
