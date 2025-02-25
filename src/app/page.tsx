import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_PAGE_NUMBER } from "@/const/pagination";
import { ApplicationSearchParams } from "@/const/search-params";
import { Suspense } from "react";
import { UsersTableWrapper } from "./components/users-table-wrapper";

type HomePageProps = {
  searchParams: Promise<Record<string, string>>;
};

const HomePage = async (props: HomePageProps) => {
  const searchParams = await props.searchParams;
  const page =
    Number(searchParams[ApplicationSearchParams.page]) || DEFAULT_PAGE_NUMBER;

  return (
    <main className="container mx-auto py-20">
      <header>
        <h1 className="text-2xl font-bold">Users</h1>
      </header>

      <Suspense fallback={<Skeleton className="h-[650px]" />}>
        <UsersTableWrapper page={page} className="mt-10" />
      </Suspense>
    </main>
  );
};

export default HomePage;
