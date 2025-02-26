import { ADDRESS_TYPE_COPY, AddressType } from "@/const/address-type";
import { ServerActionResponse } from "@/types/base";
import { toast } from "sonner";
import { useServerActionHandler } from "./use-server-action-handler";

type ActionParams = { userId: number; addressType: AddressType };

type Props = {
  action: (values: ActionParams) => Promise<ServerActionResponse<void>>;
};

export const useDeleteAddressHandler = (props: Props) => {
  const { action } = props;

  return useServerActionHandler({
    action: (values: ActionParams) => action(values),
    onSuccess: (_, args) => {
      toast.success(
        `${ADDRESS_TYPE_COPY[args.addressType]} successfully deleted`
      );
    },
    onError: (error) => {
      toast.error(error);
    },
  });
};
