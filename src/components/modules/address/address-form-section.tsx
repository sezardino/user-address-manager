import { Button } from "@/components/ui/button";
import { ADDRESS_FORM_COPY, AddressFormType } from "@/const/address-form-copy";
import { AddressType } from "@/const/address-type";
import { ApplicationUrls } from "@/const/router";
import Link from "next/link";
import { useId } from "react";
import { AddressFormWidget } from "./address-form-widget";

export type AddressFormSectionProps = {
  formType: AddressFormType;
  addressType: AddressType;
};

export const AddressFormSection = (props: AddressFormSectionProps) => {
  const { formType, addressType } = props;
  const formId = useId();

  return (
    <section>
      <header>
        <h1 className="text-2xl font-bold">
          {ADDRESS_FORM_COPY[formType].title}
        </h1>
        <p>{ADDRESS_FORM_COPY[formType].description}</p>
      </header>

      <AddressFormWidget formId={formId} addressType={addressType} />

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
