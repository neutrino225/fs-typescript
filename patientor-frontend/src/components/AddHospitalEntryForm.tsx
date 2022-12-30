/** @format */

import { Formik, Form, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, Container } from "@material-ui/core";
import Notification from "./Notification";

import { TextField } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { useState } from "react";
import { parseDate } from "../utils/checkHospitalEntry";
import patientService from "../services/patientService";

export type HospitalFormEntry = Omit<HospitalEntry, "id">;

const AddHospitalEntryForm = () => {
	const navigate = useNavigate();
	const [{ diagnosisCodes }] = useStateValue();
	const [notification, setNotification] = useState("");
	const [error, setError] = useState("");

	let id = useParams().id;

	const onSubmit = async (values: HospitalFormEntry) => {
		if (!parseDate(values.date)) {
			setNotification("Date is invalid");
			setError("error");

			setTimeout(() => {
				setNotification("");
				setError("");
			}, 3000);
			return;
		}

		if (!parseDate(values.discharge.date)) {
			setNotification("Discharge date is invalid");
			setError("error");

			setTimeout(() => {
				setNotification("");
				setError("");
			}, 3000);
			return;
		}

		if (!id) {
			id = "";
		}

		const updatedPatient = await patientService.addEntry(values, id);

		console.log(updatedPatient);

		navigate("/");
		return updatedPatient;
	};

	const onCancel = () => {
		navigate(-1);
	};

	return (
		<Container style={{ marginTop: "3rem" }}>
			<Notification message={notification} state={error} />
			<Formik
				initialValues={{
					type: "Hospital",
					date: "",
					diagnosisCodes: [],
					specialist: "",
					description: "",
					discharge: {
						date: "",
						criteria: "",
					},
				}}
				onSubmit={onSubmit}
				validate={(values) => {
					const requiredError = "Field is required";
					const errors: { [field: string]: string } = {};
					if (!values.date) {
						errors.date = requiredError;
					}
					if (!values.specialist) {
						errors.specialist = requiredError;
					}
					if (!values.description) {
						errors.description = requiredError;
					}
					if (!values.discharge.date) {
						errors.discharge = requiredError;
					}
					if (!values.discharge.criteria) {
						errors.discharge = requiredError;
					}
					if (!diagnosisCodes || diagnosisCodes.length === 0) {
						errors.diagnosisCodes = requiredError;
					}
					return errors;
				}}>
				{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
					return (
						<Form className="form ui">
							<Field
								label="Date"
								placeholder="Date"
								name="date"
								component={TextField}
							/>

							<Field
								label="specialist"
								placeholder="Specialist"
								name="specialist"
								component={TextField}
							/>

							<Field
								label="Description"
								placeholder="Description"
								name="description"
								component={TextField}
							/>

							<DiagnosisSelection
								setFieldValue={setFieldValue}
								setFieldTouched={setFieldTouched}
								diagnoses={Object.values(diagnosisCodes)}
							/>

							<Field
								label="Discharge Date"
								placeholder="Discharge Date"
								name="discharge.date"
								component={TextField}
							/>

							<Field
								label="Discharge Criteria"
								placeholder="Discharge Criteria"
								name="discharge.criteria"
								component={TextField}
							/>

							<Grid>
								<Grid item>
									<Button
										color="secondary"
										variant="contained"
										style={{ float: "left" }}
										type="button"
										onClick={onCancel}>
										Cancel
									</Button>
								</Grid>
								<Grid item>
									<Button
										style={{
											float: "right",
										}}
										type="submit"
										variant="contained"
										disabled={!dirty || !isValid}>
										Add
									</Button>
								</Grid>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</Container>
	);
};

export default AddHospitalEntryForm;
