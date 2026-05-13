"use client";
import { Star8, Rub, TilePattern } from "@/components/shared/NoorGeometry";

const PILLARS = [
  { ar: "لا ربا", en: "No Riba",   color: "var(--coral)",  d: "Zero interest. Profit only when real value is created." },
  { ar: "لا غرر", en: "No Gharar", color: "var(--pink)",   d: "No excessive uncertainty. Every deal is documented, verified, and transparent." },
  { ar: "لا حرام", en: "No Haram", color: "var(--purple)", d: "No alcohol, gambling, tobacco, conventional banking, or prohibited industries." },
];

const SCHOLARS = ["Mufti A. Rahman", "Sheikh Y. Ibrahim", "Dr. S. Hossain"];

export function Pillars() {
  return (
    <section
      id="shariah"
      className="relative overflow-hidden py-28"
      style={{ background: "var(--ink)", color: "var(--cream)" }}
    >
      {/* Background geometry */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <TilePattern color="rgba(255,245,181,0.5)" />
      </div>
      <div
        className="absolute right-4 top-8 animate-spin-slow opacity-20"
        style={{ animationDuration: "60s" }}
      >
        <Rub size={320} fill="var(--coral)" />
      </div>
      <div
        className="absolute -left-8 bottom-6 animate-spin-slow opacity-15"
        style={{ animationDirection: "reverse", animationDuration: "90s" }}
      >
        <Star8 size={280} fill="var(--pink)" />
      </div>

      <div className="wrap relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <div
            className="eyebrow mb-3"
            style={{ color: "var(--cream-deep)" }}
          >
            The three pillars
          </div>
          <h2
            className="font-display mx-auto font-medium"
            style={{
              fontSize: "clamp(40px,5.5vw,68px)",
              letterSpacing: "-0.035em",
              maxWidth: 820,
              color: "var(--cream)",
            }}
          >
            Halal isn&apos;t a checkbox.{" "}
            <span className="noor-gradient-text italic">
              It&apos;s the architecture.
            </span>
          </h2>
        </div>

        {/* Pillar cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div
              key={p.en}
              className="relative overflow-hidden rounded-2xl p-9"
              style={{
                background: "rgba(255,245,181,0.05)",
                border: "1px solid rgba(255,245,181,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="pointer-events-none absolute -right-5 -top-5 opacity-10">
                <Star8 size={130} fill={p.color} />
              </div>
              <div
                className="font-display mb-6 text-5xl font-medium leading-none"
                dir="rtl"
                style={{ color: p.color }}
              >
                {p.ar}
              </div>
              <h3
                className="mb-3 text-2xl font-semibold"
                style={{ color: "var(--cream)" }}
              >
                {p.en}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--cream-deep)", opacity: 0.85 }}
              >
                {p.d}
              </p>
            </div>
          ))}
        </div>

        {/* Scholar board */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
          <div className="text-sm" style={{ color: "var(--cream-deep)" }}>
            Reviewed by our Shariah Board:
          </div>
          {SCHOLARS.map((name) => (
            <div key={name} className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  background: "var(--cream)",
                  color: "var(--ink)",
                  border: "1.5px solid var(--ink)",
                }}
              >
                {name.split(" ")[1][0]}
              </div>
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
