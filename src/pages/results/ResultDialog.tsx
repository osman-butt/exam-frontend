import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ResultForm } from "./ResultForm";
import { Result } from "@/types";

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
  resultToEdit?: Result;
  onResultChange: () => void;
};
export function ResultDialog({
  resultToEdit,
  onResultChange,
}: // handleInvoiceChange,
ParticipantsDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {resultToEdit ? (
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
            {resultToEdit ? "Opdater resultat" : "Opret resultat"}
          </DialogTitle>
        </DialogHeader>
        {resultToEdit ? (
          <ResultForm
            setOpen={setOpen}
            resultToEdit={resultToEdit}
            onResultChange={onResultChange}
          />
        ) : (
          <ResultForm setOpen={setOpen} onResultChange={onResultChange} />
        )}
      </DialogContent>
    </Dialog>
  );
}
