"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { apiPost } from "@/lib/api";
import type { ApiResponse, User } from "@/types";
import { toast } from "sonner";

export function useAuth() {
  const router  = useRouter();
  const store   = useAuthStore();

  const login = async (email: string, password: string) => {
    try {
      const res = await apiPost<ApiResponse<{ token: string; user: User }>>(
        "/auth/sign-in/email",
        { email, password }
      );
      if (res.success && res.data) {
        store.setToken(res.data.token);
        store.setUser(res.data.user);
        toast.success(`Welcome back, ${res.data.user.name}!`);

        const role = res.data.user.role;
        if (role === "ADMIN")          router.push("/admin");
        else if (role === "BUSINESS_OWNER") router.push("/dashboard");
        else                            router.push("/dashboard");
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
      const res = await apiPost<ApiResponse<{ token: string; user: User }>>(
        "/auth/sign-up/email",
        data
      );
      if (res.success && res.data) {
        store.setToken(res.data.token);
        store.setUser(res.data.user);
        toast.success("Account created! Welcome to NoorVenture.");
        router.push("/dashboard");
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
