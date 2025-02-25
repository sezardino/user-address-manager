"use client";

import { Dialog } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export const ServerDialog = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={closeModal}>
      {children}
    </Dialog>
  );
};
