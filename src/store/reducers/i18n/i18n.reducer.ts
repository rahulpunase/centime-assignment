import {TLanguage} from "../../../i18n/locale";
import {UPDATE_LANGUAGE} from "./i18n.action";

export interface II18nReducer {
	selectedLanguage: TLanguage;
}

export const defaultState: II18nReducer = {
	selectedLanguage: "en-us"
}
const I18nReducer = (state: II18nReducer = defaultState, action: any): II18nReducer => {
	switch (action.type) {
		case UPDATE_LANGUAGE: {
			return {
				...state,
				selectedLanguage: action.payload
			}
		}
		default:
			return state

	}
}

export { I18nReducer }
