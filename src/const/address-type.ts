import { Briefcase, FileText, Home, LucideIcon, Mailbox } from "lucide-react";

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

export const ADDRESS_TYPE_ORDER = [
  AddressType.HOME,
  AddressType.INVOICE,
  AddressType.POST,
  AddressType.WORK,
];

export const ADDRESS_TYPE_ICONS: Record<AddressType, LucideIcon> = {
  HOME: Home,
  INVOICE: FileText,
  POST: Mailbox,
  WORK: Briefcase,
};
