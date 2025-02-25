import { addAddressLA } from "@/api/add-address";
import { isUserExistSA } from "@/api/is-user-exist";
import { AddressFormSection } from "@/components/modules/address/address-form-section";
import { ErrorPreview } from "@/components/modules/common/error-preview";
import { AddressType } from "@/const/address-type";
import { ApplicationUrls } from "@/const/router";
import { validateAddressTypeParam } from "@/utils/validate-address-type-param";

type Props = {
  params: Promise<{ userId: number; type: string }>;
};

const AddAddressPage = async (props: Props) => {
  const { userId, type } = await props.params;

  const isUserTypeValid = validateAddressTypeParam(type);
  const userResponse = await isUserExistSA(userId);

  const errorMessage = !isUserTypeValid
    ? "Invalid address type"
    : "message" in userResponse
    ? userResponse.message
    : undefined;

  if (errorMessage)
    return (
      <ErrorPreview
        type="page"
        title={errorMessage}
        trigger="Back to users list"
        href={ApplicationUrls.users.index}
      />
    );

  return (
    <main className="container mx-auto py-10">
      <AddressFormSection
        formType="create"
        addressType={type.toUpperCase() as AddressType}
        userId={userId}
        onFormSubmit={addAddressLA}
      />
    </main>
  );
};

export default AddAddressPage;
