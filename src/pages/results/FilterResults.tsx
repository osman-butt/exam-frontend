import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AgeGroup, Gender } from "@/types";
import { useState } from "react";

import { ageGroupsList, cn } from "@/lib/utils";

const gendersList = [
  { id: "MALE", name: "Mand" },
  { id: "FEMALE", name: "Kvinde" },
] as Gender[];

type FilterResultsProps = {
  handleFilterResults: (
    gender: Gender | null,
    ageGroup: AgeGroup | null
  ) => void;
};

export function FilterResults({ handleFilterResults }: FilterResultsProps) {
  // Gender
  const [genders] = useState<Gender[]>(gendersList);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const handleFilter = () => {
    console.log("selectedGenders", selectedGender);
    handleFilterResults(selectedGender, selectedAgeGroup);
  };

  // AgeGroup
  const [ageGroups] = useState<AgeGroup[]>(ageGroupsList);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup | null>(
    null
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="w-full text-center">Filtre</SheetTitle>
          <SheetDescription>
            {/* Make changes to your profile here. Click save when you're done. */}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col mt-6 gap-y-6">
          <section>
            <h2 className="mb-4 text-xl">Køn</h2>
            <div className="flex flex-wrap gap-2">
              {genders.map(gender => (
                <Badge
                  className={cn(
                    "cursor-pointer bg-zinc-500 hover:bg-zinc-500/80",
                    {
                      "bg-primary": selectedGender?.id === gender.id,
                    }
                  )}
                  key={gender.id}
                  onClick={() =>
                    setSelectedGender(prev =>
                      prev?.id == gender.id ? null : gender
                    )
                  }
                >
                  {gender.name}
                </Badge>
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-xl">Aldersgruppe</h2>
            <div className="flex flex-wrap gap-2">
              {ageGroups.map(ageGroup => (
                <Badge
                  className={cn(
                    "cursor-pointer bg-zinc-500 hover:bg-zinc-500/80",
                    {
                      "bg-primary": selectedAgeGroup?.name === ageGroup.name,
                    }
                  )}
                  key={ageGroup.name}
                  onClick={() =>
                    setSelectedAgeGroup(prev =>
                      prev?.name == ageGroup.name ? null : ageGroup
                    )
                  }
                >
                  {ageGroup.name}
                </Badge>
              ))}
            </div>
          </section>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <div className="flex justify-center w-full mt-6">
              <Button className="w-full" type="submit" onClick={handleFilter}>
                Søg
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
