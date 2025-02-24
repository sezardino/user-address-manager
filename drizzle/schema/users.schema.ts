import { relations, sql } from "drizzle-orm";
import {
  check,
  pgTable,
  serial,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { addresses } from "./addresses.schema";

export const users = pgTable(
  "users",
  {
    id: serial().primaryKey().notNull(),
    firstName: varchar("first_name", { length: 60 }),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    initials: varchar({ length: 30 }),
    email: varchar({ length: 100 }).notNull(),
    status: varchar({ length: 8 }).default("ACTIVE").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    unique("users_email_key").on(table.email),
    check(
      "users_status_check",
      sql`(status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying])::text[])`
    ),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));
