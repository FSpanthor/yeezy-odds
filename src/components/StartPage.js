import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import retrieveStock from "../firebase/retrieveStock";
import SelectDrop from "./SelectDrop";
import SelectSize from "./SelectSize";
import NumberOfEntries from "./NumberOfEntries";
import Results from "./Results";
import MailingList from "./MailingList";
import styled from 'styled-components';

const Title = styled.h1 `
text-align: center;
`;

const Instructions = styled.p `
text-align: center;
`;

const Page = styled.div `
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const StartPage = (props) => {
	return (
		<Page>
			<Title>YEEZY ODDS</Title>
			<Instructions>
				SIMULATE A YEEZY DROP USING OUR STATE OF THE ART SIM TECH. GO
				INTO THE DRAW KNOWING WHATS UP. WILL YOU COP??
			</Instructions>
			<SelectDrop />
			<SelectSize />
			<NumberOfEntries />
			<Results />
			<MailingList />
			<Link to="/FAQ">
				<button>FAQ</button>
			</Link>
		</Page>
	);
};

const mapStateToProps = (state) => {
	return {
		state,
	};
};

export default connect(mapStateToProps)(StartPage);
