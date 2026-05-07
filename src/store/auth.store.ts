import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface AuthState {
  user:      User | null;
  token:     string | null;
  setUser:   (user: User | null) => void;
  setToken:  (token: string | null) => void;
  logout:    () => void;
  isAdmin:   () => boolean;
  isOwner:   () => boolean;
  isInvestor:() => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user:  null,
      token: null,

      setUser:  (user)  => set({ user }),
      setToken: (token) => {
        set({ token });
        if (typeof window !== "undefined") {
          token
            ? localStorage.setItem("noor_token", token)
            : localStorage.removeItem("noor_token");
        }
      },

      logout: () => {
        set({ user: null, token: null });
        if (typeof window !== "undefined")
          localStorage.removeItem("noor_token");
      },

      isAdmin:    () => get().user?.role === "ADMIN",
      isOwner:    () => get().user?.role === "BUSINESS_OWNER",
      isInvestor: () => get().user?.role === "INVESTOR",
    }),
    { name: "noor-auth", partialize: (s) => ({ user: s.user, token: s.token }) }
  )
);
