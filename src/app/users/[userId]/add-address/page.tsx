import { userSA } from "@/api/user";
import { AddressFormSection } from "@/components/modules/address/address-form-section";
import { Button } from "@/components/ui/button";
import { AddressType } from "@/const/address-type";
import { ApplicationUrls } from "@/const/router";
import Link from "next/link";

type Props = {
  params: Promise<{ userId: number }>;
};

const AddAddressPage = async (props: Props) => {
  const { userId } = await props.params;

  const user = await userSA(userId);

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
      <AddressFormSection formType="create" addressType={AddressType.HOME} />
    </main>
  );
};

export default AddAddressPage;
