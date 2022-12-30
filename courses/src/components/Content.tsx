/** @format */

import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({
	courseParts,
}: {
	courseParts: CoursePart[];
}): JSX.Element => {
	return (
		<div>
			{courseParts.map((part, index) => {
				return <Part part={part} key={index} />;
			})}
		</div>
	);
};

export default Content;
