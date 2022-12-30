/** @format */

export interface CourseContent {
	name: string;
	exerciseCount: number;
}

/// Courses
interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}

interface CourseWithDescription extends CoursePartBase {
	description: string;
}

interface CourseNormalPart extends CourseWithDescription {
	type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
	type: "groupProject";
	groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
	type: "submission";
	exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseWithDescription {
	type: "special";
	requirements: string[];
}

export type CoursePart =
	| CourseNormalPart
	| CourseProjectPart
	| CourseSubmissionPart
	| CourseSpecialPart;
