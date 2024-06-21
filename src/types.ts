// Add types here
export type Participant = {
  id?: number;
  name: string;
  dateOfBirth: string;
  age?: number;
  gender: string;
  clubName: string;
  disciplines: Discipline[];
};

export type Discipline = {
  id: number;
  name: string;
  measurementType: string;
};

export type Club = {
  id: number;
  name: string;
  city: string;
};

export type Gender = {
  id: string;
  name: string;
};

export type Result = {
  id: number;
  date: string;
  resultValue: string;
  participant: Participant;
  discipline: Discipline;
};

export type AgeGroup = {
  name: string;
  fromAge: number;
  toAge: number;
};
