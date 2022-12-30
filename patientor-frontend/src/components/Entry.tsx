/** @format */

import { useStateValue } from "../state";
import { Entry, HealthCheckRating } from "../types";
import { Box, Grid } from "@material-ui/core";

import FavoriteIcon from "@mui/icons-material/Favorite";
import SickIcon from "@mui/icons-material/Sick";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface EntryProps {
	entry: Entry;
}

const moveLeft = {
	marginLeft: 20,
};

const SickLeave = ({ entry }: EntryProps) => {
	if (entry.type === "OccupationalHealthcare" && entry.sickLeave) {
		return (
			<Grid container>
				<h4>Sick Leave</h4>
				<SickIcon />
				<p style={moveLeft}>Start: {entry.sickLeave.startDate}</p>
				<p style={moveLeft}>End: {entry.sickLeave.endDate}</p>
			</Grid>
		);
	}
	return <></>;
};

const DiagnosisCodes = ({ entry }: EntryProps) => {
	const [{ diagnosisCodes }] = useStateValue();
	if (entry.diagnosisCodes) {
		return (
			<div>
				<ul>
					{entry.diagnosisCodes.map((code, index) => {
						const diagnose = diagnosisCodes.find((dc) => dc.code === code);
						return (
							<li key={index}>
								{code} {diagnose?.name}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	return <></>;
};

const commonStyles = {
	bgcolor: "background.paper",
	m: 3,
	width: "auto",
	height: "auto",
	borderTop: 1,
	borderBottom: 1,
	borderLeft: 1,
	borderRight: 1,
	borderStyle: "solid",
	borderBottomStyle: "solid",
	padding: "1rem",
};

const HealthRating = ({ rating }: { rating: string }) => {
	switch (rating) {
		case "Healthy":
			return <FavoriteIcon sx={{ color: "greenyellow" }} />;

		case "LowRisk":
			return <FavoriteIcon sx={{ color: "yellow" }} />;

		case "HighRisk":
			return <FavoriteIcon sx={{ color: "orange" }} />;

		case "CriticalRisk":
			return <FavoriteIcon sx={{ color: "red" }} />;
		default:
			return <></>;
	}
};

const EntryDetails = ({ entry }: EntryProps) => {
	switch (entry.type) {
		case "HealthCheck":
			return (
				<Box sx={{ ...commonStyles }}>
					<Grid container>
						<p>
							<b>{entry.date}</b>
						</p>
						<MedicalServicesIcon />
					</Grid>
					<p>
						<i>{entry.description}</i>
					</p>
					<DiagnosisCodes entry={entry} />
					<HealthRating rating={HealthCheckRating[entry.healthCheckRating]} />
					<p>diagnosed by: {entry.specialist}</p>
				</Box>
			);

		case "Hospital":
			return (
				<Box sx={{ ...commonStyles }}>
					<Grid container>
						<p>
							<b>{entry.date}</b>
						</p>
						<LocalHospitalIcon />
					</Grid>
					<p>
						<i>{entry.description}</i>
					</p>
					<DiagnosisCodes entry={entry} />
					<p>Discharged on: {entry.discharge.date}</p>
					<p>Discharge criteria: {entry.discharge.criteria}</p>
				</Box>
			);

		case "OccupationalHealthcare":
			return (
				<Box sx={{ ...commonStyles }}>
					<Grid container>
						<p>
							<b>{entry.date}</b>
						</p>
						<WorkIcon />
						{entry.employerName}
					</Grid>
					<p>
						<i>{entry.description}</i>
					</p>
					<DiagnosisCodes entry={entry} />
					<p>diagnosed by: {entry.specialist}</p>
					<SickLeave entry={entry} />
				</Box>
			);

		default:
			return <></>;
	}
};

export default EntryDetails;
