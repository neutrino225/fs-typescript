/** @format */

import { useParams } from "react-router-dom";
import { Grid, Container } from "@material-ui/core";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import patientService from "../services/patientService";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import Entries from "./EntryList";
import MenuPopupState from "./AddEntryMenu";

const GenderIcon = ({ gender }: { gender: string }) => {
	if (gender === "male") return <FemaleIcon />;

	return <MaleIcon />;
};

const PatientDetailsContainer = () => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | null>(null);

	useEffect(() => {
		if (!id) return;

		patientService
			.findById(id)
			.then((patient) => setPatient(patient))
			.catch(console.error);
	}, [id]);

	if (!id) return <div>Must supply id</div>;

	if (patient === null) return <div>No such patient</div>;

	return <PatientDetails patient={patient} />;
};

interface PatientDetailsProps {
	patient: Patient;
}

const PatientDetails = ({ patient }: PatientDetailsProps) => {
	const gender = patient.gender;

	return (
		<Container style={{ marginTop: "2rem" }}>
			<Grid container>
				<h2>{patient.name}</h2>
				<GenderIcon gender={gender} />
			</Grid>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<Grid>
				<h3>Entries</h3>
				<Entries patient={patient} />
			</Grid>
			<MenuPopupState id={patient.id} />
		</Container>
	);
};

export default PatientDetailsContainer;
