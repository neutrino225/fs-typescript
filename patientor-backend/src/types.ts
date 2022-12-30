/** @format */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnosisEntry["code"]>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface Discharge {
	date: string;
	criteria: string;
}

export interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

interface SickLeave {
	startDate: string;
	endDate: string;
}

export interface Error {
	error: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type NewPatientEntry = Omit<PatientEntry, "id">;

export interface DiagnosisEntry {
	code: string;
	name: string;
	latin?: string;
}

export type PublicPatient = Omit<PatientEntry, "ssn" | "entries">;

export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
	entries: Entry[];
}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export type Fields = {
	dateOfBirth: unknown;
	gender: unknown;
	name: unknown;
	occupation: unknown;
	ssn: string;
};
