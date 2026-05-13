"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Bell, Search, Sun, Moon } from "lucide-react";
import { useStatsStore } from "@/store/stats.store";
import { useAuthStore  } from "@/store/auth.store";
import { LiveDot } from "@/components/shared/NoorGeometry";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title={`Theme: ${theme}`}
      className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
      style={{ borderColor: "var(--line)" }}
    >
      {theme === "dark"
        ? <Moon className="h-4 w-4" style={{ color: "var(--muted-brand)" }} />
        : <Sun  className="h-4 w-4" style={{ color: "var(--muted-brand)" }} />}
    </button>
  );
}

export function TopBar({ title }: { title?: string }) {
  const { connected } = useStatsStore();
  const user          = useAuthStore((s) => s.user);

  const userColor = user?.role === "ADMIN"
    ? "#A73CCB"
    : user?.role === "BUSINESS_OWNER"
    ? "#E85395"
    : "#FF9071";

  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "?";

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between px-8"
      style={{
        background: "rgba(255,252,240,0.88)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Left: title + live pill */}
      <div className="flex items-center gap-4">
        <h1
          className="font-display text-xl font-semibold"
          style={{ letterSpacing: "-0.01em" }}
        >
          {title}
        </h1>

        <div
          className="flex items-center gap-1.5 rounded-full border px-3 py-1"
          style={{
            background: "var(--paper-2)",
            borderColor: "var(--line)",
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--muted-brand)",
          }}
        >
          <LiveDot color={connected ? "#10b981" : "#9ca3af"} />
          {connected ? "Live" : "Offline"}
        </div>
      </div>

      {/* Right: search + theme + bell + avatar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
            style={{ color: "var(--muted-brand)" }}
          />
          <input
            placeholder="Search deals, transactions…"
            className="w-64 rounded-full border py-2 pl-8 pr-4 text-sm outline-none transition-shadow focus:ring-2"
            style={{
              background: "white",
              borderColor: "var(--line)",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Theme */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
          style={{ borderColor: "var(--line)" }}
        >
          <Bell className="h-4 w-4" style={{ color: "var(--muted-brand)" }} />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white"
            style={{ background: "var(--coral)" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 text-xs font-bold text-white"
          style={{ background: userColor, borderColor: "var(--ink)" }}
        >
          {userInitials}
        </div>
      </div>
    </header>
  );
}
