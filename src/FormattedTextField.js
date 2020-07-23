import numeral from 'numeral';
import React from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
	setCursorPosition,
} from './actions';

import { useStyles } from './FormattedTextField-styles.js';

class FormattedTextField extends React.Component {
	constructor(props) {
		super(props);

		this.nameRef = React.createRef();
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (this.nameRef.current && this.props.autoFocus) {
			return this.nameRef.current.value;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.nameRef.current && this.props.autoFocus) {
			// formatting could have added punctuation which needs to be ignored in cursor position
			const val = this.nameRef.current.value;
			if (val.length > snapshot.length) {
				const newPos = this.props.cursorPosition + (val.length - snapshot.length);
				this.nameRef.current.selectionStart = newPos;
				this.nameRef.current.selectionEnd = newPos;
				// console.log(`moving to ${this.props.cursorPosition}->${newPos} in ${val} (old ${snapshot})`);
			}
			else {
				this.nameRef.current.selectionStart = this.props.cursorPosition;
				this.nameRef.current.selectionEnd = this.props.cursorPosition;
			}
		}
	}

	render() {
		const {
			label,
			value,
			valueFormat,
			disabled,
			autoFocus,
			onChangeCursorPosition,
			onChange,
			InputProps,
			classes
		} = this.props;

		return (
			<TextField
				inputRef={this.nameRef}
				variant="outlined"
				label={label}
				value={numeral(value).format(valueFormat)}
				disabled={disabled}
				autoFocus={autoFocus}
				onChange={(event) => {
					onChangeCursorPosition(event.target.selectionStart);

					const v = event.target.value.replace(/\.\./, '.');
					onChange(event, numeral(v).value());
				}}
				InputProps={InputProps}
				className={classes.textField}
			/>
		);
	}
}

function mapStateToProps(state) { return state; }

function mapDispatchToProps(dispatch) {
	return {
		onChangeCursorPosition: (value) => {
			dispatch(setCursorPosition(value));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(FormattedTextField));
