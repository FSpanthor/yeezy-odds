//YEEZY REDUCER


const yeezyReducerDefaultState = {
	drop: "",
	size: "",
	entries: 0,
	simComplete: false,
};

const yeezyReducer = (state = yeezyReducerDefaultState, action) => {
	switch (action.type) {
		case "SET_SIZE":
			return { ...state, size: parseInt(action.size) };
		case "SET_ENTRIES":
			return { ...state, entries: parseInt(action.entries) };
		case "SET_DROP":
			return { ...state, drop: action.drop };
		case "SET_SIM_COMPLETE":
			return { ...state, simComplete: action.complete };
		default:
			return state;
	}
};

export default yeezyReducer;
