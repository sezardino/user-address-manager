import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerDialog } from "@/components/ui/server-dialog";
import { ZodFormatError } from "@/utils/zod-validation";
import Link from "next/link";

export type ErrorPreviewProps = {
  type: "page" | "dialog";
  errors?: ZodFormatError[];
  title: string;
  trigger: string;
  href: string;
};

export const ErrorPreview = (props: ErrorPreviewProps) => {
  const { href, title, trigger, type, errors } = props;

  if (type === "dialog")
    return (
      <ServerDialog>
        <DialogContent className="min-h-[250px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
          </DialogHeader>
          {!!errors?.length && (
            <ul className="flex flex-col justify-center gap-1">
              {errors.map((e, i) => (
                <li key={i} className="text-center">
                  {e.message}
                </li>
              ))}
            </ul>
          )}
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button size="lg">{trigger}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </ServerDialog>
    );

  return (
    <main className="container h-dvh mx-auto py-10 flex flex-col justify-center">
      <h1 className="text-2xl text-center">{title}</h1>

      {errors?.length && (
        <ul className="list-disc list-inside flex flex-col gap-1">
          {errors.map((e, i) => (
            <li key={i}>{e.message}</li>
          ))}
        </ul>
      )}

      <Button size="lg" className="mt-5 block mx-auto">
        <Link href={href}>{trigger}</Link>
      </Button>
    </main>
  );
};
