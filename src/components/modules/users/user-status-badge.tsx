import { Badge, BadgeProps } from "@/components/ui/badge";
import { USER_STATUS_COPY, UserStatus } from "@/const/user-status";

export type UserStatusBadge = Omit<BadgeProps, "variant"> & {
  status: UserStatus;
};

export const UserStatusBadge = ({ status, ...rest }: UserStatusBadge) => (
  <Badge
    {...rest}
    variant={status === UserStatus.INACTIVE ? "destructive" : "secondary"}
  >
    {USER_STATUS_COPY[status as UserStatus]}
  </Badge>
);
