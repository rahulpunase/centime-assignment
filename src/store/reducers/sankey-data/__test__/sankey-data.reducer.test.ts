import {ISankeyDataReducer, SankeyDataReducer, defaultState} from "../sankey-data.reducer";
import {
	ADD_SANKEY_DATA,
	addSankeyData,
	DELETE_SANKEY_DATA,
	deleteSankeyData,
	updateSankeyData
} from "../sankey-data.action";

describe('Sankey-data Reducer', () => {
	it(' should return default state', () => {
		const newState: ISankeyDataReducer = SankeyDataReducer(defaultState, {});
		expect(newState).toEqual(defaultState);
	});

	it(' should return a new state according to type', () => {
		const newState: ISankeyDataReducer = SankeyDataReducer(defaultState, addSankeyData([['Income', 'Bills', 5]]));
		expect(newState).toEqual({
			dataStore: [["From", "To", "Weight"], ['Income', 'Bills', 5]],
			dataLoaded: true
		});
	});

	it('should able to update state', () => {
		const currentDefaultState = {
			dataStore: [["From", "To", "Weight"], ['Income', 'Bills', 5], ['Saving', 'Health', 4]],
			dataLoaded: true
		}
		const newState: ISankeyDataReducer = SankeyDataReducer(currentDefaultState, updateSankeyData({
			index: 2,
			newRow: ['Saving', 'Health', 5]
		}));
		expect(newState).toEqual({
			dataStore: [["From", "To", "Weight"], ['Income', 'Bills', 5], ['Saving', 'Health', 5]],
			dataLoaded: true
		});
	});

	it('should able to delete', function () {
		const state = {
			dataStore: [["From", "To", "Weight"], ['Income', 'Bills', 5], ['Income', 'Bills', 5]],
			dataLoaded: true
		}
		const newState: ISankeyDataReducer = SankeyDataReducer(state, deleteSankeyData({index: 2}));
		expect(newState).toEqual({
			dataStore: [["From", "To", "Weight"], ['Income', 'Bills', 5]],
			dataLoaded: true
		});
	});
});
