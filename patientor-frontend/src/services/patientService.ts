/** @format */

import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, FormEntry } from "../types";

const findById = async (id: string): Promise<Patient | null> => {
	try {
		const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

const addEntry = async (
	values: FormEntry,
	patientId: string
): Promise<Patient | null> => {
	try {
		const { data } = await axios.post<Patient>(
			`${apiBaseUrl}/patients/${patientId}/entries`,
			{ entry: values }
		);

		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default { findById, addEntry };
