"use server";

import { ServerActionResponse } from "@/types/base";
import { UserEntity } from "@/types/entity";
import { eq } from "drizzle-orm";
import { db, schema } from "../../drizzle";

export const userSA = async (
  dto: unknown
): Promise<ServerActionResponse<Pick<UserEntity, "id">>> => {
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
