import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export type ServerDb = NodePgDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { db: ServerDb | undefined };

export function getDb(): ServerDb {
  if (!globalForDb.db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    globalForDb.db = drizzle(connectionString, {
      schema,
    }) as unknown as ServerDb;
  }
  return globalForDb.db;
}

export function hasDatabase(): boolean {
  return !!process.env.DATABASE_URL;
}
