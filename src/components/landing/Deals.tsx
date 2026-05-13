"use client";
import Link from "next/link";
import { TilePattern, LiveDot } from "@/components/shared/NoorGeometry";

const DEALS = [
  { id: 1, name: "Crescent Logistics", tag: "Logistics", icon: "🚛", raised: 1_850_000, target: 2_500_000, ret: 19, dur: 18, sha: 96, color: "var(--coral)" },
  { id: 2, name: "Olive Press Co.",    tag: "Food",      icon: "🫒", raised: 720_000,   target: 800_000,   ret: 16, dur: 12, sha: 98, color: "var(--pink)" },
  { id: 3, name: "Modest Threads",     tag: "Retail",    icon: "🧵", raised: 340_000,   target: 1_200_000, ret: 22, dur: 24, sha: 92, color: "var(--purple)" },
];

function DealCard({ d }: { d: typeof DEALS[number] }) {
  const pct = Math.round((d.raised / d.target) * 100);
  return (
    <Link
      href={`/proposals`}
      className="block overflow-hidden rounded-2xl transition-all duration-200"
      style={{ border: "1.5px solid var(--ink)", background: "white" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "8px 8px 0 0 var(--ink)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
      }}
    >
      {/* Banner */}
      <div
        className="relative h-36 border-b"
        style={{ background: d.color, borderColor: "var(--ink)" }}
      >
        <TilePattern color="rgba(255,255,255,0.18)" />
        {/* Funded badge */}
        <div
          className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
          style={{ background: "rgba(26,11,46,0.9)", color: "var(--cream)" }}
        >
          <LiveDot color="#10b981" />
          {pct}% funded
        </div>
        {/* Shariah score */}
        <div
          className="absolute right-4 top-4 rounded-full border-2 px-2.5 py-1 text-xs font-bold"
          style={{ background: "white", color: "var(--ink)", borderColor: "var(--ink)" }}
        >
          ⌬ {d.sha}/100
        </div>
        {/* Emoji icon */}
        <div className="absolute -bottom-5 right-4 text-6xl" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))" }}>
          {d.icon}
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="mb-1.5 flex items-center justify-between">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--muted-brand)" }}
          >
            {d.tag}
          </span>
          <span className="text-xs" style={{ color: "var(--muted-brand)" }}>
            {d.dur} mo
          </span>
        </div>
        <h3 className="mb-4 text-xl font-semibold tracking-tight">{d.name}</h3>

        {/* Progress bar */}
        <div className="mb-2 h-2 overflow-hidden rounded-full" style={{ background: "var(--line)" }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: "var(--grad)" }}
          />
        </div>

        <div className="mb-5 flex justify-between text-sm">
          <span>
            <strong className="font-display text-base">
              ৳{(d.raised / 1000).toFixed(0)}K
            </strong>{" "}
            <span style={{ color: "var(--muted-brand)" }}>raised</span>
          </span>
          <span style={{ color: "var(--muted-brand)" }}>
            of ৳{(d.target / 1000).toFixed(0)}K
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold"
            style={{ background: "var(--emerald-soft)", color: "var(--emerald-c)" }}
          >
            {d.ret}% projected
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--pink-deep)" }}>
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Deals() {
  return (
    <section
      className="py-28"
      style={{
        background: "var(--paper-2)",
        borderTop: "1.5px solid var(--ink)",
        borderBottom: "1.5px solid var(--ink)",
      }}
    >
      <div className="wrap">
        <div className="mb-11 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="eyebrow mb-3">Live now</div>
            <h2
              className="font-display font-medium"
              style={{ fontSize: "clamp(36px,4.5vw,56px)", letterSpacing: "-0.035em" }}
            >
              Open partnerships
              <br />
              <span className="italic">this week.</span>
            </h2>
          </div>
          <Link
            href="/proposals"
            className="inline-flex items-center rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
            style={{
              borderColor: "var(--ink)",
              color: "var(--ink)",
              background: "var(--cream)",
            }}
          >
            Browse all 38 deals →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEALS.map((d) => (
            <DealCard key={d.id} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
