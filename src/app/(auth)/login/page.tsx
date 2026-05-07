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

export default function LoginPage() {
  const { login }   = useAuth();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try   { await login(data.email, data.password); }
    catch { /* error handled in hook */ }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-emerald-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white mb-4">
            <Moon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to NoorVenture</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-400 transition-shadow"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border px-3 py-2.5 text-sm pr-10 outline-none focus:ring-2 focus:ring-amber-400 transition-shadow"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign In
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 rounded-lg bg-muted/50 p-4 text-xs space-y-1.5">
            <p className="font-semibold text-muted-foreground mb-2">Demo Accounts</p>
            <p><span className="font-medium">Admin:</span> admin@noorventure.com / Admin1234!</p>
            <p><span className="font-medium">Owner:</span> rafsan@noorventure.com / Owner1234!</p>
            <p><span className="font-medium">Investor:</span> investor1@noorventure.com / Invest1234!</p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          New to NoorVenture?{" "}
          <Link href="/register" className="text-amber-600 font-medium hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
