/** @format */

import { Entry } from "../types";

export const checkIfValid = (entry: Entry): boolean => {
	let isValid = false;

	if (entry.type === "HealthCheck") {
		if (entry.healthCheckRating !== undefined) {
			isValid = true;
		}
	} else if (entry.type === "Hospital") {
		if (entry.discharge !== undefined) {
			isValid = true;
		}
	} else if (entry.type === "OccupationalHealthcare") {
		if (entry.employerName !== undefined) {
			isValid = true;
		}
	}

	return isValid;
};
