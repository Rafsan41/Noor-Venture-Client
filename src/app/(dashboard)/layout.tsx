// Server Component — forces dynamic rendering for all dashboard routes
export const dynamic = "force-dynamic";

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
