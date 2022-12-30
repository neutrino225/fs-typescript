/** @format */

import express from "express";
import cors from "cors";

import diagnosesRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use(express.json());

app.use((req, _res, next) => {
	console.log(`${req.method} - ${req.path} ${req.ip}`); //"req.method+ ’ ‘+req.path+’-’+req.ip "
	next();
});

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
	res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, "0000", () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
