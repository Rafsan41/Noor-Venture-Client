"use client";

import { useEffect } from "react";
import { useRouter }  from "next/navigation";
import { Sidebar }    from "@/components/layout/Sidebar";
import { TopBar }     from "@/components/layout/TopBar";
import { useSocket }  from "@/hooks/useSocket";
import { useAuthStore } from "@/store/auth.store";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user   = useAuthStore((s) => s.user);

  useSocket();

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    if (user.role !== "ADMIN") router.push("/dashboard");
  }, [user, router]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <TopBar title="Admin Panel" />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
