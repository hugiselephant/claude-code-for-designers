import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getDb, hasDatabase } from "@/lib/db/server";
import { users, accounts } from "@/lib/db/schema";
import authConfig from "./auth.config";

const adapter = hasDatabase()
  ? DrizzleAdapter(getDb(), {
      usersTable: users,
      accountsTable: accounts,
    })
  : undefined;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  ...(adapter ? { adapter } : {}),
});
