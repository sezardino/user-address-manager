import { userSA } from "@/api/user";
import { AddressFormSection } from "@/components/modules/address/address-form-section";
import { Button } from "@/components/ui/button";
import { ApplicationUrls } from "@/const/router";
import Link from "next/link";

type Props = {
  params: {
    id: number;
  };
};

export const AddAddressPage = async ({ params }: Props) => {
  const { id } = params;

  const user = await userSA(id);

  if (!user)
    return (
      <main className="container h-dvh mx-auto py-10 flex flex-col justify-center">
        <h1 className="text-2xl text-center">User not found</h1>
        <p className="text-center text-muted-foreground">
          User with provided id not found
        </p>
        <Button size="lg" className="mt-5 block mx-auto">
          <Link href={ApplicationUrls.users.index}>Back to users list</Link>
        </Button>
      </main>
    );

  return (
    <main className="container mx-auto py-10">
      <AddressFormSection type="create" />
    </main>
  );
};

export default AddAddressPage;
