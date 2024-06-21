import { getDesciplines } from "@/services/apiFacade";
import { Discipline } from "@/types";
import { useEffect, useState } from "react";

export default function DisciplinesPage() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  useEffect(() => {
    // Fetch data from API
    getDesciplines().then(data => setDisciplines(data));
  }, []);

  return (
    <div className="flex items-center justify-center mt-6">
      <table>
        <thead>
          <tr>
            <th className="w-[200px] text-left">Name</th>
          </tr>
        </thead>
        <tbody className="">
          {disciplines.map(discipline => (
            <tr key={discipline.id}>
              <td>{discipline.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
