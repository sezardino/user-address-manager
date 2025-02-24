import { relations } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const addresses = pgTable(
  "users_addresses",
  {
    userId: serial("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    addressType: varchar("address_type", { length: 7 }).notNull(),
    validFrom: timestamp("valid_from", { mode: "string" }).notNull(),
    postCode: varchar("post_code", { length: 6 }).notNull(),
    city: varchar("city", { length: 60 }).notNull(),
    countryCode: varchar("country_code", { length: 3 }).notNull(),
    street: varchar("street", { length: 100 }).notNull(),
    buildingNumber: varchar("building_number", { length: 60 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.userId, table.addressType, table.validFrom],
      }),
    },
  ]
);

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));
