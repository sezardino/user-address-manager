import { UserEntity } from "@/types/entity";
import { getAvatarFallback } from "@/utils/get-avatar-fallback";
import { cn } from "@/utils/shadcn-ui";

import { ComponentPropsWithoutRef } from "react";
import { Avatar, AvatarFallback } from "./avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { TruncatedTypography } from "./typography";

type PickedUserProps = Pick<
  UserEntity,
  "email" | "firstName" | "lastName" | "initials"
>;

export type UserDataProps = ComponentPropsWithoutRef<"div"> & {
  user: PickedUserProps;
  hideInfo?: boolean;
};

export const UserData = (props: UserDataProps) => {
  const { hideInfo = false, user, className, ...rest } = props;
  const { email, firstName, initials, lastName } = user;

  const fullName = `${firstName} ${lastName}`;
  const hasFullName = firstName?.trim().length;
  const fallback = initials
    ? initials
    : hasFullName
    ? getAvatarFallback(fullName)
    : getAvatarFallback(email);

  const infoJSX = (
    <div>
      {hasFullName && (
        <TruncatedTypography text={fullName} className="text-sm" />
      )}
      <TruncatedTypography text={email} className="text-sm" />
    </div>
  );

  if (hideInfo)
    return (
      <Tooltip>
        <div {...rest} className={cn("flex items-center gap-2", className)}>
          <TooltipTrigger>
            <Avatar className="size-10">
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{infoJSX}</TooltipContent>
        </div>
      </Tooltip>
    );

  return (
    <div {...rest} className={cn("flex items-center gap-2", className)}>
      <Avatar className="size-10">
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {infoJSX}
    </div>
  );
};
