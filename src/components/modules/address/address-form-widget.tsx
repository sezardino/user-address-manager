"use client";

import {
  AddressForm,
  AddressFormProps,
} from "@/components/forms/address/address";
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
};

export type AddressFormWidgetProps = ComponentPropsWithoutRef<"div"> &
  Pick<AddressFormProps, "onFormSubmit" | "initialValues"> & {
    formId: string;
    addressType: AddressType;
  };

export const AddressFormWidget = (props: AddressFormWidgetProps) => {
  const {
    initialValues,
    onFormSubmit,
    addressType,
    formId,
    className,
    ...rest
  } = props;
  const [previewData, setPreview] = useState<AddressFormValues>(
    initialValues ? initialValues : initialPreview
  );

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
        onFormSubmit={onFormSubmit}
        onFormChange={changePreviewHandler}
        initialValues={initialValues}
      />

      <AddressPreview address={{ ...previewData, addressType }} />
    </div>
  );
};
