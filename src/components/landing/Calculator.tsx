"use client";
import { useState } from "react";
import Link from "next/link";

function Slider({
  label,
  value,
  setValue,
  min,
  max,
  step,
  format,
  color,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  color: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <label className="text-sm font-semibold" style={{ color: "var(--ink-soft)" }}>
          {label}
        </label>
        <span className="font-display text-lg font-semibold">{format(value)}</span>
      </div>
      <div className="relative h-7">
        <div className="absolute left-0 right-0 top-3 h-1 rounded-full" style={{ background: "var(--line)" }} />
        <div className="absolute left-0 top-3 h-1 rounded-full" style={{ width: `${pct}%`, background: color }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="pointer-events-none absolute top-1 h-5 w-5 rounded-full border-2 shadow-md"
          style={{
            left: `calc(${pct}% - 10px)`,
            background: "var(--surface)",
            borderColor: color,
          }}
        />
      </div>
    </div>
  );
}

export function Calculator() {
  const [amount, setAmount] = useState(100_000);
  const [months, setMonths] = useState(12);
  const [rate, setRate]     = useState(18);

  const profit = Math.round((amount * (rate / 100) * (months / 12)));
  const total  = amount + profit;
  const zakat  = Math.round(total * 0.025);

  return (
    <section className="py-28" style={{ background: "var(--paper)" }}>
      <div className="wrap">
        <div className="grid items-center gap-16 md:grid-cols-[1fr_1.2fr]">
          {/* Left */}
          <div>
            <div className="eyebrow mb-3">Barakah calculator</div>
            <h2
              className="font-display mb-5 font-medium"
              style={{ fontSize: "clamp(36px,4.5vw,56px)", letterSpacing: "-0.035em" }}
            >
              See your halal
              <br />
              <span className="noor-gradient-text italic">compounding.</span>
            </h2>
            <p className="mb-7 text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Adjust your contribution, duration, and the proposal&apos;s expected
              return. We&apos;ll show you the projected profit share — and your
              zakat owed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{
                  background: "var(--grad)",
                  boxShadow: "0 10px 30px -10px rgba(231,83,149,0.55)",
                }}
              >
                Start with this plan →
              </Link>
              <Link
                href="/proposals"
                className="inline-flex items-center rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-colors hover:bg-foreground hover:text-background"
                style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
              >
                View matching deals
              </Link>
            </div>
          </div>

          {/* Calculator card */}
          <div
            className="rounded-3xl border p-9"
            style={{
              background: "var(--surface)",
              borderColor: "var(--ink)",
              borderWidth: "1.5px",
              boxShadow: "12px 12px 0 0 var(--ink)",
            }}
          >
            <div className="space-y-7">
              <Slider
                label="Your contribution"
                value={amount}
                setValue={setAmount}
                min={5_000}
                max={2_000_000}
                step={5_000}
                format={(v) => `৳${v.toLocaleString()}`}
                color="var(--coral)"
              />
              <Slider
                label="Duration"
                value={months}
                setValue={setMonths}
                min={3}
                max={36}
                step={1}
                format={(v) => `${v} months`}
                color="var(--pink)"
              />
              <Slider
                label="Profit-share rate (%)"
                value={rate}
                setValue={setRate}
                min={5}
                max={30}
                step={1}
                format={(v) => `${v}%`}
                color="var(--purple)"
              />
            </div>

            {/* Results */}
            <div
              className="mt-8 rounded-2xl border-2 border-dashed p-6"
              style={{
                background: "var(--paper-2)",
                borderColor: "var(--line-strong)",
              }}
            >
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div
                    className="mb-1.5 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    Projected profit share
                  </div>
                  <div
                    className="font-display noor-gradient-text text-4xl font-semibold leading-none"
                  >
                    ৳{profit.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div
                    className="mb-1.5 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    Total after term
                  </div>
                  <div
                    className="font-display text-4xl font-semibold leading-none"
                    style={{ color: "var(--ink)" }}
                  >
                    ৳{total.toLocaleString()}
                  </div>
                </div>
              </div>

              <div
                className="mt-5 flex items-center justify-between border-t-2 border-dashed pt-5 text-sm"
                style={{ borderColor: "var(--line-strong)" }}
              >
                <span style={{ color: "var(--ink-soft)" }}>Zakat owed (2.5% on total)</span>
                <span className="font-display text-lg font-semibold">
                  ৳{zakat.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="mt-3 text-center text-xs" style={{ color: "var(--muted-brand)" }}>
              Projection only. Musharakah returns vary with business
              performance — including losses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
