import { userSA } from "@/api/user";
import { AddressFormDialog } from "@/components/modules/address/address-form-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerDialog } from "@/components/ui/server-dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  params: {
    id: number;
  };
};

const AddAddressModal = async ({ params }: Props) => {
  const { id } = params;

  const user = await userSA(id);

  if (!user)
    return (
      <ServerDialog>
        <DialogContent className="min-h-[250px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              User not found
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              User with provided id not found
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button size="lg">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </ServerDialog>
    );

  return <AddressFormDialog type="create" />;
};

export default AddAddressModal;
