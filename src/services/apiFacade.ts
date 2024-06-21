import { API_URL } from "@/Settings";
import { makeOptions, handleHttpErrors } from "@/services/fetchUtils";
import { Club, Discipline, Participant, Result } from "@/types";

// DEFINE ENDPOINTS
const PARTICIPANTS_URL = API_URL + "/participants";
const DISCIPLINES_URL = API_URL + "/disciplines";
const CLUBS_URL = API_URL + "/clubs";
const RESULT_URL = API_URL + "/results";

async function getParticipants(name: string): Promise<Participant[]> {
  if (!name) return fetch(PARTICIPANTS_URL).then(handleHttpErrors);
  return fetch(`${PARTICIPANTS_URL}?name=${name}`).then(handleHttpErrors);
}

async function createParticipant(
  newParticipant: Participant
): Promise<Participant> {
  const options = makeOptions("POST", newParticipant);
  return fetch(PARTICIPANTS_URL, options).then(handleHttpErrors);
}

async function deleteParticipant(id: number): Promise<void> {
  return fetch(`${PARTICIPANTS_URL}/${id}`, { method: "DELETE" }).then(res => {
    res;
  });
}

async function updateParticipant(
  id: number,
  participant: Participant
): Promise<void> {
  const options = makeOptions("PUT", participant);
  return fetch(`${PARTICIPANTS_URL}/${id}`, options).then(res => {
    res;
  });
}

async function getDesciplines(): Promise<Discipline[]> {
  return fetch(DISCIPLINES_URL).then(handleHttpErrors);
}

async function getClubs(): Promise<Club[]> {
  return fetch(CLUBS_URL).then(handleHttpErrors);
}

async function getResults(): Promise<Result[]> {
  return fetch(RESULT_URL).then(handleHttpErrors);
}

async function deleteResult(id: number): Promise<void> {
  return fetch(`${RESULT_URL}/${id}`, { method: "DELETE" }).then(res => {
    res;
  });
}

async function createResult(newResult: Result): Promise<Result> {
  const options = makeOptions("POST", newResult);
  return fetch(RESULT_URL, options).then(handleHttpErrors);
}

async function updateResult(id: number, result: Result): Promise<void> {
  const options = makeOptions("PUT", result);
  return fetch(`${RESULT_URL}/${id}`, options).then(res => {
    res;
  });
}

export {
  getParticipants,
  createParticipant,
  deleteParticipant,
  updateParticipant,
  getDesciplines,
  getClubs,
  getResults,
  deleteResult,
  createResult,
  updateResult,
};
