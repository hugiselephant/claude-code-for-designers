import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";
import { cohorts, enrollments } from "@/lib/db/schema";

export const cohortsRouter = createTRPCRouter({
  getActive: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) return null;
    return ctx.db.query.cohorts.findFirst({
      where: eq(cohorts.status, "enrolling"),
      orderBy: (c, { desc }) => [desc(c.createdAt)],
    });
  }),

  list: adminProcedure.query(async ({ ctx }) => {
    const allCohorts = await ctx.db.query.cohorts.findMany({
      orderBy: (c, { desc }) => [desc(c.createdAt)],
    });

    // Get enrollment counts
    const counts = await ctx.db
      .select({
        cohortId: enrollments.cohortId,
        count: sql<number>`count(*)::int`,
      })
      .from(enrollments)
      .where(eq(enrollments.status, "active"))
      .groupBy(enrollments.cohortId);

    const countMap = new Map(counts.map((c) => [c.cohortId, c.count]));

    return allCohorts.map((cohort) => ({
      ...cohort,
      enrolledCount: countMap.get(cohort.id) ?? 0,
    }));
  }),

  getById: adminProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const cohort = await ctx.db.query.cohorts.findFirst({
        where: eq(cohorts.id, input.id),
      });
      if (!cohort) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Cohort not found" });
      }
      return cohort;
    }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        description: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        maxStudents: z.number().int().positive().optional(),
        price: z.number().int().min(0),
        status: z.enum(["draft", "enrolling", "active", "completed"]).default("draft"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [cohort] = await ctx.db.insert(cohorts).values(input).returning();
      return cohort;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(1).max(255).optional(),
        description: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        maxStudents: z.number().int().positive().optional(),
        price: z.number().int().min(0).optional(),
        status: z.enum(["draft", "enrolling", "active", "completed"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;
      const [cohort] = await ctx.db
        .update(cohorts)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(cohorts.id, id))
        .returning();
      if (!cohort) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Cohort not found" });
      }
      return cohort;
    }),
});
