import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_PAGE_NUMBER } from "@/const/pagination";
import { ApplicationSearchParams } from "@/const/router";
import { UserPlus } from "lucide-react";
import { Suspense } from "react";
import { UsersTableWrapper } from "./components/users-table-wrapper";

type UsersPageProps = {
  searchParams: Promise<Record<string, string>>;
};

const UsersPage = async (props: UsersPageProps) => {
  const searchParams = await props.searchParams;
  const page =
    Number(searchParams[ApplicationSearchParams.page]) || DEFAULT_PAGE_NUMBER;

  return (
    <main className="container mx-auto py-20">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button>
          <UserPlus className="ml-2" /> Add new user
        </Button>
      </header>

      <Suspense fallback={<Skeleton className="h-[650px]" />}>
        <UsersTableWrapper page={page} className="mt-10" />
      </Suspense>
    </main>
  );
};

export default UsersPage;
