import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserData } from "@/components/ui/user-data";
import {
  ADDRESS_TYPE_COPY,
  ADDRESS_TYPE_ICONS,
  ADDRESS_TYPE_ORDER,
  AddressType,
} from "@/const/address-type";
import { UserStatus } from "@/const/user-status";
import { cn } from "@/utils/shadcn-ui";
import { TabsContent } from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef } from "react";
import { AddressEntity, UserEntity } from "../../../../drizzle/schema";
import { AddressPreview } from "../address/address-preview";
import { UserStatusBadge } from "./user-status-badge";

const ADDRESS_TYPE_TABS = ADDRESS_TYPE_ORDER.map((type) => ({
  value: type,
  label: ADDRESS_TYPE_COPY[type],
  icon: ADDRESS_TYPE_ICONS[type],
}));

export type UserPreviewProps = ComponentPropsWithoutRef<"div"> & {
  user: UserEntity;
  homeAddress?: AddressEntity;
  invoiceAddress?: AddressEntity;
  postAddress?: AddressEntity;
  workAddress?: AddressEntity;
};

export const UserPreview = (props: UserPreviewProps) => {
  const {
    user,
    homeAddress,
    invoiceAddress,
    postAddress,
    workAddress,
    className,
    ...rest
  } = props;

  const addressesMap: Record<AddressType, AddressEntity | undefined> = {
    [AddressType.HOME]: homeAddress,
    [AddressType.INVOICE]: invoiceAddress,
    [AddressType.POST]: postAddress,
    [AddressType.WORK]: workAddress,
  };

  return (
    <section {...rest} className={cn("flex flex-col gap-2", className)}>
      <header>
        <UserData user={user} />
      </header>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <UserStatusBadge status={user.status as UserStatus} />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Created date
          </p>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Last modification
          </p>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <Tabs defaultValue={AddressType.HOME}>
        <TabsList className="grid w-full grid-cols-4 mb-4">
          {ADDRESS_TYPE_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              <tab.icon className="w-4 h-4 mr-2" /> {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {ADDRESS_TYPE_TABS.map((tab) => {
          const address = addressesMap[tab.value];

          return (
            <TabsContent key={tab.value} value={tab.value}>
              {!!address && <AddressPreview address={address} />}
              {!address && (
                <div className=" py-10 h-full flex items-center justify-center grow">
                  <Button variant="secondary">
                    Add {ADDRESS_TYPE_COPY[tab.value]} address
                  </Button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};
