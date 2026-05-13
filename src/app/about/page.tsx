import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — NoorVenture",
  description:
    "NoorVenture is an ethical peer-to-business investment platform grounded in Islamic finance. No interest, radical transparency, genuine Musharakah partnerships.",
};
import { Nav }   from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { TilePattern, Star8, Rub } from "@/components/shared/NoorGeometry";

const VALUES = [
  {
    icon: "⚖️",
    title: "No Interest",
    desc: "Every return on NoorVenture comes from real business profit — not from charging people for the use of money over time. Zero riba, always.",
    color: "var(--coral)",
  },
  {
    icon: "🔍",
    title: "Radical Transparency",
    desc: "Every deal is fully documented, independently audited, and publicly viewable. We publish the full audit log for every approved proposal on the platform.",
    color: "var(--pink)",
  },
  {
    icon: "🤝",
    title: "Genuine Partnership",
    desc: "Musharakah means co-ownership, not debt. You share profit when the business thrives — and you share loss if it doesn't. Skin in the game, both ways.",
    color: "var(--purple)",
  },
  {
    icon: "🛡️",
    title: "Ethical Screening",
    desc: "Every proposal is reviewed by both NoorAI and our 3-scholar Shariah ethics board. No alcohol, gambling, tobacco, weapons, or exploitative industries.",
    color: "#10b981",
  },
];

const STATS = [
  { v: "200+", l: "Investors globally"       },
  { v: "38",   l: "Active live proposals"    },
  { v: "৳4.2M",l: "Capital deployed"        },
  { v: "17.4%",l: "Average profit-share rate"},
];

