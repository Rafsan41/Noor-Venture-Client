"use client";
import { Percent, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import { TilePattern, Rub, Star8 } from "@/components/shared/NoorGeometry";

const PILLARS = [
  {
    num: "01",
    Icon: Percent,
    en: "No Interest, Ever",
    term: "Riba-free",
    ar: "لا ربا",
    color: "var(--coral)",
    gradient: "linear-gradient(135deg, #FF9071 0%, #E85395 100%)",
    d: "Your returns come only from real business profit — never from charging people for the use of money over time. If the business doesn't earn, we don't either. Skin in the game, on both sides.",
    proof: "0% interest across all 200+ deals",
  },
  {
    num: "02",
    Icon: Eye,
    en: "Radical Transparency",
    term: "Gharar-free",
    ar: "لا غرر",
    color: "var(--pink)",
    gradient: "linear-gradient(135deg, #E85395 0%, #A73CCB 100%)",
    d: "No fine print. No hidden clauses. Every deal is fully documented, independently audited, and publicly visible on-platform — so you always know exactly what you are investing in.",
    proof: "Full audit log published for every deal",
  },
  {
    num: "03",
    Icon: ShieldCheck,
    en: "Ethical Screening",
    term: "Harm-free sectors",
    ar: "لا حرام",
    color: "var(--purple)",
    gradient: "linear-gradient(135deg, #A73CCB 0%, #6C3CF5 100%)",
    d: "Every proposal passes both AI risk screening and a 3-scholar ethics review. No alcohol, gambling, tobacco, weapons, or exploitative industries — period.",
    proof: "AI + Shariah board review on every proposal",
  },
];

const SCHOLARS = ["Mufti A. Rahman", "Sheikh Y. Ibrahim", "Dr. S. Hossain"];

export function Pillars() {
  return (
    <section
      id="shariah"
      className="relative overflow-hidden py-28"
      style={{ background: "var(--ink)", color: "var(--paper)" }}
    >
      {/* Background geometry */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <TilePattern color="rgba(255,245,181,0.6)" />
      </div>
      <div className="absolute right-0 top-0 opacity-[0.08] pointer-events-none" style={{ animationDuration: "80s" }}>
        <Rub size={400} fill="var(--coral)" />
      </div>
      <div className="absolute -left-16 bottom-0 opacity-[0.06] pointer-events-none">
        <Star8 size={320} fill="var(--purple)" />
      </div>

      <div className="wrap relative">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="eyebrow mb-3" style={{ color: "var(--paper)", opacity: 0.6 }}>
            Our ethical foundation
          </div>
          <h2
            className="font-display mb-5 font-medium"
            style={{
              fontSize: "clamp(38px, 5vw, 62px)",
              letterSpacing: "-0.035em",
              color: "var(--paper)",
              lineHeight: 1.1,
            }}
          >
            Ethics isn&apos;t a feature.{" "}
            <span className="noor-gradient-text italic">
              It&apos;s the architecture.
            </span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--paper)", opacity: 0.65, maxWidth: 480 }}>
            Three non-negotiable principles, built into every layer of NoorVenture —
            not as policy checkboxes, but as structural constraints.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => {
            const { Icon } = p;
            return (
              <div
                key={p.en}
                className="group relative flex flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,245,181,0.04)",
                  border: "1.5px solid rgba(255,245,181,0.12)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Top row: number + Arabic badge */}
                <div className="mb-7 flex items-start justify-between">
                  {/* Number */}
                  <span
                    className="font-display text-sm font-bold"
                    style={{ color: p.color, letterSpacing: "0.05em" }}
                  >
                    {p.num}
                  </span>

                  {/* Arabic term pill */}
                  <div
                    className="flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{
                      background: "rgba(255,245,181,0.08)",
                      border: "1px solid rgba(255,245,181,0.15)",
                    }}
                  >
                    <span
                      className="font-display text-sm font-medium"
                      dir="rtl"
                      style={{ color: p.color }}
                    >
                      {p.ar}
                    </span>
                    <span className="text-xs" style={{ color: "var(--paper)", opacity: 0.5 }}>
                      · {p.term}
                    </span>
                  </div>
                </div>

                {/* Icon box */}
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: p.gradient,
                    boxShadow: `0 8px 24px -8px ${p.color}80`,
                  }}
                >
                  <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>

                {/* Text */}
                <h3
                  className="mb-3 text-xl font-semibold leading-tight"
                  style={{ color: "var(--paper)" }}
                >
                  {p.en}
                </h3>
                <p
                  className="mb-6 flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--paper)", opacity: 0.68 }}
                >
                  {p.d}
                </p>

                {/* Proof chip */}
                <div
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2.5"
                  style={{
                    background: "rgba(255,245,181,0.06)",
                    border: "1px solid rgba(255,245,181,0.1)",
                  }}
                >
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: p.color }} />
                  <span className="text-xs font-medium" style={{ color: "var(--paper)", opacity: 0.8 }}>
                    {p.proof}
                  </span>
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 rounded-b-3xl transition-all duration-500 group-hover:w-full"
                  style={{ background: p.gradient }}
                />
              </div>
            );
          })}
        </div>

        {/* Scholar board */}
        <div
          className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl px-8 py-5"
          style={{
            background: "rgba(255,245,181,0.04)",
            border: "1px solid rgba(255,245,181,0.1)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
              style={{ background: "var(--coral)", color: "white" }}
            >
              ✓
            </div>
            <span className="text-sm font-medium" style={{ color: "var(--paper)", opacity: 0.85 }}>
              Independently reviewed by our Shariah Ethics Board
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {SCHOLARS.map((name) => (
              <div key={name} className="flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: "rgba(255,245,181,0.12)",
                    color: "var(--paper)",
                    border: "1px solid rgba(255,245,181,0.2)",
                  }}
                >
                  {name[0]}
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--paper)", opacity: 0.7 }}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
