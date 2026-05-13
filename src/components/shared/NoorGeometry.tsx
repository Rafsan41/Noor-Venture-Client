"use client";
import { useId } from "react";

/* ── Star8 — 8-point star ──────────────────────────────────── */
export function Star8({
  size = 60,
  fill = "var(--coral)",
  className = "",
  opacity = 1,
}: {
  size?: number;
  fill?: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      aria-hidden
    >
      <path
        d="M50 5 L61 39 L95 50 L61 61 L50 95 L39 61 L5 50 L39 39 Z"
        fill={fill}
      />
    </svg>
  );
}

/* ── Rub — Islamic rub el hizb diamond ─────────────────────── */
export function Rub({
  size = 60,
  fill = "var(--pink)",
  className = "",
}: {
  size?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <g fill={fill}>
        <rect x="20" y="20" width="60" height="60" transform="rotate(0 50 50)" />
        <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
        <circle cx="50" cy="10" r="6" />
        <circle cx="50" cy="90" r="6" />
        <circle cx="10" cy="50" r="6" />
        <circle cx="90" cy="50" r="6" />
      </g>
    </svg>
  );
}

/* ── NoorLogo SVG ───────────────────────────────────────────── */
export function NoorLogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FF9071" />
          <stop offset="55%"  stopColor="#E85395" />
          <stop offset="100%" stopColor="#A73CCB" />
        </linearGradient>
      </defs>
      <path
        d="M20 2 L24 14 L36 16 L27 24 L30 36 L20 30 L10 36 L13 24 L4 16 L16 14 Z"
        fill="url(#logo-g)"
      />
      <circle cx="20" cy="20" r="4" fill="#FFF5B5" />
    </svg>
  );
}

/* ── TilePattern SVG fill ───────────────────────────────────── */
export function TilePattern({
  color = "rgba(26,11,46,0.07)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const patId = `tile-${id}`;
  return (
    <svg
      width="100%"
      height="100%"
      className={className}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <defs>
        <pattern
          id={patId}
          x="0"
          y="0"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={color} strokeWidth="1">
            <path d="M28 0 L56 28 L28 56 L0 28 Z" />
            <circle cx="28" cy="28" r="14" />
            <path d="M28 14 L42 28 L28 42 L14 28 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patId})`} />
    </svg>
  );
}

/* ── Live dot with ping ─────────────────────────────────────── */
export function LiveDot({ color = "#10b981" }: { color?: string }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span
        className="absolute inset-0 rounded-full animate-ping2 opacity-75"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
    </span>
  );
}
