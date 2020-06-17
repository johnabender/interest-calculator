export const SET_STARTING_VALUE = 'SET_STARTING_VALUE';
export function setStartingValue(value) {
	return {
		type: SET_STARTING_VALUE,
		value: value,
	};
}
export const SET_ENDING_VALUE = 'SET_ENDING_VALUE';
export function setEndingValue(value) {
	return {
		type: SET_ENDING_VALUE,
		value: value,
	};
}
export const SET_INTEREST_RATE = 'SET_INTEREST_RATE';
export function setInterestRate(value) {
	return {
		type: SET_INTEREST_RATE,
		value: value,
	};
}
export const SET_NUMBER_OF_YEARS = 'SET_NUMBER_OF_YEARS';
export function setNumberOfYears(value) {
	return {
		type: SET_NUMBER_OF_YEARS,
		value: value,
	};
}
export const SET_MONTHLY_CONTRIBUTION = 'SET_MONTHLY_CONTRIBUTION';
export function setMonthlyContribution(value) {
	return {
		type: SET_MONTHLY_CONTRIBUTION,
		value: value,
	};
}

export const SET_SOLVE_FOR_STARTING_VALUE = 'SET_SOLVE_FOR_STARTING_VALUE';
export function setSolveForStartingValue() {
	return {
		type: SET_SOLVE_FOR_STARTING_VALUE,
		value: true,
	};
}
export const SET_SOLVE_FOR_ENDING_VALUE = 'SET_SOLVE_FOR_ENDING_VALUE';
export function setSolveForEndingValue() {
	return {
		type: SET_SOLVE_FOR_ENDING_VALUE,
		value: true,
	};
}
export const SET_SOLVE_FOR_INTEREST_RATE = 'SET_SOLVE_FOR_INTEREST_RATE';
export function setSolveForInterestRate() {
	return {
		type: SET_SOLVE_FOR_INTEREST_RATE,
		value: true,
	};
}
export const SET_SOLVE_FOR_NUMBER_OF_YEARS = 'SET_SOLVE_FOR_NUMBER_OF_YEARS';
export function setSolveForNumberOfYears() {
	return {
		type: SET_SOLVE_FOR_NUMBER_OF_YEARS,
		value: true,
	};
}
export const SET_SOLVE_FOR_MONTHLY_CONTRIBUTION = 'SET_SOLVE_FOR_MONTHLY_CONTRIBUTION';
export function setSolveForMonthlyContribution() {
	return {
		type: SET_SOLVE_FOR_MONTHLY_CONTRIBUTION,
		value: true,
	};
}
