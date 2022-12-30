/** @format */

interface Details {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ParsedInputs {
  logs: Array<number>;
  target: number;
}

const average = (array: Array<number>): number => {
  let sum = 0;

  for (const item of array) {
    sum += item;
  }
  return sum / array.length;
};

export const parseLogs = (logs: Array<string>) => {
  const logsParsed: Array<string> = logs.slice(2, -1);
  const target = Number(logs.pop());

  const logsToReturn = logsParsed.map(log => parseFloat(log));

  const parsed: ParsedInputs = {
    logs: logsToReturn,
    target,
  };

  return parsed;
};

const rating = (array: Array<number>, target: number): number => {
  const totalHoursSpent: number = average(array);
  const difference: number = target - totalHoursSpent;

  if (difference <= 0) return 3;
  if (difference < 0.25) {
    return 2.5;
  } else if (difference < 0.5) {
    return 2;
  } else if (difference < 1) {
    return 1.5;
  } else if (difference < 1.5) {
    return 1;
  } else if (difference < 2) {
    return 0.75;
  } else {
    return 0.5;
  }
};

const ratingDetails = (rating: number): string => {
  if (rating === 3) {
    return "Excellent job";
  } else if (rating < 3 && rating >= 2) {
    return "Good job but results can be imporved";
  } else {
    return "Spend more weeks in the training";
  }
};

const calculateExercises = (inputs: ParsedInputs): Details => {
  const trainingDays: number = inputs.logs.filter(hours => hours !== 0).length;
  const averageForLogs: number = average(inputs.logs);
  const ratingForLogs: number = rating(inputs.logs, inputs.target);
  const ratingDetailsForLogs: string = ratingDetails(ratingForLogs);

  const results: Details = {
    periodLength: inputs.logs.length,
    trainingDays,
    success: trainingDays === inputs.logs.length,
    rating: ratingForLogs,
    ratingDescription: ratingDetailsForLogs,
    target: inputs.target,
    average: averageForLogs,
  };

  return results;
};

export { calculateExercises, ParsedInputs };
