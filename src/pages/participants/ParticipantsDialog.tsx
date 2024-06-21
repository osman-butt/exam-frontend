import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ParticipantsForm } from "./ParticipantsForm";
import { Participant } from "@/types";

// type EditTableDialogProps = {
//   invoiceToEdit: {
//     invoice: string;
//     paymentStatus: string;
//     totalAmount: string;
//     paymentMethod: string;
//   };
// };

// export function EditTableDialog(props: EditTableDialogProps) {

type ParticipantsDialogProps = {
  participantToEdit?: Participant;
  onParticipantChange: () => void;
};
export function ParticipantsDialog({
  participantToEdit,
  onParticipantChange,
}: // handleInvoiceChange,
ParticipantsDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {participantToEdit ? (
          <PencilIcon
            className="w-5 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        ) : (
          <Button className="" onClick={() => setOpen(true)}>
            <PlusIcon className="w-5 cursor-pointer" /> Opret
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {participantToEdit ? "Opdater deltager" : "Opret deltager"}
          </DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
          </DialogDescription>
        </DialogHeader>
        {participantToEdit ? (
          <ParticipantsForm
            setOpen={setOpen}
            participantToEdit={participantToEdit}
            onParticipantChange={onParticipantChange}
          />
        ) : (
          <ParticipantsForm
            setOpen={setOpen}
            onParticipantChange={onParticipantChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
