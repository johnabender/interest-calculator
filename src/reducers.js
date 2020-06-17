import numeral from 'numeral';

import {
	SET_STARTING_VALUE,
	SET_ENDING_VALUE,
	SET_INTEREST_RATE,
	SET_NUMBER_OF_YEARS,
	SET_MONTHLY_CONTRIBUTION,
	SET_SOLVE_FOR_STARTING_VALUE,
	SET_SOLVE_FOR_ENDING_VALUE,
	SET_SOLVE_FOR_INTEREST_RATE,
	SET_SOLVE_FOR_NUMBER_OF_YEARS,
	SET_SOLVE_FOR_MONTHLY_CONTRIBUTION,
} from './actions';

const INITIAL_STATE = {
	startingValue: 10000,
	endingValue: null,
	interestRate: 5,
	numberOfYears: 20,
	monthlyContribution: 0,

	solveForStartingValue: false,
	solveForEndingValue: true,
	solveForInterestRate: false,
	solveForNumberOfYears: false,
	solveForMonthlyContribution: false,
};

export function calculatorApp(currentState, action) {
	if (!currentState) {
		let newState = INITIAL_STATE;
		return solve(newState);
	}

	let newState = null;
	switch (action.type) {
		case SET_STARTING_VALUE:
			newState = Object.assign({}, currentState, {
				startingValue: numeral(action.value).value(),
			});
			return solve(newState);
		case SET_ENDING_VALUE:
			newState = Object.assign({}, currentState, {
				endingValue: numeral(action.value).value(),
			});
			return solve(newState);
		case SET_INTEREST_RATE:
			newState = Object.assign({}, currentState, {
				interestRate: numeral(action.value).value(),
			});
			return solve(newState);
		case SET_NUMBER_OF_YEARS:
			newState = Object.assign({}, currentState, {
				numberOfYears: numeral(action.value).value(),
			});
			return solve(newState);
		case SET_MONTHLY_CONTRIBUTION:
			newState = Object.assign({}, currentState, {
				monthlyContribution: numeral(action.value).value(),
			});
			return solve(newState);
		case SET_SOLVE_FOR_STARTING_VALUE:
			newState = Object.assign({}, currentState, {
				solveForStartingValue: true,
				solveForEndingValue: false,
				solveForInterestRate: false,
				solveForNumberOfYears: false,
				solveForMonthlyContribution: false,
			});
			return solve(newState);
		case SET_SOLVE_FOR_ENDING_VALUE:
			newState = Object.assign({}, currentState, {
				solveForStartingValue: false,
				solveForEndingValue: true,
				solveForInterestRate: false,
				solveForNumberOfYears: false,
				solveForMonthlyContribution: false,
			});
			return solve(newState);
		case SET_SOLVE_FOR_INTEREST_RATE:
			newState = Object.assign({}, currentState, {
				solveForStartingValue: false,
				solveForEndingValue: false,
				solveForInterestRate: true,
				solveForNumberOfYears: false,
				solveForMonthlyContribution: false,
			});
			return solve(newState);
		case SET_SOLVE_FOR_NUMBER_OF_YEARS:
			newState = Object.assign({}, currentState, {
				solveForStartingValue: false,
				solveForEndingValue: false,
				solveForInterestRate: false,
				solveForNumberOfYears: true,
				solveForMonthlyContribution: false,
			});
			return solve(newState);
		case SET_SOLVE_FOR_MONTHLY_CONTRIBUTION:
			newState = Object.assign({}, currentState, {
				solveForStartingValue: false,
				solveForEndingValue: false,
				solveForInterestRate: false,
				solveForNumberOfYears: false,
				solveForMonthlyContribution: true,
			});
			return solve(newState);
		default:
			return currentState;
	}
}

function solve(state) {
	if (state.solveForStartingValue) {
		if (state.monthlyContribution === 0) {
			return Object.assign({}, state, {
				startingValue: state.endingValue/(1 + state.interestRate/100)**state.numberOfYears,
			});
		}
		else {
			return gradientDescent(state, 'startingValue', 1000);
		}
	}
	else if (state.solveForEndingValue) {
		if (state.monthlyContribution === 0) {
			return Object.assign({}, state, {
				endingValue: state.startingValue*(1 + state.interestRate/100)**state.numberOfYears,
			});
		}
		else {
			return Object.assign({}, state, {endingValue: computeEndingValueWithContribution(state)});
		}
	}
	else if (state.solveForInterestRate) {
		if (state.monthlyContribution === 0) {
			return Object.assign({}, state, {
				interestRate: 100*((state.endingValue/state.startingValue)**(1/state.numberOfYears) - 1),
			});
		}
		else {
			return gradientDescent(state, 'interestRate', 0.1);
		}
	}
	else if (state.solveForNumberOfYears) {
		if (state.monthlyContribution === 0) {
			return Object.assign({}, state, {
				numberOfYears: Math.log(state.endingValue/state.startingValue)/Math.log(1 + state.interestRate/100),
			});
		}
		else {
			return gradientDescent(state, 'numberOfYears', 1);
		}
	}
	else if (state.solveForMonthlyContribution) {
		return gradientDescent(state, 'monthlyContribution', 100);
	}

	console.warn('missed a state!? -this code shouldn\'t be reached');
	return state;
}

function computeEndingValueWithContribution(state) {
	let total = state.startingValue;

	for (let t = 0; t < 12*state.numberOfYears; t++) {
		total += total*state.interestRate/100/12;
		total += state.monthlyContribution;
	}

	return total;
}

function gradientDescent(state, variableName, step) {
	let val = state[variableName];
	let err = Infinity;
	let lastErr = Infinity;
	let cycleCount = 0;

	while (Math.abs(err) > 1 && step > 0.01 && cycleCount < 1000) {
		cycleCount++;

		let currentValue = computeEndingValueWithContribution(Object.assign({}, state, {
			[variableName]: val,
		}));
		// console.log(`cycle: ${cycleCount}, contrib: ${val}, computed: ${currentValue}`);

		err = currentValue - state.endingValue;
		if (err > 0) { val -= step; }
		else { val += step; }
		if (Math.abs(err) > Math.abs(lastErr)) { step /= 2; }
		lastErr = err;
		// console.log(`error: ${err}, new contrib: ${val}, next step will be ${step}`);
	}

	return Object.assign({}, state, {
		[variableName]: val,
	});
}
