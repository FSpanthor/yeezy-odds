import { createStore } from "redux";
import yeezyReducer from "../reducers/yeezyReducer";

const configureStore = () => {
	const store = createStore(
		yeezyReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return store;
};

export default configureStore;
