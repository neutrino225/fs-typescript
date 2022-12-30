/** @format */

import { Formik, Form, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, Container } from "@material-ui/core";
import Notification from "./Notification";

import { TextField } from "../AddPatientModal/FormField";
import { HealthCheckEntry } from "../types";
import { useState } from "react";
import { parseDate } from "../utils/checkHospitalEntry";
import patientService from "../services/patientService";

export type HealthCheckFormEntry = Omit<HealthCheckEntry, "id">;

const AddHealthCheckEntryForm = () => {
	const navigate = useNavigate();
	const [{ diagnosisCodes }] = useStateValue();
	const [notification, setNotification] = useState("");
	const [error, setError] = useState("");

	let id = useParams().id;

	const onSubmit = async (values: HealthCheckFormEntry) => {
		if (!parseDate(values.date)) {
			setNotification("Date is invalid");
			setError("error");

			setTimeout(() => {
				setNotification("");
				setError("");
			}, 3000);
			return;
		}

		if (values.healthCheckRating > 3 || values.healthCheckRating < 0) {
			setNotification("HealthCheck rating can only be between 0 - 3");
			setError("error");

			setTimeout(() => {
				setNotification("");
				setError("");
			}, 3000);
			return;
		}

		if (!id) id = "";

		const updatedPatient = await patientService.addEntry(values, id);

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
					type: "HealthCheck",
					date: "",
					diagnosisCodes: [],
					specialist: "",
					description: "",
					healthCheckRating: 0,
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
					if (!diagnosisCodes || diagnosisCodes.length === 0) {
						errors.diagnosisCodes = requiredError;
					}
					if (values.type !== "HealthCheck") {
						errors.type = "Type should be HealthCheck";
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
								label="HealthCheck Rating"
								placeholder="HealthCheck Rating"
								name="healthCheckRating"
								component={TextField}
								type="number"
								InputProps={{ inputProps: { min: 0, max: 3 } }}
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

export default AddHealthCheckEntryForm;
