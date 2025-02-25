import { addressTypeSchema } from "@/const/address-type";
import { POST_CODE_REGEXP } from "@/const/regexp";
import { z } from "zod";

export const addressFormSchema = z.object({
  type: addressTypeSchema,
  postCode: z
    .string({ required_error: "Required field" })
    .regex(POST_CODE_REGEXP),
  city: z.string(),
  countryCode: z
    .string({ required_error: "Required field" })
    .length(3)
    .regex(/^[A-Z]{3}$/, "Invalid country code"),
  street: z.string(),
  buildingNumber: z
    .string()
    .regex(/^\d+[A-Za-z]?([/-]\d+)?$/, "Invalid building number format"),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;
