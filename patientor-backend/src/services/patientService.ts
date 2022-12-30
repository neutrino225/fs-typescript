/** @format */

import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";

import {
	PatientEntry,
	NonSensitivePatientEntry,
	NewPatientEntry,
	Entry,
	Error,
} from "../types";

const getAll = (): PatientEntry[] => {
	return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const findById = (id: string) => {
	const patient = patientsData.find((patient) => patient.id === id);
	if (patient) return patient;
	return null;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
	const id: string = uuid();

	const newPatientEntry = {
		id,
		...entry,
		entries: [],
	};

	patientsData.push(newPatientEntry);

	return newPatientEntry;
};

const addPatientEntry = (id: string, entry: Entry): PatientEntry | Error => {
	const patient = findById(id);
	const idForEntry: string = uuid();

	const newEntry = {
		...entry,
		id: idForEntry,
	};

	if (!patient) return { error: "Patient not found" };

	// const newPatient: PatientEntry = { ...patient, entries: newEntries };
	// patientsData.map((patient) => (patient.id !== id ? patient : newPatient));
	// console.log(patientsData);

	patient.entries.push(newEntry);

	return patient;
};

export default {
	getAll,
	addPatient,
	getNonSensitiveEntries,
	findById,
	addPatientEntry,
};
