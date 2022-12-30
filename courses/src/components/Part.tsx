/** @format */

import { CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
	switch (part.type) {
		case "normal":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>{part.description}</p>
				</div>
			);

		case "groupProject":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>project exercises {part.exerciseCount}</p>
				</div>
			);

		case "submission":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>{part.description}</p>
					<p>{part.exerciseSubmissionLink}</p>
				</div>
			);

		case "special":
			return (
				<div>
					<h3>
						{part.name} {part.exerciseCount}
					</h3>
					<p>{part.description}</p>
					<p>
						required skills:{" "}
						{part.requirements.map((requirement) => {
							return requirement + " ";
						})}
					</p>
				</div>
			);

		default:
			return assertNever(part);
	}
};

export default Part;
