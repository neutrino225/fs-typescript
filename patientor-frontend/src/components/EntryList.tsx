/** @format */

import { Patient } from "../types";
import EntryDetails from "./Entry";
import { Container } from "@material-ui/core";

interface PatientDetailsProps {
	patient: Patient;
}

const Entries = ({ patient }: PatientDetailsProps) => {
	return (
		<Container>
			{patient.entries.map((entry, index) => {
				return <EntryDetails key={index} entry={entry} />;
			})}
		</Container>
	);
};

export default Entries;
