export const ADD_SANKEY_DATA = 'ADD_SANKEY_DATA';
export const UPDATE_SANKEY_DATA = 'UPDATE_SANKEY_DATA';

export const addSankeyData = (payload: any) => ({
	type: ADD_SANKEY_DATA,
	payload: payload
});

export const updateSankeyData = (payload: any) => ({
	type: UPDATE_SANKEY_DATA,
	payload: payload
});
