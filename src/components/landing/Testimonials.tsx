"use client";

const ITEMS = [
  {
    n: "Ahmad Rahman",
    r: "Software engineer · Investor",
    q: "I was tired of conventional banking where I never understood the fees or where my money actually went. NoorVenture is the first platform where I genuinely know what my capital is doing — and the profit share lands like clockwork.",
    a: "AR", c: "var(--coral)",
  },
  {
    n: "Fatima Akhtar",
    r: "Doctor · Investor since 2024",
    q: "The Shariah board reviews every proposal — that independent ethical screening gave me the confidence to commit serious capital. My portfolio is up 19% this year through real business partnerships, not speculation.",
    a: "FA", c: "var(--pink)",
  },
  {
    n: "Imran Hossain",
    r: "Founder, Olive Press Co.",
    q: "We raised ৳800K in 19 days from real investors who believe in our business — no banks, no interest burden. The monthly P&L reporting keeps us accountable and the community loves the transparency.",
    a: "IH", c: "var(--purple)",
  },
];

export function Testimonials() {
  return (
    <section className="py-28" style={{ background: "var(--paper)" }}>
      <div className="wrap">
        <div className="mb-14 text-center">
          <div className="eyebrow mb-3">Real stories</div>
          <h2
            className="font-display font-medium"
            style={{ fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.035em" }}
          >
            Built for people who believe{" "}
            <span className="noor-gradient-text italic">finance can be fair.</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            Investors and founders from all walks of life choosing principled
            partnerships over conventional debt.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((t, i) => (
            <div
              key={t.n}
              className="rounded-2xl border-2 p-8 transition-all duration-300"
              style={{
                background:  i === 1 ? "var(--ink)" : "var(--surface)",
                color:       i === 1 ? "var(--paper)" : "var(--ink)",
                borderColor: "var(--ink)",
                transform:   i === 1 ? "translateY(-12px)" : "none",
                boxShadow:   i === 1 ? "8px 8px 0 0 var(--pink)" : "none",
              }}
            >
              <div
                className="font-display mb-3 text-5xl font-medium leading-none"
                style={{ color: i === 1 ? "var(--pink)" : "var(--coral)" }}
              >
                "
              </div>
              <p className="mb-6 text-base leading-relaxed">{t.q}</p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold text-white"
                  style={{ background: t.c, borderColor: "var(--ink)" }}
                >
                  {t.a}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs opacity-70">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
