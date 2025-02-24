"use server";

import { AddressType } from "@/const/address-type";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@/const/pagination";
import {
  UsersListResponse,
  usersListRequestSchema,
} from "@/schemas/users-list";
import { ServerActionResponse } from "@/types/base";
import { getPaginationData } from "@/utils/pagination";
import { zodValidation } from "@/utils/zod-validation";
import { count } from "drizzle-orm";
import { db, schema } from "../../drizzle";

export const usersListSA = async (
  dto: unknown
): Promise<ServerActionResponse<UsersListResponse>> => {
  const validationResponse = zodValidation(usersListRequestSchema, dto);

  if (!validationResponse.success)
    return { message: "Invalid input", errors: validationResponse.errors };

  const { limit = DEFAULT_PAGE_LIMIT, page = DEFAULT_PAGE_NUMBER } =
    validationResponse.data;

  const [usersCount] = await db.select({ count: count() }).from(schema.users);

  const { offset, meta } = getPaginationData(usersCount.count, page, limit);

  try {
    const users = await db.query.users.findMany({
      limit,
      offset,
      columns: {
        id: true,
        email: true,
        initials: true,
        firstName: true,
        lastName: true,
        status: true,
      },
      with: {
        addresses: {
          columns: {
            addressType: true,
          },
        },
      },
    });

    const usersWithAddressCount = users.map(({ addresses, ...user }) => ({
      ...user,
      homeAddressesCount: addresses.filter(
        (a) => a.addressType === AddressType.HOME
      ).length,
      invoiceAddressesCount: addresses.filter(
        (a) => a.addressType === AddressType.INVOICE
      ).length,
      postAddressesCount: addresses.filter(
        (a) => a.addressType === AddressType.POST
      ).length,
      workAddressesCount: addresses.filter(
        (a) => a.addressType === AddressType.WORK
      ).length,
    }));

    return { meta, users: usersWithAddressCount };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to fetch users data" };
  }
};
