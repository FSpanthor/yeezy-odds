import React from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
	return (
		<div>
			<div>
				<h1>FAQ</h1>
				<p>Q: What is this?</p>
				<p>A:YEEZYODDS</p>
			</div>
			<Link to="/">
				<button>Home</button>
			</Link>
		</div>
	);
};

export default FAQ;
