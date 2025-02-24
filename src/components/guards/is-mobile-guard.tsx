"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { TabletSmartphone } from "lucide-react";
import { PropsWithChildren } from "react";

export const IsMobileGuard = ({ children }: PropsWithChildren) => {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <div className="h-dvh p-10 flex flex-col">
        <div className="m-auto text-center flex flex-col justify-center gap-5">
          <h2 className="text-2xl">Mobile is not supported</h2>
          <TabletSmartphone className="mx-auto -order-1 size-10" />
        </div>
      </div>
    );

  return children;
};
