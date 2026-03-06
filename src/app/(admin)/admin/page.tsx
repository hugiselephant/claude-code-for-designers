"use client";

import { api } from "@/lib/trpc/client";
import { Users, GraduationCap, DollarSign, TrendingUp } from "lucide-react";

export default function AdminOverviewPage() {
  const { data: stats, isLoading } = api.admin.dashboardStats.useQuery();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-heading mb-8 text-3xl font-medium tracking-tight">
          Admin Dashboard
        </h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-border/30 h-28 animate-pulse rounded-xl border bg-neutral-100 dark:bg-neutral-800"
            />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: "Total Students",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-sky-500",
      bg: "bg-sky-50 dark:bg-sky-950/40",
    },
    {
      label: "Active Cohorts",
      value: stats?.totalCohorts ?? 0,
      icon: GraduationCap,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-950/40",
    },
    {
      label: "Total Enrollments",
      value: stats?.activeEnrollments ?? 0,
      icon: TrendingUp,
      color: "text-teal-500",
      bg: "bg-teal-50 dark:bg-teal-950/40",
    },
    {
      label: "Revenue",
      value: `$${((stats?.totalRevenue ?? 0) / 100).toLocaleString()}`,
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950/40",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-heading mb-8 text-3xl font-medium tracking-tight">
        Admin Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="border-border/30 rounded-xl border bg-white p-5 dark:bg-neutral-900"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-text-muted text-sm">{card.label}</span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.bg}`}
              >
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
            <div className="font-heading text-2xl font-semibold">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
