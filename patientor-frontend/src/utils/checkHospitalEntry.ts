/** @format */

export const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): boolean => {
	if (!date || !isString(date) || !isDate(date)) {
		return false;
	}
	return true;
};

export {};
