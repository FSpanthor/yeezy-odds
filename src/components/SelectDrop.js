import React, { useState, useEffect } from "react";
import database from "../firebase/firebase";
import { connect } from "react-redux";
import { setDrop, setSimComplete } from "../actions/selectItem";

const SelectDrop = ({ setDrop, setSimComplete, stock }) => {
	const dropChangeHandler = (e) => {
		setDrop(e.target.value);
		setSimComplete(false);
	};
	const retrieveDrops = () => {
		const query = database.ref("brand/yeezy").orderByKey();
		query.once("value").then(function (snapshot) {
			let array = [];
			snapshot.forEach(function (childSnapshot) {
				array.push(childSnapshot.key);
			});
			console.log(array);
			setList(array);
		});
	};
	const [list, setList] = useState([]);

	useEffect(() => retrieveDrops(), []);

	return (
		<select name="drop" id="drop" onChange={dropChangeHandler}>
			<option disabled selected value> -- select an drop -- </option>
			{list.map((x, y) => (
				<option key={y}>{x}</option>
			))}
		</select>
	
	);
};

const mapStateToProps = (state) => {
	return {
		drop: state.drop,
	};
};

const mapDispatchToProps = (dispatch) => ({
	setDrop: (drop) => dispatch(setDrop(drop)),
	setSimComplete: (complete) => dispatch(setSimComplete(complete)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDrop);
