"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Bell, Search, Sun, Moon, Monitor } from "lucide-react";
import { useStatsStore } from "@/store/stats.store";
import { useAuthStore }  from "@/store/auth.store";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-8" />;

  const cycle = () => {
    if (theme === "light")       setTheme("dark");
    else if (theme === "dark")   setTheme("system");
    else                         setTheme("light");
  };

  return (
    <button
      onClick={cycle}
      title={`Theme: ${theme} — click to cycle`}
      className="rounded-lg p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
    >
      {theme === "dark"   && <Moon    className="h-4 w-4" />}
      {theme === "light"  && <Sun     className="h-4 w-4" />}
      {theme === "system" && <Monitor className="h-4 w-4" />}
    </button>
  );
}

export function TopBar({ title }: { title?: string }) {
  const { connected } = useStatsStore();
  const user          = useAuthStore((s) => s.user);

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card/80 backdrop-blur px-6">
      <h1 className="font-semibold text-base">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`} />
          {connected ? "Live" : "Offline"}
        </div>

        {/* Search trigger */}
        <button className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search...</span>
        </button>

        {/* Dark mode toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-coral-500" />
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-coral-400 to-blush-500 text-white text-xs font-bold cursor-pointer">
          {user?.name?.[0]?.toUpperCase() ?? "?"}
        </div>
      </div>
    </header>
  );
}
