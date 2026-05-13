"use client";
import { LiveDot } from "@/components/shared/NoorGeometry";

const ITEMS = [
  { n: "Ahmad R.",  a: "৳50,000",  d: "TechHub Dhaka" },
  { n: "Fatima A.", a: "৳25,000",  d: "HalalFoods Co." },
  { n: "Yusuf S.",  a: "৳80,000",  d: "Modest Threads" },
  { n: "Mariam K.", a: "৳15,000",  d: "Olive Press Co." },
  { n: "Bilal H.",  a: "৳120,000", d: "Crescent Logistics" },
  { n: "Aisha M.",  a: "৳35,000",  d: "Souk Marketplace" },
  { n: "Hamza T.",  a: "৳60,000",  d: "Madinah Tutors" },
  { n: "Layla F.",  a: "৳20,000",  d: "Hijra Cafe" },
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
