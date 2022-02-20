import React from 'react';
import {act, render} from '@testing-library/react';
import App from './../App';
import store from './../store/store';
import {Provider} from 'react-redux';
import {I18nProvider} from '../i18n/i18n.provider';

describe('App component should', () => {
	it('render without crashing', () => {
		render(
			<Provider store={store}>
				<I18nProvider>
					<App />
				</I18nProvider>
			</Provider>,
		);
	});
});
