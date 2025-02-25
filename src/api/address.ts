"use server";

import { addressDtoSchema } from "@/schemas/server-actions";
import { ServerActionResponse } from "@/types/base";
import { zodValidation } from "@/utils/zod-validation";
import { and, eq } from "drizzle-orm";
import { db, schema } from "../../drizzle";
import { AddressEntity } from "../../drizzle/schema";

const validationSchema = addressDtoSchema;

export const addressSA = async (
  dto: unknown
): Promise<ServerActionResponse<AddressEntity>> => {
  const validationResponse = zodValidation(validationSchema, dto);

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { addressType, userId } = validationResponse.data;

  try {
    const address = await db.query.addresses.findFirst({
      where: and(
        eq(schema.addresses.userId, userId),
        eq(schema.addresses.addressType, addressType)
      ),
    });

    if (!address) return { message: "Address not found" };
    console.log(address);
    return address;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to add new address" };
  }
};
