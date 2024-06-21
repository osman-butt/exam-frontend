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
import { deleteResult } from "@/services/apiFacade";

type DeleteResultDialogProps = {
  resultId: number;
  onResultChange: () => void;
};
export function DeleteResultDialog({
  resultId,
  onResultChange,
}: // handleInvoiceChange,
DeleteResultDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    deleteResult(resultId).then(() => {
      onResultChange();
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
          <DialogTitle>Slet resultat</DialogTitle>
          <DialogDescription>Ønsker du at slette resultatet?</DialogDescription>
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
