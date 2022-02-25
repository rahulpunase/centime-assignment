import {ADD_SANKEY_DATA, DELETE_SANKEY_DATA, UPDATE_SANKEY_DATA} from "./sankey-data.action";

export interface ISankeyDataReducer {
	dataStore: Array<Array<string | number>>;
	dataLoaded: boolean;
}

export const defaultState: ISankeyDataReducer = {
	dataStore: [["From", "To", "Weight"]],
	dataLoaded: false
}
const SankeyDataReducer = (state: ISankeyDataReducer = defaultState, action: any): ISankeyDataReducer => {
	switch (action.type) {
		case ADD_SANKEY_DATA: {
			const dataStore = [...state.dataStore];
			return {
				...state,
				dataStore: [...dataStore, ...action.payload],
				dataLoaded: true
			}
		}
		case UPDATE_SANKEY_DATA: {
			const dataStore = [...state.dataStore];
			dataStore.splice(action.payload.index, 1, action.payload.newRow);
			return {
				...state,
				dataStore: dataStore
			}
		}
		case DELETE_SANKEY_DATA: {
			const dataStore = [...state.dataStore];
			dataStore.splice(action.payload.index, 1);
			return {
				...state,
				dataStore: dataStore
			}
		}
		default:
			return state

	}
}

export { SankeyDataReducer }
