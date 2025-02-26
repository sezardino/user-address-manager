import { Button } from "@/components/ui/button";
import { ApplicationUrls } from "@/const/router";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl mb-5">User address manager</h1>
      <Button size="lg" asChild>
        <Link href={ApplicationUrls.users.index}>View Users</Link>
      </Button>
    </main>
  );
};

export default HomePage;
