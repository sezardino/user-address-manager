("use server");

import { ApplicationUrls } from "@/const/router";
import { addressDtoSchema } from "@/schemas/server-actions";
import { ServerActionResponse } from "@/types/base";
import { zodValidation } from "@/utils/zod-validation";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import { db, schema } from "../../drizzle";
import { validateAddressExistence } from "./validate-address-existance";

const validationSchema = addressDtoSchema;

type Dto = z.infer<typeof validationSchema>;

export const deleteAddressSA = async (
  dto: Dto
): Promise<ServerActionResponse<void>> => {
  const validationResponse = zodValidation(validationSchema, dto);

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { addressType, userId } = validationResponse.data;

  let pathToRevalidate;
  let pathToRedirect;

  try {
    const isAddressExistResponse = await validateAddressExistence(
      userId,
      addressType
    );

    if (!isAddressExistResponse) return { message: `Address not found` };

    await db
      .delete(schema.addresses)
      .where(
        and(
          eq(schema.addresses.userId, userId),
          eq(schema.addresses.addressType, addressType)
        )
      );

    pathToRedirect = ApplicationUrls.users.index;
    pathToRevalidate = ApplicationUrls.users.index;
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to add new address" };
  }

  if (pathToRevalidate) revalidatePath(pathToRevalidate);
  if (pathToRedirect) redirect(pathToRedirect, RedirectType.replace);
};
