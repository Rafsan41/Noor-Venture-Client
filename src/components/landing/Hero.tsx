"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Star8, Rub, TilePattern, LiveDot } from "@/components/shared/NoorGeometry";

function HeroCard() {
  const [n, setN] = useState(4_218_430);
  useEffect(() => {
    const id = setInterval(
      () => setN((v) => v + Math.floor(Math.random() * 800 + 200)),
      1700
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="animate-rise rise-3 relative">
      {/* Main capital card */}
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: "linear-gradient(160deg,#FFF5B5 0%,#FFE585 100%)",
          border: "1.5px solid var(--ink)",
          boxShadow: "12px 12px 0 0 var(--ink)",
        }}
      >
        <TilePattern color="rgba(26,11,46,0.06)" />
        <div className="relative">
          {/* Header row */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="eyebrow mb-1" style={{ color: "var(--ink)" }}>
                Live capital deployed
              </div>
              <div
                className="font-display text-5xl font-semibold leading-none tracking-tight"
                style={{ letterSpacing: "-0.03em" }}
              >
                ৳{n.toLocaleString()}
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold"
              style={{ background: "var(--ink)", color: "var(--cream)" }}
            >
              <LiveDot color="#FFE585" />
              LIVE
            </div>
          </div>

          {/* Mini sparkline */}
          <svg viewBox="0 0 320 60" width="100%" height="60" className="mb-4">
            <defs>
              <linearGradient id="spark-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#E85395" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#E85395" stopOpacity={0} />
              </linearGradient>
            </defs>
            <path
              d="M0 50 Q40 30 70 35 T140 20 T220 25 T320 8"
              fill="none"
              stroke="#A73CCB"
              strokeWidth="2.5"
            />
            <path
              d="M0 50 Q40 30 70 35 T140 20 T220 25 T320 8 L320 60 L0 60 Z"
              fill="url(#spark-g)"
            />
          </svg>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { l: "Avg return", v: "17.4%" },
              { l: "Active deals", v: "38" },
              { l: "Investors", v: "212" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-xl font-semibold">{s.v}</div>
                <div
                  className="text-xs font-medium"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating card 1 */}
      <div
        className="animate-float absolute -right-8 -top-5 flex items-center gap-2.5 rounded-2xl px-4 py-3"
        style={{
          background: "white",
          border: "1.5px solid var(--ink)",
          boxShadow: "6px 6px 0 0 var(--pink)",
        }}
      >
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
          style={{ background: "var(--coral)" }}
        >
          🌿
        </div>
        <div>
          <div className="text-xs font-bold">HalalFoods Co.</div>
          <div className="text-xs font-semibold" style={{ color: "#0F9D6B" }}>
            + ৳12,400 profit
          </div>
        </div>
      </div>

      {/* Floating card 2 */}
      <div
        className="animate-float absolute -bottom-7 -left-8 rounded-2xl px-4 py-3"
        style={{
          background: "white",
          border: "1.5px solid var(--ink)",
          boxShadow: "-6px 6px 0 0 var(--purple)",
          animationDuration: "9s",
          animationDelay: "1s",
        }}
      >
        <div
          className="mb-1 text-xs"
          style={{ color: "var(--muted-brand)" }}
        >
          Shariah score
        </div>
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 36 36" width="36" height="36">
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="var(--line)"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#0F9D6B"
              strokeWidth="3"
              strokeDasharray="94 100"
              transform="rotate(-90 18 18)"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <div className="font-display text-lg font-semibold">94/100</div>
            <div
              className="text-xs"
              style={{ color: "var(--muted-brand)" }}
            >
              verified halal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pb-16 pt-12"
      style={{ background: "var(--paper)" }}
    >
      {/* Background geometry */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute animate-float"
          style={{ top: "12%", left: "-8%", opacity: 0.35 }}
        >
          <Star8 size={140} fill="var(--coral)" />
        </div>
        <div
          className="absolute animate-spin-slow"
          style={{ bottom: "8%", right: "-4%", opacity: 0.2 }}
        >
          <Rub size={220} fill="var(--purple)" />
        </div>
        <div
          className="absolute"
          style={{ top: "55%", left: "8%", opacity: 0.22 }}
        >
          <Star8 size={48} fill="var(--pink)" />
        </div>
      </div>

      <div className="wrap relative z-10">
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_1fr]">
          {/* Left */}
          <div className="animate-rise rise-1">
            <div className="noor-pill mb-7">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-white text-xs noor-gradient"
              >
                ☾
              </span>
              Shariah-certified · No riba · No gharar
            </div>

            <h1
              className="font-display mb-5 font-medium leading-[0.95]"
              style={{ fontSize: "clamp(48px,6.5vw,82px)", letterSpacing: "-0.035em" }}
            >
              Invest in real
              <br />
              businesses.
              <br />
              <span className="italic font-normal">Grow with </span>
              <span className="noor-gradient-text italic font-normal">barakah.</span>
            </h1>

            <p
              className="mb-8 max-w-xl text-lg leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              NoorVenture pairs Muslim investors with vetted halal businesses
              through <em>Musharakah</em> — true profit and loss sharing. No
              interest. No speculation. Just honest partnership.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <Link
                href="/register?role=INVESTOR"
                className="btn-grad inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{
                  background: "var(--grad)",
                  boxShadow: "0 10px 30px -10px rgba(231,83,149,0.55)",
                }}
              >
                Start investing →
              </Link>
              <Link
                href="/register?role=BUSINESS_OWNER"
                className="inline-flex items-center gap-2 rounded-full border-2 px-6 py-3.5 text-sm font-bold transition-all hover:bg-foreground hover:text-background"
                style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
              >
                Raise capital
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex">
                {["#FF9071", "#E85395", "#A73CCB", "#FFE585", "#FF9071"].map(
                  (c, i) => (
                    <div
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{
                        background: c,
                        border: "2.5px solid var(--paper)",
                        marginLeft: i ? -10 : 0,
                      }}
                    >
                      {["A", "F", "M", "S", "R"][i]}
                    </div>
                  )
                )}
              </div>
              <div className="text-sm leading-snug">
                <div className="font-semibold">200+ Muslim investors</div>
                <div style={{ color: "var(--muted-brand)" }}>
                  already earning halal profits
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
