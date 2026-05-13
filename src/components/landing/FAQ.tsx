"use client";
import { useState } from "react";

const QS = [
  { q: "Is this really Shariah-compliant?",           a: "Yes. Every proposal is screened by our AI for riba, gharar, and haram exposure, then independently reviewed by a 3-scholar Shariah board (Mufti Rahman, Sheikh Ibrahim, Dr. Hossain). We publish the audit log for every approved deal." },
  { q: "What happens if a business loses money?",     a: "You share the loss proportionally — that's what makes Musharakah halal. There is no guaranteed return. We mitigate downside through rigorous AI risk screening, monthly P&L reporting, and a 12-month track-record requirement on businesses." },
  { q: "How is NoorVenture different from a bank?",   a: "Banks lend at interest regardless of outcome. We pair you directly with businesses as a partner. You earn when they earn. We charge a flat 5% platform fee on profits — never interest." },
  { q: "What is the minimum investment?",             a: "Most proposals start at ৳5,000. Some marquee deals have a ৳50,000 floor. Wallet top-ups start at ৳1,000." },
  { q: "How do I withdraw my profits?",               a: "Profits land in your Noor Wallet monthly. Withdraw any time to your linked bank, mobile banking (bKash, Nagad), or crypto wallet. Settlement is T+1." },
  { q: "Where are you regulated?",                    a: "NoorVenture operates under Bangladesh Bank fintech sandbox approval, with our Shariah governance certified by AAOIFI standards. We hold investor capital in a segregated escrow at City Bank." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      className="py-28"
      style={{
        background: "var(--paper-2)",
        borderTop: "1.5px solid var(--ink)",
      }}
    >
      <div className="wrap-tight">
        <div className="grid gap-16 md:grid-cols-[1fr_1.5fr]">
          {/* Left */}
          <div>
            <div className="eyebrow mb-3">Frequently asked</div>
            <h2
              className="font-display mb-4 font-medium"
              style={{ fontSize: "clamp(36px,4vw,52px)", letterSpacing: "-0.035em" }}
            >
              The questions{" "}
              <span className="italic">worth asking.</span>
            </h2>
            <p
              className="mb-5 text-sm leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              Halal finance has been opaque for too long. Ask us anything — we&apos;ll
              answer like adults, not like a chatbot.
            </p>
            <a
              href="mailto:hello@noorventure.com"
              className="inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
              style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
            >
              Email our team →
            </a>
          </div>

          {/* Right */}
          <div>
            {QS.map((it, i) => (
              <div
                key={i}
                className="border-b py-5"
                style={{ borderColor: "var(--line-strong)" }}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="font-display text-lg font-semibold">
                    {it.q}
                  </span>
                  <span
                    className="shrink-0 text-2xl font-light transition-transform duration-200"
                    style={{
                      color: "var(--pink-deep)",
                      transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {open === i && (
                  <p
                    className="mt-3.5 max-w-xl text-sm leading-relaxed"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {it.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
