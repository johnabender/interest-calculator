import React from 'react';
import { connect } from 'react-redux';
import {
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import numeral from 'numeral';

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
  setSelectedBox,
} from './actions';

function App(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.root}>
        <Typography component="h1" variant="h2" align="center">Interest Calculator</Typography>
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
              container
              direction="column"
              spacing={1}
            >
              <InputValue
                label="Starting value"
                startAdornment="$"
                value={props.startingValue}
                valueFormat="0,0"
                selected={props.selectedBox === 'startingValue'}
                cursorPosition={props.cursorPosition}
                sliderValues={{min: 0, max: 1000000, step: 1000}}
                onChange={props.onChangeStartingValue}
                checkboxChecked={props.solveForStartingValue}
                onCheckCheckbox={props.onSolveForStartingValue}
              />

              <InputValue
                label="Ending value"
                startAdornment="$"
                value={props.endingValue}
                valueFormat="0,0"
                selected={props.selectedBox === 'endingValue'}
                cursorPosition={props.cursorPosition}
                sliderValues={{min: 0, max: 1000000, step: 2500}}
                onChange={props.onChangeEndingValue}
                checkboxChecked={props.solveForEndingValue}
                onCheckCheckbox={props.onSolveForEndingValue}
              />

              <InputValue
                label="Interest rate"
                endAdornment="%"
                value={props.interestRate}
                valueFormat="0.000"
                selected={props.selectedBox === 'interestRate'}
                cursorPosition={props.cursorPosition}
                sliderValues={{min: 0, max: 10, step: 0.1}}
                onChange={props.onChangeInterestRate}
                checkboxChecked={props.solveForInterestRate}
                onCheckCheckbox={props.onSolveForInterestRate}
              />

              <InputValue
                label="Number of years"
                endAdornment="years"
                value={props.numberOfYears}
                valueFormat="0.0"
                selected={props.selectedBox === 'numberOfYears'}
                cursorPosition={props.cursorPosition}
                sliderValues={{min: 5, max: 30, step: 1}}
                onChange={props.onChangeNumberOfYears}
                checkboxChecked={props.solveForNumberOfYears}
                onCheckCheckbox={props.onSolveForNumberOfYears}
              />

              <InputValue
                label="Monthly contribution"
                startAdornment="$"
                value={props.monthlyContribution}
                valueFormat="0,0"
                selected={props.selectedBox === 'monthlyContribution'}
                cursorPosition={props.cursorPosition}
                onChange={props.onChangeMonthlyContribution}
                checkboxChecked={props.solveForMonthlyContribution}
                onCheckCheckbox={props.onSolveForMonthlyContribution}
              />
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              className={classes.totalsItem}
            >
              <Grid item xs={12} md={6}>
                <Typography paragraph color="textSecondary" className={classes.totalsText}>
                  Total interest: {numeral(props.interestPaid).format('$0,0')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography paragraph color="textSecondary" className={classes.totalsText}>
                  Total payments: {numeral(props.paymentsPaid).format('$0,0')}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              className={classes.examplesItem}
            >
              <Grid item xs={12} align="center">
                <Typography component="h2" variant="h4">
                  Examples
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} className={classes.exampleItem}>
                <Typography component="h3" variant="h6">
                  Mortgage payment
                </Typography>
                <List dense={true}>
                  <ListItem><ListItemText primary="Solve for monthly contribution." /></ListItem>
                  <ListItem><ListItemText primary="Set ending value to zero." /></ListItem>
                  <ListItem><ListItemText primary="Modify starting value, interest rate, and number of years." /></ListItem>
                  <ListItem><ListItemText primary="See the monthly payment!" /></ListItem>
                </List>
              </Grid>
              <Grid item xs={12} md={6} className={classes.exampleItem}>
                <Typography component="h3" variant="h6">
                  College savings
                </Typography>
                <List dense={true}>
                  <ListItem><ListItemText primary="Solve for ending value." /></ListItem>
                  <ListItem><ListItemText primary="Set starting value and number of years." /></ListItem>
                  <ListItem><ListItemText primary="Modify ending value and interest rate." /></ListItem>
                  <ListItem><ListItemText primary="See how much college you can afford for your child!" /></ListItem>
                </List>
              </Grid>
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
      dispatch(setSelectedBox('startingValue'));
      dispatch(setStartingValue(getValue(event, value)));
    },
    onChangeEndingValue: (event, value) => {
      dispatch(setSelectedBox('endingValue'));
      dispatch(setEndingValue(getValue(event, value)));
    },
    onChangeInterestRate: (event, value) => {
      dispatch(setSelectedBox('interestRate'));
      dispatch(setInterestRate(getValue(event, value)));
    },
    onChangeNumberOfYears: (event, value) => {
      dispatch(setSelectedBox('numberOfYears'));
      dispatch(setNumberOfYears(getValue(event, value)));
    },
    onChangeMonthlyContribution: (event, value) => {
      dispatch(setSelectedBox('monthlyContribution'));
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
