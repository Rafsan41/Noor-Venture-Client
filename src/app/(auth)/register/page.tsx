"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm }   from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Moon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  name:     z.string().min(2, "Name too short"),
  email:    z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters").regex(/[A-Z]/, "Need uppercase").regex(/[0-9]/, "Need a number"),
  role:     z.enum(["BUSINESS_OWNER", "INVESTOR"]),
});
type FormData = z.infer<typeof schema>;

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
    catch { /* error handled in hook */ }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Role toggle */}
      <div>
        <label className="text-sm font-medium mb-2 block">I am a...</label>
        <div className="grid grid-cols-2 gap-2">
          {(["INVESTOR", "BUSINESS_OWNER"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setValue("role", r)}
              className={`rounded-lg border-2 py-2.5 text-sm font-medium transition-all ${
                role === r
                  ? "border-coral-500 bg-coral-50 text-coral-700"
                  : "border-border text-muted-foreground hover:border-coral-300"
              }`}
            >
              {r === "INVESTOR" ? "💰 Investor" : "🏢 Business Owner"}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">Full Name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Muhammad Abdullah"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-coral-400"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium mb-1.5 block">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-coral-400"
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
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            className="w-full rounded-lg border px-3 py-2.5 text-sm pr-10 outline-none focus:ring-2 focus:ring-coral-400"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-coral-500 py-2.5 text-sm font-semibold text-white hover:bg-coral-600 disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Create Account
      </button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-100 via-white to-coral-50 dark:from-amber-950/20 dark:via-background dark:to-emerald-950/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-coral-500 text-white mb-4">
            <Moon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Join NoorVenture</h1>
          <p className="text-sm text-muted-foreground mt-1">Halal investing starts here</p>
        </div>

        <div className="rounded-2xl border bg-white dark:bg-card p-8 shadow-sm">
          <Suspense fallback={<div className="h-40 animate-pulse bg-muted rounded-lg" />}>
            <RegisterForm />
          </Suspense>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-coral-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
