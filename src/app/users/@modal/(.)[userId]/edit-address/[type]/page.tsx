import { addressSA } from "@/api/address";
import { editAddressSA } from "@/api/edit-address";
import { isUserExistSA } from "@/api/is-user-exist";
import { AddressFormDialog } from "@/components/modules/address/address-form-dialog";
import { ErrorPreview } from "@/components/modules/common/error-preview";
import { AddressType } from "@/const/address-type";
import { ApplicationUrls } from "@/const/router";
import { validateAddressTypeParam } from "@/utils/validate-address-type-param";

type Props = {
  params: Promise<{ userId: number; type: string }>;
};

const EditAddressModal = async (props: Props) => {
  const { userId, type } = await props.params;

  const isUserTypeValid = validateAddressTypeParam(type);
  const userResponse = await isUserExistSA(userId);
  const addressResponse = await addressSA({
    userId: Number(userId),
    addressType: type.toUpperCase() as AddressType,
  });

  const errorMessage = !isUserTypeValid
    ? "Invalid address type"
    : "message" in userResponse
    ? userResponse.message
    : "message" in addressResponse
    ? addressResponse.message
    : undefined;

  const errors =
    "errors" in userResponse
      ? userResponse.errors
      : "errors" in addressResponse
      ? addressResponse.errors
      : [];

  if (errorMessage)
    return (
      <ErrorPreview
        type="dialog"
        title={errorMessage}
        trigger="Back to users list"
        href={ApplicationUrls.users.index}
        errors={errors}
      />
    );

  if ("message" in addressResponse) return null;

  return (
    <AddressFormDialog
      formType="edit"
      addressType={type.toUpperCase() as AddressType}
      userId={userId}
      onFormSubmit={editAddressSA}
      initialAddress={addressResponse}
    />
  );
};

export default EditAddressModal;
