"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NoorLogoMark, Star8 } from "@/components/shared/NoorGeometry";

const schema = z.object({
  name:     z.string().min(2, "Name too short"),
  email:    z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters").regex(/[A-Z]/, "Need uppercase").regex(/[0-9]/, "Need a number"),
  role:     z.enum(["BUSINESS_OWNER", "INVESTOR"]),
});
type FormData = z.infer<typeof schema>;

function StepBar({ step }: { step: number }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all"
            style={{
              background: n <= step ? "var(--ink)" : "var(--surface)",
              borderColor: "var(--ink)",
              color: n <= step ? "var(--paper)" : "var(--ink)",
            }}
          >
            {n}
          </div>
          {n < 3 && (
            <div
              className="h-0.5 w-12 transition-all"
              style={{ background: n < step ? "var(--ink)" : "var(--line-strong)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function RegisterForm() {
  const { register: authRegister } = useAuth();
  const searchParams = useSearchParams();
  const defaultRole  = (searchParams.get("role") as "BUSINESS_OWNER" | "INVESTOR") || "INVESTOR";

  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: defaultRole },
  });

  const role = watch("role");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try   { await authRegister(data); }
    catch { /* handled in hook */ }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step 1 eyebrow */}
      <div className="eyebrow mb-2">Step 1 of 3 · Choose your path</div>
      <h1
        className="font-display mb-2 font-medium"
        style={{ fontSize: 40, letterSpacing: "-0.02em" }}
      >
        Open your account.
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--ink-soft)" }}>
        Are you here to invest, or to raise capital? You can change this later.
      </p>

      {/* Role cards */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        {/* Investor card */}
        <button
          type="button"
          onClick={() => setValue("role", "INVESTOR")}
          className="relative rounded-2xl border-2 p-5 text-left transition-all duration-200"
          style={{
            borderColor: role === "INVESTOR" ? "var(--ink)" : "var(--line-strong)",
            background:  role === "INVESTOR" ? "var(--paper-2)" : "var(--surface)",
            boxShadow:   role === "INVESTOR" ? "6px 6px 0 0 var(--ink)" : "none",
            transform:   role === "INVESTOR" ? "translateY(-2px)" : "none",
          }}
        >
          {/* Check circle */}
          <div
            className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all"
            style={{
              background:  role === "INVESTOR" ? "var(--ink)" : "var(--surface)",
              borderColor: role === "INVESTOR" ? "var(--ink)" : "var(--line-strong)",
              color: "white",
            }}
          >
            {role === "INVESTOR" && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="2 6 5 9 10 3" />
              </svg>
            )}
          </div>

          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 text-xl text-white"
            style={{ background: "var(--pink)", borderColor: "var(--ink)" }}
          >
            ↗
          </div>
          <h3 className="mb-1.5 text-lg font-semibold tracking-tight">I want to invest</h3>
          <p className="mb-4 text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Browse vetted halal deals, commit capital, earn monthly profit shares. Min ৳5,000.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["No riba", "Audited deals", "Withdraw anytime"].map((t) => (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ background: "var(--paper-2)", color: "var(--ink-soft)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </button>

        {/* Business owner card */}
        <button
          type="button"
          onClick={() => setValue("role", "BUSINESS_OWNER")}
          className="relative rounded-2xl border-2 p-5 text-left transition-all duration-200"
          style={{
            borderColor: role === "BUSINESS_OWNER" ? "var(--ink)" : "var(--line-strong)",
            background:  role === "BUSINESS_OWNER" ? "var(--paper-2)" : "var(--surface)",
            boxShadow:   role === "BUSINESS_OWNER" ? "6px 6px 0 0 var(--ink)" : "none",
            transform:   role === "BUSINESS_OWNER" ? "translateY(-2px)" : "none",
          }}
        >
          <div
            className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all"
            style={{
              background:  role === "BUSINESS_OWNER" ? "var(--ink)" : "var(--surface)",
              borderColor: role === "BUSINESS_OWNER" ? "var(--ink)" : "var(--line-strong)",
              color: "white",
            }}
          >
            {role === "BUSINESS_OWNER" && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="2 6 5 9 10 3" />
              </svg>
            )}
          </div>

          <div
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 text-xl text-white"
            style={{ background: "var(--coral)", borderColor: "var(--ink)" }}
          >
            ⌂
          </div>
          <h3 className="mb-1.5 text-lg font-semibold tracking-tight">I run a business</h3>
          <p className="mb-4 text-xs leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            Raise interest-free capital from ethical investors via Musharakah. Pay only from profit.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["AI co-pilot", "5% flat fee", "72h review"].map((t) => (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ background: "var(--paper-2)", color: "var(--ink-soft)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </button>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Full name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Ahmad Rahman"
            className="rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
            style={{ borderColor: "var(--line)", fontFamily: "inherit" }}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="you@email.com"
            className="rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
            style={{ borderColor: "var(--line)", fontFamily: "inherit" }}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="relative flex flex-col gap-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Password</label>
          <div className="relative">
            <input
              {...register("password")}
              type={show ? "text" : "password"}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border py-3 pl-4 pr-10 text-sm outline-none transition-shadow focus:ring-2"
              style={{ borderColor: "var(--line)", fontFamily: "inherit" }}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--muted-brand)" }}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        {/* Confirm password (display only) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Confirm password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            className="rounded-xl border px-4 py-3 text-sm outline-none transition-shadow focus:ring-2"
            style={{ borderColor: "var(--line)", fontFamily: "inherit" }}
          />
        </div>
      </div>

      {/* Terms */}
      <div className="col-span-2 mt-5 flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-soft)" }}>
        <input type="checkbox" required className="mt-0.5 rounded" />
        <span>
          I agree to the{" "}
          <a href="#" style={{ color: "var(--pink-deep)", fontWeight: 600 }}>Terms</a>,{" "}
          <a href="#" style={{ color: "var(--pink-deep)", fontWeight: 600 }}>Risk Disclosure</a>, and
          Shariah-finance principles. I understand profits and losses are shared.
        </span>
      </div>

      {/* Footer row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm" style={{ color: "var(--muted-brand)" }}>
          Have an account?{" "}
          <Link href="/login" style={{ color: "var(--pink-deep)", fontWeight: 600 }}>Sign in</Link>
        </span>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{
            background: "var(--grad)",
            boxShadow: "0 10px 30px -10px rgba(231,83,149,0.55)",
          }}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Continue → Step 2
        </button>
      </div>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen px-4 pb-20 pt-10"
      style={{ background: "var(--paper)" }}
    >
      {/* Logo header */}
      <Link href="/" className="mb-8 inline-flex items-center gap-2">
        <NoorLogoMark size={26} />
        <span className="font-display text-xl font-semibold">NoorVenture</span>
      </Link>

      {/* Card */}
      <div
        className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-2 p-12"
        style={{
          background: "var(--surface)",
          borderColor: "var(--ink)",
          boxShadow: "12px 12px 0 0 var(--ink)",
        }}
      >
        {/* Background deco */}
        <div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.07]">
          <Star8 size={220} fill="var(--purple)" />
        </div>

        {/* Step progress bar */}
        <StepBar step={1} />

        {/* Form */}
        <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-muted" />}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
