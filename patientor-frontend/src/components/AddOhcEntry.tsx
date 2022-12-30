/** @format */

import { Formik, Form, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, Container } from "@material-ui/core";
import Notification from "./Notification";

import { TextField } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { useState } from "react";
import { parseDate } from "../utils/checkHospitalEntry";
import patientService from "../services/patientService";

export type OccupationalHealthcareFormEntry = Omit<
	OccupationalHealthcareEntry,
	"id"
>;

const AddOHCEntryForm = () => {
	const navigate = useNavigate();
	const [{ diagnosisCodes }] = useStateValue();
	const [notification, setNotification] = useState("");
	const [error, setError] = useState("");

	let id = useParams().id;

	const onSubmit = async (values: OccupationalHealthcareFormEntry) => {
		if (!parseDate(values.date)) {
			setNotification("Date is invalid");
			setError("error");

			setTimeout(() => {
				setNotification("");
				setError("");
			}, 3000);
			return;
		}

		if (values.sickLeave?.startDate) {
			if (!values.sickLeave.endDate) {
				setNotification("Sick leave end date not provided");
				setError("error");

				setTimeout(() => {
					setNotification("");
					setError("");
				}, 3000);
				return;
			}
		}

		if (values.sickLeave?.endDate) {
			if (!values.sickLeave.startDate) {
				setNotification("Sick leave start date not provided");
				setError("error");

				setTimeout(() => {
					setNotification("");
					setError("");
				}, 3000);
				return;
			}
		}

		if (values.sickLeave?.startDate) {
			if (!parseDate(values.sickLeave.startDate)) {
				setNotification("Sick leave start date is invalid");
				setError("error");

				setTimeout(() => {
					setNotification("");
					setError("");
				}, 3000);
				return;
			}
		}

		if (values.sickLeave?.endDate) {
			if (!parseDate(values.sickLeave.endDate)) {
				setNotification("Sick leave end date is invalid");
				setError("error");

				setTimeout(() => {
					setNotification("");
					setError("");
				}, 3000);
				return;
			}
		}

		if (!values.sickLeave?.endDate && !values.sickLeave?.startDate) {
			delete values.sickLeave;
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
					type: "OccupationalHealthcare",
					date: "",
					diagnosisCodes: [],
					specialist: "",
					description: "",
					employerName: "",
					sickLeave: {
						startDate: "",
						endDate: "",
					},
				}}
				onSubmit={onSubmit}
				validate={(values) => {
					const requiredError = "Field is required";
					const errors: { [field: string]: string } = {};
					if (!values.date) {
						errors.date = requiredError;
					}
					if (!diagnosisCodes || diagnosisCodes.length === 0) {
						errors.diagnosisCodes = requiredError;
					}
					if (!values.specialist) {
						errors.specialist = requiredError;
					}
					if (!values.description) {
						errors.description = requiredError;
					}

					if (!values.employerName) {
						errors.employerName = requiredError;
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
								label="Employer Name"
								placeholder="Employer Name"
								name="employerName"
								component={TextField}
							/>

							<Field
								label="Sick Leave"
								placeholder="Start Date"
								name="sickLeave.startDate"
								component={TextField}
							/>

							<Field
								label="Sick Leave"
								placeholder="End Date"
								name="sickLeave.endDate"
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

export default AddOHCEntryForm;
