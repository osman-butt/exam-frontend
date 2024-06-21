import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getDesciplines } from "@/services/apiFacade";
import { Discipline } from "@/types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";

type Checked = DropdownMenuCheckboxItemProps["checked"];

type DisciplinesDropDownProps = {
  onValueChange: (disciplines: Discipline[]) => void;
  defaultValue: Discipline[];
};

export function DisciplinesDropDown({
  onValueChange,
  defaultValue,
}: DisciplinesDropDownProps) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>(
    []
  );

  const [checked, setChecked] = useState<Record<number, Checked>>(
    defaultValue.reduce((acc, discipline) => {
      acc[discipline.id] = true;
      return acc;
    }, {} as Record<number, Checked>)
  );

  useEffect(() => {
    getDesciplines().then(data => {
      setDisciplines(data);
      defaultValue.forEach(discipline => {
        setIsChecked(discipline.id);
        // setSelectedDisciplines(prev => [...prev, discipline]);
      });
      setSelectedDisciplines(defaultValue);
    });
  }, []);

  useEffect(() => {
    onValueChange(selectedDisciplines);
  }, [selectedDisciplines]);

  //   const [checked, setChecked] = useState<Record<number, Checked>>({});

  const setIsChecked = (id: number) => (isChecked: Checked) => {
    setChecked(prev => ({ ...prev, [id]: isChecked }));
    setSelectedDisciplines(prev => {
      if (isChecked) {
        return [...prev, disciplines.find(discipline => discipline.id === id)!];
      } else {
        return prev.filter(discipline => discipline.id !== id);
      }
    });
  };
  const isChecked = (id: number) => checked[id] ?? false;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full h-auto">
            <div className="flex justify-between w-[340px]">
              <p>Vælg discipliner</p>
              <ChevronDownIcon className="w-4 text-right text-slate-600" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Discipliner</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {disciplines.map(discipline => (
            <DropdownMenuCheckboxItem
              checked={isChecked(discipline.id)}
              onCheckedChange={setIsChecked(discipline.id)}
              key={discipline.id}
            >
              {discipline.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="">
        {disciplines
          .filter(discipline => isChecked(discipline.id))
          .map(discipline => (
            <Badge className="m-1" key={discipline.id}>
              {discipline.name}
            </Badge>
          ))}
      </div>
    </>
  );
}
