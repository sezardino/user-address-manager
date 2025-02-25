"use server";

import { ServerActionResponse } from "@/types/base";
import { eq } from "drizzle-orm";
import { db, schema } from "../../drizzle";

type Response = { exist: true };

export const isUserExistSA = async (
  dto: unknown
): Promise<ServerActionResponse<Response>> => {
  const userId = Number(dto);

  if (typeof userId !== "number") return { message: `User not found` };

  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, userId),
      columns: {
        id: true,
      },
    });

    if (!user) return { message: "User not found" };

    return { exist: true };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to fetch users data" };
  }
};
