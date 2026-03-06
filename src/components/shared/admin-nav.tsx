"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/landing/logo";
import { ThemeToggle } from "@/components/landing/theme-toggle";
import { cn } from "@/lib/utils/cn";
import { LayoutDashboard, Users, GraduationCap, LogOut, ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/cohorts", label: "Cohorts", icon: GraduationCap },
  { href: "/admin/students", label: "Students", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-border/20 bg-glass sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-1.5">
            <Logo size={24} />
            <span className="font-heading text-lg tracking-tight">
              <span className="font-extralight">Admin</span>{" "}
              <span className="font-semibold">Panel</span>
            </span>
          </Link>
          <div className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-primary-100/50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    : "text-text-muted hover:bg-surface hover:text-text",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="text-text-muted hover:text-text flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <ThemeToggle />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-text-muted hover:text-text flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
