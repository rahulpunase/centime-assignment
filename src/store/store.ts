import {combineReducers, createStore} from "redux";
import {ISankeyDataReducer, SankeyDataReducer} from "./reducers/sankey-data/sankey-data.reducer";

export interface IStore {
	sankeyReducer: ISankeyDataReducer;
}

const combinedReducers = combineReducers({
	sankeyReducer: SankeyDataReducer
});

const store = createStore<IStore, any, any, any>(combinedReducers);


export default store;
