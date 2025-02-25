import { Button } from "@/components/ui/button";
import { ADDRESS_FORM_COPY, AddressFormType } from "@/const/address-form-copy";
import { ApplicationUrls } from "@/const/router";
import Link from "next/link";
import { useId } from "react";
import { AddressFormWidget } from "./address-form-widget";

export type AddressFormSectionProps = {
  type: AddressFormType;
};

export const AddressFormSection = (props: AddressFormSectionProps) => {
  const { type } = props;
  const formId = useId();

  return (
    <section>
      <header>
        <h1 className="text-2xl font-bold">{ADDRESS_FORM_COPY[type].title}</h1>
        <p>{ADDRESS_FORM_COPY[type].description}</p>
      </header>

      <AddressFormWidget formId={formId} />

      <footer className="flex items-center justify-between gap-3">
        <Button variant="outline" asChild>
          <Link href={ApplicationUrls.users.index}>Back to users list</Link>
        </Button>
        <Button type="submit" form={formId}>
          {ADDRESS_FORM_COPY[type].trigger}
        </Button>
      </footer>
    </section>
  );
};
