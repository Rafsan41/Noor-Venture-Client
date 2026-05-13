"use client";

import { useAuthStore } from "@/store/auth.store";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { User, Bell, Shield, ChevronRight } from "lucide-react";

const SECTION_STYLE = {
  background: "var(--surface)",
  border: "1.5px solid var(--line)",
  borderRadius: 20,
};

const INPUT_STYLE = {
  borderColor: "var(--line)",
  background: "var(--paper-2)",
  fontFamily: "inherit",
};

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const initials = user?.name?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <DashboardShell>
      <div className="mx-auto max-w-2xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
            Settings
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
            Manage your account, notifications, and security
          </p>
        </div>

        {/* Profile card */}
        <div className="p-6" style={SECTION_STYLE}>
          <h3 className="mb-5 flex items-center gap-2 font-semibold" style={{ color: "var(--ink)" }}>
            <User className="h-4 w-4" style={{ color: "var(--coral)" }} /> Profile
          </h3>

          {/* Avatar row */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
              style={{
                background: "var(--grad)",
                boxShadow: "0 8px 24px -8px rgba(231,83,149,0.5)",
              }}
            >
              {initials}
            </div>
            <div>
              <div className="font-semibold text-lg" style={{ color: "var(--ink)" }}>
                {user?.name}
              </div>
              <div className="text-sm" style={{ color: "var(--ink-soft)" }}>
                {user?.email}
              </div>
              <div
                className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ background: "var(--paper-2)", color: "var(--coral)", border: "1px solid var(--line)" }}
              >
                {user?.role?.toLowerCase().replace("_", " ")}
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Full Name</label>
              <input
                defaultValue={user?.name ?? ""}
                className="rounded-xl border px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                style={INPUT_STYLE}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Phone</label>
              <input
                defaultValue={user?.phone ?? ""}
                placeholder="+880 1xxx-xxxxxx"
                className="rounded-xl border px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                style={INPUT_STYLE}
              />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Bio</label>
              <textarea
                defaultValue={user?.bio ?? ""}
                rows={3}
                className="resize-none rounded-xl border px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                style={INPUT_STYLE}
              />
            </div>
          </div>

          <button
            className="mt-5 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--grad)" }}
          >
            Save Changes
          </button>
        </div>

        {/* Notifications */}
        <div className="p-6" style={SECTION_STYLE}>
          <h3 className="mb-5 flex items-center gap-2 font-semibold" style={{ color: "var(--ink)" }}>
            <Bell className="h-4 w-4" style={{ color: "var(--pink)" }} /> Notifications
          </h3>
          <div className="space-y-4">
            {[
              { label: "New investment on my proposal",       sub: "When an investor commits to your deal",        checked: true  },
              { label: "Profit distribution received",         sub: "Monthly profit share credited to wallet",      checked: true  },
              { label: "Proposal status changes",              sub: "Approval, activation, or rejection updates",   checked: true  },
              { label: "New proposals matching my interests",  sub: "Personalized deal recommendations",            checked: false },
            ].map((n) => (
              <label key={n.label} className="flex cursor-pointer items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>{n.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--ink-soft)" }}>{n.sub}</div>
                </div>
                <div className="relative mt-0.5 shrink-0">
                  <input type="checkbox" defaultChecked={n.checked} className="sr-only peer" />
                  <div
                    className="h-5 w-9 cursor-pointer rounded-full transition-colors peer-checked:bg-[var(--coral)]"
                    style={{ background: "var(--line)" }}
                  />
                  <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="p-6" style={SECTION_STYLE}>
          <h3 className="mb-5 flex items-center gap-2 font-semibold" style={{ color: "var(--ink)" }}>
            <Shield className="h-4 w-4" style={{ color: "var(--purple)" }} /> Security
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="rounded-xl border px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                style={INPUT_STYLE}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: "var(--ink-soft)" }}>New Password</label>
              <input
                type="password"
                placeholder="At least 8 characters"
                className="rounded-xl border px-4 py-2.5 text-sm outline-none transition-shadow focus:ring-2"
                style={INPUT_STYLE}
              />
            </div>
            <button
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ background: "var(--paper-2)", color: "var(--ink)", border: "1.5px solid var(--line)" }}
            >
              Update Password <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Danger zone */}
          <div
            className="mt-6 rounded-xl p-4"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <div className="text-sm font-semibold" style={{ color: "#ef4444" }}>Danger zone</div>
            <div className="mt-1 text-xs" style={{ color: "var(--ink-soft)" }}>
              Permanently delete your account and all associated data.
            </div>
            <button
              className="mt-3 rounded-lg px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
