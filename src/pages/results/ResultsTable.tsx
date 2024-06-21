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
import { Result } from "@/types";

import { DeleteResultDialog } from "./DeleteResultDialog";
import { ResultDialog } from "./ResultDialog";
import { formatTime } from "@/lib/utils";

type ParticipantsTableProps = {
  results: Result[];
  onResultChange: () => void;
};

export function ResultsTable({
  results,
  onResultChange,
}: ParticipantsTableProps) {
  const getUnit = (value: string, type: string) => {
    switch (type) {
      case "TIME":
        return formatTime(Number(value));
      case "DISTANCE":
        return Number(value) / 100 + " m";
      case "POINTS":
        return value + " Point";
      default:
        return "";
    }
  };

  return (
    <Table className="rounded-lg bg-zinc-100">
      {/* <TableCaption>En liste over seneste fakturaer.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px] select-none">Rangering</TableHead>
          <TableHead className="w-[120px] select-none">Navn</TableHead>
          <TableHead className="select-none ">Alder</TableHead>
          <TableHead className="select-none ">Køn</TableHead>
          <TableHead className="select-none ">Klub</TableHead>
          <TableHead className="select-none">Disciplin</TableHead>
          <TableHead className="select-none">Dato</TableHead>
          <TableHead className="select-none">Resultat</TableHead>
          <TableHead className=""></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white">
        {results.map((result, index) => (
          <TableRow key={result.id}>
            <TableCell className="font-medium">{index + 1}.</TableCell>
            <TableCell className="font-medium">
              {result.participant.name}
            </TableCell>
            <TableCell>{result.participant.age}</TableCell>
            <TableCell>
              {result.participant.gender == "MALE" ? "Mand" : "Kvinde"}
            </TableCell>
            <TableCell>{result.participant.clubName}</TableCell>
            <TableCell>
              <Badge>{result.discipline.name}</Badge>
            </TableCell>
            <TableCell>{result.date}</TableCell>
            <TableCell>
              {getUnit(result.resultValue, result.discipline.measurementType)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-center gap-4">
                <ResultDialog
                  resultToEdit={result}
                  onResultChange={onResultChange}
                />
                {result.id && (
                  <DeleteResultDialog
                    resultId={result.id}
                    onResultChange={onResultChange}
                  />
                )}
              </div>
            </TableCell>
            {/* <TableCell className="text-right">
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
            </TableCell> */}
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
