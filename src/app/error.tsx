"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: ErrorPageProps) {
  const { reset } = props;

  return (
    <main className="container mx-auto py-40">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}
