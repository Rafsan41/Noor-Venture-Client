"use client";
import { LiveDot } from "@/components/shared/NoorGeometry";

const ITEMS = [
  { n: "Ahmad R.",   a: "৳50,000",  d: "TechHub Dhaka" },
  { n: "Priya S.",   a: "৳25,000",  d: "GreenHarvest Foods" },
  { n: "Yusuf K.",   a: "৳80,000",  d: "Modest Threads" },
  { n: "Daniel M.",  a: "৳40,000",  d: "Olive Press Co." },
  { n: "Mariam T.",  a: "৳15,000",  d: "ClearWater Tech" },
  { n: "Bilal H.",   a: "৳120,000", d: "Crescent Logistics" },
  { n: "Sara L.",    a: "৳35,000",  d: "Souk Marketplace" },
  { n: "Rahim C.",   a: "৳60,000",  d: "EduBridge Academy" },
];

export function Ticker() {
  const full = [...ITEMS, ...ITEMS];
  return (
    <section
      className="overflow-hidden border-y py-4"
      style={{
        background: "var(--ink)",
        borderColor: "var(--ink)",
        color: "var(--paper)",
      }}
    >
      <div className="marquee-track">
        {full.map((it, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3.5 text-sm"
          >
            <LiveDot color="#10b981" />
            <span className="font-semibold">{it.n}</span>
            <span style={{ color: "var(--paper)", opacity: 0.65 }}>
              invested
            </span>
            <span className="font-bold noor-gradient-text">
              {it.a}
            </span>
            <span style={{ color: "var(--paper)", opacity: 0.65 }}>in</span>
            <span className="font-medium">{it.d}</span>
            <span
              className="mx-4 text-lg"
              style={{ color: "var(--pink)" }}
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
