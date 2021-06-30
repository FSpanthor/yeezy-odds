import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import retrieveStock from "../firebase/retrieveStock";
import SelectDrop from "./SelectDrop";
import SelectSize from "./SelectSize";
import NumberOfEntries from "./NumberOfEntries";
import Results from "./Results";
import MailingList from "./MailingList";
const StartPage = (props) => {
	return (
		<div>
			<h1>YEEZY ODDS</h1>
			<p>
				SIMULATE A YEEZY DROP USING OUR STATE OF THE ART SIM TECH. GO
				INTO THE DRAW KNOWING WHATS UP. WILL YOU COP??
			</p>
			<SelectDrop />
			<SelectSize />
			<NumberOfEntries />
			<Results />
			<MailingList />
			<Link to="/FAQ">
				<button>FAQ</button>
			</Link>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		state,
	};
};

export default connect(mapStateToProps)(StartPage);
