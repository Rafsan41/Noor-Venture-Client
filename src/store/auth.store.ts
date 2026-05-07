import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types";

// SSR-safe storage — returns a no-op on the server, real localStorage in browser
const ssrSafeStorage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return {
      getItem:    (_key: string) => null,
      setItem:    (_key: string, _value: string) => {},
      removeItem: (_key: string) => {},
    };
  }
  return localStorage;
});

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
    { name: "noor-auth", storage: ssrSafeStorage, partialize: (s) => ({ user: s.user, token: s.token }) }
  )
);
