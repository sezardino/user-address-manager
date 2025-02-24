import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema/**.schema.ts",
  out: "./drizzle/out",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL,
  },
} as Config);
