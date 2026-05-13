"use client";

function MusharakahDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <svg viewBox="0 0 520 520" width="100%" height="100%">
        <defs>
          <linearGradient id="diag-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#FF9071" />
            <stop offset="55%"  stopColor="#E85395" />
            <stop offset="100%" stopColor="#A73CCB" />
          </linearGradient>
          <pattern id="diag-bg" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20 0 L40 20 L20 40 L0 20 Z"
              fill="none"
              stroke="rgba(26,11,46,0.07)"
              strokeWidth="1"
            />
          </pattern>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="var(--ink)" />
          </marker>
        </defs>

        <circle cx="260" cy="260" r="240" fill="url(#diag-bg)" />
        <circle cx="260" cy="260" r="240" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="2 8" />

        {/* Center profit */}
        <circle cx="260" cy="260" r="74" fill="url(#diag-grad)" />
        <text x="260" y="252" textAnchor="middle" fill="white" fontSize="11" fontWeight="600" letterSpacing="2">PROFIT</text>
        <text x="260" y="278" textAnchor="middle" fill="white" fontSize="20" fontFamily="var(--font-fraunces), serif" fontWeight="600">100%</text>
        <text x="260" y="296" textAnchor="middle" fill="white" fontSize="10" opacity="0.85">net of expenses</text>

        {/* Investor */}
        <circle cx="100" cy="160" r="60" fill="#FFF5B5" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="100" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--ink)" letterSpacing="1">INVESTOR</text>
        <text x="100" y="175" textAnchor="middle" fontSize="18" fontFamily="var(--font-fraunces), serif" fontWeight="600" fill="var(--ink)">60%</text>
        <text x="100" y="192" textAnchor="middle" fontSize="9.5" fill="var(--ink-soft)">profit share</text>

        {/* Business */}
        <circle cx="420" cy="160" r="60" fill="#FF9071" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="420" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" letterSpacing="1">BUSINESS</text>
        <text x="420" y="175" textAnchor="middle" fontSize="18" fontFamily="var(--font-fraunces), serif" fontWeight="600" fill="white">35%</text>
        <text x="420" y="192" textAnchor="middle" fontSize="9.5" fill="white" opacity="0.9">operating share</text>

        {/* Platform */}
        <circle cx="260" cy="440" r="60" fill="#A73CCB" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="260" y="430" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" letterSpacing="1">NOOR</text>
        <text x="260" y="446" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" letterSpacing="1">PLATFORM</text>
        <text x="260" y="466" textAnchor="middle" fontSize="14" fontFamily="var(--font-fraunces), serif" fontWeight="600" fill="white">5% fee</text>

        {/* Arrows */}
        <g stroke="var(--ink)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)">
          <path d="M150 195 Q200 235 195 240" strokeDasharray="3 4" />
          <path d="M370 195 Q320 235 325 240" strokeDasharray="3 4" />
          <path d="M260 380 L260 340" strokeDasharray="3 4" />
        </g>
      </svg>
    </div>
  );
}

export function Musharakah() {
  return (
    <section className="py-28" style={{ background: "var(--paper)" }}>
      <div className="wrap">
        <div className="grid items-center gap-20 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="eyebrow mb-4">How Musharakah works</div>
            <h2
              className="font-display mb-5 font-medium"
              style={{ fontSize: "clamp(36px,4.5vw,56px)", letterSpacing: "-0.035em" }}
            >
              Not a loan.{" "}
              <span className="noor-gradient-text italic">A partnership.</span>
            </h2>
            <p
              className="mb-7 text-lg leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              In conventional finance, lenders charge interest no matter what
              happens to the business.{" "}
              <strong>Musharakah is the opposite.</strong> You partner with the
              business. When it profits, you share. When it doesn't, you share
              that too. That's what makes it halal — and honest.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "60/40", l: "Typical profit split — investor to business" },
                { k: "0%",    l: "Interest charged on the partnership" },
                { k: "Monthly", l: "Audited profit reports from business" },
                { k: "0 Riba", l: "Certified by our 3-scholar board" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border p-4"
                  style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}
                >
                  <div className="font-display noor-gradient-text mb-1 text-2xl font-semibold">
                    {x.k}
                  </div>
                  <div className="text-xs leading-snug" style={{ color: "var(--ink-soft)" }}>
                    {x.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <MusharakahDiagram />
        </div>
      </div>
    </section>
  );
}
