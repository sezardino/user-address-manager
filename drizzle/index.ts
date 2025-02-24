import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export * as schema from "./schema";

export const client = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(client, { schema }) as NodePgDatabase<typeof schema>;
