import React from "react";
import { connect } from "react-redux";
import { setEntries, setSimComplete } from "../actions/selectItem";

const NumberOfEntries = ({ entries, setEntries, setSimComplete }) => {
	const entryChangeHandler = (e) => {
		setEntries(e.target.value);
		setSimComplete(false);
	};
	return (
		<div>
			<label htmlFor="numberOfEntries">
				Entries (max of 100) 
			</label>
			<input
				type="number"
				name="numberOfEntries"
				id="numberOfEntries"
				min="0"
				max="100"
				onChange={entryChangeHandler}
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		entries: state.entries,
	};
};

const mapDispatchToProps = (dispatch) => ({
	setEntries: (entries) => dispatch(setEntries(entries)),
	setSimComplete: (complete) => dispatch(setSimComplete(complete)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberOfEntries);
