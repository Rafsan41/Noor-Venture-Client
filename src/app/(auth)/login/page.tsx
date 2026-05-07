"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Moon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  email:    z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});
type FormData = z.infer<typeof schema>;

const DEMO_ACCOUNTS = [
  { label: "Admin",    email: "admin@noorventure.com",     password: "Admin1234!",   color: "text-purple-600" },
  { label: "Owner",    email: "rafsan@noorventure.com",    password: "Owner1234!",   color: "text-emerald-600" },
  { label: "Investor", email: "investor1@noorventure.com", password: "Invest1234!",  color: "text-coral-600" },
];

export default function LoginPage() {
  const { login }           = useAuth();
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Direct login — bypasses the form and browser autofill completely
  const quickLogin = async (email: string, password: string, label: string) => {
    setDemoLoading(label);
    try   { await login(email, password); }
    catch { /* handled in hook */ }
    finally { setDemoLoading(null); }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try   { await login(data.email, data.password); }
    catch { /* handled in hook */ }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-100 via-white to-coral-50 dark:from-amber-950/20 dark:via-background dark:to-emerald-950/20 p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-coral-500 text-white mb-4">
            <Moon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to NoorVenture</p>
        </div>

        {/* Quick Demo Login */}
        <div className="rounded-2xl border bg-muted/40 p-4 mb-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3">⚡ One-click demo login:</p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_ACCOUNTS.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => quickLogin(a.email, a.password, a.label)}
                disabled={!!demoLoading || loading}
                className={`rounded-lg border bg-white dark:bg-card py-2 text-xs font-semibold transition-colors hover:bg-muted disabled:opacity-60 flex items-center justify-center gap-1 ${a.color}`}
              >
                {demoLoading === a.label
                  ? <Loader2 className="h-3 w-3 animate-spin" />
                  : a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-white dark:bg-card p-8 shadow-sm">
          <p className="text-xs text-muted-foreground mb-4 text-center">Or sign in with your credentials</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-coral-400 transition-shadow"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm pr-10 outline-none focus:ring-2 focus:ring-coral-400 transition-shadow"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !!demoLoading}
              className="w-full rounded-lg bg-coral-500 py-2.5 text-sm font-semibold text-white hover:bg-coral-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          New to NoorVenture?{" "}
          <Link href="/register" className="text-coral-600 font-medium hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
