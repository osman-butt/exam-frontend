import { AgeGroup, Discipline, Gender, Result } from "@/types";
import { useEffect, useState } from "react";
import { getDesciplines, getResults } from "@/services/apiFacade";
// import { useSearchParams } from "react-router-dom";
import { ResultsTable } from "./ResultsTable";

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  const [selectedDiscipline, setSelectedDiscipline] =
    useState<Discipline | null>(null);

  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    getDesciplines().then(data => setDisciplines(data));
    console.log(selectedDiscipline);

    if (!selectedDiscipline) return;

    if (filters.length > 0) {
      setFilters([]);
    }

    getResults().then((data: Result[]) => {
      const filteredResults = data.filter(
        result => result.discipline.id === selectedDiscipline.id
      );
      setResults(getSortedResults(filteredResults));
      console.log("filteredResults", filteredResults);
    });
  }, [selectedDiscipline]);

  const onResultChange = () => {
    getResults().then((data: Result[]) => {
      const filteredResults = data.filter(
        result => result.discipline.id === selectedDiscipline?.id
      );
      setResults(getSortedResults(filteredResults));
    });
  };

  const handleFilterResults = async (
    // clubName: string | undefined,
    // disciplineId: number | undefined,
    // gender: string | undefined
    gender: Gender | null,
    ageGroup: AgeGroup | null
  ) => {
    const genderName = gender?.id;

    // Filter participants based on the provided criteria
    let filteredResults = await getResults();
    filteredResults = filteredResults.filter(
      result => result.discipline.id === selectedDiscipline?.id
    );

    if (genderName) {
      filteredResults = filteredResults.filter(
        result => result.participant.gender === genderName
      );
    }
    filteredResults = getSortedResults(filteredResults);

    if (ageGroup) {
      filteredResults = filteredResults.filter(result => {
        const age = result.participant.age;
        if (age) {
          return age >= ageGroup.fromAge && age <= ageGroup.toAge;
        }
        return false;
      });
    }

    // Update state with filtered participants
    setResults(filteredResults);
    setFilters([gender?.name, ageGroup?.name] as string[]);
  };

  return (
    <div className="z-0 h-full">
      <div className="bg-white max-w-[900px] mx-auto rounded-lg p-2">
        <div className="flex justify-between gap-4 my-6">
          <FilterResults handleFilterResults={handleFilterResults} />
          <DisciplinSelector
            disciplines={disciplines}
            setSelectedDiscipline={setSelectedDiscipline}
          />
          <ResultDialog onResultChange={onResultChange} />
        </div>
        <div className="flex justify-center gap-4 my-6 md:justify-start">
          <p className="text-sm font-bold text-primary">Anvendte filtre:</p>
          <div className="flex gap-2">
            {filters.map(
              (filter, index) =>
                filter && (
                  <Badge key={index} className="bg-primary">
                    {filter}
                  </Badge>
                )
            )}
          </div>
        </div>
        <ResultsTable results={results} onResultChange={onResultChange} />
      </div>
    </div>
  );
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResultDialog } from "./ResultDialog";
import { getSortedResults } from "@/lib/utils";
import { FilterResults } from "./FilterResults";
import { Badge } from "@/components/ui/badge";

type DisciplinSelectorProps = {
  disciplines: Discipline[];
  setSelectedDiscipline: (discipline: Discipline | null) => void;
};

function DisciplinSelector({
  disciplines,
  setSelectedDiscipline,
}: DisciplinSelectorProps) {
  const handleValueChange = (value: string) => {
    const selectedDiscipline = disciplines.find(
      discipline => discipline.name === value
    );
    if (selectedDiscipline) {
      setSelectedDiscipline(selectedDiscipline);
    }
  };
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Vælg en Disciplin" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Discipliner</SelectLabel>
          {disciplines.map(discipline => (
            <SelectItem key={discipline.id} value={discipline.name}>
              {discipline.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
