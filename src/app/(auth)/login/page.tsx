"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { NoorLogoMark } from "@/components/shared/NoorGeometry";

const schema = z.object({
  email:    z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});
type FormData = z.infer<typeof schema>;

const DEMO_ACCOUNTS = [
  { label: "Admin",    email: "admin@noorventure.com",     password: "Admin1234!"  },
  { label: "Owner",    email: "rafsan@noorventure.com",    password: "Owner1234!"  },
  { label: "Investor", email: "investor1@noorventure.com", password: "Invest1234!" },
];

export default function LoginPage() {
  const { login }               = useAuth();
  const [show, setShow]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [demoLoad, setDemoLoad] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const quickLogin = async (email: string, password: string, label: string) => {
    setDemoLoad(label);
    try   { await login(email, password); }
    catch { /* handled in hook */ }
    finally { setDemoLoad(null); }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try   { await login(data.email, data.password); }
    catch { /* handled in hook */ }
    finally { setLoading(false); }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">

      {/* ── Left gradient panel ─────────────────────────────────── */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden border-r p-16 md:flex"
        style={{ background: "var(--grad)", borderColor: "var(--ink)", color: "white" }}
      >
        {/* Tile overlay */}
        <svg className="pointer-events-none absolute inset-0" width="100%" height="100%" aria-hidden>
          <defs>
            <pattern id="al" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="white" strokeWidth="1" opacity="0.18">
                <path d="M30 0 L60 30 L30 60 L0 30 Z" /><circle cx="30" cy="30" r="15" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#al)" />
        </svg>

        {/* Spinning deco */}
        <div className="pointer-events-none absolute -right-10 -top-10 animate-spin-slow opacity-20">
          <svg viewBox="0 0 100 100" width="280" height="280">
            <g fill="white">
              <rect x="20" y="20" width="60" height="60" />
              <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
            </g>
          </svg>
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" width="32" height="32">
            <path d="M20 2 L24 14 L36 16 L27 24 L30 36 L20 30 L10 36 L13 24 L4 16 L16 14 Z" fill="white" />
            <circle cx="20" cy="20" r="4" fill="#A73CCB" />
          </svg>
          <span className="font-display text-2xl font-semibold text-white">NoorVenture</span>
        </Link>

        {/* Headline */}
        <div className="relative z-10">
          <div className="mb-5 text-xs font-bold uppercase tracking-widest opacity-85">
            Halal capital · Real partnerships
          </div>
          <h2
            className="font-display mb-4 font-medium italic text-white"
            style={{ fontSize: "clamp(38px,4vw,56px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            Grow your wealth<br />the halal way.
          </h2>
          <p className="max-w-md text-base leading-relaxed opacity-90">
            Sign in to your Noor Wallet. Review proposals, deploy capital, and collect
            your monthly profit share — all 100% Shariah compliant.
          </p>
        </div>

        {/* Testimonial */}
        <div
          className="relative z-10 rounded-2xl border p-5"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", borderColor: "rgba(255,255,255,0.25)" }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold text-white"
              style={{ background: "var(--pink)", borderColor: "white" }}
            >FA</div>
            <div>
              <div className="mb-1 text-sm font-semibold text-white">Fatima A.</div>
              <div className="text-xs leading-relaxed opacity-85">
                &quot;My portfolio is up 19% this year — fully halal. The monthly profit-share is consistent and verified.&quot;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ────────────────────────────────────── */}
      <div
        className="flex flex-col justify-center px-8 py-12 md:px-16"
        style={{ background: "var(--paper)" }}
      >
        {/* Mobile logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 md:hidden">
          <NoorLogoMark size={24} />
          <span className="font-display font-semibold">NoorVenture</span>
        </Link>

        <Link href="/" className="mb-8 hidden text-sm md:block" style={{ color: "var(--muted-brand)" }}>
          ← Back to home
        </Link>

        <h1 className="font-display mb-2 font-medium" style={{ fontSize: 46, letterSpacing: "-0.02em" }}>
          Welcome back.
        </h1>
        <p className="mb-8 text-sm" style={{ color: "var(--ink-soft)" }}>
          Sign in to continue your halal investing journey.
        </p>

        {/* Quick demo login */}
        <div className="mb-6 rounded-2xl border p-4" style={{ background: "var(--paper-2)", borderColor: "var(--line)" }}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted-brand)" }}>
            ⚡ One-click demo login:
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => quickLogin(a.email, a.password, a.label)}
                disabled={!!demoLoad || loading}
                className="flex items-center justify-center gap-1 rounded-xl border py-2 text-xs font-bold transition-colors hover:bg-muted disabled:opacity-60"
                style={{
                  background: "white",
                  borderColor: "var(--line)",
                  color: a.label === "Admin" ? "var(--purple)" : a.label === "Owner" ? "var(--emerald-c)" : "var(--coral)",
                }}
              >
                {demoLoad === a.label ? <Loader2 className="h-3 w-3 animate-spin" /> : a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border p-8" style={{ background: "white", borderColor: "var(--line)" }}>
          <p className="mb-5 text-center text-xs" style={{ color: "var(--muted-brand)" }}>
            Or sign in with your credentials
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@email.com"
                autoComplete="email"
                className="rounded-xl border px-4 py-3 text-sm outline-none transition-shadow"
                style={{ borderColor: "var(--line)", fontFamily: "inherit" }}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border py-3 pl-4 pr-12 text-sm outline-none transition-shadow"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2" style={{ color: "var(--ink-soft)" }}>
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="font-medium" style={{ color: "var(--pink-deep)" }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading || !!demoLoad}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--grad)", boxShadow: "0 10px 30px -10px rgba(231,83,149,0.55)" }}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in →
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3" style={{ color: "var(--muted-brand)" }}>
            <div className="h-px flex-1" style={{ background: "var(--line)" }} />
            <span className="text-xs">or</span>
            <div className="h-px flex-1" style={{ background: "var(--line)" }} />
          </div>

          <button
            className="flex w-full items-center justify-center gap-2.5 rounded-full border py-3 text-sm font-semibold transition-colors hover:bg-muted"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.42 3.47 1.18 4.97l3.66-2.87z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-brand)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold" style={{ color: "var(--pink-deep)" }}>
            Open one for free →
          </Link>
        </p>
      </div>
    </div>
  );
}
