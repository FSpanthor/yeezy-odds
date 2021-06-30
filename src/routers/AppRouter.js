import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "../components/StartPage";
import FAQ from "../components/Faq";

const AppRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact={true}>
				<StartPage />
			</Route>
			<Route path="/faq">
				<FAQ />
			</Route>
		</Switch>
	</BrowserRouter>
);

export default AppRouter;
