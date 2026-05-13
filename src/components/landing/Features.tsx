"use client";
import Link from "next/link";
import { Star8 } from "@/components/shared/NoorGeometry";

const FEATURES = [
  {
    icon: "⌬", color: "var(--coral)",
    title: "AI Shariah Screening",
    desc: "Every proposal is audited by NoorAI for riba, gharar, and haram exposure — then reviewed by our scholar board.",
  },
  {
    icon: "◐", color: "var(--pink)",
    title: "Live Market Pulse",
    desc: "Real-time funding progress, public investor tape, monthly profit distributions. Total transparency.",
  },
  {
    icon: "✦", color: "var(--purple)",
    title: "AI Deal Matching",
    desc: "Claude AI matches you to proposals based on your risk, sector preference, and past investments.",
  },
  {
    icon: "⌗", color: "var(--ink)",
    title: "Audited Profit Reports",
    desc: "Businesses submit monthly P&L reports. Your profit share lands automatically in your Noor Wallet.",
  },
  {
    icon: "◈", color: "var(--coral)",
    title: "NoorAI Co-pilot",
    desc: "Generate proposals, screen deals, get risk assessments — your ethical-finance analyst available around the clock.",
  },
  {
    icon: "☾", color: "var(--pink)",
    title: "True Profit & Loss Share",
    desc: "Pure Musharakah. No hidden fees, no interest, no speculation. The business succeeds, you succeed.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-28 relative"
      style={{
        background: "var(--paper-2)",
        borderTop: "1.5px solid var(--ink)",
        borderBottom: "1.5px solid var(--ink)",
      }}
    >
      <div className="wrap">
        {/* Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3">What&apos;s inside</div>
            <h2
              className="font-display font-medium"
              style={{ fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.035em", maxWidth: 720 }}
            >
              Built for principled capital.
              <br />
              <span className="noor-gradient-text italic font-normal">
                Not a fintech toy.
              </span>
            </h2>
          </div>
          <Link
            href="/proposals"
            className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
            style={{ borderColor: "var(--ink)", color: "var(--ink)", background: "var(--cream)" }}
          >
            Explore proposals →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border p-7 transition-all duration-200"
              style={{
                background: "var(--surface)",
                borderColor: "var(--ink)",
                borderWidth: "1.5px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 0 0 var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              }}
            >
              {/* Icon */}
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border text-2xl text-white"
                style={{
                  background: f.color,
                  borderColor: "var(--ink)",
                  borderWidth: "1.5px",
                }}
              >
                {f.icon}
              </div>

              <h3 className="mb-2 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {f.desc}
              </p>

              {/* Background deco */}
              <div className="pointer-events-none absolute -bottom-5 -right-5 opacity-5">
                <Star8 size={120} fill={f.color} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
