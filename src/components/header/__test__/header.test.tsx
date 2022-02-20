import React, {ReactNode} from 'react';
import {render as rtlRender , screen, fireEvent} from '@testing-library/react';
import {Provider} from "react-redux";
import store from "../../../store/store";
import {I18nProvider} from "../../../i18n/i18n.provider";
import HeaderComponent from "../header";

const render = (component: ReactNode) => rtlRender(
	<Provider store={store}>
		<I18nProvider>
			{component}
		</I18nProvider>
	</Provider>
);

describe('Header Component should', () => {
	it(' renders correctly', () => {
		render(<HeaderComponent/>);
	});

	it (' have Centime logo', () => {
		render(<HeaderComponent/>);
		const logo = screen.getByAltText('centime-logo');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'https://uploads-ssl.webflow.com/615f40af7a135839ad16cf09/615f40af7a1358d94716cf4e_logo2.svg');
	});

	it(' should work on onChange', () => {
		render(<HeaderComponent />)
		const languageLabel = screen.getByText(/Change Language:/i);
		const select = screen.getByTestId('change-language');
		fireEvent.change(select, { target: { value: 'de-de' } });
		expect(languageLabel).toHaveTextContent('Sprache ändern:');
	})
});
