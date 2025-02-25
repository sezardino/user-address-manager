"use client";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableProps } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserData } from "@/components/ui/user-data";
import { ApplicationUrls } from "@/const/router";
import { UserStatus } from "@/const/user-status";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MapPinPlus, MoreVertical } from "lucide-react";
import Link from "next/link";
import { UserEntity } from "../../../../drizzle/schema";
import { UserStatusBadge } from "./user-status-badge";

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
        <UserStatusBadge status={row.original.status as UserStatus} />
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="sr-only">
              Actions on user {row.original.email}
            </DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={ApplicationUrls.users.preview(
                    row.original.id.toString()
                  )}
                >
                  <Eye />
                  See details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={ApplicationUrls.users.addAddress(
                    row.original.id.toString()
                  )}
                >
                  <MapPinPlus />
                  Add address
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return <DataTable {...rest} columns={columns} />;
};
