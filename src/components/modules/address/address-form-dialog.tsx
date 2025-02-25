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
import { useId } from "react";
import { AddressFormWidget } from "./address-form-widget";

export type AddressFormDialogProps = {
  formType: AddressFormType;
  addressType: AddressType;
};

export const AddressFormDialog = (props: AddressFormDialogProps) => {
  const { formType, addressType } = props;
  const formId = useId();

  return (
    <ServerDialog>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{ADDRESS_FORM_COPY[formType].title}</DialogTitle>
          <DialogDescription>
            {ADDRESS_FORM_COPY[formType].description}
          </DialogDescription>
        </DialogHeader>

        <AddressFormWidget formId={formId} addressType={addressType} />

        <DialogFooter>
          <Button form={formId} type="submit">
            {ADDRESS_FORM_COPY[formType].trigger}
          </Button>
        </DialogFooter>
      </DialogContent>
    </ServerDialog>
  );
};
