import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Participant } from "@/types";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { ParticipantsDialog } from "@/pages/participants/ParticipantsDialog";
import { DeleteParticipantDialog } from "@/pages/participants/DeleteParticipantDialog";
import { getAgeGroup } from "@/lib/utils";

type ParticipantsTableProps = {
  participants: Participant[];
  onParticipantChange: () => void;
};

type SortConfig = {
  key: keyof Participant;
  direction: "ascending" | "descending";
};

export function ParticipantsTable({
  participants,
  onParticipantChange,
}: ParticipantsTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedParticipants = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...participants].sort((a, b) => {
        const key = sortConfig.key;
        if (a[key] < b[key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return participants;
  }, [participants, sortConfig]);

  const requestSort = (key: keyof Participant) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Participant) => {
    if (!sortConfig) {
      return null;
    }
    return sortConfig.key === key ? (
      sortConfig.direction === "ascending" ? (
        <ChevronUpIcon className="inline w-4 h-4" />
      ) : (
        <ChevronDownIcon className="inline w-4 h-4" />
      )
    ) : null;
  };

  return (
    <Table className="rounded-lg bg-zinc-100">
      {/* <TableCaption>En liste over seneste fakturaer.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead
            className="w-[120px] select-none"
            onClick={() => requestSort("name")}
          >
            Navn {getSortIcon("name")}
          </TableHead>
          <TableHead className="select-none" onClick={() => requestSort("age")}>
            Aldersgruppe {getSortIcon("age")}
          </TableHead>
          <TableHead
            className="select-none"
            onClick={() => requestSort("clubName")}
          >
            Klub {getSortIcon("clubName")}
          </TableHead>
          <TableHead className="text-center select-none">Discipliner</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {sortedParticipants.map(participant => (
          <TableRow key={participant.id}>
            <TableCell className="font-medium">{participant.name}</TableCell>
            <TableCell>{getAgeGroup(participant?.age || 0)}</TableCell>
            <TableCell>{participant.clubName}</TableCell>
            <TableCell className="text-[12px] text-center">
              <div className="flex flex-wrap gap-1">
                {participant?.disciplines &&
                  participant?.disciplines.map(discipline => (
                    <Badge key={discipline.id} className="text-[10px]">
                      {discipline.name}
                    </Badge>
                  ))}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-center gap-4">
                <ParticipantsDialog
                  participantToEdit={participant}
                  onParticipantChange={onParticipantChange}
                />
                {participant.id && (
                  <DeleteParticipantDialog
                    participantId={participant.id}
                    onParticipantChange={onParticipantChange}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="rounded-lg">
        <TableRow>
          <TableCell colSpan={5}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