const TEAM = [
  { name: "Mufti A. Rahman",    role: "Shariah Board — Lead Scholar",       avatar: "M" },
  { name: "Sheikh Y. Ibrahim",  role: "Shariah Board — Islamic Finance",     avatar: "Y" },
  { name: "Dr. S. Hossain",     role: "Shariah Board — Ethics & Compliance", avatar: "S" },
  { name: "Rafsan D.",          role: "Founder & Lead Engineer",             avatar: "R" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-24 pt-24"
        style={{ background: "var(--ink)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <TilePattern color="rgba(255,245,181,0.5)" />
        </div>
        <div className="absolute right-0 top-0 opacity-[0.08] pointer-events-none">
          <Rub size={380} fill="var(--coral)" />
        </div>
        <div className="absolute -left-16 bottom-0 opacity-[0.06] pointer-events-none">
          <Star8 size={280} fill="var(--purple)" />
        </div>

        <div className="wrap relative">
          <div className="eyebrow mb-4" style={{ color: "var(--paper)", opacity: 0.6 }}>
            Our story
          </div>
          <h1
            className="font-display mb-6 max-w-3xl font-medium"
            style={{
              fontSize: "clamp(40px,5.5vw,68px)",
              letterSpacing: "-0.035em",
              color: "var(--paper)",
              lineHeight: 1.05,
            }}
          >
            Finance that{" "}
            <span className="noor-gradient-text italic">serves people,</span>
            <br />not exploits them.
          </h1>
          <p
            className="max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--paper)", opacity: 0.65 }}
          >
            NoorVenture was built on a simple belief: the way money flows through
            society should be fair, transparent, and rooted in shared prosperity.
            We use the principles of Islamic finance — not because they are
            religious requirements, but because they are&nbsp;
            <em>structurally honest</em>.
          </p>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section
        className="border-b py-10"
        style={{ background: "var(--surface)", borderColor: "var(--line)" }}
      >
        <div className="wrap grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div
                className="font-display noor-gradient-text mb-1 text-3xl font-semibold"
                style={{ letterSpacing: "-0.02em" }}
              >
                {s.v}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--ink-soft)" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <div className="eyebrow mb-3">Our mission</div>
              <h2
                className="font-display mb-6 font-medium"
                style={{ fontSize: "clamp(30px,4vw,48px)", letterSpacing: "-0.03em" }}
              >
                Democratise access to{" "}
                <span className="noor-gradient-text italic">ethical capital.</span>
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                <p>
                  Small and medium businesses — especially in emerging markets — face a
                  brutal choice: either take on interest-bearing debt that traps them in a
                  cycle of repayment regardless of performance, or stay small.
                </p>
                <p>
                  NoorVenture breaks that binary. We connect vetted businesses directly with
                  investors who want fair returns without exploitation. Profit and loss are
                  shared proportionally. No hidden fees. No compound interest. No speculation.
                </p>
                <p>
                  This is Musharakah — co-ownership — and it has been practiced for over a
                  millennium. We have rebuilt it for the digital age.
                </p>
              </div>
            </div>

            {/* Quote card */}
            <div className="flex items-center">
              <div
                className="relative overflow-hidden rounded-3xl p-10"
                style={{
                  background: "var(--ink)",
                  border: "1.5px solid var(--ink)",
                  boxShadow: "12px 12px 0 0 var(--coral)",
                }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 opacity-10">
                  <Star8 size={180} fill="var(--pink)" />
                </div>
                <div
                  className="font-display mb-6 text-6xl font-medium leading-none"
                  style={{ color: "var(--coral)" }}
                >
                  "
                </div>
                <p
                  className="font-display relative text-xl font-medium leading-relaxed"
                  style={{ color: "var(--paper)", letterSpacing: "-0.01em" }}
                >
                  The best of people are those who are most beneficial to others.
                </p>
                <div className="mt-6 text-sm" style={{ color: "var(--paper)", opacity: 0.5 }}>
                  — Foundation principle, NoorVenture
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ background: "var(--paper-2)", borderTop: "1.5px solid var(--line)" }}
      >
        <div className="wrap">
          <div className="mb-14 text-center">
            <div className="eyebrow mb-3">What we stand for</div>
            <h2
              className="font-display mx-auto font-medium"
              style={{ fontSize: "clamp(30px,4vw,48px)", letterSpacing: "-0.03em", maxWidth: 560 }}
            >
              Four principles.{" "}
              <span className="noor-gradient-text italic">Zero exceptions.</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--surface)",
                  border: "1.5px solid var(--line)",
                }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
                  style={{ background: `${v.color}18`, border: `1.5px solid ${v.color}30` }}
                >
                  {v.icon}
                </div>
                <h3
                  className="mb-3 font-semibold"
                  style={{ color: "var(--ink)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "var(--paper)" }}>
        <div className="wrap">
          <div className="mb-14">
            <div className="eyebrow mb-3">The people behind NoorVenture</div>
            <h2
              className="font-display font-medium"
              style={{ fontSize: "clamp(30px,4vw,48px)", letterSpacing: "-0.03em" }}
            >
              Built with care,{" "}
              <span className="noor-gradient-text italic">reviewed by scholars.</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl p-6"
                style={{
                  background: "var(--surface)",
                  border: "1.5px solid var(--line)",
                }}
              >
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
                  style={{ background: "var(--grad)" }}
                >
                  {m.avatar}
                </div>
                <div className="font-semibold" style={{ color: "var(--ink)" }}>{m.name}</div>
                <div className="mt-1 text-xs leading-snug" style={{ color: "var(--ink-soft)" }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "var(--ink)", borderTop: "1.5px solid var(--line)" }}
      >
        <div className="wrap flex flex-col items-center gap-6 text-center">
          <h2
            className="font-display font-medium"
            style={{ fontSize: "clamp(28px,4vw,48px)", color: "var(--paper)", letterSpacing: "-0.03em" }}
          >
            Become part of the story.
          </h2>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "var(--paper)", opacity: 0.65 }}>
            Join investors and business owners who believe that profit and
            ethics are not opposites.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register?role=INVESTOR"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--grad)", boxShadow: "0 10px 30px -10px rgba(231,83,149,0.55)" }}
            >
              Start investing →
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3.5 text-sm font-bold transition-colors hover:bg-white hover:text-[var(--ink)]"
              style={{ borderColor: "rgba(255,245,181,0.3)", color: "var(--paper)" }}
            >
              Browse deals
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
