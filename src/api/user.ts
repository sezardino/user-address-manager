"use server";

import { ServerActionResponse } from "@/types/base";
import { eq } from "drizzle-orm";
import { db, schema } from "../../drizzle";
import { UserEntity } from "../../drizzle/schema";

type Response = Pick<UserEntity, "id">;

export const userSA = async (
  dto: unknown
): Promise<ServerActionResponse<Response>> => {
  if (typeof dto !== "number") return { message: `User not found` };

  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, dto),
      columns: {
        id: true,
      },
    });

    if (!user) return { message: "User not found" };

    return user;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to fetch users data" };
  }
};
