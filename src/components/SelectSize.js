import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setSize, setSimComplete } from "../actions/selectItem";
import database from "../firebase/firebase";





const SelectSize = ({ size, drop, setSize, setSimComplete }) => {

	const [sizesList, setSizesList] = useState([]);
	
	const sizeChangeHandler = (e) => {
		//set size to redux, set simComplete to false to reset Results section
		setSize(e.target.value);
		setSimComplete(false);
	};

	const retrieveSizes = () => {
//query db for sizes for drop from redux store, store list of sizes within component

		const query = database.ref(`brand/yeezy/${drop}`).orderByKey();
		query.once("value").then(function (snapshot) {
			let array = [];
			snapshot.forEach(function (childSnapshot) {
				//add size to array if size element exists
				if (childSnapshot.val().size){
				array.push(childSnapshot.val().size)};
			});
			setSizesList(array);
		});
	};

	
	//retrieve sizes when drop parm (from redux) is updated
	useEffect(() => retrieveSizes(), [drop]);


	

	return (
		<div>
			
			<select name="size" id="size" onChange={sizeChangeHandler}>
			<option disabled selected value> -- select a size -- </option>
			{sizesList.sort((a,b) => a - b).map((x, y) => 
				<option key={y}>{x}</option>
			)}
			</select>
			
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		size: state.size,
		drop: state.drop
	};
};

const mapDispatchToProps = (dispatch) => ({
	setSize: (size) => dispatch(setSize(size)),
	setSimComplete: (complete) => dispatch(setSimComplete(complete)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectSize);
