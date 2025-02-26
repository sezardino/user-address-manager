export const UserStatus = Object.freeze({
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
});

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const USER_STATUS_COPY: Record<UserStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};
