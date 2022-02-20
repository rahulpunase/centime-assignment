import {combineReducers, createStore} from "redux";
import {ISankeyDataReducer, SankeyDataReducer} from "./reducers/sankey-data/sankey-data.reducer";
import {I18nReducer, II18nReducer} from "./reducers/i18n/i18n.reducer";

export interface IStore {
	sankeyReducer: ISankeyDataReducer;
	i18nReducer: II18nReducer;
}

const combinedReducers = combineReducers({
	sankeyReducer: SankeyDataReducer,
	i18nReducer: I18nReducer
});

const store = createStore<IStore, any, any, any>(combinedReducers);

export {combinedReducers};

export default store;
