import {ADD_SANKEY_DATA, DELETE_SANKEY_DATA, UPDATE_SANKEY_DATA} from "./sankey-data.action";

export interface ISankeyDataReducer {
	dataStore: Array<Array<string | number>>;
}

const defaultState: ISankeyDataReducer = {
	dataStore: [["From", "To", "Weight"]]
}
const SankeyDataReducer = (state: ISankeyDataReducer = defaultState, action: any): ISankeyDataReducer => {
	switch (action.type) {
		case ADD_SANKEY_DATA: {
			const dataStore = state.dataStore;
			const newData = [...dataStore, ...action.payload];
			return {
				...state,
				dataStore: newData
			}
		}
		case UPDATE_SANKEY_DATA: {
			const dataStore = state.dataStore;
			dataStore.splice(action.payload.index, 1, action.payload.newRow);
			const newData = [...dataStore];
			return {
				...state,
				dataStore: newData
			}
		}
		case DELETE_SANKEY_DATA: {
			const dataStore = state.dataStore;
			dataStore.splice(action.payload.index, 1);
			const newData = [...dataStore];
			return {
				...state,
				dataStore: newData
			}
		}
		default:
			return state

	}
}

export { SankeyDataReducer }
