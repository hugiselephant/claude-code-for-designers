import { createTRPCRouter } from "./trpc";
import { cohortsRouter } from "./routers/cohorts";
import { enrollmentsRouter } from "./routers/enrollments";
import { adminRouter } from "./routers/admin";

export const appRouter = createTRPCRouter({
  cohorts: cohortsRouter,
  enrollments: enrollmentsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
