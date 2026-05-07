"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, Wallet, FileText,
  Brain, Users, Settings, LogOut, Sparkles, ChevronRight,
  PlusCircle, BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const ownerLinks = [
  { href: "/dashboard",          icon: LayoutDashboard, label: "Dashboard"    },
  { href: "/proposals",          icon: FileText,         label: "Proposals"    },
  { href: "/proposals/create",   icon: PlusCircle,       label: "New Proposal" },
  { href: "/reports",            icon: BarChart3,        label: "Reports"      },
  { href: "/wallet",             icon: Wallet,           label: "Wallet"       },
  { href: "/ai",                 icon: Brain,            label: "AI Tools"     },
];

const investorLinks = [
  { href: "/dashboard",   icon: LayoutDashboard, label: "Dashboard"   },
  { href: "/proposals",   icon: FileText,        label: "Proposals"   },
  { href: "/investments", icon: TrendingUp,      label: "Investments" },
  { href: "/wallet",      icon: Wallet,          label: "Wallet"      },
  { href: "/ai",          icon: Brain,           label: "AI Tools"    },
];

const adminLinks = [
  { href: "/admin",               icon: LayoutDashboard, label: "Overview"   },
  { href: "/admin/users",         icon: Users,           label: "Users"      },
  { href: "/admin/proposals",     icon: FileText,        label: "Proposals"  },
];

export function Sidebar() {
  const pathname     = usePathname();
  const { user, logout, isAdmin, isOwner } = useAuth();

  const links = isAdmin() ? adminLinks : isOwner() ? ownerLinks : investorLinks;

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg noor-gradient text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-coral-500 to-blush-500 bg-clip-text text-transparent">
          NoorVenture
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/dashboard" && href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                active
                  ? "bg-gradient-to-r from-coral-500 to-blush-500 text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
              {active && <ChevronRight className="h-3 w-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t p-3 space-y-0.5">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-3 px-3 pt-3 mt-1 border-t">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-coral-400 to-blush-500 text-white text-xs font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.role?.toLowerCase().replace("_", " ")}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
