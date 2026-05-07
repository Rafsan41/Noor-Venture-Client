"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowRight, Shield, TrendingUp, Users, Zap, Star, CheckCircle, Sun, Moon } from "lucide-react";

function LandingThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      title="Toggle dark mode"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-500 text-white font-bold text-sm">N</div>
            <span className="text-xl font-bold">NoorVenture</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
          </div>
          <div className="flex items-center gap-3">
            <LandingThemeToggle />
            <Link href="/login" className="text-sm font-medium hover:text-coral-600 transition-colors">
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white hover:bg-coral-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cream-100 via-white to-coral-50 dark:from-amber-950/20 dark:via-background dark:to-emerald-950/20" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-coral-50 px-4 py-1.5 text-sm text-coral-700 mb-6">
            <Shield className="h-4 w-4" />
            100% Shariah-Compliant · Zero Riba
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Halal Investing for the{" "}
            <span className="text-coral-500">Modern Muslim</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with real businesses through Musharakah (profit-loss sharing).
            Grow your wealth the halal way — no interest, no speculation, maximum barakah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?role=INVESTOR"
              className="inline-flex items-center gap-2 rounded-xl bg-coral-500 px-6 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
            >
              Start Investing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/register?role=BUSINESS_OWNER"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-500 px-6 py-3 font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              Fund Your Business
            </Link>
          </div>

          {/* Live stats bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: "Total Capital",     value: "৳4.2M+" },
              { label: "Active Proposals",  value: "38" },
              { label: "Investors",         value: "200+" },
              { label: "Avg Return",        value: "18%" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border bg-white/80 p-4 shadow-sm">
                <div className="text-2xl font-bold text-coral-600">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why NoorVenture?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cutting-edge technology meets Islamic finance principles
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon:  <Shield className="h-6 w-6 text-emerald-600" />,
                title: "AI Shariah Screening",
                desc:  "Every proposal is automatically analyzed by Claude AI for Shariah compliance, riba detection, and halal business verification.",
                color: "emerald",
              },
              {
                icon:  <TrendingUp className="h-6 w-6 text-coral-600" />,
                title: "Live Market Stats",
                desc:  "Real-time funding progress, live investment activity, and profit distributions — just like a halal stock market ticker.",
                color: "amber",
              },
              {
                icon:  <Zap className="h-6 w-6 text-blue-600" />,
                title: "AI Deal Matching",
                desc:  "Claude AI matches investors to proposals based on risk tolerance, sector preference, and investment history.",
                color: "blue",
              },
              {
                icon:  <Users className="h-6 w-6 text-purple-600" />,
                title: "Transparent Reports",
                desc:  "Business owners submit monthly profit reports. Investors receive their profit share automatically to their wallet.",
                color: "purple",
              },
              {
                icon:  <Star className="h-6 w-6 text-orange-600" />,
                title: "AI Business Assistant",
                desc:  "Generate professional business proposals with AI, get risk assessments, and receive personalized investment recommendations.",
                color: "orange",
              },
              {
                icon:  <CheckCircle className="h-6 w-6 text-teal-600" />,
                title: "Zero Interest",
                desc:  "Pure Musharakah model — profit AND loss sharing. No hidden fees, no interest, no speculation. Just honest business.",
                color: "teal",
              },
            ].map((f) => (
              <div key={f.title} className="noor-card p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it Works ────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="font-bold text-lg mb-6 text-emerald-600 flex items-center gap-2">
                <Users className="h-5 w-5" /> For Investors
              </h3>
              {[
                "Create an account as Investor",
                "Deposit funds to your Noor Wallet",
                "Browse AI-screened halal proposals",
                "Invest in proposals you believe in",
                "Receive monthly profit shares automatically",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3 mb-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-6 text-coral-600 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" /> For Business Owners
              </h3>
              {[
                "Register as Business Owner",
                "Create your funding proposal (AI-assisted)",
                "Get reviewed & approved by admin",
                "Receive investments from the community",
                "Submit monthly reports & distribute profits",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3 mb-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral-100 text-coral-700 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-sm text-muted-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 noor-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Invest the Halal Way?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Join hundreds of Muslim investors growing their wealth through honest business partnerships.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-coral-600 hover:bg-coral-50 transition-colors"
          >
            Create Free Account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2025 NoorVenture. Built with ❤️ for the Muslim Ummah.</p>
        <p className="mt-1">Shariah-compliant · Zero Riba · Maximum Barakah</p>
      </footer>
    </div>
  );
}
