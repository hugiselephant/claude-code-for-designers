import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, adminProcedure } from "../trpc";
import { enrollments } from "@/lib/db/schema";

export const enrollmentsRouter = createTRPCRouter({
  getMyEnrollments: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.enrollments.findMany({
      where: eq(enrollments.userId, ctx.userId),
      with: { cohort: true },
      orderBy: (e, { desc }) => [desc(e.enrolledAt)],
    });
  }),

  isEnrolled: protectedProcedure
    .input(z.object({ cohortId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const enrollment = await ctx.db.query.enrollments.findFirst({
        where: and(
          eq(enrollments.userId, ctx.userId),
          eq(enrollments.cohortId, input.cohortId),
          eq(enrollments.status, "active"),
        ),
      });
      return !!enrollment;
    }),

  getForCohort: adminProcedure
    .input(z.object({ cohortId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.enrollments.findMany({
        where: eq(enrollments.cohortId, input.cohortId),
        with: { user: true },
        orderBy: (e, { desc }) => [desc(e.enrolledAt)],
      });
    }),
});
