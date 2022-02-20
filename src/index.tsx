import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from "./store/store";
import {I18nProvider} from "./i18n/i18n.provider";
import Locale = Intl.Locale;
import {LOCALES} from "./i18n/locale";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<I18nProvider>
				<App/>
			</I18nProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
