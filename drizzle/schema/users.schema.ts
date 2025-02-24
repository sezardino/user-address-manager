import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { addresses } from "./adresses.schema";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 60 }),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  initials: varchar("initials", { length: 30 }),
  email: varchar("email", { length: 100 }).notNull().unique(),
  status: varchar("status", { length: 8 }).notNull().default("ACTIVE"),

  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));
