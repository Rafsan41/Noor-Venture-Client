"use client";

import { useEffect } from "react";
import { useRouter }  from "next/navigation";
import { Sidebar }    from "@/components/layout/Sidebar";
import { TopBar }     from "@/components/layout/TopBar";
import { useSocket }  from "@/hooks/useSocket";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
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
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
