import database from "../firebase/firebase";
import React, { useState } from "react";
import { connect } from "react-redux";
import { setSimComplete } from "../actions/selectItem";

const Results = (props) => {
	const [stock, setStock] = useState();
	const [winStatus, setWinStatus] = useState();
	const [dropOdds, setDropOdds] = useState();

	const generateRandomNumber = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	};

	const buildArray = (len, num) => {
		if (len <= 0) len = 1; //if chances of W are less than 1, round up to 1
		let array = [];
		while (array.length < len) {
			array.push(num);
		}
		return array;
	};

	const runSim = (drop, size, entries) => {
		console.log("size is", size);
		database
			.ref(`brand/yeezy/${drop}`)
			.orderByChild("size")
			.equalTo(size)
			.once("child_added")
			.then((snapshot) => {
				setStock(snapshot.val().stock);
				simulateDrop(entries, snapshot.val().stock);
			})
			.catch((e) => {
				console.log("Error fetching data", e);
			});
	};

	const simulateDrop = (entries, stock) => {
		const otherEntries = 2000;
		const totalEntries = entries + otherEntries;
		//Determine Drop Odds
		const oddsPerDraw = (stock / totalEntries) * 100;
		const totalDropOdds = ((stock / totalEntries) * entries * 100).toFixed(
			2
		);
		const winArray = buildArray(Math.floor(oddsPerDraw), 1);
		const loseArray = buildArray(100 - winArray.length, 0);
		const combinedArray = winArray.concat(loseArray);
		console.log("win array: ", winArray);
		console.log("lose array: ", loseArray);
		console.log("combined array: ", combinedArray);
		console.log("stock: ", stock);
		console.log("number of user entries:", entries);
		for (let i = 1; i <= entries; i++) {
			let entry = 1;

			let winner = combinedArray[generateRandomNumber(0, 100)];

			if (entry === winner) {
				console.log("W");
				setWinStatus(true);
				break;
			} else {
				console.log("L");
				setWinStatus(false);
			}
		}
		props.setSimComplete(true);
		setDropOdds(totalDropOdds);
	};

	const handleClick = () => {
		const entries = props.entries;
		const drop = props.drop;
		const size = props.size;

		runSim(drop, size, entries);
	};

	return (
		<div>
			<button onClick={handleClick}>Simulate Drop</button>
			{winStatus && props.simComplete ? (
				<div>
					<p>W: COPPED</p>
					<p>Wow that was easy.. you are ready</p>
				</div>
			) : null}
			{winStatus === false && props.simComplete ? (
				<div>
					<p>L</p>
					<p>Sorry, didn't get 'em this time</p>
				</div>
			) : null}
			{props.simComplete ? (
				<p>
					YEEZY ODDS of obtaining this drop in this size:{" "}
					{dropOdds <= 100 ? dropOdds : 100}%
				</p>
			) : null}
			{winStatus === false && props.simComplete && dropOdds >= 100 ? (
				<div>
					<p>
						YOU TOOK AN L WHEN YOUR CHANCES OF WINNING WERE 100%.. I
						DONT KNOW WHAT TO TELL YOU.. SOMETIMES IT'S LIFE.. TRY 1
						MORE TIME
					</p>
				</div>
			) : null}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setSimComplete: (complete) => dispatch(setSimComplete(complete)),
});

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
