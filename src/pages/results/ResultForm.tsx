import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CogIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getParticipants,
  getDesciplines,
  createResult,
  updateResult,
} from "@/services/apiFacade";
import { Discipline, Participant, Result } from "@/types";
import { formatTime, timeToMilliseconds } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Vælg en deltager fra listen.",
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Fødselsdato skal være i formatet: YYYY-MM-DD.",
  }),
  resultValue: z.string(),
  discipline: z.string(),
});

type ResultFormProps = {
  onResultChange: () => void;
  setOpen: (open: boolean) => void;
  resultToEdit?: Result;
};

export function ResultForm({
  onResultChange,
  setOpen,
  resultToEdit,
}: ResultFormProps) {
  const [responseError, setResponseError] = React.useState<string | null>(null);

  const [participants, setParticipants] = React.useState<Participant[]>([]);
  const [disciplines, setDisciplines] = React.useState<Discipline[]>([]);

  useEffect(() => {
    getParticipants("").then(data => {
      setParticipants(data);
    });
    getDesciplines().then(data => setDisciplines(data));
  }, []);

  let existingResultValue = resultToEdit?.resultValue;

  if (resultToEdit) {
    if (resultToEdit.discipline.measurementType === "TIME") {
      existingResultValue = formatTime(Number(resultToEdit.resultValue));
    }
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: resultToEdit?.participant.name || "",
      date: resultToEdit?.date || new Date("2000-01-01").toLocaleDateString(),
      resultValue: existingResultValue || "",
      discipline: resultToEdit?.discipline.name || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResponseError(null);
    // Check if result is correct
    const chosenDiscipline = disciplines.find(
      discipline => discipline.name === values.discipline
    );

    let resultValue;

    if (chosenDiscipline?.measurementType === "TIME") {
      if (!values.resultValue.match(/^\d+:\d{2}\.\d{3}$/)) {
        form.setError("resultValue", {
          type: "manual",
          message: "Indtast resultat som MM:SS.sss",
        });
        return;
      }
      resultValue = timeToMilliseconds(values.resultValue);
    }
    if (chosenDiscipline?.measurementType === "DISTANCE") {
      if (!values.resultValue.match(/^\d+$/)) {
        form.setError("resultValue", {
          type: "manual",
          message: "Indtast resultat i cm",
        });
        return;
      }
    }

    if (chosenDiscipline?.measurementType === "POINTS") {
      if (!values.resultValue.match(/^\d+$/)) {
        form.setError("resultValue", {
          type: "manual",
          message: "Indtast resultat fra 0-100",
        });
        return;
      }
    }

    const result = {
      id: resultToEdit?.id || 0,
      participant: participants.find(
        participant => participant.name === values.name
      ),
      date: values.date,
      resultValue: resultValue,
      discipline: disciplines.find(
        discipline => discipline.name === values.discipline
      ),
    };

    if (resultToEdit) {
      updateResult(resultToEdit.id, result as Result)
        .then(() => {
          setOpen(false);
          onResultChange();
        })
        .catch(error => {
          console.log(error);
          setResponseError(error.message);
        });
    } else {
      createResult(result as Result)
        .then(() => {
          setOpen(false);
          onResultChange();
        })
        .catch(error => {
          console.log(error);
          setResponseError(error.message);
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
              {resultToEdit! ? (
                <FormItem>
                  <FormLabel>Deltager</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className="w-full"
                      placeholder="Navn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>Deltager</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {participants.map(participant => (
                        <SelectItem
                          key={participant.id}
                          value={participant.name}
                        >
                          {participant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            </>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Dato</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="w-full"
                    placeholder="Dato"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="discipline"
          render={({ field }) => (
            <>
              {resultToEdit! ? (
                <FormItem>
                  <FormLabel>Disciplin</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      className="w-full"
                      placeholder="Disciplin"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) : (
                <FormItem>
                  <FormLabel>Disciplin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {disciplines.map(discipline => (
                        <SelectItem
                          key={discipline.id}
                          value={discipline.name}
                          onChange={field.onChange}
                        >
                          {discipline.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            </>
          )}
        />
        <FormField
          control={form.control}
          name="resultValue"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Resultat</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="resultat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <>
              <CogIcon className="w-5 mr-2 animate-spin" /> Gemmer ...
            </>
          ) : (
            "Gem"
          )}
        </Button>
        {responseError && (
          <FormMessage className="flex">
            <InformationCircleIcon className="hidden w-5 mr-2 md:block" />
            {responseError}
          </FormMessage>
        )}
      </form>
    </Form>
  );
}
