"use server";

import { AddressType } from "@/const/address-type";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_NUMBER } from "@/const/pagination";

import {
  paginationRequestSchema,
  PaginationResponse,
} from "@/schemas/pagination";
import { ServerActionResponse } from "@/types/base";
import { getPaginationData } from "@/utils/pagination";
import { zodValidation } from "@/utils/zod-validation";
import { count } from "drizzle-orm";
import { db, schema } from "../../drizzle";
import { UserEntity } from "../../drizzle/schema";
import { UserAddressesExistenceResponse } from "@/types/response";

type UserPickerFields = Pick<
  UserEntity,
  "id" | "firstName" | "lastName" | "initials" | "status" | "email"
>;

type Response = PaginationResponse & {
  users: (UserPickerFields & UserAddressesExistenceResponse)[];
};

export const usersListSA = async (
  dto: unknown
): Promise<ServerActionResponse<Response>> => {
  const validationResponse = zodValidation(paginationRequestSchema, dto);

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

    const usersWithAddresses = users.map(({ addresses, ...user }) => ({
      ...user,
      isHomeAddressExist: !!addresses.filter(
        (a) => a.addressType === AddressType.HOME
      ).length,
      isInvoiceAddressExist: !!addresses.filter(
        (a) => a.addressType === AddressType.INVOICE
      ).length,
      isPostAddressExist: !!addresses.filter(
        (a) => a.addressType === AddressType.POST
      ).length,
      isWorkAddressExist: !!addresses.filter(
        (a) => a.addressType === AddressType.WORK
      ).length,
    }));

    return { meta, users: usersWithAddresses };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong when try to fetch users data" };
  }
};
