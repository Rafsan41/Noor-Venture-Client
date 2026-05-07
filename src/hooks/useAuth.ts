"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { apiPost } from "@/lib/api";
import type { User } from "@/types";
import { toast } from "sonner";

// Better Auth response shape (not wrapped in {success, data})
interface BetterAuthResponse {
  redirect: boolean;
  token: string;
  user: User;
}

export function useAuth() {
  const router  = useRouter();
  const store   = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      const res = await apiPost<BetterAuthResponse>(
        "/auth/sign-in/email",
        { email, password }
      );
      if (res.token && res.user) {
        store.setToken(res.token);
        store.setUser(res.user);
        toast.success(`Welcome back, ${res.user.name}!`);

        const role = res.user.role;
        if (role === "ADMIN")               router.push("/admin");
        else if (role === "BUSINESS_OWNER") router.push("/dashboard");
        else                                router.push("/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
        throw new Error("Login failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  };

  const register = async (data: {
    name:     string;
    email:    string;
    password: string;
    role:     "BUSINESS_OWNER" | "INVESTOR";
  }) => {
    try {
      const res = await apiPost<BetterAuthResponse>(
        "/auth/sign-up/email",
        data
      );
      if (res.token && res.user) {
        store.setToken(res.token);
        store.setUser(res.user);
        toast.success("Account created! Welcome to NoorVenture.");
        router.push("/dashboard");
      } else {
        toast.error("Registration failed. Please try again.");
        throw new Error("Registration failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await apiPost("/auth/sign-out");
    } catch {
      // silently ignore
    } finally {
      store.logout();
      router.push("/login");
      toast.success("Logged out successfully");
    }
  };

  return { login, register, logout, user: store.user, token: store.token, isAdmin: store.isAdmin, isOwner: store.isOwner, isInvestor: store.isInvestor };
}
