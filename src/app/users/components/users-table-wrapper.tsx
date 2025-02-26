import { deleteAddressSA } from "@/api/delete-address";
import { usersListSA } from "@/api/users";
import { UsersTable } from "@/components/modules/users/users-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/shadcn-ui";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type UsersTableWrapperProps = ComponentPropsWithoutRef<"section"> & {
  page: number;
};

export const UsersTableWrapper = async (props: UsersTableWrapperProps) => {
  const { page, className, ...rest } = props;

  const usersData = await usersListSA({ page });

  if ("message" in usersData) {
    return <h2>Something went wrong</h2>;
  }

  const hasPrevPage = usersData.meta.page !== 1;
  const hasNextPage = usersData.meta.page !== usersData.meta.totalPages;

  return (
    <section {...rest} className={cn(className)}>
      <UsersTable data={usersData.users} onDeleteAddress={deleteAddressSA} />

      <footer className="mt-5 justify-end flex items-center gap-4">
        {hasPrevPage ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={hasPrevPage ? `?page=${usersData.meta.page - 1}` : "#"}>
              Previous
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
        )}
        {hasNextPage ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={hasNextPage ? `?page=${usersData.meta.page + 1}` : "#"}>
              Next
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        )}
      </footer>
    </section>
  );
};
