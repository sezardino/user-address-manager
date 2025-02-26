"use server";

import { AddressType } from "@/const/address-type";
import { ServerActionResponse } from "@/types/base";
import { eq } from "drizzle-orm";
import { db, schema } from "../../drizzle";
import { AddressEntity, UserEntity } from "../../drizzle/schema";

type Response = UserEntity & {
  homeAddress?: AddressEntity;
  invoiceAddress?: AddressEntity;
  postAddress?: AddressEntity;
  workAddress?: AddressEntity;
};

export const userWithAddressesSA = async (
  dto: unknown
): Promise<ServerActionResponse<Response>> => {
  const userId = Number(dto);

  if (typeof userId !== "number") return { message: `User not found` };

  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, userId),
      with: { addresses: true },
    });

    if (!user) return { message: "User not found" };

    const { addresses, ...restUser } = user;

    return {
      ...restUser,
      homeAddress: addresses.filter(
        (a) => a.addressType === AddressType.HOME
      )[0],
      invoiceAddress: addresses.filter(
        (a) => a.addressType === AddressType.INVOICE
      )[0],
      postAddress: addresses.filter(
        (a) => a.addressType === AddressType.POST
      )[0],
      workAddress: addresses.filter(
        (a) => a.addressType === AddressType.WORK
      )[0],
    };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to fetch users data" };
  }
};
