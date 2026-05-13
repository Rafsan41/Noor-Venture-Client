"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import { Nav }    from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { TilePattern } from "@/components/shared/NoorGeometry";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@noorventure.com",
    sub: "We reply within 24 hours",
    color: "var(--coral)",
    href: "mailto:hello@noorventure.com",
  },
  {
    icon: MessageSquare,
    label: "Live chat",
    value: "In-app AI advisor",
    sub: "Available after sign-in",
    color: "var(--pink)",
    href: "/register",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Dhaka, Bangladesh",
    sub: "Operating globally",
    color: "var(--purple)",
    href: null,
  },
  {
    icon: Clock,
    label: "Support hours",
    value: "Sun – Thu, 9am – 6pm",
    sub: "Bangladesh Standard Time",
    color: "#10b981",
    href: null,
  },
];

const TOPICS = [
  "General enquiry",
  "Investment question",
  "Business / raise capital",
  "Technical issue",
  "Shariah compliance",
  "Partnership",
  "Press / media",
];

export default function ContactPage() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [topic,   setTopic]   = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);
    // Simulate send delay
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  };

  const INPUT = {
    borderColor: "var(--line)",
    background: "var(--paper-2)",
    color: "var(--ink)",
    fontFamily: "inherit",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pb-20 pt-24"
        style={{ background: "var(--ink)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <TilePattern color="rgba(255,245,181,0.5)" />
        </div>
        <div className="wrap relative">
          <div className="eyebrow mb-4" style={{ color: "var(--paper)", opacity: 0.6 }}>
            Get in touch
          </div>
          <h1
            className="font-display mb-5 max-w-xl font-medium"
            style={{
              fontSize: "clamp(40px,5.5vw,64px)",
              letterSpacing: "-0.035em",
              color: "var(--paper)",
              lineHeight: 1.05,
            }}
          >
            We&apos;d love to{" "}
            <span className="noor-gradient-text italic">hear from you.</span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed" style={{ color: "var(--paper)", opacity: 0.65 }}>
            Whether you have a question about investing, raising capital, or
            our Shariah compliance process — our team is happy to help.
          </p>
        </div>
      </section>

      {/* ── Contact cards ─────────────────────────────────────────────────── */}
      <section
        className="border-b py-10"
        style={{ borderColor: "var(--line)", background: "var(--surface)" }}
      >
        <div className="wrap grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CONTACT_ITEMS.map((item) => {
            const Icon = item.icon;
            const inner = (
              <>
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ background: `${item.color}18`, border: `1.5px solid ${item.color}30` }}
                >
                  <Icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ink-soft)" }}>
                  {item.label}
                </div>
                <div className="font-semibold" style={{ color: "var(--ink)" }}>{item.value}</div>
                <div className="mt-0.5 text-xs" style={{ color: "var(--ink-soft)" }}>{item.sub}</div>
              </>
            );
            return item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                style={{ background: "var(--paper-2)", border: "1.5px solid var(--line)" }}
              >
                {inner}
              </Link>
            ) : (
              <div
                key={item.label}
                className="rounded-2xl p-5"
                style={{ background: "var(--paper-2)", border: "1.5px solid var(--line)" }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Form + FAQ ────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr]">

          {/* Contact form */}
          <div>
            <h2
              className="font-display mb-2 font-medium"
              style={{ fontSize: "clamp(26px,3.5vw,40px)", letterSpacing: "-0.03em" }}
            >
              Send us a message
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--ink-soft)" }}>
              Fill in the form and we&apos;ll get back to you within one business day.
            </p>

            {sent ? (
              <div
                className="flex flex-col items-center gap-4 rounded-3xl py-16 text-center"
                style={{ background: "var(--surface)", border: "1.5px solid var(--line)" }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "var(--grad)" }}
                >
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg" style={{ color: "var(--ink)" }}>
                  Message sent!
                </h3>
                <p className="max-w-xs text-sm" style={{ color: "var(--ink-soft)" }}>
                  Thanks {name}. We&apos;ll reply to {email} within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }}
                  className="rounded-full px-5 py-2 text-sm font-semibold"
                  style={{ background: "var(--paper-2)", color: "var(--ink)", border: "1.5px solid var(--line)" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Full name *</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
                      style={INPUT}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Email address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      required
                      className="rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
                      style={INPUT}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
                    style={INPUT}
                  >
                    {TOPICS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Message *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us how we can help…"
                    required
                    className="resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
                    style={INPUT}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || !name || !email || !message}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white disabled:opacity-50 transition-opacity hover:opacity-90"
                  style={{ background: "var(--grad)", boxShadow: "0 10px 30px -10px rgba(231,83,149,0.55)" }}
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>

          {/* Quick FAQ */}
          <div>
            <h2
              className="font-display mb-2 font-medium"
              style={{ fontSize: "clamp(26px,3.5vw,40px)", letterSpacing: "-0.03em" }}
            >
              Quick answers
            </h2>
            <p className="mb-8 text-sm" style={{ color: "var(--ink-soft)" }}>
              Most questions are answered here instantly.
            </p>

            <div className="space-y-3">
              {[
                {
                  q: "How long does it take to open an account?",
                  a: "Under 2 minutes. Just your name, email, and a password. KYC verification for larger investments takes 24–48 hours.",
                },
                {
                  q: "Is my money safe on NoorVenture?",
                  a: "Funds are held in a segregated escrow wallet — not pooled with operating funds. Every transaction is logged and auditable.",
                },
                {
                  q: "What is the minimum investment?",
                  a: "Most proposals start at ৳5,000. Wallet top-ups start from ৳1,000.",
                },
                {
                  q: "How do I raise capital for my business?",
                  a: "Register as a Business Owner, complete the proposal form, pass our AI + Shariah review (72 hours), then go live.",
                },
                {
                  q: "Can I withdraw at any time?",
                  a: "Wallet balance (uninvested funds) can be withdrawn any time — T+1 settlement. Invested capital is locked for the proposal term.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl p-5"
                  style={{ background: "var(--surface)", border: "1.5px solid var(--line)" }}
                >
                  <div className="mb-2 font-semibold text-sm" style={{ color: "var(--ink)" }}>
                    {item.q}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    {item.a}
                  </p>
                </div>
              ))}

              <Link
                href="/#faq"
                className="mt-2 flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--pink-deep)" }}
              >
                View all FAQs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
