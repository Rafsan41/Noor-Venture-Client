"use client";

import { useEffect } from "react";
import { useRouter }  from "next/navigation";
import { Sidebar }    from "@/components/layout/Sidebar";
import { TopBar }     from "@/components/layout/TopBar";
import { useSocket }  from "@/hooks/useSocket";
import { useAuthStore } from "@/store/auth.store";

export function DashboardShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?:   string;
}) {
  const router = useRouter();
  const user   = useAuthStore((s) => s.user);

  // Connect Socket.io for live stats
  useSocket();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--paper)" }}>
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-8 max-w-[1400px]">
          {children}
        </main>
      </div>
    </div>
  );
}
