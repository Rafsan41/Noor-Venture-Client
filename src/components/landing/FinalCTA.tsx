"use client";
import Link from "next/link";
import { Star8, Rub, TilePattern } from "@/components/shared/NoorGeometry";

export function FinalCTA() {
  return (
    <section className="px-7 py-5">
      <div
        className="relative overflow-hidden rounded-[36px] border-2 px-10 py-24 text-center text-white"
        style={{
          background: "var(--grad)",
          borderColor: "var(--ink)",
          boxShadow: "14px 14px 0 0 var(--ink)",
        }}
      >
        {/* Pattern overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <TilePattern color="white" />
        </div>

        {/* Floating geometries */}
        <div className="pointer-events-none absolute left-[8%] top-[15%] animate-spin-med opacity-20">
          <Rub size={120} fill="white" />
        </div>
        <div
          className="pointer-events-none absolute bottom-[15%] right-[8%] animate-spin-slow opacity-20"
          style={{ animationDirection: "reverse" }}
        >
          <Star8 size={140} fill="white" />
        </div>

        <div className="relative">
          <div
            className="eyebrow mb-4"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            Bismillah
          </div>
          <h2
            className="font-display mx-auto mb-5 font-medium text-white"
            style={{
              fontSize: "clamp(44px,6vw,84px)",
              letterSpacing: "-0.035em",
              maxWidth: 900,
              lineHeight: "0.95",
            }}
          >
            Start growing
            <br />
            your <span className="italic">halal</span> wealth.
          </h2>
          <p
            className="mx-auto mb-8 max-w-lg text-lg"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            Join 200+ Muslim investors and 38 businesses already building the
            future of halal finance.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-bold transition-colors hover:bg-cream-100"
              style={{ background: "white", color: "var(--ink)" }}
            >
              Open free account →
            </Link>
            <Link
              href="/proposals"
              className="inline-flex items-center rounded-full border-2 border-white px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Browse proposals
            </Link>
          </div>

          <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
            No fees to open. KYC in 2 minutes. Withdraw any time.
          </p>
        </div>
      </div>
    </section>
  );
}
