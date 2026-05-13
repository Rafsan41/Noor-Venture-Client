"use client";
import { useState } from "react";

const INVESTOR_STEPS = [
  { t: "Create your investor account", d: "KYC takes 2 minutes. We verify, you start." },
  { t: "Fund your Noor Wallet",         d: "Deposit via bank, mobile banking, or crypto. Sits in escrow until invested." },
  { t: "Browse AI-screened proposals",  d: "Every deal carries a Shariah score, sector tag, and AI risk read." },
  { t: "Commit your share",             d: "Pick your contribution. Your % of the partnership is locked in." },
  { t: "Receive monthly profit share",  d: "Audited reports drop. Profits land in your wallet automatically." },
];

const BUSINESS_STEPS = [
  { t: "Register as a business owner",   d: "Trade license, bank verification, beneficial-owner check." },
  { t: "Draft your proposal",            d: "Our AI co-pilot helps you write it. Add P&L, sector, runway." },
  { t: "Pass Shariah + admin review",    d: "Scholar board signs off. Listed publicly within 72 hours." },
  { t: "Get funded by the community",    d: "Live funding bar. Investors commit. Money in escrow." },
  { t: "Report monthly, share profits",  d: "Submit audited P&L. Platform distributes profit share automatically." },
];

export function HowItWorks() {
  const [tab, setTab] = useState<"investor" | "business">("investor");
  const data   = tab === "investor" ? INVESTOR_STEPS : BUSINESS_STEPS;
  const accent = tab === "investor" ? "var(--pink)"  : "var(--coral)";

  return (
    <section id="how" className="py-28">
      <div className="wrap">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="eyebrow mb-3">How it works</div>
          <h2
            className="font-display mb-5 font-medium"
            style={{ fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.035em" }}
          >
            Two sides of the same partnership.
          </h2>

          {/* Toggle */}
          <div
            className="inline-flex gap-1 rounded-full border-2 p-1.5"
            style={{ background: "var(--paper-2)", borderColor: "var(--ink)" }}
          >
            {(["investor", "business"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
                style={{
                  background: tab === t ? "var(--ink)" : "transparent",
                  color: tab === t ? "var(--cream)" : "var(--ink)",
                }}
              >
                {t === "investor" ? "For Investors" : "For Businesses"}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div
            className="absolute left-9 top-0 bottom-0 w-0.5"
            style={{ background: "var(--line-strong)" }}
          />

          {data.map((s, i) => (
            <div
              key={i}
              className="relative mb-3 grid items-start gap-7 pb-6"
              style={{ gridTemplateColumns: "76px 1fr auto" }}
            >
              {/* Step circle */}
              <div
                className="flex h-[76px] w-[76px] items-center justify-center rounded-full border-2 font-display text-3xl font-semibold text-white"
                style={{
                  background: accent,
                  borderColor: "var(--ink)",
                  boxShadow: "4px 4px 0 0 var(--ink)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {i + 1}
              </div>

              <div className="pt-3.5">
                <h3 className="mb-1 text-xl font-semibold tracking-tight">{s.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {s.d}
                </p>
              </div>

              <div
                className="pt-5 font-display text-sm"
                style={{ color: "var(--muted-brand)" }}
              >
                Step {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
