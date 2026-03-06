"use client";

import { useState } from "react";
import { api } from "@/lib/trpc/client";
import { Plus } from "lucide-react";

export default function AdminCohortsPage() {
  const utils = api.useUtils();
  const { data: cohorts, isLoading } = api.cohorts.list.useQuery();
  const createMutation = api.cohorts.create.useMutation({
    onSuccess: () => utils.cohorts.list.invalidate(),
  });
  const updateMutation = api.cohorts.update.useMutation({
    onSuccess: () => utils.cohorts.list.invalidate(),
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxStudents: "",
    startDate: "",
    endDate: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      name: formData.name,
      description: formData.description || undefined,
      price: Math.round(parseFloat(formData.price) * 100),
      maxStudents: formData.maxStudents
        ? parseInt(formData.maxStudents)
        : undefined,
      startDate: formData.startDate || undefined,
      endDate: formData.endDate || undefined,
    });
    setFormData({
      name: "",
      description: "",
      price: "",
      maxStudents: "",
      startDate: "",
      endDate: "",
    });
    setShowForm(false);
  };

  const statusColors: Record<string, string> = {
    draft: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
    enrolling: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    active: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    completed: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-3xl font-medium tracking-tight">
          Cohorts
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="cta-brand flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" />
          New Cohort
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="border-border/30 mb-8 space-y-4 rounded-xl border bg-white p-6 dark:bg-neutral-900"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border-border bg-surface w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Cohort 1 — Spring 2026"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Price (USD)
              </label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="border-border bg-surface w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="299.00"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Max Students
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxStudents}
                onChange={(e) =>
                  setFormData({ ...formData, maxStudents: e.target.value })
                }
                className="border-border bg-surface w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="20"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="border-border bg-surface w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border-border bg-surface w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
              rows={2}
              placeholder="Optional description..."
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="cta-brand rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {createMutation.isPending ? "Creating..." : "Create Cohort"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-text-muted hover:text-text rounded-lg px-4 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-border/30 h-20 animate-pulse rounded-xl border bg-neutral-100 dark:bg-neutral-800"
            />
          ))}
        </div>
      ) : cohorts && cohorts.length > 0 ? (
        <div className="space-y-3">
          {cohorts.map((cohort) => (
            <div
              key={cohort.id}
              className="border-border/30 flex items-center justify-between rounded-xl border bg-white p-5 dark:bg-neutral-900"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-medium">{cohort.name}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[cohort.status] ?? statusColors.draft}`}
                  >
                    {cohort.status}
                  </span>
                </div>
                <div className="text-text-muted mt-1 flex gap-4 text-sm">
                  <span>${(cohort.price / 100).toFixed(2)}</span>
                  <span>
                    {cohort.enrolledCount ?? 0}
                    {cohort.maxStudents ? `/${cohort.maxStudents}` : ""} enrolled
                  </span>
                  {cohort.startDate && (
                    <span>Starts {cohort.startDate}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {cohort.status === "draft" && (
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: cohort.id,
                        status: "enrolling",
                      })
                    }
                    className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300"
                  >
                    Open Enrollment
                  </button>
                )}
                {cohort.status === "enrolling" && (
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: cohort.id,
                        status: "active",
                      })
                    }
                    className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300"
                  >
                    Start Cohort
                  </button>
                )}
                {cohort.status === "active" && (
                  <button
                    onClick={() =>
                      updateMutation.mutate({
                        id: cohort.id,
                        status: "completed",
                      })
                    }
                    className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-border/30 rounded-xl border border-dashed py-12 text-center">
          <p className="text-text-muted">
            No cohorts yet. Create your first one to get started.
          </p>
        </div>
      )}
    </div>
  );
}
