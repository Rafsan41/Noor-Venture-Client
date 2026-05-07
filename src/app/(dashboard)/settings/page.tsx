"use client";

import { useAuthStore } from "@/store/auth.store";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { User, Bell, Shield, Wallet } from "lucide-react";

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <DashboardShell>
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Card */}
      <div className="noor-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <User className="h-4 w-4" /> Profile
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-coral-100 flex items-center justify-center text-2xl font-bold text-coral-700">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-lg">{user?.name}</div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
            <div className="text-xs bg-coral-100 text-coral-700 rounded-md px-2 py-0.5 mt-1 inline-block">
              {user?.role?.toLowerCase().replace("_", " ")}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <input
              defaultValue={user?.name ?? ""}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone</label>
            <input
              defaultValue={user?.phone ?? ""}
              placeholder="+880 1xxx-xxxxxx"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Bio</label>
            <textarea
              defaultValue={user?.bio ?? ""}
              rows={3}
              className="w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-coral-400"
            />
          </div>
        </div>
        <button className="mt-4 rounded-lg bg-coral-500 px-4 py-2 text-sm font-medium text-white hover:bg-coral-600 transition-colors">
          Save Changes
        </button>
      </div>

      {/* Preferences */}
      <div className="noor-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notifications
        </h3>
        <div className="space-y-3">
          {[
            { label: "New investment on my proposal",      checked: true },
            { label: "Profit distribution received",        checked: true },
            { label: "Proposal status changes",             checked: true },
            { label: "New proposals matching my interests", checked: false },
          ].map((n) => (
            <label key={n.label} className="flex items-center justify-between">
              <span className="text-sm">{n.label}</span>
              <input type="checkbox" defaultChecked={n.checked} className="accent-coral-500" />
            </label>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="noor-card p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4" /> Security
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-coral-400" />
          </div>
          <button className="rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80 transition-colors">
            Update Password
          </button>
        </div>
      </div>
    </div>
    </DashboardShell>
  );
}
