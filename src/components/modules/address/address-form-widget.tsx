"use client";

import { AddressForm } from "@/components/forms/address/address";
import { AddressFormValues } from "@/components/forms/address/address.schema";
import { AddressType } from "@/const/address-type";
import { cn } from "@/utils/shadcn-ui";
import { ComponentPropsWithoutRef, useCallback, useState } from "react";
import { AddressPreview } from "./address-preview";

const initialPreview: AddressFormValues = {
  buildingNumber: "",
  city: "",
  countryCode: "",
  postCode: "",
  street: "",
  type: "" as AddressType,
};

export type AddressFormWidgetProps = ComponentPropsWithoutRef<"div"> & {
  formId: string;
};

export const AddressFormWidget = (props: AddressFormWidgetProps) => {
  const { formId, className, ...rest } = props;
  const [previewData, setPreview] = useState<AddressFormValues>(initialPreview);

  const changePreviewHandler = useCallback(
    (key: keyof AddressFormValues, value: string) => {
      setPreview((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <div {...rest} className={cn("grid gap-4 py-4", className)}>
      <AddressForm
        id={formId}
        onFormSubmit={() => {}}
        onFormChange={changePreviewHandler}
      />

      <AddressPreview {...previewData} />
    </div>
  );
};
