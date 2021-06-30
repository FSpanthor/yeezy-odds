import database from "../firebase/firebase";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSimComplete } from "../actions/selectItem";

const Results = (props) => {
	const [stock, setStock] = useState();
    const [hypeFactor, setHypeFactor] = useState();
	const [winStatus, setWinStatus] = useState();
	const [dropOdds, setDropOdds] = useState();
    const [simRunning, setSimRunning] = useState();
   

	const generateRandomNumber = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	};

	const buildSimArray = (len, num) => {
		if (len <= 0) len = 1; //if chances of W are less than 1, round up to 1
		let array = [];
		while (array.length < len) {
			array.push(num);
		}
		return array;
	};

    //this function is meant to be called after a user interaction
    const retrieveData = (drop, size) => {
        return new Promise((resolve, reject) =>
        {
            let data = []

            //retrieve stock for drop and size (from redux) and push snapshot to data array
            const stockPromise = new Promise ((resolve, reject) => {
                data.push(database
                .ref(`brand/yeezy/${drop}`)
                .orderByChild("size")
                .equalTo(size)
                .once("child_added"));
                resolve('Stock promise resolved');
               
            }) 
            //retrieve hype factor for drop and size (from redux) and push snapshot to data array
                const hypePromise = new Promise ((resolve, reject) => {
                    data.push(database
                    .ref(`brand/yeezy/${drop}/hypeFactor`)
                    .once('value'));
                    resolve('Hype Factor promise resolved');
                })
            
                //when stockPromise and hypePromise resolve, setStock and setHypeFactor to component state
                Promise.all(data).then((result) => {
                    setStock(result[0].val().stock)
                    console.log('stock of drop:', result[0].val().stock);
                    setHypeFactor(result[1].val())
                    console.log('hypeFactor for drop:',result[1].val())
                    
                })

                if (data.length === 2) {
                    resolve('Promise array resolved')};
            
        })
        }


	const simulateDrop = (entries) => {
        const hypeMultiplier = 1000;
		const otherEntries = hypeMultiplier * hypeFactor;
		const totalEntries = entries + otherEntries;
		//Determine Drop Odds
		const oddsPerDraw = (stock / totalEntries) * 100;
		const totalDropOdds = ((stock / totalEntries) * entries * 100).toFixed(
			2
		);

        //reduce chances to win to be x out of 100 by creating a win and lose array where win array
        //represets percentage out of 100 chance user wins and lose array is percentage change user loses
        //sum the two arrays to be used as a raffle
		const winArray = buildSimArray(Math.floor(oddsPerDraw), 1);
		const loseArray = buildSimArray(100 - winArray.length, 0);
		const combinedArray = winArray.concat(loseArray);
		console.log("odds array: ", combinedArray);

        //run simulation for the number of user's entries
		for (let i = 1; i <= entries; i++) {
			let entry = 1;
            //pick a random winner in the array
			let winner = combinedArray[generateRandomNumber(0, 100)];
            //if entry = winner, this draw wins
			if (entry === winner) {
				console.log("W");
				setWinStatus(true);
				break;
			} else {
				console.log("L");
				setWinStatus(false);
			}
		}
        //set sim complete (redux), sim running (component state) and drop odds (component state)
		props.setSimComplete(true);
        setSimRunning(false);
		setDropOdds(totalDropOdds);
        
	};

	const handleClick = () => {
        //set drop and size parms, set 
		const drop = props.drop;
		const size = props.size;
        setSimRunning(true);
        setSimComplete(false);
		retrieveData(drop, size);
  
	};

    //stock only changes via retrieveDrop function called through handleClick. When stock changes, simulateDrop
    useEffect( () => {
        if (stock && hypeFactor)
        simulateDrop(props.entries);
    }, [stock, hypeFactor, simRunning])

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
