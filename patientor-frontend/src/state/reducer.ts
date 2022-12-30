/** @format */

import { State } from "./state";
import { Patient, DiagnosisEntry } from "../types";

export type Action =
	| {
			type: "SET_DIAGNOSIS_CODES";
			payload: DiagnosisEntry[];
	  }
	| {
			type: "SET_PATIENT_LIST";
			payload: Patient[];
	  }
	| {
			type: "ADD_PATIENT";
			payload: Patient;
	  };

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_DIAGNOSIS_CODES":
			return {
				...state,
				diagnosisCodes: action.payload,
			};

		case "SET_PATIENT_LIST":
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients,
				},
			};
		case "ADD_PATIENT":
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};

		default:
			return state;
	}
};
