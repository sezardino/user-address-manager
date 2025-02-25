import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerDialog } from "@/components/ui/server-dialog";
import Link from "next/link";

export type ErrorPreviewProps = {
  type: "page" | "dialog";
  title: string;
  trigger: string;
  href: string;
};

export const ErrorPreview = (props: ErrorPreviewProps) => {
  const { href, title, trigger, type } = props;

  if (type === "dialog")
    return (
      <ServerDialog>
        <DialogContent className="min-h-[250px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
          </DialogHeader>
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

      <Button size="lg" className="mt-5 block mx-auto">
        <Link href={href}>{trigger}</Link>
      </Button>
    </main>
  );
};
