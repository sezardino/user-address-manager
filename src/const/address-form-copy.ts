export type AddressFormType = "create" | "edit";

type Copy = {
  title: string;
  description: string;
  success: string;
  trigger: string;
};

export const ADDRESS_FORM_COPY: Record<AddressFormType, Copy> = {
  create: {
    title: "Create new address for selected user",
    description: "Specify data for address",
    success: "Address successfully added",
    trigger: "Create",
  },
  edit: {
    title: "Edit selected address",
    success: "Address successfully edited",
    description: "Change necessary fields",
    trigger: "Edit",
  },
};
