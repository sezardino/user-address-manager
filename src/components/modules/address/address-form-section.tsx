"use client";

import { AddressFormProps } from "@/components/forms/address/address";
import { Button } from "@/components/ui/button";
import { ADDRESS_FORM_COPY, AddressFormType } from "@/const/address-form-copy";
import { AddressType } from "@/const/address-type";
import { ApplicationUrls } from "@/const/router";
import { useAddressHandler } from "@/hooks/use-address-handler";
import { ServerActionResponse } from "@/types/base";
import Link from "next/link";
import { useId } from "react";
import { AddressFormWidget } from "./address-form-widget";

export type AddressFormSectionProps = {
  userId: number;
  formType: AddressFormType;
  addressType: AddressType;
  onFormSubmit: (values: FormData) => Promise<ServerActionResponse<void>>;
  initialAddress?: AddressFormProps["initialValues"];
};

export const AddressFormSection = (props: AddressFormSectionProps) => {
  const { initialAddress, formType, addressType, onFormSubmit, userId } = props;
  const formId = useId();
  const formSubmitHandler = useAddressHandler({
    userId,
    addressType,
    onFormSubmit,
    formType,
  });

  return (
    <section>
      <header>
        <h1 className="text-2xl font-bold">
          {ADDRESS_FORM_COPY[formType].title}
        </h1>
        <p>{ADDRESS_FORM_COPY[formType].description}</p>
      </header>

      <AddressFormWidget
        formId={formId}
        addressType={addressType}
        onFormSubmit={formSubmitHandler}
        initialValues={initialAddress}
      />

      <footer className="flex items-center justify-between gap-3">
        <Button variant="outline" asChild>
          <Link href={ApplicationUrls.users.index}>Back to users list</Link>
        </Button>
        <Button type="submit" form={formId}>
          {ADDRESS_FORM_COPY[formType].trigger}
        </Button>
      </footer>
    </section>
  );
};
