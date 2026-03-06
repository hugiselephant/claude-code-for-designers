import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, adminProcedure } from "../trpc";
import { users, cohorts, enrollments } from "@/lib/db/schema";

export const adminRouter = createTRPCRouter({
  listUsers: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.query.users.findMany({
      orderBy: (u, { desc }) => [desc(u.createdAt)],
      columns: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });
  }),

  setRole: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        role: z.enum(["admin", "instructor", "student"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userId === ctx.userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot change your own role",
        });
      }
      const [user] = await ctx.db
        .update(users)
        .set({ role: input.role, updatedAt: new Date() })
        .where(eq(users.id, input.userId))
        .returning();
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }
      return user;
    }),

  dashboardStats: adminProcedure.query(async ({ ctx }) => {
    const [studentCount] = await ctx.db
      .select({ count: sql<number>`count(*)::int` })
      .from(users);

    const [cohortCount] = await ctx.db
      .select({ count: sql<number>`count(*)::int` })
      .from(cohorts);

    const [enrollmentCount] = await ctx.db
      .select({ count: sql<number>`count(*)::int` })
      .from(enrollments)
      .where(eq(enrollments.status, "active"));

    const [revenue] = await ctx.db
      .select({
        total: sql<number>`coalesce(sum(c.price), 0)::int`,
      })
      .from(enrollments)
      .innerJoin(cohorts, eq(enrollments.cohortId, cohorts.id))
      .where(eq(enrollments.status, "active"));

    return {
      totalUsers: studentCount.count,
      totalCohorts: cohortCount.count,
      activeEnrollments: enrollmentCount.count,
      totalRevenue: revenue.total,
    };
  }),
});
