import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface CustomDialogProps {
  trigger: ReactNode;
  title: string | ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}

export const CustomDialog = ({
  trigger,
  title,
  children,
  open,
  onOpenChange,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex flex-col gap-12 max-sm:h-dvh max-h-dvh overflow-y-auto">
        <DialogHeader className="pb-3 border-b-2 border-brown">
          <DialogTitle className="text-2xl text-brown md:text-3xl">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
