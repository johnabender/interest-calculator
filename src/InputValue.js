import numeral from 'numeral';
import React from 'react';
import clsx from 'clsx';
import {
	Box,
	FormControlLabel,
	Grid,
	InputAdornment,
	Radio,
	Slider,
} from '@material-ui/core';

import { useStyles } from './InputValue-styles.js';
import FormattedTextField from './FormattedTextField.js';

function InputValue({
		label,
		startAdornment="",
		endAdornment="",
		value,
		valueFormat,
		onChange=function(){},
		selected=false,
		cursorPosition=-1,
		sliderValues={min: 0, max: 0, step: 1},
		checkboxChecked=false,
		onCheckCheckbox=function(){},
		...props
	}) {
	const classes = useStyles();

	return (
		<Box
			clone
/*
			borderTop={1}
			borderLeft={borderLeft ? 1 : 0}
*/
			borderColor="divider"
		>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				spacing={2}
				className={classes.inputItemRow}
			>
				<Grid
					item
					xs={12}
					md={4}
					className={clsx(classes.sliderItem)}
				>
					<Slider
						min={sliderValues.min}
						max={sliderValues.max}
						step={sliderValues.step}
						marks={(sliderValues.max - sliderValues.min)/sliderValues.step < 25 ? true : []}
						value={numeral(value).value()}
						valueLabelDisplay="auto"
						disabled={checkboxChecked}
						onChange={onChange}
						className={sliderValues.max > 0 ? classes.slider : classes.hidden}
					/>
				</Grid>

				<Grid
					item
					xs={6}
					md={3}
					lg={2}
					className={clsx(classes.textFieldItem)}
				>
					<FormattedTextField
						label={label}
						value={value}
						valueFormat={valueFormat}
						disabled={checkboxChecked}
						autoFocus={selected}
						cursorPosition={cursorPosition}
						onChange={onChange}
						InputProps={{
							startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
							endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
						}}
						className={classes.textField}
					/>
				</Grid>

				<Grid
					item
					xs={6}
					md={4}
					className={classes.radioButtonItem}
				>
					<FormControlLabel
						control={
							<Radio
								checked={checkboxChecked}
								onChange={onCheckCheckbox}
								color="primary"
								className={classes.radioButton}
							/>
						}
						label="Solve for"
					/>
				</Grid>
			</Grid>
		</Box>
	);
}

export default InputValue;
