import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServerDialog } from "@/components/ui/server-dialog";
import { UserPreview, UserPreviewProps } from "./user-preview";

export type UserPreviewDialogProps = Pick<
  UserPreviewProps,
  "user" | "homeAddress" | "workAddress" | "invoiceAddress" | "postAddress"
>;

export const UserPreviewDialog = (props: UserPreviewDialogProps) => {
  return (
    <ServerDialog>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">User preview</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here you can found basic user data and his addresses
          </DialogDescription>
        </DialogHeader>

        <UserPreview {...props} />

        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </ServerDialog>
  );
};
