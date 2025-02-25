import { userWithAddressesSA } from "@/api/user-with-addresses";
import { UserPreview } from "@/components/modules/users/user-preview";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerDialog } from "@/components/ui/server-dialog";
import { DialogClose } from "@radix-ui/react-dialog";

type Props = {
  params: Promise<{ userId: number }>;
};

const UserDetailsModal = async (props: Props) => {
  const { userId } = await props.params;

  const userResponse = await userWithAddressesSA(userId);

  if ("message" in userResponse)
    return (
      <ServerDialog>
        <DialogContent className="min-h-[250px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              {userResponse.message}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button size="lg">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </ServerDialog>
    );

  const { homeAddress, workAddress, invoiceAddress, postAddress, ...restUser } =
    userResponse;

  return (
    <main className="container mx-auto py-10">
      <header>
        <h1>User details</h1>
        <p>Here you can found basic user data and his addresses</p>
      </header>

      <UserPreview
        user={restUser}
        homeAddress={homeAddress}
        workAddress={workAddress}
        invoiceAddress={invoiceAddress}
        postAddress={postAddress}
        className="mt-4"
      />
    </main>
  );
};

export default UserDetailsModal;
