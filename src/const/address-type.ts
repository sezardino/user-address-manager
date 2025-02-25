import { z } from "zod";

export const AddressType = Object.freeze({
  HOME: "HOME",
  INVOICE: "INVOICE",
  POST: "POST",
  WORK: "WORK",
});

export type AddressType = (typeof AddressType)[keyof typeof AddressType];

export const ADDRESS_TYPE_COPY: Record<AddressType, string> = {
  HOME: "Home",
  INVOICE: "Invoice",
  POST: "Post",
  WORK: "Work",
};

export const addressTypeSchema = z.enum(
  [AddressType.HOME, AddressType.INVOICE, AddressType.POST, AddressType.WORK],
  { required_error: "Required field" }
);
