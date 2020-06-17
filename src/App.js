import React from 'react';
import { connect } from 'react-redux';
import {
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

import { useStyles } from './App-styles.js';
import InputValue from './InputValue.js';
import {
  setStartingValue,
  setEndingValue,
  setInterestRate,
  setNumberOfYears,
  setMonthlyContribution,
  setSolveForStartingValue,
  setSolveForEndingValue,
  setSolveForInterestRate,
  setSolveForNumberOfYears,
  setSolveForMonthlyContribution,
} from './actions';

function App(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.root}>
        <Typography variant="h2" align="center">Interest Calculator</Typography>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={1}
          >

            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              spacing={1}
            >
              <InputValue
                label="Starting value"
                startAdornment="$"
                value={props.startingValue}
                valueFormat="0,0"
                onChange={props.onChangeStartingValue}
                checkboxChecked={props.solveForStartingValue}
                onCheckCheckbox={props.onSolveForStartingValue}
              />

              <InputValue
                label="Ending value"
                startAdornment="$"
                value={props.endingValue}
                valueFormat="0,0"
                onChange={props.onChangeEndingValue}
                checkboxChecked={props.solveForEndingValue}
                onCheckCheckbox={props.onSolveForEndingValue}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              spacing={1}
            >
              <InputValue
                label="Interest rate"
                endAdornment="%"
                value={props.interestRate}
                valueFormat="0.0"
                sliderValues={{min: 0, max: 10, step: 0.1}}
                onChange={props.onChangeInterestRate}
                checkboxChecked={props.solveForInterestRate}
                onCheckCheckbox={props.onSolveForInterestRate}
              />

              <InputValue
                label="Number of years"
                endAdornment="years"
                value={props.numberOfYears}
                valueFormat="0"
                sliderValues={{min: 2, max: 30, step: 1}}
                onChange={props.onChangeNumberOfYears}
                checkboxChecked={props.solveForNumberOfYears}
                onCheckCheckbox={props.onSolveForNumberOfYears}
              />

              <InputValue
                label="Monthly contribution"
                startAdornment="$"
                value={props.monthlyContribution}
                valueFormat="0.0"
                onChange={props.onChangeMonthlyContribution}
                checkboxChecked={props.solveForMonthlyContribution}
                onCheckCheckbox={props.onSolveForMonthlyContribution}
              />
            </Grid>

            <Grid
              item
              xs={12}
              className={classes.copyrightItem}
            >
              <Typography variant="caption">
                Copyright ©2020 by John Bender. All rights reserved. All mistakes mine.
              </Typography>
            </Grid>

          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
}

function mapStateToProps(state) { return state; }

function mapDispatchToProps(dispatch) {
  function getValue(event, value) {
    const v = value;
    if (!v) {
      return event.target.value;
    }
    return v;
  }

  return {
    onChangeStartingValue: (event, value) => {
      dispatch(setStartingValue(getValue(event, value)));
    },
    onChangeEndingValue: (event, value) => {
      dispatch(setEndingValue(getValue(event, value)));
    },
    onChangeInterestRate: (event, value) => {
      dispatch(setInterestRate(getValue(event, value)));
    },
    onChangeNumberOfYears: (event, value) => {
      dispatch(setNumberOfYears(getValue(event, value)));
    },
    onChangeMonthlyContribution: (event, value) => {
      dispatch(setMonthlyContribution(getValue(event, value)));
    },

    onSolveForStartingValue: (event, value) => {
      dispatch(setSolveForStartingValue());
    },
    onSolveForEndingValue: (event, value) => {
      dispatch(setSolveForEndingValue());
    },
    onSolveForInterestRate: (event, value) => {
      dispatch(setSolveForInterestRate());
    },
    onSolveForNumberOfYears: (event, value) => {
      dispatch(setSolveForNumberOfYears());
    },
    onSolveForMonthlyContribution: (event, value) => {
      dispatch(setSolveForMonthlyContribution());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
