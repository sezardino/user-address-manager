export type AddressFormType = "create" | "edit";

type Copy = { title: string; description: string; trigger: string };

export const ADDRESS_FORM_COPY: Record<AddressFormType, Copy> = {
  create: {
    title: "Create new address for selected user",
    description: "Specify data for address",
    trigger: "Create",
  },
  edit: {
    title: "Edit selected address",
    description: "Change necessary fields",
    trigger: "Edit",
  },
};
