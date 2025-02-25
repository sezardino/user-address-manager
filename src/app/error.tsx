"use client";

import { Button } from "@/components/ui/button";
import { Cone } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: ErrorPageProps) {
  const { reset } = props;

  return (
    <main className="container mx-auto h-dvh py-40 flex flex-col items-center justify-center">
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center">
          Something went wrong!
        </h2>
        <Button className="mt-4" onClick={() => reset()}>
          Try again
        </Button>
      </div>
      <Cone className="-order-1 size-40 text-muted-foreground" />
    </main>
  );
}
