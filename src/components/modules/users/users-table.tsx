"use client";

import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { UserData } from "@/components/ui/user-data";
import { UserStatus } from "@/const/user-status";
import { UserAddressesExistenceResponse } from "@/types/response";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, XCircle } from "lucide-react";
import { UserEntity } from "../../../../drizzle/schema";
import { UserStatusBadge } from "./user-status-badge";
import { UserTableActions } from "./user-table-actions";

type TableData = Pick<
  UserEntity,
  "email" | "firstName" | "initials" | "lastName" | "status" | "id"
> &
  UserAddressesExistenceResponse;

export type UsersTableProps = Omit<DataTableProps<TableData>, "columns">;

export const UsersTable = (props: UsersTableProps) => {
  const { ...rest } = props;

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
        />
      ),
    },
  ];

  return <DataTable {...rest} columns={columns} />;
};
