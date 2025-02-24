import { usersListSA } from "@/api/users";
import { UsersTable } from "@/components/modules/users/users-table";
import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE_NUMBER } from "@/const/pagination";
import { ApplicationSearchParams } from "@/const/search-params";
import Link from "next/link";

type HomePageProps = {
  searchParams: Promise<Record<string, string>>;
};

const HomePage = async (props: HomePageProps) => {
  const searchParams = await props.searchParams;
  const page =
    Number(searchParams[ApplicationSearchParams.page]) || DEFAULT_PAGE_NUMBER;

  const usersData = await usersListSA({ page });

  if ("message" in usersData) {
    return <h2>Something went wrong</h2>;
  }

  const hasPrevPage = usersData.meta.page !== 1;
  const hasNextPage = usersData.meta.page !== usersData.meta.totalPages;

  return (
    <main className="container mx-auto py-20">
      <header>
        <h1 className="text-2xl font-bold">Users</h1>
      </header>

      <section className="mt-10">
        <UsersTable data={usersData.users} />

        <footer className="mt-5 justify-end flex items-center gap-4">
          {hasPrevPage ? (
            <Button variant="outline" size="sm" asChild>
              <Link
                href={hasPrevPage ? `?page=${usersData.meta.page - 1}` : "#"}
              >
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
              <Link
                href={hasNextPage ? `?page=${usersData.meta.page + 1}` : "#"}
              >
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
    </main>
  );
};

export default HomePage;
