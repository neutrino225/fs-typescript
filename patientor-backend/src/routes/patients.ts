/** @format */

import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils/NewPatientEntry";
import { PatientEntry, Entry } from "../types";
import { checkIfValid } from "../utils/NewEntry";

const router = express.Router();

router.get("/", (_req, res) => {
	res.json(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const newPatientEntry = toNewPatientEntry(req.body);

		const addedPatient = patientService.addPatient(newPatientEntry);
		res.json(addedPatient);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get("/:id", (req, res) => {
	if (!req.params.id) return res.json({ error: "Missing id" });
	const id = req.params.id;

	const patient: PatientEntry | null = patientService.findById(id);

	if (!patient) return res.json({ error: "Patient not found" });

	return res.json(patient);
});

router.get("/:id/entries", (req, res) => {
	if (!req.params.id) return res.json({ error: "Missing id" });
	const id = req.params.id;
	const patient: PatientEntry | null = patientService.findById(id);

	if (!patient) return res.json({ error: "Patient not found" });

	return res.json(patient.entries);
});

router.post("/:id/entries", (req, res) => {
	if (!req.params.id) return res.json({ error: "Missing id" });

	const id = req.params.id;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const entry: Entry = req.body.entry;

	if (!entry) return res.json({ error: "Entry not valid" });

	if (!checkIfValid(entry))
		return res.json({ error: "Not all fields were provided" });

	const updatedPatient = patientService.addPatientEntry(id, entry);

	return res.json(updatedPatient);
});

export default router;
