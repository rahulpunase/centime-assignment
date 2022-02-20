import {TLanguage} from "../../../i18n/locale";

export const UPDATE_LANGUAGE = 'UPDATE_LANGUAGE';

export const updateLanguage = (language: TLanguage) => ({
	type: UPDATE_LANGUAGE,
	payload: language
});
