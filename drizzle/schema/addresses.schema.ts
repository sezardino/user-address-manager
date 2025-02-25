import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  check,
  foreignKey,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";

export const addresses = pgTable(
  "users_addresses",
  {
    userId: integer("user_id").notNull(),
    addressType: varchar("address_type", { length: 7 }).notNull(),
    validFrom: timestamp("valid_from", { mode: "string" }).notNull(),
    postCode: varchar("post_code", { length: 6 }).notNull(),
    city: varchar({ length: 60 }).notNull(),
    countryCode: varchar("country_code", { length: 3 }).notNull(),
    street: varchar({ length: 100 }).notNull(),
    buildingNumber: varchar("building_number", { length: 60 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "users_addresses_user_id_fkey",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.userId, table.addressType, table.validFrom],
      name: "users_addresses_pkey",
    }),
    check(
      "users_addresses_address_type_check",
      sql`(address_type)::text = ANY ((ARRAY['HOME'::character varying, 'INVOICE'::character varying, 'POST'::character varying, 'WORK'::character varying])::text[])`
    ),
  ]
);

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export type AddressEntity = InferSelectModel<typeof addresses>;
