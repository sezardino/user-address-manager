"use client";

import { AddressFormProps } from "@/components/forms/address/address";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerDialog } from "@/components/ui/server-dialog";
import { ADDRESS_FORM_COPY, AddressFormType } from "@/const/address-form-copy";
import { AddressType } from "@/const/address-type";
import { useAddressHandler } from "@/hooks/use-address-handler";
import { ServerActionResponse } from "@/types/base";
import { DialogClose } from "@radix-ui/react-dialog";
import { useId } from "react";
import { AddressFormWidget } from "./address-form-widget";

export type AddressFormDialogProps = {
  userId: number;
  formType: AddressFormType;
  addressType: AddressType;
  onFormSubmit: (values: FormData) => Promise<ServerActionResponse<void>>;
  initialAddress?: AddressFormProps["initialValues"];
};

export const AddressFormDialog = (props: AddressFormDialogProps) => {
  const { onFormSubmit, formType, userId, addressType, initialAddress } = props;
  const formId = useId();
  const formSubmitHandler = useAddressHandler({
    userId,
    addressType,
    onFormSubmit,
    formType,
  });

  return (
    <ServerDialog>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{ADDRESS_FORM_COPY[formType].title}</DialogTitle>
          <DialogDescription>
            {ADDRESS_FORM_COPY[formType].description}
          </DialogDescription>
        </DialogHeader>
        {JSON.stringify({ initialAddress })}
        <AddressFormWidget
          formId={formId}
          addressType={addressType}
          onFormSubmit={formSubmitHandler}
          initialValues={initialAddress}
        />

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button form={formId} type="submit">
            {ADDRESS_FORM_COPY[formType].trigger}
          </Button>
        </DialogFooter>
      </DialogContent>
    </ServerDialog>
  );
};
