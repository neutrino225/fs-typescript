/** @format */

import React, { createContext, useContext, useReducer } from "react";
import { Patient, DiagnosisEntry } from "../types";

import { Action } from "./reducer";

export type State = {
	patients: { [id: string]: Patient };
	diagnosisCodes: DiagnosisEntry[];
};

const initialState: State = {
	patients: {},
	diagnosisCodes: [],
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => initialState,
]);

type StateProviderProps = {
	reducer: React.Reducer<State, Action>;
	children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	);
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientList: Patient[]): Action => {
	return {
		type: "SET_PATIENT_LIST",
		payload: patientList,
	};
};

export const setDiagnosisCodes = (diagnosisCodes: DiagnosisEntry[]): Action => {
	return {
		type: "SET_DIAGNOSIS_CODES",
		payload: diagnosisCodes,
	};
};
