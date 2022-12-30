/** @format */

import { ssn } from "ssn-validation";
import { Gender } from "../types";
import { NewPatientEntry, Fields } from "../types";

const parseSSN = (ssnInput: string) => {
	if (!ssnInput || !ssn.isValid(ssnInput)) {
		throw new Error("SSN is not valid");
	}

	return ssnInput;
};

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const parseStrings = (text: unknown): string => {
	if (!text || !isString(text)) {
		throw new Error("Incorrect or missing");
	}

	return text;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error("Incorrect or missing date: " + date);
	}
	return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown) => {
	if (!gender || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender);
	}

	return gender;
};

export const toNewPatientEntry = (object: Fields): NewPatientEntry => {
	const newPatient: NewPatientEntry = {
		dateOfBirth: parseDate(object.dateOfBirth),
		gender: parseGender(object.gender),
		name: parseStrings(object.name),
		occupation: parseStrings(object.occupation),
		ssn: parseSSN(object.ssn),
		entries: [],
	};

	return newPatient;
};
