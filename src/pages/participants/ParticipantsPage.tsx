import { ParticipantsDialog } from "@/pages/participants/ParticipantsDialog";
import { AgeGroup, Club, Discipline, Gender, Participant } from "@/types";
import { useEffect, useState } from "react";
import { getParticipants } from "@/services/apiFacade";
import { ParticipantsTable } from "@/pages/participants/ParticipantsTable";
import SearchParticipants from "@/pages/participants/SearchParticipants";
import { useSearchParams } from "react-router-dom";
import { FilterParticipants } from "@/pages/participants/FilterParticipants";
import { Badge } from "@/components/ui/badge";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [filters, setFilters] = useState<string[]>([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name");
    getParticipants(name! ? name : "").then(data => setParticipants(data));
    setFilters([] as string[]);
  }, [searchParams]);

  const onParticipantChange = () => {
    const name = searchParams.get("name");
    getParticipants(name! ? name : "").then(data => setParticipants(data));
  };

  const handleFilterParticipants = async (
    // clubName: string | undefined,
    // disciplineId: number | undefined,
    // gender: string | undefined
    club: Club | null,
    discipline: Discipline | null,
    gender: Gender | null,
    ageGroup: AgeGroup | null
  ) => {
    const clubName = club?.name;
    const disciplineId = discipline?.id;
    const genderName = gender?.id;

    // Filter participants based on the provided criteria
    const name = searchParams.get("name");
    let filteredParticipants = await getParticipants(name! ? name : "");

    if (clubName) {
      filteredParticipants = filteredParticipants.filter(
        participant => participant.clubName === clubName
      );
    }
    if (disciplineId) {
      filteredParticipants = filteredParticipants.filter(participant =>
        participant.disciplines.some(
          discipline => discipline.id === disciplineId
        )
      );
    }
    if (genderName) {
      filteredParticipants = filteredParticipants.filter(
        participant => participant.gender === genderName
      );
    }

    if (ageGroup) {
      filteredParticipants = filteredParticipants.filter(participant => {
        const age = participant.age;
        if (age) {
          return age >= ageGroup.fromAge && age <= ageGroup.toAge;
        }
        return false;
      });
    }

    // Update state with filtered participants
    setParticipants(filteredParticipants);
    setFilters([
      clubName,
      discipline?.name,
      gender?.name,
      ageGroup?.name,
    ] as string[]);
  };

  return (
    <div className="z-0 h-full">
      <div className="bg-white max-w-[900px] mx-auto rounded-lg p-2">
        <div className="flex justify-center gap-4 my-6 md:justify-end">
          <FilterParticipants
            handleFilterParticipants={handleFilterParticipants}
          />
          <SearchParticipants />
          <ParticipantsDialog onParticipantChange={onParticipantChange} />
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
        <ParticipantsTable
          participants={participants}
          onParticipantChange={onParticipantChange}
        />
      </div>
    </div>
  );
}
