import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "@/components/shared/trpc-provider";
import { AdminNav } from "@/components/shared/admin-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <div className="bg-canvas-bg text-text min-h-screen">
          <AdminNav />
          <main>{children}</main>
        </div>
      </TRPCProvider>
    </SessionProvider>
  );
}
