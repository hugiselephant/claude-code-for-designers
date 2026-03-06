import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  boolean,
  date,
  timestamp,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Users (Auth.js adapter + role) ──────────────────────────────────────────

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  role: varchar("role", { length: 20 }).notNull().default("student"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  enrollments: many(enrollments),
}));

// ── Auth.js Accounts ────────────────────────────────────────────────────────

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (table) => [
    primaryKey({ columns: [table.provider, table.providerAccountId] }),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// ── Cohorts ─────────────────────────────────────────────────────────────────

export const cohorts = pgTable(
  "cohorts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    startDate: date("start_date"),
    endDate: date("end_date"),
    maxStudents: integer("max_students"),
    price: integer("price").notNull(), // in cents
    stripePriceId: varchar("stripe_price_id", { length: 255 }),
    status: varchar("status", { length: 20 }).notNull().default("draft"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [index("idx_cohorts_status").on(table.status)],
);

export const cohortsRelations = relations(cohorts, ({ many }) => ({
  enrollments: many(enrollments),
}));

// ── Enrollments ─────────────────────────────────────────────────────────────

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    cohortId: uuid("cohort_id")
      .notNull()
      .references(() => cohorts.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    stripeSessionId: varchar("stripe_session_id", { length: 255 }),
    enrolledAt: timestamp("enrolled_at", { mode: "date" })
      .defaultNow()
      .notNull(),
    completedAt: timestamp("completed_at", { mode: "date" }),
  },
  (table) => [
    index("idx_enrollments_user").on(table.userId),
    index("idx_enrollments_cohort").on(table.cohortId),
    uniqueIndex("idx_enrollments_unique").on(table.userId, table.cohortId),
  ],
);

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  cohort: one(cohorts, {
    fields: [enrollments.cohortId],
    references: [cohorts.id],
  }),
}));

// ── Discord Invites ─────────────────────────────────────────────────────────

export const discordInvites = pgTable("discord_invites", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  cohortId: uuid("cohort_id")
    .notNull()
    .references(() => cohorts.id, { onDelete: "cascade" }),
  inviteUrl: text("invite_url"),
  inviteSent: boolean("invite_sent").notNull().default(false),
  sentAt: timestamp("sent_at", { mode: "date" }),
});
