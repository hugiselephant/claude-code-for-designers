import { readFileSync, existsSync } from "fs";
import { defineConfig } from "drizzle-kit";

// drizzle-kit only loads .env by default; Next.js uses .env.local.
// Manually parse .env.local so db commands work without extra flags.
if (!process.env.DATABASE_URL && existsSync(".env.local")) {
  const envLocal = readFileSync(".env.local", "utf-8");
  for (const line of envLocal.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL || "postgresql://academy:academy@localhost:5433/academy",
  },
});
