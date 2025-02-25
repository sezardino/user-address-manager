"use server";

import { addressFormSchema } from "@/components/forms/address/address.schema";
import { ApplicationUrls } from "@/const/router";
import { addressDtoSchema } from "@/schemas/server-actions";
import { ServerActionResponse } from "@/types/base";
import { zodValidation } from "@/utils/zod-validation";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "../../drizzle";
import { validateAddressExistence } from "./validate-address-existance";

const validationSchema = addressDtoSchema.and(addressFormSchema);

export const editAddressSA = async (
  dto: unknown
): Promise<ServerActionResponse<void>> => {
  if (!(dto instanceof FormData)) return { message: "Invalid data" };

  const validationResponse = zodValidation(validationSchema, {
    userId: Number(dto.get("userId")),
    addressType: dto.get("addressType"),
    postCode: dto.get("postCode"),
    city: dto.get("city"),
    countryCode: dto.get("countryCode"),
    street: dto.get("street"),
    buildingNumber: dto.get("buildingNumber"),
  });

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const {
    buildingNumber,
    city,
    countryCode,
    postCode,
    street,
    addressType,
    userId,
  } = validationResponse.data;

  let success = false;

  try {
    const isAddressExistResponse = await validateAddressExistence(
      userId,
      addressType
    );

    if (!isAddressExistResponse) return { message: "Address not found" };

    await db
      .update(schema.addresses)
      .set({
        addressType,
        buildingNumber,
        city,
        countryCode,
        postCode,
        street,
      })
      .where(
        and(
          eq(schema.addresses.userId, userId),
          eq(schema.addresses.addressType, addressType)
        )
      );

    success = true;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to add new address" };
  }

  if (success) {
    revalidatePath(ApplicationUrls.users.index);
    revalidatePath(ApplicationUrls.users.editAddress(userId, addressType));
  }
};
