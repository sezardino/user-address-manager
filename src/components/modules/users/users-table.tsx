"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { UserData } from "@/components/ui/user-data";
import { ADDRESS_TYPE_COPY, AddressType } from "@/const/address-type";
import { UserStatus } from "@/const/user-status";
import { useDeleteAddressHandler } from "@/hooks/use-delete-address-handler";
import { UserAddressesExistenceResponse } from "@/types/response";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, XCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { UserEntity } from "../../../../drizzle/schema";
import { UserStatusBadge } from "./user-status-badge";
import { UserTableActions } from "./user-table-actions";
import { ServerActionResponse } from "@/types/base";

type TableData = Pick<
  UserEntity,
  "email" | "firstName" | "initials" | "lastName" | "status" | "id"
> &
  UserAddressesExistenceResponse;

export type UsersTableProps = Omit<DataTableProps<TableData>, "columns"> & {
  onDeleteAddress: (data: {
    userId: number;
    addressType: AddressType;
  }) => Promise<ServerActionResponse<void>>;
};

export const UsersTable = (props: UsersTableProps) => {
  const { onDeleteAddress, ...rest } = props;
  const [addressToDelete, setAddressToDelete] = useState<{
    userId: number;
    addressType: AddressType;
  } | null>();

  const deleteAddress = useDeleteAddressHandler({ action: onDeleteAddress });

  const deleteAddressHandler = useCallback(async () => {
    if (!addressToDelete) return;

    try {
      await deleteAddress(addressToDelete);

      setAddressToDelete(null);
    } catch (error) {
      console.log(error);
    }
  }, [addressToDelete, deleteAddress]);

  const columns: ColumnDef<TableData>[] = [
    {
      accessorKey: "user",
      header: () => "User",
      cell: ({ row }) => <UserData user={row.original} />,
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: ({ row }) => (
        <UserStatusBadge status={row.original.status as UserStatus} />
      ),
    },
    {
      accessorKey: "isHomeAddressExist",
      header: () => "Home address",
      cell: ({ row }) =>
        row.original.isHomeAddressExist ? (
          <CheckCircle className="size-4 text-green-400" />
        ) : (
          <XCircle className="size-4 text-destructive" />
        ),
    },
    {
      accessorKey: "isInvoiceAddressExist",
      header: () => "Invoice address",
      cell: ({ row }) =>
        row.original.isInvoiceAddressExist ? (
          <CheckCircle className="size-4 text-green-400" />
        ) : (
          <XCircle className="size-4 text-destructive" />
        ),
    },
    {
      accessorKey: "isPostAddressExist",
      header: () => "Post address",
      cell: ({ row }) =>
        row.original.isPostAddressExist ? (
          <CheckCircle className="size-4 text-green-400" />
        ) : (
          <XCircle className="size-4 text-destructive" />
        ),
    },
    {
      accessorKey: "isWorkAddressExist",
      header: () => "Work address",
      cell: ({ row }) =>
        row.original.isWorkAddressExist ? (
          <CheckCircle className="size-4 text-green-400" />
        ) : (
          <XCircle className="size-4 text-destructive" />
        ),
    },
    {
      accessorKey: "actions",
      header: () => null,
      cell: ({ row }) => (
        <UserTableActions
          email={row.original.email}
          userId={row.original.id}
          isHomeAddressExist={row.original.isHomeAddressExist}
          isInvoiceAddressExist={row.original.isInvoiceAddressExist}
          isPostAddressExist={row.original.isPostAddressExist}
          isWorkAddressExist={row.original.isWorkAddressExist}
          onDeleteClick={(addressType) =>
            setAddressToDelete({ userId: row.original.id, addressType })
          }
        />
      ),
    },
  ];

  return (
    <>
      <DataTable {...rest} columns={columns} />

      {!!addressToDelete && (
        <AlertDialog
          open={!!addressToDelete}
          onOpenChange={() => setAddressToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Deleted address cant be restored.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant={"outline"}>Cancel</Button>
              </AlertDialogCancel>
              <Button variant={"destructive"} onClick={deleteAddressHandler}>
                Delete {ADDRESS_TYPE_COPY[addressToDelete?.addressType]} address
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
