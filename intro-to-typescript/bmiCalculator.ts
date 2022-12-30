/** @format */

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;

  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (bmi < 22.9) {
    return "Normal range (Healthy)";
  } else if (bmi < 24.9) {
    return "Overweight I (At risk)";
  } else if (bmi < 29.9) {
    return "Overweight II (Moderately obese)";
  } else {
    return "Overweight III (Severely obese)";
  }
};

// const height: number = Number(process.argv[2]);
// const mass: number = Number(process.argv[3]);

export { calculateBmi };
