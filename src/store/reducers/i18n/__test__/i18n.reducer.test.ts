import {II18nReducer, I18nReducer, defaultState} from '../i18n.reducer';
import {UPDATE_LANGUAGE} from "../i18n.action";

describe('i18n Reducer', () => {
	it(' should return default state', () => {
		const newState: II18nReducer = I18nReducer(defaultState, {});
		expect(newState).toEqual(defaultState);
	});

	it(' should return a new state according to type', () => {
		const mockAction = {
			type: UPDATE_LANGUAGE,
			payload: 'de-de'
		}
		const newState: II18nReducer = I18nReducer(defaultState, mockAction);
		expect(newState).toEqual({
			selectedLanguage: 'de-de'
		});
	})
});
