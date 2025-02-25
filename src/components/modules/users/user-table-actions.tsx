import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ADDRESS_TYPE_COPY,
  ADDRESS_TYPE_ICONS,
  AddressType,
} from "@/const/address-type";
import { ApplicationUrls } from "@/const/router";
import { UserAddressesExistenceResponse } from "@/types/response";
import { Eye, MoreVertical, Pencil, Plus } from "lucide-react";
import Link from "next/link";

export type UserTableActionsProps = UserAddressesExistenceResponse & {
  userId: number;
  email: string;
};

export const UserTableActions = (props: UserTableActionsProps) => {
  const {
    email,
    userId,
    isHomeAddressExist,
    isInvoiceAddressExist,
    isPostAddressExist,
    isWorkAddressExist,
  } = props;

  const createdAddresses: Record<AddressType, boolean> = {
    HOME: isHomeAddressExist,
    INVOICE: isInvoiceAddressExist,
    POST: isPostAddressExist,
    WORK: isWorkAddressExist,
  };

  const addressedToCreate = Object.entries(createdAddresses)
    .filter((type) => type[1] !== true)
    .map(([type]) => ({
      value: type,
      label: ADDRESS_TYPE_COPY[type as AddressType],
      icon: ADDRESS_TYPE_ICONS[type as AddressType],
    }));
  const addressedToEdit = Object.entries(createdAddresses)
    .filter((type) => type[1] === true)
    .map(([type]) => ({
      value: type,
      label: ADDRESS_TYPE_COPY[type as AddressType],
      icon: ADDRESS_TYPE_ICONS[type as AddressType],
    }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="sr-only">
          Actions on user {email}
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={ApplicationUrls.users.preview(userId.toString())}>
              <Eye />
              See details
            </Link>
          </DropdownMenuItem>
          {!!addressedToCreate.length && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Plus />
                <span>Add address</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {addressedToCreate.map((type) => (
                    <DropdownMenuItem key={type.value} asChild>
                      <Link
                        href={ApplicationUrls.users.addAddress(
                          userId.toString(),
                          type.value
                        )}
                      >
                        <type.icon />
                        <span>{type.value}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
          {!!addressedToEdit.length && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Pencil />
                <span>Edit address</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {addressedToEdit.map((type) => (
                    <DropdownMenuItem key={type.value} asChild>
                      <Link
                        href={ApplicationUrls.users.editAddress(
                          userId.toString(),
                          type.value
                        )}
                      >
                        <type.icon />
                        <span>{type.value}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
