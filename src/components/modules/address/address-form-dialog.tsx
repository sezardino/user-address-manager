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
import { useId } from "react";
import { AddressFormWidget } from "./address-form-widget";

export type AddressFormDialogProps = {
  type: AddressFormType;
};

export const AddressFormDialog = (props: AddressFormDialogProps) => {
  const { type } = props;
  const formId = useId();

  return (
    <ServerDialog>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{ADDRESS_FORM_COPY[type].title}</DialogTitle>
          <DialogDescription>
            {ADDRESS_FORM_COPY[type].description}
          </DialogDescription>
        </DialogHeader>

        <AddressFormWidget formId={formId} />

        <DialogFooter>
          <Button form={formId} type="submit">
            {ADDRESS_FORM_COPY[type].trigger}
          </Button>
        </DialogFooter>
      </DialogContent>
    </ServerDialog>
  );
};
