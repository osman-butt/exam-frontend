import { Result } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (fullName: string): string => {
  // Trim any whitespace from the full name and split it into parts
  const nameParts = fullName.trim().split(/\s+/);

  // Check if we have at least two parts (first and last name)
  if (nameParts.length < 2) {
    throw new Error("Full name must include both first and last names.");
  }

  // Extract the first and last name parts
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];

  // Get the initials
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  // Concatenate the initials
  const initials = firstInitial + lastInitial;

  return initials;
};

export const formatTime = (milliseconds: number): string => {
  // Calculate hours, minutes, seconds, and milliseconds
  // const hours = Math.floor(milliseconds / (60 * 60 * 1000));
  const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  const remainingMilliseconds = milliseconds % 1000;

  // Pad with leading zeros if necessary
  // const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  const paddedMilliseconds = String(remainingMilliseconds).padStart(3, "0");

  // return `${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
  return `${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
};

export const timeToMilliseconds = (timeString: string) => {
  // Split the time string into hours, minutes, seconds, and milliseconds
  const [minutesStr, secondsAndMillisStr] = timeString.split(":");

  // Split seconds and milliseconds
  const [secondsStr, millisecondsStr] = secondsAndMillisStr.split(".");

  // Parse each component into integers
  // const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);
  const milliseconds = parseInt(millisecondsStr || "0", 10); // Handle case where milliseconds might be absent

  // Calculate total milliseconds
  const totalMilliseconds = (minutes * 60 + seconds) * 1000 + milliseconds;

  return totalMilliseconds;
};

export const getSortedResults = (results: Result[]) => {
  return results.sort((a: Result, b: Result) => {
    if (a.discipline.measurementType === "TIME") {
      if (Number(a.resultValue) < Number(b.resultValue)) return -1;
      if (Number(a.resultValue) > Number(b.resultValue)) return 1;
    }
    if (
      a.discipline.measurementType === "DISTANCE" ||
      a.discipline.measurementType === "POINTS"
    ) {
      if (Number(a.resultValue) < Number(b.resultValue)) return -1;
      if (Number(a.resultValue) > Number(b.resultValue)) return 1;
    }
    return 0;
  });
};

export const ageGroupsList = [
  { name: "Småbørn (0-5)", fromAge: 0, toAge: 5 },
  { name: "Børn (6-9)", fromAge: 6, toAge: 9 },
  { name: "Unge (10-13)", fromAge: 10, toAge: 13 },
  { name: "Junior (14-22)", fromAge: 14, toAge: 22 },
  { name: "Voksne (23-40)", fromAge: 23, toAge: 40 },
  { name: "Senior (41-)", fromAge: 41, toAge: 100 },
];

export const getAgeGroup = (age: number): string => {
  // if (age < 6) return "Børn (0-5)"; // (0-5
  if (6 <= age && age <= 9) return "Børn (6-9)";
  if (10 <= age && age <= 13) return "Unge (10-13)";
  if (14 <= age && age <= 22) return "Junior (10-13)";
  if (23 <= age && age <= 40) return "Voksne (23-40)";
  if (41 <= age) return "Senior (41-)";
  return "Småbørn (0-5)";
};
