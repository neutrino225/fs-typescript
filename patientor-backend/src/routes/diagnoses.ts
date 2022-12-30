/** @format */

import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
	console.log("Fetching all data!!");
	res.send(diagnoseService.getEntries());
});

router.post("/", (_req, res) => {
	res.send("Saving a diagnose!");
});

export default router;
