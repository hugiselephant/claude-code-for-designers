"use client";

import Image from "next/image";
import { api } from "@/lib/trpc/client";

export default function AdminStudentsPage() {
  const { data: users, isLoading } = api.admin.listUsers.useQuery();

  const utils = api.useUtils();
  const setRoleMutation = api.admin.setRole.useMutation({
    onSuccess: () => utils.admin.listUsers.invalidate(),
  });

  const roleBadge: Record<string, string> = {
    admin: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    instructor: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    student: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-heading mb-8 text-3xl font-medium tracking-tight">
        Students
      </h1>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="border-border/30 h-16 animate-pulse rounded-xl border bg-neutral-100 dark:bg-neutral-800"
            />
          ))}
        </div>
      ) : users && users.length > 0 ? (
        <div className="border-border/30 overflow-hidden rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-border/30 border-b bg-neutral-50 dark:bg-neutral-900">
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Joined</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-border/30 border-b bg-white last:border-0 dark:bg-neutral-950"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {user.image && (
                        <Image
                          src={user.image}
                          alt=""
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full"
                        />
                      )}
                      <span className="font-medium">
                        {user.name ?? "Unnamed"}
                      </span>
                    </div>
                  </td>
                  <td className="text-text-muted px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleBadge[user.role] ?? roleBadge.student}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-text-muted px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        setRoleMutation.mutate({
                          userId: user.id,
                          role: e.target.value as "admin" | "instructor" | "student",
                        })
                      }
                      className="border-border bg-surface rounded border px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border-border/30 rounded-xl border border-dashed py-12 text-center">
          <p className="text-text-muted">No users yet.</p>
        </div>
      )}
    </div>
  );
}
