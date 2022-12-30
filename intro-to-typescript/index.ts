/** @format */

import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ParsedInputs } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.weight || !req.query.height)
    return res.json({ error: "malformatted parameters" });

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);

  return res.json({ weight, height, bmi });
});

app.get("/exercises", (req, res) => {
  if (!req.body) return res.json({ error: "malformatted parameters" });

  const parsedInputs: ParsedInputs = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    logs: req.body.daily_exercises,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    target: req.body.target,
  };

  const toReturn = calculateExercises(parsedInputs);

  return res.json(toReturn);
});

const PORT = 3003;

app.listen(PORT, "0000", () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
