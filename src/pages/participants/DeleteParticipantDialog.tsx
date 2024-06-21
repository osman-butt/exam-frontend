import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { deleteParticipant } from "@/services/apiFacade";

type DeleteParticipantDialogProps = {
  participantId: number;
  onParticipantChange: () => void;
};
export function DeleteParticipantDialog({
  participantId,
  onParticipantChange,
}: // handleInvoiceChange,
DeleteParticipantDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    deleteParticipant(participantId).then(() => {
      onParticipantChange();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TrashIcon className="w-5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Slet deltager</DialogTitle>
          <DialogDescription>Ønsker du at slette deltageren?</DialogDescription>
        </DialogHeader>
        <div className="flex w-full mx-auto gap-x-4">
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Annuller
          </Button>
          <Button className="w-full" onClick={handleDelete}>
            Slet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
