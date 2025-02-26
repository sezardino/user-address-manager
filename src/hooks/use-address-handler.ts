import { AddressFormValues } from "@/components/forms/address/address.schema";
import { ADDRESS_FORM_COPY, AddressFormType } from "@/const/address-form-copy";
import { AddressType } from "@/const/address-type";
import { ServerActionResponse } from "@/types/base";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useServerActionHandler } from "./use-server-action-handler";

type Props = {
  formType: AddressFormType;
  userId: number;
  addressType: AddressType;
  onFormSubmit: (values: FormData) => Promise<ServerActionResponse<void>>;
};

export const useAddressHandler = (props: Props) => {
  const { addressType, userId, onFormSubmit, formType } = props;
  const router = useRouter();

  return useServerActionHandler({
    action: (values: AddressFormValues) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) =>
        formData.set(key, value)
      );

      formData.set("userId", userId.toString());
      formData.set("addressType", addressType);

      return onFormSubmit(formData);
    },
    onSuccess: () => {
      toast.success(ADDRESS_FORM_COPY[formType].success);
      router.back();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};
