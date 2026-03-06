import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "@/components/shared/trpc-provider";
import { DashboardNav } from "@/components/shared/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <div className="bg-canvas-bg text-text min-h-screen">
          <DashboardNav />
          <main>{children}</main>
        </div>
      </TRPCProvider>
    </SessionProvider>
  );
}
