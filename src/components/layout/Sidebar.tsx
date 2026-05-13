"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, Wallet, FileText,
  Brain, Users, Settings, LogOut, PlusCircle, BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { NoorLogoMark } from "@/components/shared/NoorGeometry";

const ownerLinks = [
  { href: "/dashboard",        icon: LayoutDashboard, label: "Dashboard",    sym: "◐" },
  { href: "/proposals",        icon: FileText,         label: "My proposals", sym: "⌬" },
  { href: "/proposals/create", icon: PlusCircle,       label: "New proposal", sym: "+" },
  { href: "/reports",          icon: BarChart3,        label: "Reports",      sym: "⌗" },
  { href: "/wallet",           icon: Wallet,           label: "Wallet",       sym: "◈" },
  { href: "/ai",               icon: Brain,            label: "NoorAI",       sym: "✦", badge: "New" },
];

const investorLinks = [
  { href: "/dashboard",   icon: LayoutDashboard, label: "Dashboard",   sym: "◐" },
  { href: "/proposals",   icon: FileText,        label: "Browse deals", sym: "⌬" },
  { href: "/investments", icon: TrendingUp,      label: "Investments",  sym: "↗" },
  { href: "/wallet",      icon: Wallet,          label: "Wallet",       sym: "◈" },
  { href: "/ai",          icon: Brain,           label: "NoorAI",       sym: "✦", badge: "New" },
];

const adminLinks = [
  { href: "/admin",           icon: LayoutDashboard, label: "Overview",     sym: "◐" },
  { href: "/admin/users",     icon: Users,           label: "Users",        sym: "◉" },
  { href: "/admin/proposals", icon: FileText,        label: "Proposals",    sym: "⌬" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAdmin, isOwner } = useAuth();

  const links = isAdmin() ? adminLinks : isOwner() ? ownerLinks : investorLinks;
  const sectionLabel = isAdmin() ? "Admin" : isOwner() ? "Business" : "Investor";

  const userColor = isAdmin() ? "#A73CCB" : isOwner() ? "#E85395" : "#FF9071";
  const userInitials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "?";

  return (
    <aside
      className="flex h-screen w-[248px] shrink-0 flex-col overflow-y-auto"
      style={{
        background: "var(--surface)",
        borderRight: "1.5px solid var(--ink)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 py-5"
        style={{ borderBottom: "1px solid var(--line)", marginBottom: 12 }}
      >
        <NoorLogoMark size={28} />
        <span
          className="font-display text-[18px] font-semibold"
          style={{ letterSpacing: "-0.01em" }}
        >
          Noor<span style={{ color: "var(--pink-deep)" }}>Venture</span>
        </span>
      </div>

      {/* Section label */}
      <div
        className="px-4 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.12em]"
        style={{ color: "var(--muted-brand)" }}
      >
        {sectionLabel}
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-3">
        {links.map(({ href, icon: Icon, label, sym, badge }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && href !== "/admin" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                active
                  ? "text-[var(--paper)]"
                  : "hover:bg-[var(--paper-2)]"
              )}
              style={
                active
                  ? {
                      background: "var(--ink)",
                      boxShadow: "4px 4px 0 0 var(--pink)",
                      color: "var(--paper)",
                    }
                  : { color: "var(--ink-soft)" }
              }
            >
              {/* Active accent bar */}
              {active && (
                <span
                  className="absolute -left-3 bottom-2 top-2 w-1 rounded-full"
                  style={{ background: "var(--grad)" }}
                />
              )}

              {/* Symbol icon (design style) */}
              <span
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-sm"
                aria-hidden
              >
                {sym}
              </span>

              <span className="flex-1">{label}</span>

              {badge && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: "var(--coral)" }}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings + logout */}
      <div className="mt-auto px-3 pb-3 pt-3" style={{ borderTop: "1px solid var(--line)" }}>
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
            pathname === "/settings"
              ? "text-[var(--paper)]"
              : "hover:bg-[var(--paper-2)]"
          )}
          style={
            pathname === "/settings"
              ? { background: "var(--ink)", color: "var(--cream)" }
              : { color: "var(--ink-soft)" }
          }
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </Link>

        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:bg-red-50 hover:text-red-600"
          style={{ color: "var(--ink-soft)" }}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>

      {/* User card */}
      <div
        className="mx-3 mb-4 flex items-center gap-2.5 rounded-2xl border-2 p-3.5"
        style={{ background: "var(--paper-2)", borderColor: "var(--ink)" }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold text-white"
          style={{ background: userColor, borderColor: "var(--ink)" }}
        >
          {userInitials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{user?.name}</div>
          <div className="text-[11px]" style={{ color: "var(--muted-brand)" }}>
            {user?.role?.toLowerCase().replace("_", " ")}
          </div>
        </div>
        <Link
          href="/"
          title="Sign out"
          className="text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          ⏻
        </Link>
      </div>
    </aside>
  );
}
