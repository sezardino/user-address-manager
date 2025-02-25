"use server";

import { AddressType } from "@/const/address-type";
import { and, eq } from "drizzle-orm";
import { db, schema } from "../../drizzle";

export const validateAddressExistence = async (
  userId: number,
  addressType: AddressType
) => {
  const isAddressExistResponse = await db.query.addresses.findFirst({
    where: and(
      eq(schema.addresses.userId, userId),
      eq(schema.addresses.addressType, addressType)
    ),
    columns: { addressType: true },
  });

  return !!isAddressExistResponse;
};
