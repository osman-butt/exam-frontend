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
  createParticipant,
  getClubs,
  updateParticipant,
} from "@/services/apiFacade";
import { Club, Participant } from "@/types";
import { DisciplinesDropDown } from "@/pages/participants/DisciplinesDropDown";

const disciplinesSchema = z.object({
  id: z.number(),
  name: z.string(),
  measurementType: z.string(),
});

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Navn skal være minimum 2 tegn lang.",
  }),
  // dateOfBirth: z.date().max(new Date(), {
  //   message: "Fødselsdato kan ikke være i fremtiden.",
  // }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Fødselsdato skal være i formatet: YYYY-MM-DD.",
  }),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Køn skal være Mand eller Kvinde.",
  }),
  clubName: z.string({
    message: "Vælg et gyldigt klubnavn",
  }),
  disciplines: z.array(disciplinesSchema),
});

type ParticipantsFormProps = {
  onParticipantChange: () => void;
  setOpen: (open: boolean) => void;
  participantToEdit?: Participant;
};

export function ParticipantsForm({
  onParticipantChange,
  setOpen,
  participantToEdit,
}: ParticipantsFormProps) {
  const [responseError, setResponseError] = React.useState<string | null>(null);

  const [clubs, setClubs] = React.useState<Club[]>([]);

  useEffect(() => {
    getClubs().then(data => {
      setClubs(data);
    });
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: participantToEdit?.name || "",
      dateOfBirth:
        participantToEdit?.dateOfBirth ||
        new Date("2000-01-01").toLocaleDateString(),
      gender: (participantToEdit?.gender as "MALE" | "FEMALE") || "MALE",
      clubName: (participantToEdit?.clubName as "Club A") || "Club A",
      // disciplines:
      //   participantToEdit?.disciplines.map(discipline => discipline.id) || [],
      disciplines: participantToEdit?.disciplines || [],
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResponseError(null);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const participant = {
      name: values.name,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
      clubName: values.clubName,
      disciplines: values.disciplines ?? [],
    };

    if (participantToEdit) {
      console.log("participantToEdit", participantToEdit);

      if (!participantToEdit.id) {
        setResponseError("Der opstod en fejl.");
        return;
      }
      await updateParticipant(participantToEdit?.id, participant)
        .then(() => {
          setOpen(false);
          onParticipantChange();
        })
        .catch(error => {
          console.log(error);
          setResponseError("Der opstod en fejl.");
        });
    } else {
      await createParticipant(participant)
        .then(() => {
          setOpen(false);
          onParticipantChange();
        })
        .catch(error => {
          console.log(error);
          setResponseError("Der opstod en fejl.");
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
              <FormItem>
                <FormLabel>Navn</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="Navn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Fødselsdato</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="w-full"
                    placeholder="Fødselsdato"
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
          name="gender"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Køn</FormLabel>
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
                    <SelectItem value="MALE">Mand</SelectItem>
                    <SelectItem value="FEMALE">Kvinde</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="clubName"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Klub</FormLabel>
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
                    {clubs.map(club => (
                      <SelectItem key={club.id} value={club.name}>
                        {club.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="disciplines"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Klub</FormLabel>
                <FormControl>
                  <DisciplinesDropDown
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
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
