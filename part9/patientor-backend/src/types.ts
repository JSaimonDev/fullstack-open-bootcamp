export type Patient = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[]
};

export interface BaseEntry {
    id: string
    description: string;
    date: string;
    specialist: string;
  }

export interface HealthCheckEntry extends BaseEntry{
    healthCheckRating: HealthCheckRating;
    type: "HealthCheck"
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
    diagnosisCodes: string[]
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;
    diagnosisCodes?: string[]
}

export type Entry = HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry;

export interface Discharge {
    date: string;
    criteria: string
}

export interface SickLeave {
    startDate: string,
    endDate: string,
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export type PatientNoSSN = Omit<Patient, 'ssn'  | "entries">;

export type  NewPatientEntry = Omit<Patient, 'id'>;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}