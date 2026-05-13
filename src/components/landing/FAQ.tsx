"use client";
import { useState } from "react";

const QS = [
  {
    q: "Do I need to be Muslim to use NoorVenture?",
    a: "Not at all. Our platform is rooted in Islamic finance principles — no interest, no speculation, transparent profit-sharing — but these values are universal. Anyone who wants fair, ethical, and transparent investing is welcome here.",
  },
  {
    q: "What does 'Shariah-compliant' actually mean for my investment?",
    a: "It means three things: no interest is charged or earned, there is no hidden risk or opaque contracts, and no investment goes into industries that cause social harm (alcohol, gambling, weapons, tobacco). Every proposal is screened by NoorAI and then reviewed by our independent 3-scholar ethics board. We publish the audit log for every approved deal.",
  },
  {
    q: "What happens if a business loses money?",
    a: "You share the loss proportionally — that is the honest core of Musharakah partnership. There is no guaranteed return. We mitigate downside through AI risk screening, monthly P&L reporting, and a 12-month track-record requirement for every business on the platform.",
  },
  {
    q: "How is NoorVenture different from a bank or P2P lender?",
    a: "Banks and most P2P lenders charge interest regardless of outcome. We connect you directly with businesses as a co-owner. You earn when they earn. We charge a flat 5% platform fee on profits only — never on your principal, never as interest.",
  },
  {
    q: "What is the minimum investment?",
    a: "Most proposals start at ৳5,000. Some marquee deals have a ৳50,000 floor. Wallet top-ups start at ৳1,000.",
  },
  {
    q: "How do I withdraw my returns?",
    a: "Profit shares land in your Noor Wallet each month after the business files its P&L report. Withdraw any time to your linked bank account, mobile banking (bKash, Nagad), or crypto wallet. Settlement is T+1.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
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
              Ethical finance shouldn&apos;t be confusing. We answer the real
              questions — plainly, without jargon, without a script.
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
