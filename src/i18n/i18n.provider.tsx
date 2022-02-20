import React, {Fragment} from 'react';
import {IntlProvider} from "react-intl";
import content from './content/index';
import {useSelector} from "react-redux";
import {IStore} from "../store/store";


export interface II18nProvider {
	children: React.ReactNode,
}

export const I18nProvider = ({children}: II18nProvider) => {
	const i18 = useSelector((store: IStore) => store.i18nReducer);
	return <IntlProvider
		locale={i18.selectedLanguage}
		textComponent={Fragment}
		messages={content[i18.selectedLanguage]}
	>
		{children}
	</IntlProvider>
}
