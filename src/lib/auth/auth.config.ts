import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth: _auth }) {
      return true;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/dashboard`;
    },

    async jwt({ token, user, trigger }) {
      if (user?.id) {
        token.sub = user.id;
      }
      if ((trigger === "signIn" || trigger === "update") && token.sub) {
        try {
          const { getDb, hasDatabase } = await import("@/lib/db/server");
          if (hasDatabase()) {
            const { users } = await import("@/lib/db/schema");
            const { eq } = await import("drizzle-orm");
            const db = getDb();
            const dbUser = await db.query.users.findFirst({
              where: eq(users.id, token.sub),
              columns: { role: true },
            });
            token.role = dbUser?.role ?? "student";
          }
        } catch {
          token.role = "student";
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = (token.role as "admin" | "instructor" | "student") ?? "student";
      }
      return session;
    },

    async signIn({ user }) {
      if (user.id && user.email) {
        try {
          const { getDb, hasDatabase } = await import("@/lib/db/server");
          if (!hasDatabase()) return true;

          const { sql } = await import("drizzle-orm");
          const db = getDb();

          // Auto-promote first user as admin
          const promoted = await db.execute(sql`
            UPDATE users SET role = 'admin'
            WHERE id = ${user.id}
              AND NOT EXISTS (SELECT 1 FROM users WHERE role = 'admin')
          `);
          if ((promoted as { rowCount?: number }).rowCount === 1) {
            console.log(
              `[Auth] Auto-promoted first user ${user.email} as admin`,
            );
          }
        } catch {
          console.warn("Failed to check admin promotion for", user.email);
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
