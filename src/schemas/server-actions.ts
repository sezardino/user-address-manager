import { AddressType } from "@/const/address-type";
import { z } from "zod";

export const addressDtoSchema = z.object({
  userId: z.number().positive(),
  addressType: z.enum(
    [AddressType.HOME, AddressType.INVOICE, AddressType.POST, AddressType.WORK],
    {
      invalid_type_error: "Invalid address type",
      required_error: "Address type is required",
    }
  ),
});
