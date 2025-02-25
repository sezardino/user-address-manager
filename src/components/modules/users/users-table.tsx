"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import { UserData } from "@/components/ui/user-data";
import { ApplicationUrls } from "@/const/router";
import { USER_STATUS_COPY, UserStatus } from "@/const/user-status";
import { UserEntity } from "@/types/entity";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type TableData = Pick<
  UserEntity,
  "email" | "firstName" | "initials" | "lastName" | "status" | "id"
> & {
  homeAddressesCount: number;
  invoiceAddressesCount: number;
  postAddressesCount: number;
  workAddressesCount: number;
};

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
        <Badge
          variant={
            row.original.status === UserStatus.INACTIVE
              ? "destructive"
              : "secondary"
          }
        >
          {USER_STATUS_COPY[row.original.status as UserStatus]}
        </Badge>
      ),
    },
    {
      accessorKey: "homeAddressesCount",
      header: () => "Home addresses",
      cell: ({ row }) => row.original.homeAddressesCount,
    },
    {
      accessorKey: "invoiceAddressesCount",
      header: () => "Invoice addresses",
      cell: ({ row }) => row.original.invoiceAddressesCount,
    },
    {
      accessorKey: "postAddressesCount",
      header: () => "Post addresses",
      cell: ({ row }) => row.original.postAddressesCount,
    },
    {
      accessorKey: "workAddressesCount",
      header: () => "Work addresses",
      cell: ({ row }) => row.original.workAddressesCount,
    },
    {
      accessorKey: "actions",
      header: () => null,
      cell: ({ row }) => (
        <Link
          href={ApplicationUrls.users.addAddress(row.original.id.toString())}
        >
          Add address
        </Link>
      ),
    },
  ];

  return <DataTable {...rest} columns={columns} />;
};
