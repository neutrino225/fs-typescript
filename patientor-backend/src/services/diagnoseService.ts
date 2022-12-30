/** @format */

import diagnosesData from "../../data/diagnoses.json";
import { DiagnosisEntry } from "../types";

const getEntries = (): Array<DiagnosisEntry> => {
	return diagnosesData;
};

const addEntry = () => {
	return null;
};

export default {
	getEntries,
	addEntry,
};
