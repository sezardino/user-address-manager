"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/shadcn-ui";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Skeleton } from "./skeleton";

export type DataTableProps<TData> = ComponentPropsWithoutRef<"div"> & {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading?: boolean;
  noResults?: string | ReactNode;
};

export function DataTable<TData>(props: DataTableProps<TData>) {
  const { columns, data, isLoading, noResults, className, ...rest } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasRows = !!table.getRowModel().rows?.length;

  return (
    <div {...rest} className={cn("min-h-80 border rounded-sm", className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {hasRows &&
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

          {isLoading &&
            new Array(10).fill(null).map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="w-full h-10 mb-2" />
                </TableCell>
              </TableRow>
            ))}

          {!isLoading && !hasRows && (
            <TableRow>
              <TableCell colSpan={columns.length} className="!p-0">
                {noResults ? (
                  noResults
                ) : (
                  <div className="p-4 h-24 text-center">No results.</div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
