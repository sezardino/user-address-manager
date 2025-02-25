import { z } from "zod";
import { UserEntity } from "../../drizzle/schema";
import { paginationRequestSchema, PaginationResponse } from "./pagination";

export const usersListRequestSchema = paginationRequestSchema;

type PickerUserFields = Pick<
  UserEntity,
  "id" | "firstName" | "lastName" | "email" | "status" | "initials"
>;

export type UsersListRequest = z.infer<typeof usersListRequestSchema>;
export type UsersListResponse = PaginationResponse & {
  users: (PickerUserFields & {
    homeAddressesCount: number;
    invoiceAddressesCount: number;
    postAddressesCount: number;
    workAddressesCount: number;
  })[];
};
