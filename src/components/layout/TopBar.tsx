"use client";

import { Bell, Search } from "lucide-react";
import { useStatsStore } from "@/store/stats.store";
import { useAuthStore }  from "@/store/auth.store";

export function TopBar({ title }: { title?: string }) {
  const { connected } = useStatsStore();
  const user          = useAuthStore((s) => s.user);

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card/80 backdrop-blur px-6">
      <h1 className="font-semibold text-base">{title}</h1>

      <div className="flex items-center gap-4">
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

        {/* Notifications */}
        <button className="relative rounded-lg p-2 hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500" />
        </button>

        {/* Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold cursor-pointer">
          {user?.name?.[0]?.toUpperCase() ?? "?"}
        </div>
      </div>
    </header>
  );
}
