import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { getDb, hasDatabase } from "@/lib/db/server";
import type { ServerDb } from "@/lib/db/server";
import {
  checkRateLimit,
  RATE_LIMIT_STANDARD,
} from "./rate-limit";
import type { RateLimitConfig } from "./rate-limit";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { auth } = await import("@/lib/auth/auth");
  const session = await auth();

  return {
    ...opts,
    db: hasDatabase() ? getDb() : null,
    session,
    userId: session?.user?.id ?? null,
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

function createRateLimitMiddleware(tier: string, config: RateLimitConfig) {
  return t.middleware(async ({ ctx, next }) => {
    const key =
      ctx.userId ??
      ctx.headers.get("x-forwarded-for") ??
      ctx.headers.get("x-real-ip") ??
      "anonymous";

    const result = checkRateLimit(`trpc:${tier}:${key}`, config);

    if (!result.allowed) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: `Rate limit exceeded. Try again in ${Math.ceil(result.resetMs / 1000)}s.`,
      });
    }

    return next();
  });
}

const standardRateLimit = createRateLimitMiddleware(
  "standard",
  RATE_LIMIT_STANDARD,
);

export const protectedProcedure = t.procedure
  .use(standardRateLimit)
  .use(async ({ ctx, next }) => {
    if (!ctx.session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be signed in to perform this action",
      });
    }

    if (!ctx.db) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Database not configured.",
      });
    }

    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
        userId: ctx.session.user.id,
        db: ctx.db as ServerDb,
      },
    });
  });

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const { users } = await import("@/lib/db/schema");
  const { eq } = await import("drizzle-orm");

  const user = await ctx.db.query.users.findFirst({
    where: eq(users.id, ctx.userId),
    columns: { role: true },
  });

  if (user?.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  return next();
});
