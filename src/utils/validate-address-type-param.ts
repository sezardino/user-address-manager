import { ADDRESS_TYPE_ORDER } from "@/const/address-type";

export const validateAddressTypeParam = (stringToCheck: string) =>
  ADDRESS_TYPE_ORDER.map((type) => type.toLowerCase()).includes(stringToCheck);
